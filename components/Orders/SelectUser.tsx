'use client'

import React, { useState, useEffect, useRef } from 'react';

//Icons
import { ChevronDown, ChevronUp } from 'lucide-react'

const AutocompleteInput = ({ users, onSelect }: AutocompleteInputProps) => {

    const [inputValue, setInputValue] = useState('')
    const [filteredUsers, setFilteredUsers] = useState<User[]>([])
    const [isOpen, setIsOpen] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(-1)
    const inputRef = useRef<HTMLInputElement>(null)
    const listRef = useRef<HTMLUListElement>(null)


    //Functions
    useEffect(() => {
        const filtered = users.filter(user =>
            user.name.toLowerCase().includes(inputValue.toLowerCase())
        )
        setFilteredUsers(filtered)
        setSelectedIndex(-1)
    }, [inputValue, users])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
        setIsOpen(true)
    }

    const handleSelectUser = (user: User) => {
        setInputValue(user.name)
        onSelect(user)
        setIsOpen(false)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault()
            setSelectedIndex(prev => (prev < filteredUsers.length - 1 ? prev + 1 : prev))
        } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev))
        } else if (e.key === 'Enter' && selectedIndex >= 0) {
            e.preventDefault()
            handleSelectUser(filteredUsers[selectedIndex])
        }
    }

    useEffect(() => {
        if (selectedIndex >= 0 && listRef.current) {
            const selectedElement = listRef.current.children[selectedIndex] as HTMLElement
            selectedElement.scrollIntoView({ block: 'nearest' })
        }
    }, [selectedIndex])

    return (
        <div className="relative w-full">
            <div className="relative">
                <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setIsOpen(true)}
                    className="bg-white dark:bg-black px-2 xl:px-4 py-3 duration-300 focus:border-slate-200 focus:dark:border-slate-800  focus:outline-none rounded-lg"
                    placeholder="Enter or select a customers name"
                />
                <button onClick={() => setIsOpen(!isOpen)} className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    aria-label={isOpen ? 'Close dropdown' : 'Open dropdown'}>
                    {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
            </div>
            {isOpen && (
                <ul ref={listRef}
                    className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                    {filteredUsers.map((user, index) => (
                        <li key={user.id} onClick={() => handleSelectUser(user)}
                            className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${index === selectedIndex ? 'bg-blue-100' : ''}`}>
                            {user.name}
                        </li>
                    ))}
                    {filteredUsers.length === 0 && (
                        <li className="px-4 py-2 text-gray-500">No users found</li>
                    )}
                </ul>
            )}
        </div>
    )
}

export default AutocompleteInput