import { Button, Container, Flex, PasswordInput, TextInput } from "@mantine/core";
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

    const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

    const passwordMinLenght = 8;

    const handleRedirectToForgottenPasswordPage = () => {
        navigate('/resetPassword');
    }

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
        <>
            <Container color="red">
                <Flex
                    direction={'column'}
                    justify="center"
                    align="center"
                >
                    {!isEmailValidated && (<TextInput label="Email" placeholder="email" onChange={(event) => setEmail(event.currentTarget.value.toLocaleLowerCase())} w={'300px'} error={errorEmail} />)}
                    {isEmailValidated && (
                        <Container>
                            <TextInput disabled={true} value={email} label="Email" placeholder="email" w={'300px'} mb={'15px'} />
                            <PasswordInput
                                label="Mot de passe"
                                placeholder="mot de passe"
                                w={'300px'}
                                error={errorPassword}
                                onChange={(event) => setPassword(event.currentTarget.value)}
                            />
                        </Container>
                    )}
                    <CustomizeButton onClick={handleConnect} text={isEmailValidated ? 'Se connecter' : 'Suivant'} />
                </Flex>
                <br />
                {isEmailValidated && (
                    <Container mt={20}>
                        <Button variant="transparent" onClick={handleRedirectToForgottenPasswordPage} mr={15}>Mot de passe oublié ?</Button>
                        <Button variant="transparent" onClick={() => setIsEmailValidated(false)}>Se connecter avec un compte différent ?</Button>
                    </Container>
                )}
            </Container>
        </>
    )
}
