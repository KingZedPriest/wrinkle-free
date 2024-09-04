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
    profilePicture?: string;
    role: string;
    suspended: boolean;
    createdAt: Date;
    updatedAt: Date;
}

//DownBar NavItem
declare type NavItem = {
    href: string;
    icon: React.ElementType;
    currentPath: string;
    label: string;
}