import { Button } from "@mantine/core";
import { useState } from "react";

export default function Login() {
    const [counter, setCounter] = useState(0);

    const handleClickButton = () => {
        setCounter(counter + 1);
    }

    return (
        <div>
            <p>Le compteur est égale à {counter} </p>
            <Button onClick={handleClickButton}>Button</Button>;
        </div>
    );
}