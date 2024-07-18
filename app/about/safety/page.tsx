'use client'

import { useState } from 'react'
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Textarea,
  Image,
} from '@nextui-org/react'
import AnimatedTitle from '@/components/about/AnimatedTitle'

const SafetyTip = ({ icon, title, description }) => (
  <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-xl transition-all duration-300 hover:shadow-2xl dark:from-blue-700 dark:to-purple-800">
    <CardHeader className="flex-col items-start px-4 pb-0 pt-2">
      <div className="mb-2 text-4xl">{icon}</div>
      <h3 className="text-xl font-bold">{title}</h3>
    </CardHeader>
    <CardBody>
      <p className="text-sm">{description}</p>
    </CardBody>
  </Card>
)

export default function SafetyPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const safetyTips = [
    // ... (이전과 동일한 safetyTips 배열)
  ]

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/safety-support', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, message }),
      })

      if (response.ok) {
        alert('메시지가 성공적으로 전송되었습니다.')
        setIsModalOpen(false)
      } else {
        alert('메시지 전송에 실패했습니다. 다시 시도해주세요.')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('오류가 발생했습니다. 다시 시도해주세요.')
    }
  }

  return (
    <div className="relative min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white">
      <Image
        src="/path/to/your/safety-background.jpg"
        alt="Safety Background"
        className="absolute inset-0 h-full w-full object-cover opacity-10"
      />
      <div className="container relative mx-auto px-4 py-16">
        <AnimatedTitle titleText="FOR YOUR SAFETY" />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {safetyTips.map((tip, index) => (
            <SafetyTip key={index} {...tip} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="mb-6 text-3xl font-bold">
            여러분의 안전이 우리의 최우선 가치입니다
          </h2>
          <p className="mx-auto mb-8 max-w-3xl text-lg leading-relaxed">
            mannazu는 여러분의 안전한 여행과 문화 교류를 위해 최선을 다하고
            있습니다. 하지만 개인의 주의와 안전 수칙 준수가 가장 중요합니다.
            도움이 필요할 때는 주저하지 말고 연락주시길 바랍니다.
          </p>
          <Button
            onPress={() => setIsModalOpen(true)}
            className="bg-gradient-to-r from-green-400 to-blue-500 font-bold text-white"
          >
            MANNAZU에 신고하기
          </Button>
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          backdrop="blur"
        >
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">
              mannazu에 신고하기
            </ModalHeader>
            <ModalBody>
              <Input
                label="답변받을 이메일"
                placeholder="이메일을 입력해주세요"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Textarea
                label="상황 설명"
                placeholder="상황을 설명해주세요"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onPress={() => setIsModalOpen(false)}
              >
                취소
              </Button>
              <Button color="primary" onPress={handleSubmit}>
                전송
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </div>
  )
}
