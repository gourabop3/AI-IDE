const express = require('express');
const cors = require('cors');
const donenv = require('dotenv');

donenv.config();

const { improvePrompt, generateResponseStream } = require('./utils/ai');

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
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
    console.error('Error generating codes:', error);
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