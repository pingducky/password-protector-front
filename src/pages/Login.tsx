import { isNotEmpty, useForm } from '@mantine/form';
import { TextInput, Button, Box, PasswordInput, Title, Group } from '@mantine/core';

export default function Login() {

    const isEmail = (email: string) =>
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

    const [isInputValid, errorMessage] = useState();

    const validateInput = (email: string) => {
        const regexp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        if (regexp.exec(email) !== null) {
            return {
                isInputValid: true,
                errorMessage: ''
            };
        } else {
            return {
                isInputValid: false,
                errorMessage: 'Email invalide.'
            };
        }
    }

    return (
        <Box maw={340} mx="auto">
            <Title order={2} lineClamp={2}>Espace d'inscription</Title>
            <form onSubmit={form.onSubmit(console.log)}>
                <TextInput withAsterisk mt="sm" label="Email" placeholder="Email" {...form.getInputProps('email')} />
                <TextInput withAsterisk mt="sm" label="Nom" placeholder="Nom"  {...form.getInputProps('firstname')} />
                <TextInput withAsterisk mt="sm" label="Prénom" placeholder="Prénom"  {...form.getInputProps('lastname')} />
                <PasswordInput withAsterisk mt="sm" label="Mot de passe" placeholder="Mot de passe"  {...form.getInputProps('password')} />
                <PasswordInput withAsterisk mt="sm" label="Confirmation" placeholder="Confirmation" {...form.getInputProps('confirmPassword')} />
                <Group justify="flex-end" mt="md">
                    <CustomizeButton text='Incription'>
                    </CustomizeButton>
                </Group>
            </form>
        </Box>
    );
}