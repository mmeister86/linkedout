import { streamText } from 'ai';
import { google } from '@ai-sdk/google';
import { readFile } from 'fs/promises';
import { join } from 'path';

async function loadSystemPrompt(language: string): Promise<string> {
  try {
    const fileName = language === 'en' ? 'system_prompt_en.md' : 'system_prompt_de.md';
    const filePath = join(process.cwd(), fileName);
    const content = await readFile(filePath, 'utf-8');
    return content;
  } catch (error) {
    console.error('Error loading system prompt:', error);
    throw new Error(`Failed to load system prompt for language: ${language}`);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { topic, language = 'de' } = body; // Default to German if no language specified

    if (!topic) {
      return new Response(JSON.stringify({ error: 'Missing topic' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!['en', 'de'].includes(language)) {
      return new Response(JSON.stringify({ error: 'Language must be "en" or "de"' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const systemPrompt = await loadSystemPrompt(language);

    const result = await streamText({
      model: google('gemini-2.0-flash-exp'),
      system: systemPrompt,
      prompt: topic,
      maxOutputTokens: 500,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error('Error generating text:', error);
    return new Response(JSON.stringify({ error: 'Failed to generate text' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
