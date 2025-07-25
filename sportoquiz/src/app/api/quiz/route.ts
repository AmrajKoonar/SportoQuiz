import OpenAI from "openai";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const maxDuration = 60;

const api_key = process.env.API_KEY;
const endpoint = "https://models.inference.ai.azure.com";
const modelName = "gpt-4o-mini";

interface QuizRequest {
  sport: string;
  difficulty: "Rookie" | "Pro" | "Hall of Fame";
  username: string;
}

// ADD THIS FUNCTION ABOVE THE main POST()
async function isValidSport(sport: string, client: OpenAI): Promise<boolean> {
  const check = await client.chat.completions.create({
    model: modelName,
    messages: [
      {
        role: "system",
        content:
          "You are an expert on categorizing valid sports. Only respond with true or false. Respond with true if the given input is a real sport, otherwise respond with false. Do not add any other explanation or text.",
      },
      {
        role: "user",
        content: `Is "${sport}" a valid sport?`,
      },
    ],
    temperature: 0,
    max_tokens: 5,
  });

  const answer = check.choices[0].message.content?.toLowerCase().trim();
  return answer === "true";
}

export async function POST(request: NextRequest) {
  try {
    const { sport, difficulty, username }: QuizRequest = await request.json();

    if (!sport || !difficulty || !username) {
      return NextResponse.json(
        { error: "Missing required fields: sport, difficulty, or username" },
        { status: 400 }
      );
    }



    const client = new OpenAI({
      baseURL: endpoint,
      apiKey: api_key!,
    });

    // Check if the sport is valid
    const knownSports = ["NFL", "NBA", "NHL", "MLB", "EPL"];

    if (!knownSports.includes(sport)) {
      const isValid = await isValidSport(sport, client);
      if (!isValid) {
        return NextResponse.json({ errorCode: 1 }, { status: 200 });
      }
    }


    // Customize the prompt based on difficulty
    const getDifficultyDescription = (diff: string) => {
      switch (diff) {
        case "Rookie":
          return "beginner-friendly questions about well-known facts, popular players, and basic rules";
        case "Pro":
          return "intermediate questions about statistics, team history, and notable games";
        case "Hall of Fame":
          return "extremely advanced questions about highly detailed statistics, historical games, lesser-known facts, and expert-level knowledge";
        default:
          return "general knowledge questions";
      }
    };

    const difficultyDescription = getDifficultyDescription(difficulty);

    const response = await client.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "Respond only with valid JSON. Do NOT include markdown formatting (```json) or any extra text. Only return a JSON object. Ensure all line breaks in the JSON string values are escaped with \\n so that the response is valid JSON.",
        },
        {
          role: "user",
          content: `Generate exactly 10 multiple-choice questions about ${sport} with ${difficultyDescription}. Each question should have 4 options with only one correct answer. Use this exact JSON structure:

          {
            "questions": [
              {
                "id": 1,
                "question": "Which team won the most ${sport} championship of all time?",
                "options": ["Option A", "Option B", "Option C", "Option D"],
                "correctAnswer": "Option A",
                "explanation": "Brief explanation of why this is correct"
              }
            ]
          }

          Make sure to:
          1. Include exactly 10 questions
          2. Ensure there are no questions that include the keyword "recent", "previous", or anything similar
          3. Make questions appropriate for ${difficulty} difficulty level
          4. Ensure all questions are about ${sport}
          5. Provide clear, factual explanations
          6. Make sure each question has exactly 4 options
          7. Only one option should be correct per question
          8. Return ONLY valid JSON with no extra text or markdown formatting`,
        },
      ],
      model: modelName,
      temperature: 0.8,
      max_tokens: 2000,
      top_p: 1,
    });

    const rawContent = response.choices[0].message.content?.trim() ?? "";
    const cleanedResponse = rawContent.replace(/```json|```/g, "").trim();

    try {
      const parsedContent = JSON.parse(cleanedResponse);
      
      // Validate the response structure
      if (!parsedContent.questions || !Array.isArray(parsedContent.questions)) {
        throw new Error("Invalid response structure: missing questions array");
      }

      // Validate each question
      for (let i = 0; i < parsedContent.questions.length; i++) {
        const question = parsedContent.questions[i];
        if (!question.id || !question.question || !question.options || !question.correctAnswer || !question.explanation) {
          throw new Error(`Invalid question structure at index ${i}`);
        }
        
        if (!Array.isArray(question.options) || question.options.length !== 4) {
          throw new Error(`Question ${i + 1} must have exactly 4 options`);
        }
        
        if (!question.options.includes(question.correctAnswer)) {
          throw new Error(`Question ${i + 1} correctAnswer must be one of the options`);
        }
      }

      // Ensure we have exactly 10 questions
      if (parsedContent.questions.length !== 10) {
        console.warn(`Expected 10 questions, got ${parsedContent.questions.length}`);
      }

      return NextResponse.json(parsedContent);
    } catch (error) {
      console.error("Failed to parse AI response as JSON:", error);
      return NextResponse.json(
        {
          error: "Failed to parse AI response as JSON",
          rawContent,
        },
        {
          status: 500,
        }
      );
    }
  } catch (err) {
    console.error("Error processing quiz request:", err);
    return NextResponse.json(
      { error: "Failed to generate quiz questions" },
      { status: 500 }
    );
  }
}