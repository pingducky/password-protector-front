import {AppShell, Group, NavLink, Title} from '@mantine/core';
import {useLocation, useNavigate} from "react-router-dom";
import CustomizeButton from "./CustomizeButton.tsx";


export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLoginClick = () => {
        navigate("/login");
    }

    const handleRegisterClick = () => {
        navigate("/register");
    }

    return (
        <AppShell
            header={{height: 60}}
            padding="md"
            mt={50}
        >
            <AppShell.Header>
                <Group justify="space-between" h="100%" px="md">
                    <Group grow pb="xl" px="md">
                        <Title order={3}>
                            Password Manager
                        </Title>
                    </Group>
                    <Group grow pb="xl" px="md">
                        <NavLink href="/dashboard" label={"DashBoard"}/>
                    </Group>
                    <Group grow pb="xl" px="md">
                        {location.pathname !== "/login" &&
                            <CustomizeButton type={"button"} onClick={handleLoginClick} variant={"transparent"}
                                             text={"Connexion"}/>}
                        {location.pathname !== "/register" &&
                            <CustomizeButton type={"button"} onClick={handleRegisterClick} text={"Inscription"}/>}
                    </Group>
                </Group>
            </AppShell.Header>
        </AppShell>
    );
}