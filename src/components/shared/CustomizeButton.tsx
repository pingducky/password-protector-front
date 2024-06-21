import {Button, ButtonVariant} from "@mantine/core";

type ButtonType = {
    text: string,
    type: 'button' | 'submit' | 'reset',
    variant?: ButtonVariant
    width?: string,
    onClick?: () => void,
}


export default function CustomizeButton(props: ButtonType) {
    return (
        <Button
            color="violet"
            m={10}
            type={props.type}
            variant={props.variant}
            w={props.width}
            onClick={props.onClick}
        >
            {props.text}
        </Button>
    );
}