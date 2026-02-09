import openai from "../configs/openai.js";

// controller for enhancing a resume's professional summary
// POST: /api/ai/enhance-pro-sum
export const enhanceProfessionalSummary = async (req, res) => {
    try {
        const { userContent } = req.body;

        if (!userContent) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const response = await openai.chat.completions.create({
            model: process.env.OPENAI_MODEL || "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: "You are a professional resume writer and career consultant with expertise in creating ATS-optimized content. Your task is to enhance and rewrite the professional summary provided by the user. Follow these guidelines strictly:\n\n1. Keep the summary concise: 2-3 sentences maximum\n2. Highlight key skills, relevant experience, and career objectives\n3. Use strong action words and industry-specific keywords\n4. Make it compelling, professional, and ATS-friendly\n5. Maintain a confident and achievement-oriented tone\n6. Return ONLY the enhanced summary text - no explanations, options, formatting, or additional commentary\n\nImportant: Do not include any phrases like 'Here is the enhanced summary' or quotation marks. Return only the pure text content."
                },
                {
                    role: "user",
                    content: userContent,
                },
            ],
            temperature: 0.7,
            max_tokens: 200,
        });

        const enhancedContent = response.choices[0].message.content.trim();
        return res.status(200).json({ enhancedContent });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}