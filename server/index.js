const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const { improvePrompt, generateResponseStream } = require('./utils/ai');

const app = express();
const port = process.env.PORT || 3000;
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Welcome to the server!');
})


app.get('/generate-codes', async (req, res) => {
  const prompt = req.query.prompt || 'create a todo app';
  
  try{
    const improvementPrompt = await improvePrompt(prompt);

    const stream = await generateResponseStream(improvementPrompt);

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Transfer-Encoding', 'chunked');

    for await(const event of stream) {
      const chunk = event.choices?.[0]?.delta?.content || ''
      if (chunk) {
        res.write(chunk);
      }
    }

    res.end();
  }catch(err){
    console.error('Error generating codes:', err);
    if (!res.headersSent) {
        res.status(500).json({ error: 'Failed to generate codes' });
    } else {
        res.end();
    }
  }
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});