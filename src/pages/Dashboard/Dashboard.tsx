import { ActionIcon, Box, Divider, Table } from '@mantine/core';
import { IconExternalLink } from '@tabler/icons-react';
import DeleteIcon from '../../components/shared/Icons';
import CustomizeButton from '../../components/shared/CustomizeButton';
import Navbar from '../../components/shared/Navbar';
import styles from './Dashboard.module.scss';

interface Element {
    id: number;
    name: string;
    proprietaire: string;
}

const elementtest = [];
const websiteNames = [
    'google',
    'facebook',
    'youtube',
    'amazon',
    'wikipedia',
    'twitter',
    'instagram',
    'linkedin',
    'reddit',
    'netflix',
    'ebay',
    'pinterest',
    'bing',
    'yahoo',
    'github',
    'twitch',
    'medium',
    'nytimes',
    'cnn',
    'bbc'
];


for (let i = 0; i < 20; i++) {
    elementtest.push({
        id: i,
        name: websiteNames[i % websiteNames.length].toUpperCase(),
        proprietaire: 'Anthony'
    });
}
export default function Dashboard() {
    return (
        <Box className={styles.root}>
            <Navbar />
            <div className={styles.newElementContainer}>
                <CustomizeButton text={"Nouvel élément"} type={"button"} />
            </div>
            <Divider />
            <Table.ScrollContainer minWidth={700}>
                <Table highlightOnHover withTableBorder >
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Nom</Table.Th>
                            <Table.Th>Propriétaire</Table.Th>
                            <Table.Th>Dernière modification</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {
                            elementtest.map((element) => (
                                <Table.Tr key={element.id}>
                                    <Table.Td>{element.name}</Table.Td>
                                    <Table.Td>{element.proprietaire}</Table.Td>
                                    <Table.Td>{new Date().toLocaleDateString()}</Table.Td>
                                    <Table.Td>
                                        <ActionIcon aria-label="Settings" p={3} color='violet'>
                                            <IconExternalLink />
                                        </ActionIcon>
                                    </Table.Td>
                                    <Table.Td>
                                        <ActionIcon aria-label="Settings" p={3} color='violet'>
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
