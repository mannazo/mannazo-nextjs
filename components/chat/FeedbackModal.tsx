'use client'

import { useState } from 'react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Textarea,
  Checkbox,
  Chip,
} from '@nextui-org/react'
import { Star } from 'lucide-react'

const StarRating = ({ rating, onRating }) => {
  return (
    <div className="flex justify-center">
      {[1, 2, 3, 4, 5].map((value) => (
        <Star
          key={value}
          size={40}
          fill={value <= rating ? 'gold' : 'none'}
          stroke={value <= rating ? 'gold' : 'currentColor'}
          className="mx-1 cursor-pointer"
          onClick={() => onRating(value)}
        />
      ))}
    </div>
  )
}

const FeedbackModal = ({ isOpen, onClose, onSubmit }) => {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [selectedTags, setSelectedTags] = useState([])

  const handleSubmit = () => {
    onSubmit({ rating, comment, isAnonymous, selectedTags })
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalContent>
        <ModalHeader className="flex flex-col items-center">
          Leave Feedback
        </ModalHeader>
        <ModalBody>
          <div className="mb-6">
            {/*단순 여백임*/}{' '}
            <StarRating rating={rating} onRating={setRating} />
          </div>

          <Textarea
            label="Comment"
            placeholder="Share your experience..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="mb-4"
          />

          <div className="mb-4">
            <p className="mb-2">Tags</p>
            {['Helpful', 'Funny', 'Knowledgeable', 'Patient', 'Creative'].map(
              (tag) => (
                <Chip
                  key={tag}
                  className="mb-2 mr-2"
                  onClick={() =>
                    setSelectedTags((prev) =>
                      prev.includes(tag)
                        ? prev.filter((t) => t !== tag)
                        : [...prev, tag]
                    )
                  }
                  color={selectedTags.includes(tag) ? 'primary' : 'default'}
                >
                  {tag}
                </Chip>
              )
            )}
          </div>

          <Checkbox isSelected={isAnonymous} onValueChange={setIsAnonymous}>
            Submit anonymously
          </Checkbox>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Cancel
          </Button>
          <Button color="primary" onPress={handleSubmit}>
            Submit Feedback
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default FeedbackModal
