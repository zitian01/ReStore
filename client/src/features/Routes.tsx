import { ContactPage } from "@mui/icons-material";
import { createBrowserRouter } from "react-router-dom";
import App from "../app/layout/App";
import AboutPage from "./about/AboutPage";
import Catalog from "./catalog/Catalog";
import ProductDetails from "./catalog/ProductDetails";
import HomePage from "./home/HomePage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: < App />,
        children: [
            { path: '', element: <HomePage />},
            { path: 'catalog', element: <Catalog /> },
            { path: 'catalog/:id', element: <ProductDetails /> },
            { path: 'about', element: <AboutPage /> },
            { path: 'contact', element: <ContactPage /> },
        ]
    }
])