import { Container, Flex, Paper, PasswordInput, TextInput } from "@mantine/core";
import CustomizeButton from "../components/shared/CustomizeButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isEmailValidated, setIsEmailValidated] = useState(false);
    const [errorEmail, setErrorEmail] = useState<string | boolean>(false);
    const [errorPassword, setErrorPassword] = useState<string | boolean>(false);

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const passwordMinLenght = 8;

    const handleCheckEmail = () => {
        if (!emailRegex.test(email)) {
            setIsEmailValidated(false);
            setErrorEmail('Email invalide.');
        } else {
            // ici faire un fetch api pour vérifier si un compte est associé à un mail en BdD.
            if (true) { // un compte est associé au mail
                setIsEmailValidated(true);
                setErrorEmail(false);
            }
            else {
                setErrorEmail('Ouups, aucun compte associé à cette adresse email n\'existe.');
            }
        }
    }

    const handleCheckPassword = () => {
        if (password.length < passwordMinLenght) {
            setErrorPassword('Le format est invalide.');
        }
        // ici faire un fetch api pour vérifier si le mot de passse correspond à l'email en BdD.
    }

    const handleConnect = () => {
        if (!isEmailValidated) {
            handleCheckEmail();
        } else {
            handleCheckPassword();
        }
    }

    return (
        <Paper shadow="xl" radius="xl" withBorder p="xl">
            <Flex
                direction={'column'}
                justify="center"
                align="center"
            >
                {!isEmailValidated && (
                    <TextInput
                        label="Email"
                        placeholder="email"
                        onChange={(event) => setEmail(event.currentTarget.value.toLocaleLowerCase())}
                        w={'300px'}
                        error={errorEmail}
                    />)}

                {isEmailValidated && (
                    <Container>
                        <TextInput disabled={true} value={email} label="Email" placeholder="email" w={'300px'} mb={'15px'} />
                        <PasswordInput
                            label="Mot de passe"
                            placeholder="mot de passe"
                            w={'300px'}
                            error={errorPassword}
                            onChange={(event) => setPassword(event.currentTarget.value)}
                            mb={15}
                        />
                    </Container>
                )}
            </Flex>

            <Flex direction={"column"} align={"center"}>
                <CustomizeButton
                    variant="filled"
                    onClick={handleConnect}
                    text={!isEmailValidated ? "Suivant" : "Se connecter"}
                    type="button"
                    width="250"
                />

                {!isEmailValidated && (
                    <CustomizeButton
                        variant="transparent"
                        onClick={() => navigate('/register')}
                        text="Se créer un compte"
                        type="button"
                    />
                )}

            </Flex>

            {isEmailValidated && (
                <Container>
                    <CustomizeButton
                        variant="transparent"
                        onClick={() => setIsEmailValidated(false)}
                        text="Se connecter avec un compte différent"
                        type="button"
                    />
                    <CustomizeButton
                        variant="transparent"
                        onClick={() => navigate('/resetPassword')}
                        text="Mot de passe oublié ?"
                        type="button"
                    />
                </Container>
            )}
        </Paper>
    )
}
