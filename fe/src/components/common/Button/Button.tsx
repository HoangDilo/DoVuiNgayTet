import { useState, useEffect } from "react";
import './Button.scss'

function Button({ label, type, onSubmit }: { label: string, type: string, onSubmit: () => void }) {

    return (
        <>
            <div className="Button-container">
                {/*<div className="Input-label">{label}</div>*/}
                <button>{label}</button>
            </div>
        </>
    )
}

export default Button