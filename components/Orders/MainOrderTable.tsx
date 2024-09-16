'use client'

import { useState } from 'react';

//Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

//Icons
import { Edit, Trash2 } from 'lucide-react';


export default function MainOrderTable({ orders, onEdit, onDelete }: OrderTableProps) {
    const [editingOrder, setEditingOrder] = useState<MainOrder | null>(null)

    const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (editingOrder) {
            const formData = new FormData(e.currentTarget)
            const updatedOrder = {
                orderId: formData.get('orderId') as string,
                price: Number(formData.get('price')),
                status: formData.get('status') as MainOrder['status'],
            }
            onEdit(editingOrder.id, updatedOrder)
            setEditingOrder(null)
        }
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Items</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{order.orderId}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                {order.items.map((item, index) => (
                                    <div key={index}>{item.service} (x{item.quantity})</div>
                                ))}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">${order.price.toFixed(2)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${order.status === 'completed' ? 'bg-green-100 text-green-800' :
                                    order.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                                        order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                            'bg-gray-100 text-gray-800'
                                    }`}>
                                    {order.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="ghost" size="sm" className="mr-2" onClick={() => setEditingOrder(order)}>
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Edit Order</DialogTitle>
                                        </DialogHeader>
                                        <form onSubmit={handleEditSubmit} className="space-y-4">
                                            <div>
                                                <label htmlFor="orderId" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Order ID</label>
                                                <Input id="orderId" name="orderId" defaultValue={editingOrder?.orderId} />
                                            </div>
                                            <div>
                                                <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Price</label>
                                                <Input id="price" name="price" type="number" defaultValue={editingOrder?.price} />
                                            </div>
                                            <div>
                                                <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
                                                <Select name="status" defaultValue={editingOrder?.status}>
                                                    <option value="pending">Pending</option>
                                                    <option value="in_progress">In Progress</option>
                                                    <option value="completed">Completed</option>
                                                    <option value="cancelled">Cancelled</option>
                                                </Select>
                                            </div>
                                            <Button type="submit">Save Changes</Button>
                                        </form>
                                    </DialogContent>
                                </Dialog>
                                <Button variant="ghost" size="sm" onClick={() => onDelete(order.id)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}