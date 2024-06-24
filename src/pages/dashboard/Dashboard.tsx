import {ActionIcon, Box, Divider, Table} from '@mantine/core';
import {IconExternalLink} from '@tabler/icons-react';
import CustomizeButton from '../../components/shared/CustomizeButton';
import Navbar from '../../components/shared/Navbar';
import styles from './Dashboard.module.scss';
import {deleteElementById, getElementsByUsername} from '../../api/Dashboard';
import {useEffect, useState} from "react";
import DeleteIcon from "../../components/shared/svg/DeleteIcon.tsx";
import {useNavigate} from "react-router-dom";

// interface Element {
//     id: number;
//     name: string;
//     proprietaire: string;
// }

export default function Dashboard() {
    const [userElements, setUserElements] = useState<BasicElement[]>([]);
    const navigate = useNavigate();
    const username = localStorage.getItem('username');

    const deleteElement = async (elementId: string) => {
        if (username) {
            deleteElementById(username, elementId).then((response) => {
                if (response?.ok) {
                    setUserElements(userElements.filter((element) => element.id !== elementId));
                }
            });
        }
    };

    useEffect(() => {
        if (username) {
            getElementsByUsername(username).then((response) => {
                if (response?.ok) {
                    setUserElements(response.data as BasicElement[]);
                }
            });
        } else {
            navigate('/login');
        }
    }, [navigate, username]);

    return (
        <Box className={styles.root}>
            <Navbar />
            <div className={styles.newElementContainer}>
                <CustomizeButton text={"Nouvel élément"} type={"button"} />
            </div>
            <Divider />
            <Table.ScrollContainer minWidth={700}>
                <Table highlightOnHover withTableBorder>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Nom</Table.Th>
                            <Table.Th>URL</Table.Th>
                            <Table.Th>Dernière modification</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {
                            userElements.map((element) => (
                                <Table.Tr key={element.id}>
                                    <Table.Td>{element.name}</Table.Td>
                                    <Table.Td>{element.url}</Table.Td>
                                    <Table.Td>{element.creationDate}</Table.Td>
                                    <Table.Td>
                                        <ActionIcon aria-label="Settings" p={3} color='violet'>
                                            <IconExternalLink />
                                        </ActionIcon>
                                    </Table.Td>
                                    <Table.Td>
                                        <ActionIcon aria-label="Settings" p={3} color='violet' onClick={() => deleteElement(element.id)}>
                                            <DeleteIcon />
                                        </ActionIcon>
                                    </Table.Td>
                                </Table.Tr>
                            ))
                        }
                    </Table.Tbody>
                </Table>
            </Table.ScrollContainer>
        </Box>
    );
}
