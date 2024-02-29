import './Button.scss'

function Button({ label, onSubmit }: { label: string, onSubmit: () => void }) {

    return (
        <>
            <div className="Button-container">
                {/*<div className="Input-label">{label}</div>*/}
                <button className="Buttonn" onClick={onSubmit}>{label}</button>
            </div>
        </>
    )
}

export default Button