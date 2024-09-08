"use client"

import { toast } from "sonner";

//Libs
import { decryptPassword } from "@/lib/token";

//Icons
import { Ban, Copy, Trash2, Edit2 } from 'lucide-react';


const StaffTable = ({ admins }: { admins: Admin[] }) => {


    //Functions
    const handleCopy = async (textToCopy: string) => {
        try {
            await navigator.clipboard.writeText(textToCopy);
            toast.success("The admin Details was copied successfully")
        } catch (error) {
            toast.error("Couldn't copy, something went wrong. Try again later.")
            console.error("Failed to copy text: ", error);
        }
    };

    const handleSuspend = (id: string, type: string) => {

    }

    const handleDelete = (id: string) => {

    }

    const handleEdit = (id: string) => {
        // Implement edit functionality here
        console.log(`Editing admin ${id}`)
      }

    return (
        <main className="mt-10">
            <div className="overflow-x-auto">
                <table className="min-w-full bg-light-600 dark:bg-dark-600 shadow-md rounded-xl overflow-hidden">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th className="w-12 px-6 py-3 text-left text-xs font-medium uppercase">
                                Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                                Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                                Password
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                                Role
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {admins.map((admin, index) => (
                            <tr key={admin.id} className={`${index % 2 === 0 ? "bg-white dark:bg-black" : "bg-light-600 dark:bg-dark-600"} whitespace-nowrap`}>
                                <td className="px-6 py-4">
                                    <p>{admin.name}</p>
                                </td>
                                <td className="px-6 py-4">
                                    <p>{admin.email}</p>
                                </td>
                                <td className="px-6 py-4">
                                    <p>{decryptPassword(admin.encryptedPassword)}</p>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            ${admin.role === 'super_admin' ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' :
                                            admin.role === 'admin' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100' : ''}`}>
                                        {admin.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <button onClick={() => handleSuspend(admin.id, `${admin.suspended ? 'unsuspend' : 'suspend'}`)} className={`mr-2 ${admin.suspended ? 'text-red-600 dark:text-red-400' : 'text-yellow-600 dark:text-yellow-400'}`}
                                        title={admin.suspended ? 'Unsuspend' : 'Suspend'}>
                                        <Ban className="h-5 w-5" />
                                    </button>
                                    <button onClick={() => handleCopy(admin.email)} className="text-blue-600 dark:text-blue-400 mr-2"
                                        title="Copy Email">
                                        <Copy className="h-5 w-5" />
                                    </button>
                                    <button onClick={() => handleDelete(admin.id)} className="text-red-600 dark:text-red-400 mr-2"
                                        title="Delete User">
                                        <Trash2 className="h-5 w-5" />
                                    </button>
                                    <button onClick={() => handleEdit(admin.id)} className="text-green-600 dark:text-green-400"
                                        title="Edit User">
                                        <Edit2 className="h-5 w-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
}

export default StaffTable;