'use client'

import { useState } from 'react'

//Icons
import { Trash, Edit } from "iconsax-react";

const initialTransactions: Transaction[] = [
    { id: 'T001', totalClothes: 5, amount: 150, status: 'Completed' },
    { id: 'T002', totalClothes: 3, amount: 90, status: 'Pending' },
    { id: 'T003', totalClothes: 7, amount: 210, status: 'Completed' },
    { id: 'T004', totalClothes: 2, amount: 60, status: 'Cancelled' },
]

export default function TransactionTable() {
    const [orders, setOrders] = useState<Transaction[]>(initialTransactions)
    const [selectedIds, setSelectedIds] = useState<string[]>([])


    //Functions
    const handleSelect = (id: string) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        )
    }

    const handleDelete = (id: string) => {
        setOrders(prev => prev.filter(t => t.id !== id))
        setSelectedIds(prev => prev.filter(i => i !== id))
    }

    const handleEdit = (id: string) => {
        // Implement edit functionality here
        console.log(`Editing order ${id}`)
    }

    return (
        <div className="container mx-auto p-6">
            <div className="overflow-x-auto">
                <table className="min-w-full bg-light-600 dark:bg-dark-600 shadow-md rounded-xl overflow-hidden">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th className="w-12 px-6 py-3 text-left text-xs font-medium uppercase">
                                Select
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                                Transaction ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                                Total Clothes
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                                Amount
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-light-600 dark:bg-dark-600 divide-y divide-gray-200 dark:divide-gray-700">
                        {orders.map((order) => (
                            <tr key={order.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <input type="checkbox" checked={selectedIds.includes(order.id)} onChange={() => handleSelect(order.id)} className="form-checkbox h-4 w-4 text-generalBlue dark:text-cloudBlue" />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{order.id}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500 dark:text-gray-400">{order.totalClothes}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500 dark:text-gray-400">₦{order.amount}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${order.status === 'Completed' ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' :
                                            order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100' :
                                                'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button onClick={() => handleEdit(order.id)} className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-200 mr-4">
                                        <Edit className="h-5 w-5" />
                                    </button>
                                    <button onClick={() => handleDelete(order.id)} className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-200">
                                        <Trash className="h-5 w-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                Selected Transaction IDs: {selectedIds.join(', ')}
            </div>
        </div>
    )
}