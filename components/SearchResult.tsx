"use client"

import { format } from 'date-fns';

//Components
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

type DataType = "user" | "admin" | "order" | null

type DataDialogProps = {
    data: User | Order | Admin | null
    type: DataType
}


export default function SearchResult({ data, type }: DataDialogProps) {

    const formatDate = (dateString: string) => {
        return format(new Date(dateString), 'PPP')
    }

    if (type === null) {
        return (
            <main className='h-dvh flex items-center justify-center'>
                <h1><p>No results found.</p></h1>
            </main>
        )
    }

    const renderContent = () => {
        switch (type) {
            case "user":
                const user = data as User
                return (
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-semibold">Name</h3>
                            <p>{user.name}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">Notes</h3>
                            <p>{user.notes}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">Orders</h3>
                            {user.order && user.order.map((order) => (
                                <div key={order.id} className="mt-2 space-y-2 border-t pt-2">
                                    <p><span className="font-medium">Order ID:</span> {order.orderId}</p>
                                    <p><span className="font-medium">Status:</span> <Badge>{order.status === "in_progress" ? "in progress" : order.status}</Badge></p>
                                    <p><span className="font-medium">Price:</span> ₦{order.price}</p>
                                    <p><span className="font-medium">Amount Paid:</span> ₦{order.amountPaid}</p>
                                    <p><span className="font-medium">Amount Remaining:</span> ₦{order.price - (order.amountPaid ?? 0)}</p>
                                    <p><span className="font-medium">Pickup Day:</span> {formatDate(order.pickupDay.toString())}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            case "order":
                const order = data as Order
                return (
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-semibold">Order ID</h3>
                            <p>{order.orderId}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">Status</h3>
                            <Badge>{order.status === "in_progress" ? "in progress" : order.status}</Badge>
                        </div>
                        <div>
                            <h3 className="font-semibold">Price</h3>
                            <p>₦{order.price}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">Amount Paid</h3>
                            <p className='text-red-600 dark:text-red-400'>₦{order.amountPaid}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">Amount Remaining</h3>
                            <p className='text-green-600 dark:text-green-400'>₦{order.price - (order.amountPaid ?? 0)}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">Pickup Day</h3>
                            <p>{formatDate(order.pickupDay.toString())}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">Admin</h3>
                            <p>{order.admin}</p>
                        </div>
                    </div>
                )
            case "admin":
                const staff = data as Admin
                return (
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-semibold">Name</h3>
                            <p>{staff.name}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">Email</h3>
                            <p>{staff.email}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">Role</h3>
                            <Badge variant={staff.role === 'super_admin' ? 'destructive' : 'default'}>
                                {staff.role === "super_admin" ? "super admin" : staff.role}
                            </Badge>
                        </div>
                        <div>
                            <h3 className="font-semibold">Status</h3>
                            <Badge variant={staff.suspended ? 'destructive' : 'success' as "default" | "destructive" | "outline" | "secondary"}>
                                {staff.suspended ? 'Suspended' : 'Active'}
                            </Badge>
                        </div>
                    </div>
                )
        }
    }

    return (
        <ScrollArea className="h-[400px] w-full rounded-md border p-4">
            {renderContent()}
        </ScrollArea>
    )
}