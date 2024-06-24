import {Formik} from "formik";
import {Box, Paper, PasswordInput, TextInput, Title} from "@mantine/core";
import CustomizeButton from "../components/shared/CustomizeButton.tsx";
import {useNavigate} from "react-router-dom";
import PasswordStrengthBar from 'react-password-strength-bar';
import Navbar from "../components/shared/Navbar.tsx";
import {registerUser} from "../api/User.ts";

export default function Register() {

    const navigate = useNavigate();

    interface IRegisterFormValues {
        email: string;
        firstname: string;
        lastname: string;
        username: string;
        password: string;
        confirm?: string;
    }

    const validate = (values: IRegisterFormValues) => {
        const errors: Partial<IRegisterFormValues> = {};

        // Regex pour le mot de passe 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial et 8 caractères minimum
        const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        // Regex pour l'email
        const emailRegex  = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

        // Vérification de l'email
        if (!values.email) errors.email = 'Adresse email requise';
        else if (values.email.length !== 0 && !emailRegex.test(values.email)) {
            errors.email = 'Adresse email invalide';
        }

        // Vérification des champs username, lastname et firstname
        if (!values.username) errors.username = 'Identifiant requis';
        if (!values.lastname) errors.lastname = 'Nom requis';
        if (!values.firstname) errors.firstname = 'Prénom requis';

        // Vérification des mots de passe
        if (!values.password) errors.password = 'Mot de passe requis';
        else if (values.password.length < 8) errors.password = 'Le mot de passe doit contenir au minimum 8 caractères'
        else if (!passRegex.test(values.password)) errors.password = 'Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial';

        if (!values.confirm) errors.confirm = 'Confirmation requise';
        else if (values.password !== values.confirm && values.confirm) errors.confirm = 'Les mots de passe ne correspondent pas';

        // TODO : Ajouter des conditions de validation pour le mot de passe dans le back

        return errors;
    }

    return (
        <div>
            <Navbar/>
            <Paper shadow="xl" radius="xl" withBorder p="xl">
                <Title order={2} lineClamp={2} mb={25}>Espace d'inscription</Title>
                <Formik
                    initialValues={{
                        username: '',
                        password: '',
                        confirm: '',
                        lastname: '',
                        firstname: '',
                        email: ''
                    }}
                    validate={validate}
                    onSubmit={(values: IRegisterFormValues, {setSubmitting, setErrors}) => {

                        // delete values.confirm;
                        setSubmitting(false);

                        // Redirection vers la page de connexion si l'inscription est réussie
                        registerUser(values.firstname, values.lastname, values.username, values.email, values.password).then((response) => {
                            if(response.data.message == "Email already exists"){
                                setErrors({email: "L'email est déjà utilisé"});
                            }else if(response.data.message == "Username already exists"){
                                setErrors({username: "L'identifiant est déjà utilisé"});
                            }else if(response.data.message == "Saved"){
                                navigate('/login');
                            }
                        });

                    }}
                >
                    {({
                          values,
                          errors,
                          touched,
                          handleChange,
                          handleBlur,
                          handleSubmit,
                      }) => (
                        <form onSubmit={handleSubmit}>
                            <TextInput
                                type="email"
                                name="email"
                                placeholder="Email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                error={!!errors.email && touched.email && errors.email}
                                mt={15}
                                required
                            />
                            <TextInput
                                type="text"
                                name="username"
                                placeholder="Identifiant"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.username}
                                error={!!errors.username && touched.username && errors.username}
                                mt={15}
                                required
                            />
                            <TextInput
                                type="text"
                                name="lastname"
                                placeholder="Nom"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.lastname}
                                error={!!errors.lastname && touched.lastname && errors.lastname}
                                mt={15}
                                required
                            />
                            <TextInput
                                type="text"
                                name="firstname"
                                placeholder="Prénom"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.firstname}
                                error={!!errors.firstname && touched.firstname && errors.firstname}
                                mt={15}
                                required
                            />
                            <PasswordInput
                                type="password"
                                name="password"
                                placeholder="Mot de passe"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                                error={!!errors.password && touched.password && errors.password}
                                mt={15}
                                mb={15}
                                required
                            />

                            <PasswordStrengthBar password={values.password}/>

                            <PasswordInput
                                type="password"
                                name="confirm"
                                placeholder="Confirmation mot de passe"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={!!errors.confirm && touched.confirm && errors.confirm}
                                value={values.confirm}
                                mt={15}
                                required
                            />

                            <Box mt={15}>
                                <CustomizeButton text='Incription' type='submit'>
                                </CustomizeButton>
                            </Box>
                            <Box>
                                <CustomizeButton type={"button"} variant="transparent"
                                                 onClick={() => navigate('/login')}
                                                 text={"Se connecter"}></CustomizeButton>
                            </Box>
                        </form>
                    )}
                </Formik>
            </Paper>
        </div>
    );
}