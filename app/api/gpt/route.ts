import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { messages } = await req.json();
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
    });

    return NextResponse.json(response.choices[0].message.content);
  } catch (err) {
    return NextResponse.json({ error: err });
  }
}
