import {Flex, Image, Input, PasswordInput, Text} from "@mantine/core";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {connectUser} from "../../api/User.ts";
import styles from './Login.module.scss';

export default function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [errorUsername, setErrorUsername] = useState<string | boolean>(false);
    const [errorPassword, setErrorPassword] = useState<string | boolean>(false);

    // const passwordMinLenght = 8;

    const handleCheckPassword = () => {
        /*if (password.length < passwordMinLenght) {
            setErrorPassword('Le format est invalide.');
        }*/
        if (!username) {
            setErrorUsername('Identifiant requis.');
        } else if (!password) {
            setErrorUsername(false);
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
        <Flex w={"100%"} mih={"100vh"}>
            <Flex className={styles.loginImageBox}>
                <Flex w={"100%"} justify={"center"}>
                    <Image src="/assets/logo.png" className={styles.image}/>
                </Flex>

                <Flex className={styles.loginText}>
                    <Text className={styles.title}>Bienvenue sur Password Protector</Text>
                    <Text className={styles.subtitle}>Protégez vos mots de passe en toute sécurité</Text>
                </Flex>
            </Flex>

            <Flex className={styles.loginTextInput}>
                <Flex gap={"8px"}>
                    <Text className={styles.password}>Password</Text>
                    <Text className={styles.protector}>Protector</Text>
                </Flex>

                <div className={styles.textInputBox}>
                    <Flex direction={"column"} gap={"30px"}>
                        <Flex direction={"column"} p={"10px"} gap={"10px"}>
                            <Text className={styles.textReturn}>Bon retour</Text>
                            <Text className={styles.identifier}>Merci d’entrer vos identifiants</Text>
                        </Flex>

                        <Flex direction={"column"} gap={"20px"}>
                            <Flex direction={"column"} gap={"6px"}>
                                <Flex gap={"4px"}>
                                    <Text className={styles.label}>Identifiant</Text>
                                </Flex>

                                <Input placeholder={"Entrez votre identifiant"}
                                       onChange={(event) => setUsername(event.currentTarget.value)}
                                       error={errorUsername}
                                       w={"350px"}
                                />
                            </Flex>

                            <Flex direction={"column"} gap={"6px"}>
                                <Flex gap={"4px"}>
                                    <Text className={styles.label}>Mot de passe</Text>
                                </Flex>

                                <PasswordInput placeholder={"Entrez votre mot de passe"}
                                               onChange={(event) => setPassword(event.currentTarget.value)}
                                               error={errorPassword}
                                               w={"350px"}
                                />
                            </Flex>

                            <Text className={styles.forgot} onClick={() => navigate('/resetPassword')}>J'ai oublié mon
                                mot de
                                passe ?</Text>
                        </Flex>

                        <Flex direction={"column"} gap={"10px"}>
                            <Flex className={styles.button} onClick={handleConnect}>
                                <Text>Connexion</Text>
                            </Flex>

                            <Text className={styles.forgot} onClick={() => navigate('/register')}>Je n'ai pas de compte
                                ?</Text>
                        </Flex>

                    </Flex>

                    <div className={styles.copyright}>
                        <Flex gap={"3px"}>
                            <Text className={styles.copyrightText}>Copyright 2024</Text>
                            <Text className={styles.copyrightTextCompany}>AHV S.A.S</Text>
                        </Flex>

                        <Text className={styles.copyrightText}>Tout droit réservé</Text>
                    </div>
                </div>
            </Flex>
        </Flex>
    )
}
