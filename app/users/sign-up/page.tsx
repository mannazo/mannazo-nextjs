'use client'

import React, { useEffect, useState } from 'react'
import { uploadImageToS3 } from '@/utils/aws/s3'
import { getServerSession } from "next-auth/next"


import axios from 'axios';
import { API_SERVER } from '@/constants/paths';

import { LANGUAGE, MBTI, NATIONALITY } from '@/constants/input-values';
import InterestsSelection from '@/components/users/sign-up/InterestsSelection'
import { authOptions } from '@/app/api/auth/auth'


export default function SignUpPage() {

  // const session = await getServerSession(authOptions)

  let user = {
    email: 'test@test.com',
    name: 'john doe',
  }


  const [userInfo, setUserInfo] = useState({
    email: user.email,
    name: user.name,
    nickname: '',
    nationality: '',
    language: '',
    introduction: '',
    city: '',
    gender: '',
    mbti: '',
    interests: [],
    birthday: '',
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreviewUrl('');
    }
  }, [selectedFile]);


  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const s3Url = await uploadImageToS3(selectedFile);

      const signUpData = {
        email: userInfo.email, // 이메일 입력 필드 추가 필요
        name: userInfo.name,
        nickname: userInfo.nickname, // 닉네임 입력 필드 추가 필요
        nationality: userInfo.nationality,
        language: userInfo.language,
        profileImage: s3Url,
        introduction: userInfo.introduction,
        city: userInfo.city, // 도시 입력 필드 추가 필요
        authority: "USER", // 기본값으로 설정
        gender: userInfo.gender, // 성별 입력 필드 추가 필요
        mbti: userInfo.mbti,
        interests: userInfo.interests.join(','), // 배열을 문자열로 변환
        birthday: userInfo.birthday,
        lastLoginAt: new Date().toISOString() // 현재 시간으로 설정
      };
      console.log(signUpData);
      const response = await axios.post('http://192.168.0.183:8080/user', signUpData);

      console.log(response.data);
      // 회원가입 성공 처리 (예: 로그인 페이지로 리다이렉트)
    } catch (error) {
      console.error('회원가입 중 오류 발생:', error);
      setError('회원가입 중 오류가 발생했습니다. 다시 시도해 주세요.');
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setPreviewUrl('');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign up for an account</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input type="text" name="name" id="name" required
                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                     onChange={handleChange} />
            </div>

            <div>
              <label htmlFor="nickname" className="block text-sm font-medium text-gray-700">Nickname</label>
              <input type="text" name="nickname" id="nickname" required
                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                     onChange={handleChange} />
            </div>

            <div>
              <label htmlFor="birthday"
                     className="block text-sm font-medium text-gray-700">Birthday</label>
              <input type="date" name="birthday" id="birthday" required
                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                     onChange={handleChange} />
            </div>

            <div>
              <label htmlFor="mbti" className="block text-sm font-medium text-gray-700">MBTI</label>
              <select name="mbti" id="mbti"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      onChange={handleChange}>
                {MBTI.map((value) => (
                  <option key={value} value={value}>{value}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="nationality"
                     className="block text-sm font-medium text-gray-700">Nationality</label>
              <select name="nationality" id="nationality"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      onChange={handleChange}>
                {NATIONALITY.map((value) => (
                  <option key={value} value={value}>{value}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="language"
                     className="block text-sm font-medium text-gray-700">Language</label>
              <select name="language" id="language"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      onChange={handleChange}>
                {LANGUAGE.map((value) => (
                  <option key={value} value={value}>{value}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Interests</label>
              <div className="mt-2 space-y-2">
                <InterestsSelection />
              </div>
            </div>

            <div>
              <label htmlFor="introduction"
                     className="block text-sm font-medium text-gray-700">Introduction</label>
              <textarea id="introduction" name="introduction" rows={3}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        onChange={handleChange}></textarea>
            </div>

            <div>
              <label htmlFor="profilePhoto" className="block text-sm font-medium text-gray-700">Profile
                Photo</label>
              <input
                id="profilePhoto"
                name="profilePhoto"
                type="file"
                accept="image/*"
                className="mt-1 block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-indigo-50 file:text-indigo-700
                  hover:file:bg-indigo-100"
                onChange={handleFileChange}
              />
            </div>

            {previewUrl && (
              <div className="mt-4 relative">
                <img
                  src={previewUrl}
                  alt="Profile preview"
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20"
                       fill="currentColor">
                    <path fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            )}

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div>
              <button type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Sign
                Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}