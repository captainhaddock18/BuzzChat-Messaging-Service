import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json(); // Extract the prompt (user message) from the request body

    if (!prompt) {
      return new NextResponse('Invalid request: missing prompt', { status: 400 });
    }

    // Get the API key from environment variables
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return new NextResponse('Missing Gemini API key', { status: 500 });
    }

    // Define the role or context for the chatbot
    const context = "You are a mental and emotional support friend who listens and provides comforting, empathetic, and supportive responses to teenagers and youngsters. Your goal is to help them feel understood and supported. You explain them comprehensively about life and support them emotionally and mentally.";

    // Prepare the body data according to the API documentation with context
    const bodyData = JSON.stringify({
      contents: [
        {
          parts: [{ text: `${context}\nUser: ${prompt}\nFriend:` }],
        },
      ],
    });

    // Make the POST request to the Gemini API
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: bodyData,
      }
    );

    const geminiData = await geminiResponse.json();

    if (!geminiResponse.ok) {
      return new NextResponse(`Error from Gemini API: ${geminiData.error?.message || 'Unknown error'}`, {
        status: geminiResponse.status,
      });
    }

    // Return the Gemini API's response to the frontend
    return NextResponse.json({ response: geminiData });
  } catch (error) {
    console.error('Error processing request to Gemini API:', error);
    return new NextResponse('Server error', { status: 500 });
  }
}
