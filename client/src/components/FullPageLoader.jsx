import React from 'react'

const FullPageLoader = () => {
  return (
    <div className="absolute inset-0 bg-[#0d1117]/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#161b22] border border-gray-700 rounded-xl p-8 flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-gray-700 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-100 mb-2">Generating Code</h3>
          <p className="text-sm text-gray-400">AI is creating your web application...</p>
        </div>
      </div>
    </div>
  )
}

export default FullPageLoader