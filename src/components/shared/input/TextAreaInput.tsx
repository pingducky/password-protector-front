import {Flex, Text, Textarea} from "@mantine/core";
import React, {useState} from "react";

import styles from './TextAreaInput.module.scss';

const TextAreaInput = (props: InputProps) => {
    const [value, setValue] = useState(props.value);
    const [error, setError] = useState(false);
    const [requiredError, setRequiredError] = useState(false);

    const handleKeyDown = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(event.currentTarget.value);

        if (props.isRequired) {
            setRequiredError(event.currentTarget.value === "");
        }

        if (props.error) {
            setError(props.error.errorFunction(event.currentTarget.value));
        }

        props.onChange(event.target.value);
    }

    return (
        <Flex direction={"column"} gap={"4px"} h={"100%"}>
            <Flex gap={"4px"} h={"25px"}>
                <Text>{props.label}</Text>
                <Text c={"red"} hidden={!props.isRequired}>*</Text>
            </Flex>

            <Textarea className={styles.textarea} value={value} onChange={handleKeyDown} disabled={props.disabled}/>

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

export default TextAreaInput;