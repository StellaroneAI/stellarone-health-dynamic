const express = require("express");
const router = express.Router();
const openai = require("./openaiConfig");

router.post("/chat", async (req, res) => {
  try {
    const message = req.body.message || "";

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a helpful RCM assistant for a healthcare company." },
        { role: "user", content: message }
      ],
    });

    const aiResponse = completion.choices[0].message.content;
    res.status(200).json({ response: aiResponse });
  } catch (err) {
    console.error("OpenAI Error:", err);
    res.status(500).json({ error: "Failed to get AI response." });
  }
});

module.exports = router;
