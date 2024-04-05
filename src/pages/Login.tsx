import { Button, Container, PasswordInput, TextInput } from "@mantine/core";
import CustomizeButton from "../components/shared/CustomizeButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    const handleRedirectToForgottenPasswordPage = () => {
        navigate('/resetPassword');
    }

    const handleConnect = () => {
        
    }


    const [validEmail, setValidEmail] = useState(false);

    return (
        <>
            <Container color="red">
                {!validEmail && (<TextInput label="Email" placeholder="email" />)}
                {validEmail && (<PasswordInput label="Mot de passe" placeholder="mot de passe" />)}
                <br />
                <CustomizeButton onClick={handleConnect} text="Se connecter" />
                {validEmail && (<Button variant="transparent"
                    onClick={handleRedirectToForgottenPasswordPage}>Mot de passe oublié ?</Button>)}
            </Container>
        </>
    )
}
