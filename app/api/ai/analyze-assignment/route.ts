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

    const { assignmentTitle, content } = await req.json();

    const systemPrompt = `You are an expert academic evaluator. Analyze the student's assignment submission and provide:
    1. A numeric Confidence Score (0-100).
    2. Key Strengths.
    3. Potential Errors or Areas to Improve.
    4. A short Encouraging Feedback.
    Keep it concise and student-friendly.`;
    
    const userPrompt = `Assignment: ${assignmentTitle}\n\nSubmission Content:\n${content}`;

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
    });

    return NextResponse.json({ result: response.choices[0].message.content });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to analyze assignment' }, { status: 500 });
  }
}
