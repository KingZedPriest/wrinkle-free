'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

//Icons
import { CloseSquare } from 'iconsax-react';

export default function EditDrawer({ isOpen, onClose, userId }: EditDrawerProps) {

  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 10, stiffness: 300 }}
        className="fixed inset-x-0 bottom-0 z-[3] bg-light-600 dark:bg-dark-600 border-2 border-slate-200 dark:border-slate-800 rounded-t-[2rem] shadow-lg"
        style={{ height: 400 }}>

          <div className="p-4 md:p-6 xl:p-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-base md:text-lg xl:text-xl font-semibold">Edit User</h2>
              <button onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                <CloseSquare size={30} className="text-textRed" variant='Bold' />
              </button>
            </div>
            <div className="w-16 h-1 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mb-4" />
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save Changes
              </button>
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}