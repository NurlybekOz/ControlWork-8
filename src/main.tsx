import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.tsx'
import {BrowserRouter} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css'
import {ToastContainer} from "react-toastify";
import {CssBaseline} from "@mui/material";

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <CssBaseline/>
        <ToastContainer />
        <App />
    </BrowserRouter>
)
