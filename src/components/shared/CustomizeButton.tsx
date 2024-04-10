import { Button } from "@mantine/core";

type Button = {
    text: string,
    onClick?: () => void,
}

export default function CustomizeButton({ text, onClick }: Button) {
    return (
        <Button
            onClick={onClick}
            color="violet"
            m={10}
        >
            {text}
        </Button>
    );
}