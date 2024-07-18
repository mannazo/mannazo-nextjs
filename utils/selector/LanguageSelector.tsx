import React, { useState, useMemo } from 'react'
import {
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from '@nextui-org/react'
import Fuse from 'fuse.js'

const languages = [
  { name: 'English', major: true },
  { name: 'Korean', major: true },
  { name: 'Japanese', major: true },
  { name: 'Chinese', major: true },
  { name: 'Hindi', major: true },
  { name: 'Spanish', major: true },
  { name: 'French', major: true },
  { name: 'Arabic', major: true },
  { name: 'Bengali', major: true },
  { name: 'Russian', major: true },
  { name: 'Portuguese', major: true },
  { name: 'Urdu', major: false },
  { name: 'Basque', major: false },
  { name: 'Cherokee', major: false },
  { name: 'Catalan', major: false },
  { name: 'Welsh', major: false },
  { name: 'Maori', major: false },
  { name: 'Quechua', major: false },
  { name: 'Navajo', major: false },
  { name: 'Gaelic', major: false },
  { name: 'Swahili', major: false },
  { name: 'Yiddish', major: false },
  { name: 'Inuktitut', major: false },
  { name: 'Aymara', major: false },
  { name: 'Frisian', major: false },
  { name: 'Corsican', major: false },
  { name: 'Breton', major: false },
  { name: 'Faroese', major: false },
  { name: 'Esperanto', major: false },
  { name: 'Klingon', major: false },
  { name: 'Romani', major: false },
  { name: 'Luxembourgish', major: false },
  { name: 'Maltese', major: false },
  { name: 'Manx', major: false },
  { name: 'Sami', major: false },
]

interface LanguageSelectorProps {
  onChange: (event: { target: { name: string; value: string } }) => void
  name: string
  initialValue?: string
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  onChange,
  name,
  initialValue = '',
}) => {
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(
    initialValue ? initialValue.split(',') : []
  )
  const [searchQuery, setSearchQuery] = useState('')

  const fuse = useMemo(
    () =>
      new Fuse(languages, {
        keys: ['name'],
        threshold: 0.3,
      }),
    []
  )

  const searchResults = useMemo(() => {
    if (!searchQuery) return []
    return fuse.search(searchQuery).map((result) => result.item)
  }, [searchQuery])

  const majorLanguages = languages.filter((lang) => lang.major)

  const handleLanguageSelect = (langName: string) => {
    if (!selectedLanguages.includes(langName)) {
      const newSelectedLanguages = [...selectedLanguages, langName]
      setSelectedLanguages(newSelectedLanguages)
      onChange({ target: { name, value: newSelectedLanguages.join(',') } })
    }
    setSearchQuery('')
  }

  const handleLanguageRemove = (langName: string) => {
    const newSelectedLanguages = selectedLanguages.filter(
      (lang) => lang !== langName
    )
    setSelectedLanguages(newSelectedLanguages)
    onChange({ target: { name, value: newSelectedLanguages.join(',') } })
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault() // 폼 제출 방지
      if (searchResults.length > 0) {
        handleLanguageSelect(searchResults[0].name)
      }
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <Input
          placeholder="언어 검색..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Dropdown>
          <DropdownTrigger>
            <Button>주요 언어</Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="주요 언어 선택">
            {majorLanguages.map((lang) => (
              <DropdownItem
                key={lang.name}
                onClick={() => handleLanguageSelect(lang.name)}
              >
                {lang.name}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>

      {searchQuery && (
        <div className="rounded p-2">
          {searchResults.map((lang) => (
            <div
              key={lang.name}
              className="cursor-pointer p-1 hover:bg-gray-200"
              onClick={() => handleLanguageSelect(lang.name)}
            >
              {lang.name}
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {selectedLanguages.map((lang) => (
          <div key={lang} className="flex items-center rounded border p-2">
            {lang}
            <button
              onClick={() => handleLanguageRemove(lang)}
              className="ml-2 text-red-500"
            >
              ❌
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LanguageSelector
