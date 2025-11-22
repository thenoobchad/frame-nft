import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export interface Roast {
    score: number,
    burn: string
}

export async function roastCast(cast: string): Promise<Roast> {
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{
            role: "user",
            content: `Roast this Farcaster cast (1-10). Return JSON: {score: number, burn: string}\nCast: "${cast}"`
        }],
        response_format: { type: "json_object" }
    });

    const json = JSON.parse(completion.choices[0].message.content || '{}')

    return {
        score: Math.min(10, Math.max(1, json.score ?? 5)),
        burn: json.burn ?? "Mid"
    }
}