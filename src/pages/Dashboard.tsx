import {Box, Button, Grid} from '@mantine/core';
import Navbar from "../components/shared/Navbar.tsx";
import CustomizeButton from "../components/shared/CustomizeButton.tsx";
import DeleteIcon from "../components/shared/Icons.tsx";

interface Element {
    id: number;
    name: string;
    proprietaire: string;
}

const elementtest = [{
    id: 0,
    name: 'ADMINISTRATION',
    proprietaire: 'Anthony',
}, {
    id: 1,
    name: 'SPORT',
    proprietaire: 'Anthony',
}]

export default function Dashboard() {
    const handleRowClick = (element: Element) => {
        // Handle row click here
        console.log(`Row clicked: ${element.id}`);
    };

    const handleEdit = (element: Element) => {
        // Handle edit action here
        console.log(`Edit: ${element.id}`);
    };

    const handleDelete = (element: Element) => {
        // Handle delete action here
        console.log(`Delete: ${element.id}`);
    };

    return (
        <Box>
            <Navbar/>
            <CustomizeButton text={"Nouvel élément"} type={"button"} />
            <Grid justify="center" align="flex-start">
                <Grid.Col span={3}><h3 style={{ color: '#1E88E5' }}>Élément</h3></Grid.Col>
                <Grid.Col span={3}><h3 style={{ color: '#1E88E5' }}>Propriétaire</h3></Grid.Col>
                <Grid.Col span={3}><h3 style={{ color: '#1E88E5' }}>Actions</h3></Grid.Col>
            </Grid>
            {elementtest.map((element: Element) => (
                <Grid justify="center" align="flex-start" key={element.id} onClick={() => handleRowClick(element)}>
                    <Grid.Col m={10} span={3}>{element.name}</Grid.Col>
                    <Grid.Col m={10} span={3}>{element.proprietaire}</Grid.Col>
                    <Grid.Col m={10} span={3}>
                        <Button onClick={(e) => { e.stopPropagation(); handleEdit(element); }}>Edit</Button>
                        <Button  variant={"default"} onClick={(e) => { e.stopPropagation(); handleDelete(element); }}>
                            <DeleteIcon/>
                        </Button>
                        <DeleteIcon/>
                    </Grid.Col>
                </Grid>
            ))}
        </Box>
    );
}