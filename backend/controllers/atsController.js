const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config(); 

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const checkATSScore = async (req, res) => {
  try {
    const { resumeText } = req.body;

    if (!resumeText) {
      return res.status(400).json({ error: "Resume text is required" });
    }

    const currentDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }); 

    const prompt = `
As of today's date: ${currentDate}

You are an ATS (Applicant Tracking System) evaluation engine. Your task is to analyze the following resume text and:

1. Give an overall strict ATS score out of 100.
2. Score based on structure, formatting, keyword relevance, action verbs, readability, and standard section titles.
3. Highlight exact issues that caused score deductions.
4. Provide 3-5 actionable suggestions to improve the resume's ATS compatibility.

Do not penalize for future-looking dates (like "2025 – Present") since today is ${currentDate}.

Respond in this structured format:

ATS Score: [Your score]/100

Issues Identified:
- [Point 1]
- [Point 2]

Suggestions to Improve:
1. [Actionable tip 1]
2. [Actionable tip 2]

Resume Content:
${resumeText}
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;

    const output = response.text();
    res.status(200).json({ result: output });
  } catch (error) {
    console.error("Error during ATS check:", error.message || error);
    res.status(500).json({ error: "Failed to generate ATS score." });
  }
};

module.exports = { checkATSScore };
