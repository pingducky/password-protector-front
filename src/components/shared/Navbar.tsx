import {AppShell, Group, NavLink, Title} from '@mantine/core';
import {useNavigate} from "react-router-dom";
import CustomizeButton from "./CustomizeButton.tsx";
import {useState} from "react";

export default function Navbar() {

    const [connected, setConnected] = useState(true);
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate("/login");
    }

    const handleRegisterClick = () => {
        navigate("/register");
    }

    

    return (
        <AppShell
            header={{ height: 60 }}
            padding="md"
        >
            <AppShell.Header>
                <Group justify="space-between" h="100%" px="md">
                    <Group grow pb="xl" px="md">
                        <Title order={3} >
                            Password Manager
                        </Title>
                    </Group>
                    <Group grow pb="xl" px="md">
                        <NavLink href="/dashboard" label={"DashBoard"} />
                    </Group>
                    {connected && <Group grow pb="xl" px="md">
                        <CustomizeButton onClick={handleLoginClick} variant={"transparent"} text={"Connexion"}/>
                        <CustomizeButton onClick={handleRegisterClick}  text={"Inscription"}/>
                    </Group> }
                </Group>
            </AppShell.Header>
        </AppShell>
    );
}