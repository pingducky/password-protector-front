import {Flex, Paper, TextInput, Title} from "@mantine/core";
import CustomizeButton from "../../components/shared/CustomizeButton";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {resetPasswordSendMail} from "../../api/User.ts";

export default function ResetPassword() {
    const navigate = useNavigate();
    const [errorEmail, setErrorEmail] = useState<string | boolean>(false);
    const [email, setEmail] = useState('');

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const [message, setMessage] = useState("");

    const handleClickResetEmail = () => {
        if (email.length <= 3 || !emailRegex.test(email)) {
            setErrorEmail('Le format de l\'email est invalide');
        }else{
            resetPasswordSendMail(email).then((response) => {
            if(response?.status === 200){
                setMessage("Un email de récupération de mot de passe vous a été envoyé");
            }else{
                setMessage("Un email de récupération de mot de passe vous a été envoyé");
            }});
        }
    }

    return (
        <Paper shadow="xl" radius="xl" withBorder p="xl">
            <Flex direction='column' align={"center"}>
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
                <p>{message}</p>
            </Flex>
        </Paper>
    )
}