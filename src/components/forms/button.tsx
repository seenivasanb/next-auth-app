import React, { memo, ButtonHTMLAttributes, ComponentPropsWithoutRef } from 'react'

type ButtonType = ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ name, ...rest }: ButtonType) => {

    return (
        <button
            className="bg-purple-700 text-lg rounded-md font-bold text-white p-3 mb-6 min-w-[300px]"
            type="submit" {...rest}>
            {name}
        </button>

    )
}

export default memo(Button)