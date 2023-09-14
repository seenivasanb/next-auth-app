import React, { InputHTMLAttributes, memo } from 'react'

type InputType = InputHTMLAttributes<HTMLInputElement>;

const Input = ({ name, ...rest }: InputType) => {
    return (
        <input
            className='py-2 px-4 mb-6 min-w-[300px] outline-purple-300'
            aria-label={name}
            name={name}
            {...rest}
        />
    )
}

export default memo(Input)