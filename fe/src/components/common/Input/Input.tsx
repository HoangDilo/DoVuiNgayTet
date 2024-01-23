import { useState, useEffect, KeyboardEvent } from "react";
import './Input.scss'

function Input({ value, label, type, icon, setData, onSubmit }: { value: string, label: string, type: string, icon: string, setData: (data: string) => void, onSubmit: () => void }) {
    const [internalType, setInternalType] = useState("")
    const [inputValue, setInputValue] = useState("")
    const [internalErrorMessage, setInternalErrorMessage] = useState("")

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key == "Enter") {
            onSubmit();
        }
    }

    useEffect(() => {
        setInternalType(type);
    }, [type])

    useEffect(() => {
        setData(inputValue);
    }, [inputValue])

    useEffect(() => {
        if (value) {
            setInputValue(value)
        }
    }, [value])

    return (
        <>
            <div className="Input-container">
                <div className="Input-label">{label}</div>
                <div className={`${icon}`}></div>
                <input 
                    type={internalType}
                    id={`input-${label}`}
                    className={`${icon && 'isIcon'} is${type}`}
                    placeholder={label}
                    onChange={(event) => setData(event.target.value)}
                    onKeyDown={(event) => handleKeyDown(event)}/>
            </div>
        </>
    )
}

export default Input