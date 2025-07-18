import { useState } from "react";
import JSZip from "jszip";
import Input from "./components/Input"
import FullPageLoader from "./components/FullPageLoader";
import CodePreview from "./components/CodePreview";

function App() {
  const [loading, setLoading] = useState(false);
  const [htmlCode, setHtmlCode] = useState('');
  const [cssCode, setCssCode] = useState('');
  const [jsCode, setJsCode] = useState('');
  const [activeTab, setActiveTab] = useState('html');
  const [showDownloadButton, setShowDownloadButton] = useState(false);
  const [error, setError] = useState('');

  const handleInput = async (inputValue) => {
    setHtmlCode('');
    setCssCode('');
    setJsCode('');
    setActiveTab('html');
    setLoading(true);
    setError('');
    setShowDownloadButton(false);

    try {
      const BASE_URL = 'https://ai-code-editor-o0ek.onrender.com';
      const response = await fetch(`${BASE_URL}/generate-codes?prompt=${encodeURIComponent(inputValue)}`);
      
      if (!response.ok) {
        throw new Error('Failed to generate code');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      console.log('Response received, starting to read...');

      let output = '';
      setLoading(false);
      
      while(true){
        const { done, value } = await reader.read()
        if(done) break

        output += decoder.decode(value);

        const [html, css, js] = output.split('<--Section-separator-->');
        console.log('Received chunk:', output);

        if(html) setHtmlCode(html.trim());
        if(css) setCssCode(css.trim());
        if(js) setJsCode(js.trim());

        if(html && css && js) {
          setActiveTab('js');
        }else if(html && css) {
          setActiveTab('css');
        }else{
          setActiveTab('html');
        }
      }
      setShowDownloadButton(true);
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to generate code. Please try again.');
      setLoading(false);
    }
  }

  function downloadFile(){
    const zip = new JSZip();
    zip.file('index.html', htmlCode);
    zip.file('styles.css', cssCode);
    zip.file('index.js', jsCode);

    zip.generateAsync({ type: 'blob' })
      .then(function(content) {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(content);
        link.download = 'code.zip';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
  }

  const downloadButton = (
    <button 
      onClick={downloadFile} 
      className="cursor-pointer size-16 bg-blue-600 hover:bg-blue-700 transition-colors flex justify-center items-center rounded-full absolute bottom-6 right-6 z-10 shadow-lg"
      title="Download Code"
    >
      <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity="0.5" fillRule="evenodd" clipRule="evenodd" d="M3 14.25C3.41421 14.25 3.75 14.5858 3.75 15C3.75 16.4354 3.75159 17.4365 3.85315 18.1919C3.9518 18.9257 4.13225 19.3142 4.40901 19.591C4.68577 19.8678 5.07435 20.0482 5.80812 20.1469C6.56347 20.2484 7.56459 20.25 9 20.25H15C16.4354 20.25 17.4365 20.2484 18.1919 20.1469C18.9257 20.0482 19.3142 19.8678 19.591 19.591C19.8678 19.3142 20.0482 18.9257 20.1469 18.1919C20.2484 17.4365 20.25 16.4354 20.25 15C20.25 14.5858 20.5858 14.25 21 14.25C21.4142 14.25 21.75 14.5858 21.75 15V15.0549C21.75 16.4225 21.75 17.5248 21.6335 18.3918C21.5125 19.2919 21.2536 20.0497 20.6517 20.6516C20.0497 21.2536 19.2919 21.5125 18.3918 21.6335C17.5248 21.75 16.4225 21.75 15.0549 21.75H8.94513C7.57754 21.75 6.47522 21.75 5.60825 21.6335C4.70814 21.5125 3.95027 21.2536 3.34835 20.6517C2.74643 20.0497 2.48754 19.2919 2.36652 18.3918C2.24996 17.5248 2.24998 16.4225 2.25 15.0549C2.25 15.0366 2.25 15.0183 2.25 15C2.25 14.5858 2.58579 14.25 3 14.25Z" fill="#fff"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M12 16.75C12.2106 16.75 12.4114 16.6615 12.5535 16.5061L16.5535 12.1311C16.833 11.8254 16.8118 11.351 16.5061 11.0715C16.2004 10.792 15.726 10.8132 15.4465 11.1189L12.75 14.0682V3C12.75 2.58579 12.4142 2.25 12 2.25C11.5858 2.25 11.25 2.58579 11.25 3V14.0682L8.55353 11.1189C8.27403 10.8132 7.79963 10.792 7.49393 11.0715C7.18823 11.351 7.16698 11.8254 7.44648 12.1311L11.4465 16.5061C11.5886 16.6615 11.7894 16.75 12 16.75Z" fill="#fff"/>
      </svg>
    </button>
  )

  return (
    <div className="min-h-screen bg-[#0d1117] text-white flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-800 bg-[#161b22] px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 3V5M16 3V5M3 8H5M19 8H21M3 16H5M19 16H21M3 12H21M7 3H17M7 19H17M3 19V7C3 5.89543 3.89543 5 5 5H19C20.1046 5 21 5.89543 21 7V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h1 className="text-xl font-semibold">Code Generator</h1>
          </div>
          <div className="text-sm text-gray-400">
            Powered by AI
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Code Preview Area */}
        <div className="flex-1 relative">
          {loading && <FullPageLoader />}
          {error && (
            <div className="absolute top-4 left-4 right-4 z-20 bg-red-900/20 border border-red-500/50 rounded-lg p-4 text-red-300">
              {error}
            </div>
          )}
          <CodePreview
            options={{
              editorHeight: "calc(100vh - 280px)",
              showConsoleButton: true,
              theme: "dark"
            }}
            files={{
              'index.html': {
                code: htmlCode,
                active: activeTab === 'html'
              },
              'styles.css': {
                code: cssCode,
                active: activeTab === 'css'
              },
              'index.js': {
                code: jsCode,
                active: activeTab === 'js'
              }
            }}
          />
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-800 bg-[#161b22]">
          <Input cb={handleInput} />
        </div>
      </div>

      {/* Download Button */}
      {showDownloadButton && downloadButton}
    </div>
  )
}

export default App

