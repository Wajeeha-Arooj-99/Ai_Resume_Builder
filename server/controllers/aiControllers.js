import openai from "../configs/ai.js";
import Resume from "../models/Resume.js";

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

// controller for enhancing a resume's job description
// POST: /api/ai/enhance-job-desc
export const enhanceJobDescription = async (req, res) => {
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
                    content: "You are a professional resume writer specializing in crafting impactful job descriptions. Your task is to enhance the work experience description provided by the user. Follow these guidelines strictly:\n\n1. Keep it concise: 2-4 bullet points or 3-4 sentences maximum\n2. Start each point with strong action verbs (Led, Developed, Managed, Achieved, etc.)\n3. Highlight key responsibilities and measurable achievements\n4. Include quantifiable results and metrics whenever possible (percentages, numbers, timeframes)\n5. Use industry-specific keywords for ATS optimization\n6. Make it compelling and results-oriented\n7. Return ONLY the enhanced description text - no preamble, explanations, or additional commentary\n\nImportant: Do not include phrases like 'Here is the enhanced description' or use quotation marks. Return only the pure enhanced text content."
                },
                {
                    role: "user",
                    content: userContent,
                },
            ],
            temperature: 0.7,
            max_tokens: 300,
        });

        const enhancedContent = response.choices[0].message.content.trim();
        return res.status(200).json({ enhancedContent });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

// controller for uploading a resume to the database
// POST: /api/ai/upload-resume
export const uploadResume = async (req, res) => {
    try {
        const { resumeText, title } = req.body;
        const userId = req.userId;

        if (!resumeText) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const systemPrompt = "You are an expert AI Agent specialized in extracting structured data from resumes. Extract all relevant information and return it in valid JSON format.";

        const userPrompt = `Extract data from this resume and return it in the exact JSON format specified below. Do not include any text before or after the JSON.

Resume Text:
${resumeText}

Required JSON Format:
{
  "professional_summary": "",
  "skills": [],
  "personal_info": {
    "image": "",
    "full_name": "",
    "profession": "",
    "email": "",
    "phone": "",
    "location": "",
    "linkedin": "",
    "website": ""
  },
  "experience": [
    {
      "company": "",
      "position": "",
      "start_date": "",
      "end_date": "",
      "description": "",
      "is_current": false
    }
  ],
  "project": [
    {
      "name": "",
      "type": "",
      "description": ""
    }
  ],
  "education": [
    {
      "institution": "",
      "degree": "",
      "field": "",
      "graduation_date": "",
      "gpa": ""
    }
  ]
}

Important: Return ONLY valid JSON. No markdown, no code blocks, no explanations.`;

        const response = await openai.chat.completions.create({
            model: process.env.OPENAI_MODEL || "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: systemPrompt
                },
                {
                    role: "user",
                    content: userPrompt,
                },
            ],
            response_format: { type: 'json_object' }
        });

        const extractedData = response.choices[0].message.content;
        const parsedData = JSON.parse(extractedData);
        const newResume = await Resume.create({ userId, title, ...parsedData });

        res.json({ resumeId: newResume._id });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}