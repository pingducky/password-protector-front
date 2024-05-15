import { Button, ButtonVariant } from "@mantine/core";

type Button = {
    text: string,
    type: 'button' | 'submit' | 'reset',
    variant?: ButtonVariant
    width?: string,
    onClick?: () => void,
}


export default function CustomizeButton({ text, type, variant, width, onClick }: Button) {
    return (
        <Button
            color="violet"
            m={10}
            type={type}
            variant={variant}
            w={width}
            onClick={onClick}
        >
            {text}
        </Button>
    );
}