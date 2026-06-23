// app/api/openai/route.ts
import { NextResponse } from "next/server";
import OpenAI from "openai";

// Se inicializa directamente pasando el API Key (se lee automáticamente de tu .env.local)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    // Lee y parsea el JSON enviado en el body de la petición
    const { query } = await request.json();

    if (!query) {
      return NextResponse.json({ error: "Missing query parameter" }, { status: 400 });
    }

    // Sintaxis moderna de OpenAI v4 para generar respuestas
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // El modelo rápido estándar y económico
      messages: [{ role: "user", content: query }],
    });

    // Estructura simplificada para extraer el texto de la respuesta
    const aiResponse = chatCompletion.choices[0].message.content;

    return NextResponse.json({ response: aiResponse });
  } catch {
    // Captura de error limpia omitiendo el parámetro no usado para ESLint
    return NextResponse.json(
      { error: "An error occurred while communicating with OpenAI." },
      { status: 500 }
    );
  }
}