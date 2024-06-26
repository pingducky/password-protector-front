import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {createTheme, MantineProvider} from '@mantine/core'
import '@mantine/core/styles.css';
import '@mantine/tiptap/styles.css';

const theme = createTheme({
    colors: {
        violet: ['#A1A8F7', '#8E94F5', '#7B85F4', '#4251F0', '#2F3FEE', '#2F3FEE', '#4251F0', '#5562F1', '#5D6AF2', '#5562F1']
    }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
    <MantineProvider theme={theme}>
        <App/>
    </MantineProvider>
)
