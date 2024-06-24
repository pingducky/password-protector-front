import { Flex, Paper, PasswordInput, TextInput, Title } from "@mantine/core";
import CustomizeButton from "../components/shared/CustomizeButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import { connectUser } from "../api/User.ts";

export default function Login() {

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [errorUsername, seterrorUsername] = useState<string | boolean>(false);
    const [errorPassword, setErrorPassword] = useState<string | boolean>(false);

    // const passwordMinLenght = 8;

    const handleCheckPassword = () => {
        /*if (password.length < passwordMinLenght) {
            setErrorPassword('Le format est invalide.');
        }*/
        if (!username) {
            seterrorUsername('Identifiant requis.');
        } else if (!password) {
            seterrorUsername(false);
            setErrorPassword('Mot de passe requis.');
        } else {
            setErrorPassword(false);
            connectUser(username, password).then((response) => {
                if (response.status === 200) {
                    localStorage.setItem('username', username);
                    navigate('/dashboard')
                } else {
                    setErrorPassword('Identifiant ou mot de passe incorrect.');
                }
            });
        }
    }

    const handleConnect = () => {
        handleCheckPassword();
    }

    return (
        <Paper shadow="xl" radius="xl" withBorder p="xl">
            <Navbar />
            <Flex direction={'column'} justify="center" align="center">
                <Title id='connexionSpace' order={2} lineClamp={2} mb={25}>Espace de connexion</Title>
                <TextInput
                    label="Identifiant"
                    placeholder="Identifiant"
                    onChange={(event) => setUsername(event.currentTarget.value.toLocaleLowerCase())}
                    w={'300px'}
                    error={errorUsername}
                    id="username"
                />

                <PasswordInput
                    label="Mot de passe"
                    placeholder="Mot de passe"
                    w={'300px'}
                    error={errorPassword}
                    onChange={(event) => setPassword(event.currentTarget.value)}
                    mb={15}
                    id="password"
                />
            </Flex>

            <Flex direction={"column"} align={"center"}>
                <CustomizeButton
                    variant="filled"
                    onClick={handleConnect}
                    text={"Se connecter"}
                    type="button"
                    width="250"
                />

                <CustomizeButton
                    id="createAccountButton"
                    variant="transparent"
                    onClick={() => navigate('/register')}
                    text="Créer un compte"
                    type="button"
                />

                <CustomizeButton
                    id="resetPasswordButton"
                    variant="transparent"
                    onClick={() => navigate('/resetPassword')}
                    text="Mot de passe oublié ?"
                    type="button"
                />
            </Flex>
        </Paper>
    )
}
