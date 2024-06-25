import {ActionIcon, Flex} from "@mantine/core";
import styles from "../../../pages/detail/DetailPanel.module.scss";
import TextField from "../input/TextInput.tsx";
import TextInput from "../input/TextInput.tsx";
import CheckIcon from "../svg/CheckIcon.tsx";

function EditLine(props: EditLineProps) {
    return (
        <Flex gap={"16px"} w={"100%"}>
            <Flex gap={"8px"} w={"100%"}>
                <div className={styles.textInputSize}>
                    <TextField label={"Identifiant"} placeholder={"Entrez l'identifiant"}
                               value={props.identifier}
                               isRequired={true}
                               onChange={props.setIdentifier}>
                    </TextField>
                </div>

                <div className={styles.textInputSize}>
                    <TextInput label={"Mot de passe"} placeholder={"Entrez le mot de passe"}
                               value={props.password}
                               isRequired={true}
                               onChange={props.setPassword}>
                    </TextInput>
                </div>
            </Flex>

            <Flex gap={"8px"}>
                <ActionIcon color={"green"} onClick={props.savePassword}>
                    <CheckIcon/>
                </ActionIcon>
            </Flex>
        </Flex>
    )
}

export default EditLine