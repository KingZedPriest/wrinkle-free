//Button
declare type ButtonProps = {
    type: "submit" | "reset" | "button";
    text: string;
    loading: boolean;
    onClick?: () => void;
    classNames?: string;
};

//Auth Error message
declare type ErrorText = {
    message: string
}

//Admin
declare type Admin = {
    id: string;
    email: string;
    hashedPassword: string;
    encryptedPassword: string;
    name: string;
    profilePicture: string | null;
    role: "super_admin" | "admin";
    suspended: boolean;
    createdAt: Date | string;
    updatedAt: Date | string;
}

//DownBar and SideBar NavItem
declare type NavItem = {
    href: string;
    icon: React.ElementType;
    currentPath: string;
    label: string;
}

//Dashboard Summary Box
declare type SummaryProps = {
    title: string;
    icon: React.ElementType;
    color: string;
    amount: number;
    icon1: React.ElementType;
    percent: number;
}

//Order Table
declare type Transaction = {
    id: string;
    totalClothes: number;
    amount: number;
    status: 'Pending' | 'Completed' | 'Cancelled';
}

//New User
declare type newDetails = {
    name: string;
    email: string;
    encryptedPassword: string;
    toggleFunction: () => void;
}