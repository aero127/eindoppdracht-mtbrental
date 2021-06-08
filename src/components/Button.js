function Button({disabled, text}) {
    return (<button type="button" disabled={disabled} onClick={() => console.log(text)}>{text}</button>)
}
export default Button;