'use client'

import { useState, useEffect } from 'react'

function ChatComponent() {
  const [data, setData] = useState([])

  useEffect(() => {
    const eventSource = new EventSource(
      'https://mannazu.diligentp.com/chat/roomId/1'
    )
    eventSource.onmessage = (event) => {
      const newData = JSON.parse(event.data)
      setData((prevData) => [...prevData, newData])
    }

    eventSource.onerror = (error) => {
      console.error('EventSource failed:', error)
      eventSource.close()
    }

    return () => {
      eventSource.close()
    }
  }, [])

  return (
    <div>
      {data.map((item, index) => (
        <div key={index}>{JSON.stringify(item)}</div>
      ))}
    </div>
  )
}

export default ChatComponent
