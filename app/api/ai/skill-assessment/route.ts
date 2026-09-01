import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';
import fs from 'fs';
import path from 'path';

// Helper to load env if Next.js fails to detect root
function getApiKey(keyName: string) {
  if (process.env[keyName]) return process.env[keyName];
  
  try {
    const envPath = path.resolve(process.cwd(), '.env.local');
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      const lines = content.split('\n');
      for (const line of lines) {
        if (line.startsWith(keyName + '=')) {
          return line.split('=')[1].trim();
        }
      }
    }
  } catch (e) {
    console.error("Manual env load failed:", e);
  }
  return null;
}

const groq = new Groq({
  apiKey: getApiKey('GROQ_SKILL_KEY') || getApiKey('GROQ_API_KEY') || '',
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, topic, history, session } = body;

    if (!groq.apiKey) {
      return NextResponse.json({ 
        error: "API Key Missing", 
        setEnv: "GROQ_SKILL_KEY or GROQ_API_KEY",
        hint: "Add keys to .env.local — see .env.example",
      }, { status: 500 });
    }

    if (action === 'next_question') {
      try {
        const response = await groq.chat.completions.create({
          model: "llama-3.3-70b-versatile",
          messages: [
            { 
              role: "system", 
              content: `You are a technical interviewer. You MUST respond with a valid JSON object ONLY. 
              The question should be one of these types: 'mcq' (Multiple Choice), 'boolean' (True/False), 'blank' (Fill in the blanks), or 'descriptive'.
              
              JSON Format:
              {
                "question": "The question text here",
                "type": "mcq" | "boolean" | "blank" | "descriptive",
                "options": ["option 1", "option 2", "option 3", "option 4"], // ONLY for mcq
                "difficulty": "Beginner" | "Intermediate" | "Advanced"
              }`
            },
            { 
              role: "user", 
              content: `Topic: ${topic}. History: ${JSON.stringify(history)}. Generate a ${history.length % 4 === 0 ? 'descriptive' : (history.length % 3 === 0 ? 'mcq' : (history.length % 2 === 0 ? 'boolean' : 'blank'))} question.` 
            }
          ],
          response_format: { type: "json_object" }
        });

        const content = response.choices[0].message.content || '{}';
        return NextResponse.json(JSON.parse(content));
      } catch (err: any) {
        return NextResponse.json({ error: "AI Generation failed.", details: err.message }, { status: 500 });
      }
    }

    if (action === 'evaluate') {
      try {
        const prompt = `Conduct a comprehensive skill evaluation for the topic: ${topic}. 
        Analyzed Session Data: ${JSON.stringify(session)}
        
        Return a JSON object with:
        - scores: { basic: number, intermediate: number, advanced: number }
        - overall_level: "Beginner" | "Intermediate" | "Advanced"
        - roadmap: string[] (Array of strings, each string is a clear learning step. NO OBJECTS)
        - resources: { name: string, link: string, type: string }[]`;

        const response = await groq.chat.completions.create({
          model: "llama-3.3-70b-versatile",
          messages: [{ role: "user", content: prompt }],
          response_format: { type: "json_object" }
        });

        const result = JSON.parse(response.choices[0].message.content || '{}');
        // Ensure roadmap is strings only to prevent React child errors
        if (result.roadmap && Array.isArray(result.roadmap)) {
          result.roadmap = result.roadmap.map((s: any) => typeof s === 'object' ? (s.step || s.topic || JSON.stringify(s)) : s);
        }
        return NextResponse.json(result);
      } catch (err: any) {
        return NextResponse.json({ error: "AI Evaluation failed." }, { status: 500 });
      }
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to process assessment' }, { status: 500 });
  }
}
