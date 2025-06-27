export default async function handler(req, res) {
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  if (!OPENAI_API_KEY) {
    return res.status(500).json({ error: "No OpenAI API key set!" });
  }
  const prompt = `Write a 1-sentence, first-person, energetic, developer introduction for my portfolio with these facts:
  - Name: Rishabh Jain
  - MERN stack developer, mentor, open source advocate
  - Loves mentoring and scalable products
  - 100+ mentees, ex-Intern @Cogoport, GSSoC'23
  Make it unique, inspiring, and friendly.`;
  try {
    const apiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 50,
        temperature: 0.8
      })
    });
    const data = await apiRes.json();
    const intro = data?.choices?.[0]?.message?.content?.trim() || "Hi, I'm Rishabh Jain, MERN stack developer and mentor!";
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json({ intro });
  } catch (e) {
    res.status(500).json({ error: "OpenAI request failed" });
  }
}