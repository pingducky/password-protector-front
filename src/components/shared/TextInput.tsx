import {Flex, Input, Text} from "@mantine/core";
import React, {useState} from "react";

const TextInput = (props: TextFieldProps) => {
    const [value, setValue] = useState(props.value);
    const [error, setError] = useState(false);
    const [requiredError, setRequiredError] = useState(false);

    const handleKeyDown = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value);

        if (props.isRequired) {
            setRequiredError(event.currentTarget.value === "");
        }

        if (props.error) {
            setError(props.error.errorFunction(event.currentTarget.value));
        }

        props.onChange(event);
    }

    return (
        <Flex direction={"column"} gap={"4px"}>
            <Flex gap={"4px"}>
                <Text>{props.label}</Text>
                <Text c={"red"} hidden={!props.isRequired}>*</Text>
            </Flex>

            <Input placeholder={props.placeholder} value={value} onChange={handleKeyDown}/>

            <Text c={"red"} hidden={!requiredError}>
                {props.label} est requis
            </Text>

            <Text c={"red"} hidden={!error}>
                {props.error ? props.error.errorMessage : ""}
            </Text>
        </Flex>
    )
}

export default TextInput;