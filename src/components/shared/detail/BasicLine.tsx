import styles from '../../../pages/detail/DetailPanel.module.scss';
import {ActionIcon, Dialog, Flex, Text, TextInput} from "@mantine/core";
import ShareIcon from "../svg/ShareIcon.tsx";
import DeleteIcon from "../svg/DeleteIcon.tsx";
import Eye from "../svg/Eye.tsx";
import {useState} from "react";
import CustomizeButton from "../CustomizeButton.tsx";
import {sendSharePasswordEmail} from "../../../api/DetailPanel.ts";

function BasicLine(props: BasicLineProps) {

    const [dialogOpened, setDialogOpened] = useState(false);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const handleShareClick = () => {
        setDialogOpened(true);
    };

    const handleDialogClose = () => {
        setDialogOpened(false);
    };

    const handleEmailSubmit = () => {
        if(email != '' || email != null) {
            sendSharePasswordEmail(email, localStorage.getItem('username'), props.id).then(
                (response) => {
                    console.log(response + response.data);
                }
            );
        }else{
            setEmailError('Veuillez renseigner un email')
        }
        handleDialogClose();
        setEmail('');
    };

    return (
        <Flex gap={"16px"} w={"100%"}>
            <Flex gap={"8px"} className={styles.passwordList}>
                <Flex direction={"column"} className={styles.textInputSize}>
                    <Text>Identifiant</Text>
                    <Text>{props.identifier}</Text>
                </Flex>

                <Flex direction={"column"} className={styles.textInputSize}>
                    <Text>Mot de passe</Text>
                    <Text>**********</Text>
                </Flex>
            </Flex>

            <Flex gap={"8px"}>
                <ActionIcon color={"violet"} disabled={!props.editable}>
                    <Eye/>
                </ActionIcon>

                <ActionIcon color={"violet"} disabled={!props.editable}  onClick={handleShareClick}>
                    <ShareIcon/>
                </ActionIcon>

                <ActionIcon color={"red"} disabled={!props.editable}>
                    <DeleteIcon/>
                </ActionIcon>
            </Flex>

            <Dialog
                opened={dialogOpened}
                onClose={handleDialogClose}
                title="Share"
                size="xl"
            >
                <TextInput
                    label="Email de l'utilisateur receveur"
                    placeholder="Enter email"
                    value={email}
                    error={emailError}
                    onChange={(event) => setEmail(event.currentTarget.value)}
                />
                <Flex gap={"8px"}>
                    <CustomizeButton type={"button"} text={"Envoyer"} onClick={handleEmailSubmit}/>
                    <CustomizeButton type={"button"} text={"Fermer"} onClick={handleDialogClose}/>
                </Flex>
            </Dialog>
        </Flex>

    )
}

export default BasicLine;