import { isNotEmpty, useForm } from '@mantine/form';
import { TextInput, Box, PasswordInput, Title, Group } from '@mantine/core';
import CustomizeButton from '../components/shared/CustomizeButton';

export default function Login() {

    const form = useForm({
        initialValues: { email: '', firstname: '', lastname: '', password: '', confirmPassword: '' },

        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Email invalide'),
            password: isNotEmpty(),
            confirmPassword: (value, values) =>
                value !== values.password ? 'Les mots de passe de correspondent pas' : null,
            firstname: isNotEmpty(),
            lastname: isNotEmpty(),
        },
    });

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