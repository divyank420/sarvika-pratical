import React from 'react'
import clsx from 'clsx'


type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'secondary' | 'ghost' | 'rose'
}


export const Button: React.FC<ButtonProps> = ({ variant = 'primary', className, children, ...props }) => {
    const base = 'inline-flex items-center justify-center rounded-lg px-4 py-1.5 text-sm font-medium shadow-sm transition active:scale-[.98] disabled:opacity-50'
    const styles: Record<NonNullable<ButtonProps['variant']>, string> = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600',
        secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100',
        rose: 'bg-rose-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100',
        ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 dark:text-gray-200',
    }


    return (
        <button className={clsx(base, styles[variant], className)} {...props}>
            {children}
        </button>
    )
}