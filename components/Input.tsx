import { FieldValues, UseFormRegister, Path } from 'react-hook-form';

declare type InputProps<T extends FieldValues> = {
    type: string;
    placeholder?: string;
    label?: string;
    id?: string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    pattern?: string;
    title?: string;
    widthClass?: string;
    register: UseFormRegister<T>;
    name: Path<T>;
    required?: boolean;
    otherClass?: string;
};

const Input = <T extends FieldValues>({
    type,
    placeholder,
    label,
    id,
    value,
    onChange,
    pattern,
    title,
    widthClass = 'w-full',
    register,
    name,
    otherClass,
    required,
}: InputProps<T>) => {
    return (
        <main className="flex flex-col gap-y-1">
            <label className="cursor-pointer" htmlFor={id}>
                {label}
            </label>
            <input
                {...register!(name)}
                type={type}
                placeholder={placeholder}
                id={id}
                value={value}
                onChange={onChange}
                pattern={pattern}
                title={title}
                className={`bg-white dark:bg-black px-2 xl:px-4 py-3 duration-300 focus:border-slate-200 focus:dark:border-slate-800 focus:outline-none rounded-lg ${widthClass} ${otherClass}`}
                required={required}
            />
        </main>
    );
};


export default Input;
