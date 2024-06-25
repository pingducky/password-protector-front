import {Center, Flex, Paper, PasswordInput, Title} from "@mantine/core";
import CustomizeButton from "../components/shared/CustomizeButton.tsx";
import {useNavigate, useLocation} from "react-router-dom";
import {useState} from "react";
import {resetPassword} from "../api/User.ts";

export default function ChangePassword() {
    const navigate = useNavigate();

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');

    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const [errorPassword, setErrorPassword] = useState<string | boolean>(false);
    const [errorConfirmPass, setErrorConfirmPass] = useState<string | boolean>(false);

    const [passwordChanged, setPasswordChanged] = useState(false);

    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const handleResetPass = () => {
        if (password.length <= 8) {
            setErrorPassword('Le mot de passe doit contenir au moins 8 caractères');
        }else if(!passRegex.test(password)){
            setErrorPassword(false);
            setErrorPassword('Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre');
        } else if (password !== confirmPass) {
            setErrorPassword(false);
            setErrorConfirmPass('Les mots de passe ne correspondent pas');
        } else {
            setErrorPassword(false);
            setErrorConfirmPass(false);

            resetPassword(token, password).then((response) => {
                if (response?.data.message == "Token expired") {
                    console.log('Token expiré veuillez recommencer votre demande de réinitialisation de mdp !');
                }else if (response?.data.message == "Error") {
                    console.log('Erreur !');
                }else {
                    console.log('Mot de passe modifié avec succès !');
                    setPasswordChanged(true);
                }
            });
        }
    }

    return (
        <Paper shadow="xl" radius="xl" withBorder p="xl">
            <Flex direction='column' align={Center}>
                {!passwordChanged ? (
                    // Render form if password has not been changed
                    <>
                        <Title order={2} lineClamp={2} mb={25}>Entrer votre nouveau mot de passe</Title>
                        <PasswordInput
                            label="Mot de passe"
                            placeholder="Mot de passe"
                            mb={25}
                            error={errorPassword}
                            value={password}
                            onChange={(event) => setPassword(event.currentTarget.value)}
                        />
                        <PasswordInput
                            label="Confirmation du mot de passe"
                            placeholder="Confirmation du mot de passe"
                            mb={25}
                            error={errorConfirmPass}
                            value={confirmPass}
                            onChange={(event) => setConfirmPass(event.currentTarget.value)}
                        />
                        <CustomizeButton text="Valider" type="button" onClick={handleResetPass}/>
                    </>
                ) : (
                    // Render success message and navigation button if password has been changed
                    <>
                        <Title order={2} lineClamp={2} mb={25}>Mot de passe modifié avec succès</Title>
                        <CustomizeButton text="Aller à la connexion" type="button" onClick={() => navigate('/login')}/>
                    </>
                )}
            </Flex>
        </Paper>
    )
}