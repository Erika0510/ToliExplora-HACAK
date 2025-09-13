import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function run() {
  const resp = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "user", content: "Dame una lista de 3 lugares turísticos famosos en el Tolima, Colombia" }
    ]
  });
  console.log(resp.choices[0].message?.content);
}

run();
