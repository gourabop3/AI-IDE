# AI Code Generator

A modern web application that generates HTML, CSS, and JavaScript code using AI. Built with React, Node.js, and OpenAI's GPT-4.

## Features

- 🎨 Modern Cursor.com-like dark theme interface
- 🤖 AI-powered code generation using GPT-4
- 📱 Responsive design that works on all devices
- 💻 Real-time code preview with syntax highlighting
- 📦 Download generated code as a ZIP file
- ⚡ Streaming response for better UX

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- OpenAI API key

## Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-code-generator
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Set up environment variables**
   Create a `.env` file in the server directory:
   ```bash
   cd ../server
   echo "OPENAI_API_KEY=your_openai_api_key_here" > .env
   ```

## Running the Application

1. **Start the server** (in the server directory)
   ```bash
   cd server
   npm run dev
   ```
   The server will run on `http://localhost:3000`

2. **Start the client** (in the client directory)
   ```bash
   cd client
   npm run dev
   ```
   The client will run on `http://localhost:5173`

3. **Open your browser**
   Navigate to `http://localhost:5173` to use the application

## Usage

1. Type a description of the web app you want to create in the input field
2. Press Enter or click the send button
3. Watch as AI generates HTML, CSS, and JavaScript code in real-time
4. Preview the generated code in the built-in editor
5. Download the code as a ZIP file when ready

## Example Prompts

- "Create a modern todo app with drag and drop functionality"
- "Build a weather dashboard with current conditions and forecast"
- "Make a calculator with scientific functions"
- "Create a portfolio website with smooth animations"
- "Build a quiz app with multiple choice questions"

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── App.jsx         # Main app component
│   │   └── main.jsx        # App entry point
│   └── package.json
├── server/                 # Node.js backend
│   ├── utils/
│   │   └── ai.js          # AI integration
│   ├── index.js           # Express server
│   └── package.json
└── README.md
```

## Technologies Used

- **Frontend**: React, Vite, Tailwind CSS, Sandpack
- **Backend**: Node.js, Express, OpenAI API
- **Styling**: Tailwind CSS with custom dark theme
- **Code Preview**: Sandpack React

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License
