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
