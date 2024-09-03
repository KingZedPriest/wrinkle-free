

const ErrorText = ({message}: ErrorText) => {
    return ( 
        <p className="mt-1 text-red-600 dark:text-red-400 text-xs lg:text-sm text-center max-w-[50ch] mx-auto">{message}</p>
     );
}
 
export default ErrorText;