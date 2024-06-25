import styles from '../../../pages/detail/DetailPanel.module.scss';
import {ActionIcon, Flex, Text} from "@mantine/core";
import ShareIcon from "../svg/ShareIcon.tsx";
import DeleteIcon from "../svg/DeleteIcon.tsx";
import Eye from "../svg/Eye.tsx";

function BasicLine(props: BasicLineProps) {
    return (
        <Flex gap={"16px"} w={"100%"}>
            <Flex gap={"8px"} className={styles.passwordList} w={"100%"}>
                <Flex direction={"column"} className={styles.textInputSize} gap={"2px"}>
                    <Text>Identifiant</Text>
                    <Text>{props.identifier}</Text>
                </Flex>

                <Flex direction={"column"} className={styles.textInputSize} gap={"2px"}>
                    <Text>Mot de passe</Text>
                    <Text>**********</Text>
                </Flex>
            </Flex>

            <Flex gap={"8px"}>
                <ActionIcon color={"violet"} disabled={!props.editable} onClick={props.setEditable}>
                    <Eye/>
                </ActionIcon>

                <ActionIcon color={"violet"} disabled={!props.editable}>
                    <ShareIcon/>
                </ActionIcon>

                <ActionIcon color={"red"} disabled={!props.editable}>
                    <DeleteIcon/>
                </ActionIcon>
            </Flex>
        </Flex>
    )
}

export default BasicLine;