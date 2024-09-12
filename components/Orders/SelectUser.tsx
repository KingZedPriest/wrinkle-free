'use client'

import { useState, useEffect } from 'react';

//Icons
import { ArrowSwapVertical } from 'iconsax-react';


export default function SelectUser({ users, onSelectUser, initialSelectedUserId }: SelectUserProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedUser, setSelectedUser] = useState<User | null>(null)

    useEffect(() => {
        if (initialSelectedUserId) {
            const initialUser = users.find(user => user.id === initialSelectedUserId)
            if (initialUser) {
                setSelectedUser(initialUser)
            }
        }
    }, [initialSelectedUserId, users])

    const handleSelectUser = (user: User) => {
        setSelectedUser(user)
        onSelectUser(user)
        setIsOpen(false)
    }

    const handleClearSelection = () => {
        setSelectedUser(null)
        onSelectUser(null)
        setIsOpen(false)
    }

    return (
        <div className="relative w-full max-w-xs">
            <button type="button"
                className="flex items-center justify-between w-full px-4 py-2 text-left bg-light-200 dark:bg-dark-300 border border-light-400 dark:border-dark-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-generalBlue"
                onClick={() => setIsOpen(!isOpen)}>
                <span className="block truncate">
                    {selectedUser ? selectedUser.name : 'Select a user'}
                </span>
                <ArrowSwapVertical className="w-5 h-5" />
            </button>

            {isOpen && (
                <ul className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-light-100 dark:bg-dark-200 border border-light-400 dark:border-dark-400 rounded-md shadow-lg max-h-60 focus:outline-none sm:text-sm">
                    {users.map((user) => (
                        <li key={user.id} className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-light-300 dark:hover:bg-dark-350" onClick={() => handleSelectUser(user)}>
                            {user.name}
                        </li>
                    ))}
                    <li className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-light-300 dark:hover:bg-dark-350 text-textRed" onClick={handleClearSelection}>
                        Clear selection
                    </li>
                </ul>
            )}
        </div>
    )
}