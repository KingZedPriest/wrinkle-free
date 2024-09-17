'use client'

import { useState } from 'react';
import Link from 'next/link';

//Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"

//Icons
import { Edit, Trash2 } from 'lucide-react';


export default function MainOrderTable({ orders, onEdit, onDelete }: OrderTableProps) {
    const [editingOrder, setEditingOrder] = useState<MainOrder | null>(null)

    const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (editingOrder) {
            const formData = new FormData(e.currentTarget)
            const updatedOrder = {
                price: Number(formData.get('price')),
                service: String(formData.get('service')),
                quantity: Number(formData.get('quantity')),
                status: formData.get('status') as MainOrder['status'],
            }
            onEdit(editingOrder.id, updatedOrder)
            setEditingOrder(null)
        }
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden mb-4">
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
                            <td className="px-6 py-4 whitespace-nowrap"><Link href={`/orders/${order.orderId}`}>{order.orderId}</Link></td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {order.items.map((item, index) => (
                                    <div key={index}>{item.service} (x{item.quantity})</div>
                                ))}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">₦{order.price.toFixed(2)}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${order.status === 'completed' ? 'bg-green-100 text-green-800' :
                                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                        order.status === 'cancelled' ? 'bg-red-100 text-red-800' : order.status === "in_progress" ? "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100" :
                                            'bg-gray-100 text-gray-800'
                                    }`}>
                                    {order.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="secondary" size="sm" className="mr-2" onClick={() => setEditingOrder(order)}>
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent aria-describedby="edit-order-description">
                                        <DialogHeader>
                                            <DialogTitle>Edit Order</DialogTitle>
                                            <DialogDescription>
                                                Make changes to the order details below. Click save when you&apos;re done.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <p id="edit-order-description" className="sr-only">Edit the selected order&apos;s details.</p>
                                        <form onSubmit={handleEditSubmit} className="space-y-4">
                                            <div>
                                                <label htmlFor="price" className="block">Price</label>
                                                <Input pattern="^\d*\.?\d*$"
                                                    title="Please enter a positive number." id="price" name="price" type="number" defaultValue={editingOrder?.price} />
                                            </div>
                                            <div>
                                                <label htmlFor="service" className="block">Service</label>
                                                <Input id="service" name="service" type="text" defaultValue={editingOrder?.items[0].service} />
                                            </div>
                                            <div>
                                                <label htmlFor="quantity" className="block">Quantity</label>
                                                <Input pattern="^\d*\.?\d*$"
                                                    title="Please enter a positive number." id="quantity" name="quantity" type="number" defaultValue={editingOrder?.items[0].quantity} />
                                            </div>
                                            <Select name="status" defaultValue={editingOrder?.status}>
                                                <SelectTrigger>Status</SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="pending">Pending</SelectItem>
                                                    <SelectItem value="in_progress">In Progress</SelectItem>
                                                    <SelectItem value="completed">Completed</SelectItem>
                                                    <SelectItem value="cancelled">Completed</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <Button type="submit">Save Changes</Button>
                                        </form>
                                    </DialogContent>
                                </Dialog>
                                <Button variant="destructive" size="sm" onClick={() => onDelete(order.orderId)}>
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