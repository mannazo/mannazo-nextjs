'use client'

import React, {useEffect, useState} from 'react';
import axios from 'axios'
import { router } from 'next/client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function SettingsDeleteContent() {

  const { data: session, status } = useSession()
  const router = useRouter()
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [inputValue, setInputValue] = useState('');

  // const handleComplete = () => {
  //   setShowConfirmation(true);
  // };

  const handleComplete = () => {
    if (inputValue === '탈퇴하겠습니다') {
      setShowConfirmation(true);
    } else {
      alert('정확한 문구를 입력해주세요.');
    }
  };

  const handleConfirm = async (confirm: boolean) => {
    if (confirm) {
      try {
        // 탈퇴 로직 실행
        // await axios.delete(`https://192.168.0.184/user/${session.user.additionalInfo.serverUserId}`); // 적절한 API 엔드포인트로 수정
        await axios.delete(`https://mannazu.diligentp.com/user/${session.user.additionalInfo.serverUserId}`);
        console.log('사용자가 탈퇴하였습니다.');

        // 메인 페이지로 라우터 푸시
        // router.push('/');
      } catch (error) {
        console.error('Error deleting account:', error);
      }
    }
      setShowConfirmation(false);
  };

    return (
      <div className="flex flex-col items-center mt-8">
        <p className="text-center text-xl font-semibold mb-4">정확히 '탈퇴하겠습니다'를 입력해주세요</p>
        <input
          type="text"
          placeholder="탈퇴하겠습니다"
          className="border border-gray-300 px-4 py-2 rounded-lg mb-4"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md focus:outline-none"
          onClick={handleComplete}
        >
          확인
        </button>

        {showConfirmation && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <p className="text-xl font-semibold mb-4">정말 탈퇴하시겠습니까?</p>
              <div className="flex justify-center space-x-4">
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md focus:outline-none"
                  onClick={() => handleConfirm(true)}
                >
                  네
                </button>
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg shadow-md focus:outline-none"
                  onClick={() => handleConfirm(false)}
                >
                  아니오
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
}
