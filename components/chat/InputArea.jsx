import { useState } from 'react'
import { PaperAirplaneIcon } from '@heroicons/react/24/outline'

const InputArea = ({ onSendMessage, className }) => {
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (message.trim()) {
      onSendMessage(message)
      setMessage('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`flex items-center ${className}`}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type Message here!"
        className="flex-grow rounded-l-lg border-2 border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
      />
      <button
        type="submit"
        className="rounded-r-lg bg-blue-500 p-2 text-white transition duration-300 hover:bg-blue-600"
      >
        <PaperAirplaneIcon className="h-full w-7" />
      </button>
    </form>
  )
}

export default InputArea
