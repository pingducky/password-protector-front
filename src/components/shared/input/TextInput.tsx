import {Flex, Input, Text} from "@mantine/core";
import React, {useState} from "react";
import styles from "./TextAreaInput.module.scss";

const TextInput = (props: TextInputProps) => {
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

        props.onChange(event.currentTarget.value);
    }

    return (
        <Flex direction={"column"} gap={"10px"}>
            <Flex gap={"4px"} h={"25px"}>
                <Text className={styles.label}>{props.label}</Text>
                <Text className={styles.label} c={"red"} hidden={!props.isRequired}>*</Text>
            </Flex>

            <Input placeholder={props.placeholder} value={value} onChange={handleKeyDown} disabled={props.disabled}/>

            <Flex h={"25px"}>
                <Flex c={"red"} gap={"4px"}>
                    <Text fs="italic" hidden={!requiredError}>
                        "{props.label}"
                    </Text>

                    <Text hidden={!requiredError}>
                        est requis
                    </Text>
                </Flex>

                <Text c={"red"} hidden={!error}>
                    {props.error ? props.error.errorMessage : ""}
                </Text>
            </Flex>
        </Flex>
    )
}

export default TextInput;