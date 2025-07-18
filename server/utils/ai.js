// import OpenAI from "openai";
const OpenAI = require("openai");

// Check if API key is available
const hasApiKey = process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'your_openai_api_key_here';
const client = hasApiKey ? new OpenAI() : null;

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
    if (!hasApiKey) {
        return prompt; // Return original prompt if no API key
    }
    
    const response = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: improvementPrompt },
            { role: "user", content: prompt }
        ]
    })

    return response.choices[0].message.content.trim();
}

const codeSystemPrompt = `
You are a professional frontend developer specializing in creating modern, responsive web applications.

Your job is to generate complete, working code based on the user's prompt. Follow these strict rules:

1. OUTPUT FORMAT: Only output exactly 3 sections separated by the comment: <--Section-separator-->
   - HTML section (complete HTML document)
   - CSS section (all styles)
   - JavaScript section (all scripts)

2. TECHNICAL REQUIREMENTS:
   - Use only plain HTML, CSS, and modern JavaScript (ES6+)
   - No frameworks like React, Vue, or Angular
   - Use semantic HTML5 elements
   - Use modern CSS features (Flexbox, Grid, CSS Variables)
   - Use external CDNs for libraries when needed (Font Awesome, Google Fonts, etc.)
   - Ensure the app is fully responsive and works on all devices

3. DESIGN REQUIREMENTS:
   - Create modern, clean, and professional designs
   - Use a consistent color scheme
   - Add proper spacing and typography
   - Include hover effects and smooth transitions
   - Make it visually appealing with good UX

4. FUNCTIONALITY:
   - Ensure all features mentioned in the prompt are implemented
   - Add proper error handling
   - Include loading states where appropriate
   - Make sure the app is fully functional

5. CODE QUALITY:
   - Write clean, well-commented code
   - Use meaningful variable and function names
   - Follow best practices for accessibility
   - Ensure the code is production-ready

DO NOT include any explanations, comments about the code, or additional text outside the 3 sections.
Only output the HTML, CSS, and JavaScript code separated by <--Section-separator-->.

Example format:
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>App Title</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <!-- HTML content -->
    <script src="index.js"></script>
</body>
</html>
<--Section-separator-->
/* CSS styles */
<--Section-separator-->
// JavaScript code
`

// Demo response for testing without API key
const demoResponse = `<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Modern Todo App</title>
    <link rel="stylesheet" href="styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
</head>
<body>
    <div class="container">
        <header class="header">
            <h1>My Tasks</h1>
            <p class="subtitle">Stay organized and productive</p>
        </header>
        
        <div class="todo-container">
            <div class="input-section">
                <input type="text" id="taskInput" placeholder="Add a new task..." class="task-input">
                <button id="addTask" class="add-btn">Add Task</button>
            </div>
            
            <div class="tasks-section">
                <div class="tasks-header">
                    <h2>Tasks (<span id="taskCount">0</span>)</h2>
                    <button id="clearCompleted" class="clear-btn">Clear Completed</button>
                </div>
                <ul id="taskList" class="task-list">
                    <!-- Tasks will be added here -->
                </ul>
            </div>
        </div>
    </div>
    <script src="index.js"></script>
</body>
</html>
<--Section-separator-->
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Inter', sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    color: #333;
}

.container {
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
}

.header {
    text-align: center;
    margin-bottom: 2rem;
}

.header h1 {
    font-size: 2.5rem;
    font-weight: 600;
    color: white;
    margin-bottom: 0.5rem;
}

.subtitle {
    color: rgba(255, 255, 255, 0.8);
    font-size: 1.1rem;
}

.todo-container {
    background: white;
    border-radius: 16px;
    padding: 2rem;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.input-section {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
}

.task-input {
    flex: 1;
    padding: 1rem;
    border: 2px solid #e1e5e9;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.3s ease;
}

.task-input:focus {
    outline: none;
    border-color: #667eea;
}

.add-btn {
    padding: 1rem 2rem;
    background: #667eea;
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.add-btn:hover {
    background: #5a6fd8;
}

.tasks-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

.tasks-header h2 {
    font-size: 1.5rem;
    font-weight: 600;
}

.clear-btn {
    padding: 0.5rem 1rem;
    background: #f8f9fa;
    border: 1px solid #e1e5e9;
    border-radius: 6px;
    color: #6c757d;
    cursor: pointer;
    transition: all 0.3s ease;
}

.clear-btn:hover {
    background: #e9ecef;
    color: #495057;
}

.task-list {
    list-style: none;
}

.task-item {
    display: flex;
    align-items: center;
    padding: 1rem;
    border: 1px solid #e1e5e9;
    border-radius: 8px;
    margin-bottom: 0.5rem;
    transition: all 0.3s ease;
}

.task-item:hover {
    border-color: #667eea;
    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.1);
}

.task-item.completed {
    opacity: 0.6;
    background: #f8f9fa;
}

.task-item.completed .task-text {
    text-decoration: line-through;
    color: #6c757d;
}

.task-checkbox {
    margin-right: 1rem;
    width: 20px;
    height: 20px;
    cursor: pointer;
}

.task-text {
    flex: 1;
    font-size: 1rem;
}

.delete-btn {
    padding: 0.5rem;
    background: #dc3545;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.delete-btn:hover {
    background: #c82333;
}

@media (max-width: 768px) {
    .container {
        padding: 1rem;
    }
    
    .todo-container {
        padding: 1.5rem;
    }
    
    .input-section {
        flex-direction: column;
    }
    
    .header h1 {
        font-size: 2rem;
    }
}
<--Section-separator-->
class TodoApp {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        this.init();
    }

    init() {
        this.taskInput = document.getElementById('taskInput');
        this.addTaskBtn = document.getElementById('addTask');
        this.taskList = document.getElementById('taskList');
        this.taskCount = document.getElementById('taskCount');
        this.clearCompletedBtn = document.getElementById('clearCompleted');

        this.bindEvents();
        this.renderTasks();
        this.updateTaskCount();
    }

    bindEvents() {
        this.addTaskBtn.addEventListener('click', () => this.addTask());
        this.taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTask();
        });
        this.clearCompletedBtn.addEventListener('click', () => this.clearCompleted());
    }

    addTask() {
        const text = this.taskInput.value.trim();
        if (!text) return;

        const task = {
            id: Date.now(),
            text: text,
            completed: false,
            createdAt: new Date()
        };

        this.tasks.push(task);
        this.saveTasks();
        this.renderTasks();
        this.updateTaskCount();
        this.taskInput.value = '';
        this.taskInput.focus();
    }

    toggleTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
            this.renderTasks();
            this.updateTaskCount();
        }
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(t => t.id !== id);
        this.saveTasks();
        this.renderTasks();
        this.updateTaskCount();
    }

    clearCompleted() {
        this.tasks = this.tasks.filter(t => !t.completed);
        this.saveTasks();
        this.renderTasks();
        this.updateTaskCount();
    }

    renderTasks() {
        this.taskList.innerHTML = '';
        
        this.tasks.forEach(task => {
            const li = document.createElement('li');
            li.className = \`task-item \${task.completed ? 'completed' : ''}\`;
            
            li.innerHTML = \`
                <input type="checkbox" class="task-checkbox" \${task.completed ? 'checked' : ''}>
                <span class="task-text">\${this.escapeHtml(task.text)}</span>
                <button class="delete-btn">×</button>
            \`;

            const checkbox = li.querySelector('.task-checkbox');
            const deleteBtn = li.querySelector('.delete-btn');

            checkbox.addEventListener('change', () => this.toggleTask(task.id));
            deleteBtn.addEventListener('click', () => this.deleteTask(task.id));

            this.taskList.appendChild(li);
        });
    }

    updateTaskCount() {
        const activeTasks = this.tasks.filter(t => !t.completed).length;
        this.taskCount.textContent = activeTasks;
    }

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TodoApp();
});
`;

function generateResponseStream(prompt){
    if (!hasApiKey) {
        // Return a demo response for testing
        return {
            async *[Symbol.asyncIterator]() {
                const chunks = demoResponse.split('');
                for (const chunk of chunks) {
                    yield {
                        choices: [{
                            delta: {
                                content: chunk
                            }
                        }]
                    };
                    // Simulate streaming delay
                    await new Promise(resolve => setTimeout(resolve, 10));
                }
            }
        };
    }
    
    return client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: codeSystemPrompt },
            { role: "user", content: prompt }
        ],
        stream: true,
        temperature: 0.7,
        max_tokens: 4000
    });
}

module.exports = {
    improvePrompt,
    generateResponseStream
}