import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';
import fs from 'fs';
import path from 'path';

function getApiKey(keyName: string) {
  if (process.env[keyName]) return process.env[keyName];
  try {
    const envPath = path.resolve(process.cwd(), '.env.local');
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      const lines = content.split('\n');
      for (const line of lines) {
        if (line.startsWith(keyName + '=')) return line.split('=')[1].trim();
      }
    }
  } catch (e) {}
  return null;
}

export async function POST(req: Request) {
  try {
    const apiKey = getApiKey('GROQ_API_KEY');
    if (!apiKey) {
      return NextResponse.json(
        {
          error: 'Groq API key is not configured.',
          setEnv: 'GROQ_API_KEY',
          hint: 'Add GROQ_API_KEY to .env.local (see .env.example).',
        },
        { status: 503 }
      );
    }
    const groq = new Groq({ apiKey });

    const { prompt, type, history = [], context = {} } = await req.json();

    let systemPrompt = "You are the LMS-Smart Campus Intelligent Assistant. You have access to student performance data and course context.";
    
    // Feature-specific logic
    switch(type) {
      case 'doubt':
        systemPrompt = "You are a Concept Explainer. Use analogies and break down complex college-level topics into simple parts. If context is provided, refer to it.";
        break;
      case 'quiz':
        systemPrompt = "Generate a challenging 5-question MCQ quiz. Format: JSON with questions, options, and correct answers. Topic: " + prompt;
        break;
      case 'roadmap':
        systemPrompt = `Generate a personalized learning roadmap. 
        Student Year: ${context.year || 'N/A'}, Department: ${context.department || 'N/A'}. 
        Goal: ${prompt}. 
        Provide specific subjects, online resources, and skills to master.`;
        break;
      case 'recommendation':
        systemPrompt = `Analyze performance: CGPA ${context.cgpa || 'N/A'}. 
        Weak areas identified: ${context.weaknesses || 'General'}. 
        Suggest specific improvement steps and study materials.`;
        break;
      case 'notes':
        systemPrompt = "Create structured Markdown notes with headers, bullet points, and a 'Crucial Concepts' section.";
        break;
      case 'rag':
        systemPrompt = `You are a specialized Course Assistant. Use this context from lecture notes: ${context.lectureData || 'None'}. Answer the user's doubt specifically based on these notes.`;
        break;
      case 'timetable_suggest':
        systemPrompt = "Analyze faculty availability and room constraints to suggest an optimized schedule. Provide a conflict-free reasoning.";
        break;
    }

    const messages = [
      { role: "system", content: systemPrompt },
      ...history.slice(-6), // Keep last 3 exchanges
      { role: "user", content: prompt }
    ];

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: messages as any,
      temperature: 0.7,
    });

    return NextResponse.json({ result: response.choices[0].message.content });
  } catch (error: any) {
    console.error('AI Assistant Error:', error);
    return NextResponse.json({ error: 'Failed to process AI request' }, { status: 500 });
  }
}
