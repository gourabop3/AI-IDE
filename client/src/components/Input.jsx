import { useRef, useState } from 'react'

const Input = ({ cb }) => {
    const inputRef = useRef(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleClick = async () => {
        const inputValue = inputRef.current.value.trim()
        if (inputValue && !isLoading) {
            setIsLoading(true)
            await cb(inputValue)
            setIsLoading(false)
            inputRef.current.value = ''
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleClick()
        }
    }

    return (
        <div className='p-6'>
            <div className='bg-[#21262d] border border-gray-700 rounded-xl flex items-end p-4 hover:border-gray-600 transition-colors'>
                <textarea
                    ref={inputRef}
                    className='w-full bg-transparent outline-none resize-none text-gray-100 placeholder-gray-500 text-sm leading-relaxed'
                    placeholder='Describe the web app you want to create... (e.g., "Create a modern todo app with drag and drop functionality")'
                    rows="3"
                    onKeyPress={handleKeyPress}
                    disabled={isLoading}
                />
                <button 
                    onClick={handleClick}
                    disabled={isLoading}
                    className='ml-4 p-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg transition-colors flex items-center justify-center'
                >
                    {isLoading ? (
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    )}
                </button>
            </div>
            <div className="mt-3 text-xs text-gray-500">
                Press Enter to generate, Shift+Enter for new line
            </div>
        </div>
    )
}

export default Input