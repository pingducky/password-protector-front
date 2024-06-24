import {ActionIcon, Box, Divider, Table} from '@mantine/core';
import {IconExternalLink} from '@tabler/icons-react';
import DeleteIcon from '../../components/shared/Icons';
import CustomizeButton from '../../components/shared/CustomizeButton';
import Navbar from '../../components/shared/Navbar';
import styles from './Dashboard.module.scss';
import {getElementsByUsername} from '../../api/Dashboard';
import {useEffect, useState} from "react";

// interface Element {
//     id: number;
//     name: string;
//     proprietaire: string;
// }

export default function Dashboard() {
    const [userElements, setUserElements] = useState<BasicElement[]>([]);

    useEffect(() => {
        getElementsByUsername('mistervinvin').then((response) => {
            if (response?.ok) {
                setUserElements(response as BasicElement[]);
            }
        });
    }, []);

    return (
        <Box className={styles.root}>
            <Navbar/>
            <div className={styles.newElementContainer}>
                <CustomizeButton text={"Nouvel élément"} type={"button"}/>
            </div>
            <Divider/>
            <Table.ScrollContainer minWidth={700}>
                <Table highlightOnHover withTableBorder>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Nom</Table.Th>
                            <Table.Th>URL</Table.Th>
                            <Table.Th>Dernière modification</Table.Th>
                            <Table.Th>Description</Table.Th>
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
                                            <IconExternalLink/>
                                        </ActionIcon>
                                    </Table.Td>
                                    <Table.Td>
                                        <ActionIcon aria-label="Settings" p={3} color='violet'>
                                            <DeleteIcon/>
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
