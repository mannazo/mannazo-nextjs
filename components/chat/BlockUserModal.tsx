'use client'

import { useState } from 'react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Checkbox,
  Textarea,
  Radio,
  RadioGroup,
} from '@nextui-org/react'

const BlockUserModal = ({ isOpen, onClose, onSubmit, userName }) => {
  const [reason, setReason] = useState('')
  const [additionalInfo, setAdditionalInfo] = useState('')

  const handleSubmit = () => {
    onSubmit({ reason, additionalInfo })
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalContent>
        <ModalHeader>Block User: {userName}</ModalHeader>
        <ModalBody>
          <p className="mb-2">Why do you want to block this user?</p>
          <RadioGroup value={reason} onValueChange={setReason} className="mb-4">
            <Radio value="inappropriate_behavior">Inappropriate behavior</Radio>
            <Radio value="spam">Spam or unwanted contact</Radio>
            <Radio value="harassment">Harassment</Radio>
            <Radio value="other">Other</Radio>
          </RadioGroup>
          Is there another Information that you want to inform?
          <Textarea
            label="Additional Information (Optional)"
            placeholder="Please provide any additional details..."
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
            className="mb-4"
          />
        </ModalBody>
        <ModalFooter>
          <Button color="default" variant="light" onPress={onClose}>
            Cancel
          </Button>
          <Button color="danger" onPress={handleSubmit}>
            Block User
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default BlockUserModal
