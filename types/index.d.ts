//For the button
declare type ButtonProps = {
    type: "submit" | "reset" | "button";
    text: string;
    loading: boolean;
    onClick?: () => void;
    classNames?: string;
};

//For the authentication Error message
declare type ErrorText = {
    message: string
}

//For the Admin
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