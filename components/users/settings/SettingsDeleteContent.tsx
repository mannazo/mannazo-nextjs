'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { router } from 'next/client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function SettingsDeleteContent() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [inputValue, setInputValue] = useState('')

  // const handleComplete = () => {
  //   setShowConfirmation(true);
  // };

  const handleComplete = () => {
    if (inputValue === '탈퇴하겠습니다') {
      setShowConfirmation(true)
    } else {
      alert('정확한 문구를 입력해주세요.')
    }
  }

  const handleConfirm = async (confirm: boolean) => {
    if (confirm) {
      try {
        // 탈퇴 로직 실행
        // await axios.delete(`https://192.168.0.184/user/${session.user.additionalInfo.serverUserId}`); // 적절한 API 엔드포인트로 수정
        // await axios.delete(`https://mannazu.diligentp.com/user/${session.user.additionalInfo.serverUserId}`);
        await axios.delete(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/user/${session.user.additionalInfo.serverUserId}`
        )
        console.log('사용자가 탈퇴하였습니다.')

        // 메인 페이지로 라우터 푸시
        // router.push('/');
      } catch (error) {
        console.error('Error deleting account:', error)
      }
    }
    setShowConfirmation(false)
  }

  return (
    <div className="mt-8 flex flex-col items-center">
      <p className="mb-4 text-center text-xl font-semibold">
        정확히 '탈퇴하겠습니다'를 입력해주세요
      </p>
      <input
        type="text"
        placeholder="탈퇴하겠습니다"
        className="mb-4 rounded-lg border border-gray-300 px-4 py-2"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button
        className="rounded-lg bg-green-500 px-4 py-2 text-white shadow-md hover:bg-green-600 focus:outline-none"
        onClick={handleComplete}
      >
        확인
      </button>

      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="rounded-lg bg-white p-6 text-center shadow-lg">
            <p className="mb-4 text-xl font-semibold">정말 탈퇴하시겠습니까?</p>
            <div className="flex justify-center space-x-4">
              <button
                className="rounded-lg bg-red-500 px-4 py-2 text-white shadow-md hover:bg-red-600 focus:outline-none"
                onClick={() => handleConfirm(true)}
              >
                네
              </button>
              <button
                className="rounded-lg bg-gray-300 px-4 py-2 text-gray-800 shadow-md hover:bg-gray-400 focus:outline-none"
                onClick={() => handleConfirm(false)}
              >
                아니오
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
