import {Flex, Select, Text} from "@mantine/core";
import {useState} from "react";

const TextAreaInput = (props: SelectInputProps) => {
    const [optionSelected, setOptionSelected] = useState(props.value);
    const [error, setError] = useState(false);

    const handleKeyDown = (value: string) => {
        setOptionSelected(value);

        if (props.error) {
            setError(props.error.errorFunction(value));
        }

        props.onChange(value);
    }

    return (
        <Flex direction={"column"} gap={"4px"}>
            <Flex gap={"4px"} h={"25px"}>
                <Text>{props.label}</Text>
                <Text c={"red"} hidden={!props.isRequired}>*</Text>
            </Flex>

            <Select value={optionSelected}
                    data={props.options}
                    onChange={(value) => handleKeyDown(value)}
                    disabled={props.disabled}/>

            <Flex h={"25px"}>
                <Text c={"red"} hidden={!error}>
                    {props.error ? props.error.errorMessage : ""}
                </Text>
            </Flex>
        </Flex>
    )
}

export default TextAreaInput;