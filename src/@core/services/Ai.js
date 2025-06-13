import axios from "axios";

export const AskQuestionFromAIApi = async (userQuestion, coursesData) => {
  const OPENROUTER_API_KEY =
    "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";

  try {
    const messages = [
      {
        role: "system",
        content:
          "شما یک دستیار هوشمند هستید که به سوالات ادمین بر مبنای داده‌های دوره‌ها پاسخ می‌دهید.",
      },
      {
        role: "user",
        content: `لطفاً به سوال زیر پاسخ بده:
        
    ${userQuestion}

    داده‌های دوره‌ها:

    ${JSON.stringify(coursesData, null, 2)}
        `,
      },
    ];

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages,
        temperature: 0.7,
        max_tokens: 1500,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        },
      }
    );

    const answer = response.data.choices[0]?.message?.content;
    console.log("AI Answer:", answer);
    return answer;
  } catch (error) {
    console.error("Error asking AI:", error.response?.data || error.message);
    throw new Error("Failed to get AI response");
  }
};
