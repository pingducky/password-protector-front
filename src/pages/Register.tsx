import {Formik} from "formik";
import {Box, Paper, PasswordInput, TextInput, Title} from "@mantine/core";
import CustomizeButton from "../components/shared/CustomizeButton.tsx";
import { useNavigate } from "react-router-dom";
import PasswordStrengthBar from 'react-password-strength-bar';
import Navbar from "../components/shared/Navbar.tsx";


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

        if (!values.email) errors.email = 'Adresse email requise';
        else if (values.email.length !== 0 && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Adresse email invalide';
        }
        //TODO : Vérification de l'existance de l'email

        if (!values.username) errors.username = 'Identifiant requis';
        //TODO : Vérification de l'existance de l'username

        if (values.password !== values.confirm && values.confirm) errors.confirm = 'Les mots de passe ne correspondent pas';
        else if (!values.password) errors.password = 'Mot de passe requis';
        else if (values.password.length < 8) errors.password = 'Le mot de passe doit contenir au minimum 8 caractères'

        if (!values.confirm) errors.confirm = 'Confirmation requise';

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
                    onSubmit={(values: IRegisterFormValues, {setSubmitting}) => {

                        delete values.confirm;

                        console.log(JSON.stringify(values, null, 2));
                        setSubmitting(false);

                        navigate('/');
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
                                mt={15}
                            />
                            <TextInput
                                type="text"
                                name="firstname"
                                placeholder="Prénom"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.firstname}
                                error={!!errors.firstname}
                                mt={15}
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

                            <PasswordStrengthBar password={values.password} />

                            <PasswordInput
                                type="password"
                                name="confirm"
                                placeholder="Confirmation mot de passe"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.confirm}
                                error={!!errors.confirm && touched.confirm && errors.confirm}
                                mt={15}
                                required
                            />

                            <Box mt={15}>
                                <CustomizeButton text='Incription' type='submit'>
                                </CustomizeButton>
                            </Box>
                            <Box >
                                <CustomizeButton type={"button"} variant="transparent" onClick={() => navigate('/login')} text={"Se connecter"}></CustomizeButton>
                            </Box>
                        </form>
                    )}
                </Formik>
            </Paper>
        </div>
    );
}