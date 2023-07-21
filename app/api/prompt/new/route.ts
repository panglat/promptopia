import Prompt from '@models/prompt';
import { connectToDB } from '@utils/database';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest, res: NextResponse) => {
  const { userId, prompt, tag } = await req.json();
  try {
    await connectToDB();
    const newPrompt = new Prompt({ creator: userId, prompt, tag });
    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    console.error('Prompt creation failed', error);
    return new Response('Failed to create a new prompt', { status: 500 });
  }
};
