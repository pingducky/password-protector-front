import { Button } from "@mantine/core";

type Button = {
    text: string,
    onClick?: () => void,
    type: 'button' | 'submit' | 'reset',
}

export default function CustomizeButton({ text, onClick, type }: Button) {
    return (
        <Button
            onClick={onClick}
            color="violet"
            type={type}
        >
            {text}
        </Button>
    );
}