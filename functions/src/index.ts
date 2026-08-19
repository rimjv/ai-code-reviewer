import { setGlobalOptions } from "firebase-functions";
import { onRequest } from "firebase-functions/https";
import OpenAI from "openai";

setGlobalOptions({ maxInstances: 10 });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const reviewCode = onRequest(async (request, response) => {
  try {
    const code = request.body.code;

    if (!code || !code.trim()) {
      response.status(400).json({
        message: "Please provide code to review.",
      });
      return;
    }

    const aiResponse = await openai.responses.create({
      model: "gpt-5.6-luna",
      instructions: `
        You are an expert software code reviewer.

        Review the code provided by the user.

        Identify:
        1. Bugs or logical errors
        2. Security issues
        3. Performance problems
        4. Code quality issues
        5. Recommended improvements

        Keep the review clear and practical.
        If the code is good, mention what is good as well.
      `,
      input: code,
    });

    response.json({
      message: aiResponse.output_text,
    });

  } catch (error) {
    console.error("AI review failed:", error);

    response.status(500).json({
      message: "Failed to generate AI code review.",
    });
  }
});

