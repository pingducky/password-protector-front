import {Center, Flex, Paper, TextInput, Title} from "@mantine/core";
import CustomizeButton from "../../components/shared/CustomizeButton";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

export default function ResetPassword() {
    const navigate = useNavigate();
    const [errorEmail, setErrorEmail] = useState<string | boolean>(false);
    const [email, setEmail] = useState('');

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


    const handleClickResetEmail = () => {
        if (email.length <= 3 || !emailRegex.test(email)) {
            setErrorEmail('Le format de l\'email est invalide');
        }
    }

    return (
        <Paper shadow="xl" radius="xl" withBorder p="xl">
            <Flex direction='column' align={Center}>
                <Title order={2} lineClamp={2} mb={25}>Récupérer votre mot de passe</Title>
                <TextInput
                    label="Email"
                    placeholder="Email"
                    error={errorEmail}
                    mb={25}
                    onChange={(event) => setEmail(event.currentTarget.value)}
                />
                <CustomizeButton text="Récupérer mon mot de passe" type="button" onClick={handleClickResetEmail}/>
                <CustomizeButton
                    variant="transparent"
                    onClick={() => navigate('/login')}
                    text="Retour à l'espace de connexion"
                    type="button"
                />
            </Flex>
        </Paper>
    )
}