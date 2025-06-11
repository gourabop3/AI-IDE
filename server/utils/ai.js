// import OpenAI from "openai";
const OpenAI = require("openai");
const client = new OpenAI();

// const response = await client.responses.create({
//     model: "gpt-4.1",
//     input: "Write a one-sentence bedtime story about a unicorn.",
// });

// console.log(response.output_text);

const improvementPrompt = `
You are a professional prompt engineer.
Your job is to improve the user's prompt for generating web apps using html, css and javascript.
Your task is to enhance the user's prompt by making it more specific, detailed, and clear but also keeping it simple and concise.
Your output should be a single line of text, without any additional explanations or formatting.

Example input: 
Create a sortable todo list app

Example output:
Create a todo list app with the following features:
- Add new tasks
- Mark tasks as completed
- Delete tasks
- Sort tasks by dragging and dropping them
- Use modern HTML, CSS, and JavaScript (ES6+)
- Add good styling to make it visually appealing and responsive
`

async function improvePrompt(prompt){
    const response = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: improvementPrompt },
            { role: "user", content: prompt }
        ]
    })

    return response.choices[0].message.content.trim();
}



const codeSytemPrompt = `
You are a professional frontend developer.

Your job is to generate code based on the user's prompt. Follow these strict rules:

- Only output 3 sections: HTML, CSS, and JavaScript — separated by the comment: <--Section-separator-->
- Use only plain HTML, CSS, and modern JavaScript (ES6+). No frameworks like React, Vue, or Angular.
- Ensure the app is responsive and visually modern with a clean, professional design.
- All styles go in the CSS section and are linked in HTML using: <link rel="stylesheet" href="/styles.css">
- All scripts go in the JS section and are linked using: <script src="/index.js"></script>
- Use semantic HTML, modern CSS features (Flexbox, Grid), and external CDNs only for modern libraries (no jQuery or Bootstrap) its okay to use boostrap icons etc.
- Use CDNs like: <script src="https://cdn.jsdelivr.net/npm/sortablejs@1.15.6/Sortable.min.js"></script> or Google Fonts.

Think before generating:
- Understand the user prompt and infer basic functionality needed (e.g., a "todo app" should support add/edit/delete/complete).
- Do not include your thought process or any explanation in the output — only the 3 code sections.

### Example format:

<!doctype html>
<html>
<head>
    <link rel="stylesheet" href="/styles.css">
    <title>Hello world app</title>
</head>
<body>
    <h1>Hello world</h1>
    <script src="/index.js"></script>
</body>
</html>
<--Section-separator-->
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
body {
    font-family: Arial, sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
}
<--Section-separator-->
console.log('Hello world');
`


function generateResponseStream(prompt){
    return client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: codeSytemPrompt },
            { role: "user", content: prompt }
        ],
        stream: true
    });
}


module.exports = {
    improvePrompt,
    generateResponseStream
}