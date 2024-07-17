'use client'

import { useState } from 'react'

export default function FileUploader() {
  const [file, setFile] = useState(null)
  const [uploadedFileName, setUploadedFileName] = useState(null)

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file) return

    // Get the signed URL from the API
    const response = await fetch('/api/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fileName: file.name,
        fileType: file.type,
      }),
    })

    const { url, fileName } = await response.json()

    // Upload the file directly to S3
    await fetch(url, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': file.type,
      },
    })

    setUploadedFileName(fileName)
    console.log(`File uploaded successfully as ${fileName}`)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Upload</button>
      {uploadedFileName && <p>Uploaded file name: {uploadedFileName}</p>}
    </form>
  )
}
