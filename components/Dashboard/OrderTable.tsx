'use client'

import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';

//Server Actions
import { deleteOrder } from '@/actions/server/deleteOrder';
import { deleteSelectedOrders } from '@/actions/server/deleteOrders';

//Icons
import { Trash, Edit } from "iconsax-react";

export default function OrderTable({ initialOrders, role }: { initialOrders: Order[], role: string }) {

    const [selectedIds, setSelectedIds] = useState<string[]>([])


    //Functions
    const handleSelect = (id: string) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        )
    }

    const handleDelete = async (orderId: string) => {
        toast.message("Deleting...")
        const { success, message } = await deleteOrder(orderId)
        if (success) {
            toast.success(message);
            window.location.reload()
        } else {
            toast.error("Order could not be deleted, kindly try again later");
            window.location.reload()
        }
    }

    const handleMultipleDelete = async (orderIds: string[]) => {
        toast.message("Deleting Orders...")
        const { success, message } = await deleteSelectedOrders(orderIds)
        if (success) {
            toast.success(message);
            window.location.reload()
        } else {
            toast.error("The orders could not be deleted, kindly try again later");
            window.location.reload()
        }
    }

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-light-600 dark:bg-dark-600 shadow-md rounded-xl overflow-hidden mb-4">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th className="w-12 px-6 py-3 text-left text-xs font-medium uppercase">
                                Select
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                                IDs
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                                Items
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                                Price
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {initialOrders.map((order, index) => (
                            <tr key={order.id} className={`${index % 2 === 0 ? "bg-white dark:bg-black" : "bg-light-600 dark:bg-dark-600"} whitespace-nowrap`}>
                                <td className="px-6 py-4">
                                    <input type="checkbox" checked={selectedIds.includes(order.orderId)} onChange={() => handleSelect(order.orderId)} className="h-4 w-4 text-generalBlue dark:text-cloudBlue cursor-pointer" />
                                </td>
                                <td className="px-6 py-4"><Link href={`/orders/${order.orderId}`}>{order.orderId}</Link>
                                </td>
                                <td className="px-6 py-4">
                                    <p>{order.items[0].quantity}</p>
                                </td>
                                <td className="px-6 py-4">
                                    <Link href={`/orders/transactions/${order.orderId}`}><p className='text-black dark:text-white font-semibold inline'>₦{order.price}</p><sup className='text-textRed'>-{order.amountPaid}</sup></Link>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            ${order.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' :
                                            order.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100' :
                                                order.status === "in_progress" ? "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100" : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'}`}>
                                        {order.status === "in_progress" ? "in progress" : order.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 flex items-center">
                                    <Link href={`/orders/${order.orderId}`} className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-200 mr-4">
                                        <Edit className="h-5 w-5" />
                                    </Link>
                                    {role === "super_admin" &&
                                        <button onClick={() => handleDelete(order.orderId)} className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-200">
                                            <Trash className="h-5 w-5" />
                                        </button>
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {selectedIds.length > 0 &&
                <div className="flex justify-between mt-6">
                    <p>Selected Transaction IDs: {selectedIds.join(', ')}</p>
                    {role === "super_admin" &&
                        <div className="bg-red-600 dark:bg-red-400 hover:bg-red-900 dark:hover:bg-red-200 flex items-center gap-x-5 text-white dark:text-black p-3 rounded-[2rem] cursor-pointer" onClick={() => handleMultipleDelete(selectedIds)}>
                            <p>Delete Item(s)</p>
                            <Trash className="h- w-7" />
                        </div>
                    }
                </div>
            }
        </div>
    )
}