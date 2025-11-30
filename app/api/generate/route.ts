import { streamText } from 'ai';
import { google } from '@ai-sdk/google';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { topic, language } = body;

    if (!topic || !language) {
      return new Response(JSON.stringify({ error: 'Missing topic or language' }), {
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

    const systemPrompt = language === 'en'
      ? `You are a satirical content generator specializing in parody LinkedIn posts. Your task is to create entertaining, exaggerated LinkedIn-style posts that mock the typical performative professional content found on the platform.

Key elements to include:
- Humblebragging about mundane achievements
- Overly dramatic professional "journeys"
- Manufactured inspiration and motivation
- Excessive use of business buzzwords and jargon
- Fake vulnerability followed by a triumphant conclusion
- Tagging of fictional connections and companies
- Hashtags that are slightly absurd or overly specific
- A tone that is simultaneously self-important and ridiculous

The post should be based on this topic: ${topic}

Make it sound authentic to LinkedIn's style while being clearly satirical. The post should be engaging and funny while still feeling like it could almost be a real LinkedIn post.`
      : `Du bist ein satirischer Content-Generator, der sich auf parodistische LinkedIn-Beiträge spezialisiert hat. Deine Aufgabe ist es, unterhaltsame, übertriebene LinkedIn-Beiträge zu erstellen, die den typischen performativen professionellen Inhalt auf der Plattform parodieren.

Wichtige Elemente, die enthalten sein sollten:
- Bescheidene Angeberei über alltägliche Erfolge
- Übermäßig dramatische berufliche "Reisen"
- Künstliche Inspiration und Motivation
- Exzessive Verwendung von Business-Buzzwords und Fachjargon
- Gefälschte Verletzlichkeit gefolgt von einem triumphalen Abschluss
- Markierung fiktiver Verbindungen und Unternehmen
- Hashtags, die leicht absurd oder übermäßig spezifisch sind
- Ein Ton, der gleichzeitig selbstwichtig und lächerlich ist

Der Beitrag sollte auf diesem Thema basieren: ${topic}

Mache es authentisch im LinkedIn-Stil, aber offensichtlich satirisch. Der Beitrag sollte ansprechend und lustig sein, aber immer noch so klingen, als könnte er fast ein echter LinkedIn-Beitrag sein.`;

    const result = await streamText({
      model: google('gemini-2.0-flash-exp'),
      system: systemPrompt,
      prompt: `Generate a satirical LinkedIn post about ${topic} in ${language === 'en' ? 'English' : 'German'}.`,
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
