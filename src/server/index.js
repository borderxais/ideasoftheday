const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { OpenAI } = require('openai');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true
}));

app.use(express.json());

// Validate OpenAI API key
if (!process.env.OPENAI_API_KEY) {
  console.error('ERROR: OpenAI API key is not set in .env file');
  process.exit(1);
}

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Daily Ideas endpoint
app.get('/api/content/daily-ideas', async (req, res) => {
  try {
    console.log('Generating daily ideas...');
    
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a social media content strategist. Generate exactly 3 trending content ideas in JSON format."
        },
        {
          role: "user",
          content: `Generate 3 trending content ideas for social media marketing. Each idea must include:
            - title (string)
            - description (string, 2-3 sentences)
            - targetAudience (string)
            - contentFormat (string, e.g., "Short-form video", "Carousel post")
            - engagementPotential (string, e.g., "High - 8.5% expected")
            - hashtags (array of strings, 3-5 relevant hashtags)
            - bestTimeToPost (string, e.g., "Weekdays 6-8 PM")
            - visualStyle (string, describing the visual approach)

            Format the response as a JSON object with an 'ideas' array containing these 3 items.`
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 1000
    });

    const responseContent = completion.choices[0].message.content;
    console.log('Raw OpenAI response:', responseContent);

    const parsedContent = JSON.parse(responseContent);

    // Validate response structure
    if (!parsedContent.ideas || !Array.isArray(parsedContent.ideas) || parsedContent.ideas.length === 0) {
      throw new Error('Invalid response format from OpenAI');
    }

    // Send successful response
    res.json({
      success: true,
      ideas: parsedContent.ideas,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error generating daily ideas:', error);
    res.status(500).json({
      success: false,
      error: {
        message: error.message,
        type: error.name,
        timestamp: new Date().toISOString()
      }
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    openaiKey: !!process.env.OPENAI_API_KEY
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`OpenAI API Key configured: ${!!process.env.OPENAI_API_KEY}`);
});