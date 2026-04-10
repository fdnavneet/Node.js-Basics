import React from 'react'

const FullScreenLoader = ({text="Loading...."}) => {
  return (
    <div className="fixed inset-0 bg-white/30 backdrop-blur-md flex items-center justify-center z-50">
      <div className="bg-white/40 backdrop-blur-xl p-8 rounded-2xl shadow-2xl flex flex-col items-center gap-4">
        
        <div className="h-10 w-10 border-4 border-transparent border-t-indigo-500 border-r-purple-500 rounded-full animate-spin"></div>

        <p className="text-gray-700 font-medium animate-pulse">
          {text}
        </p>

      </div>
    </div>
  )
}

export default FullScreenLoader