import React from "react"
import StyledButton from './styles';

function Button(props) {
    return (
        <StyledButton {...props}>{props.children}</StyledButton>
    )
}

export default Button