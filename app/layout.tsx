import '@/assets/styles/globals.css';
import AuthProvider from '@/components/AuthProvider';
import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import { GlobalProvider } from '@/context/GlobalContext';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface MainLayoutProps {
    children: React.ReactNode;
}

export const metadata = {
    title: 'Property Pulse',
    keywords: 'renta, property, real estate',
    description: 'Find the perfect rental property'
}

const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <AuthProvider>
            <GlobalProvider>
                <html>
                    <body>
                        <NavBar />
                        <main>{children}</main>
                        <Footer />
                        <ToastContainer />
                    </body>
                </html>
            </GlobalProvider>
        </AuthProvider>
    );
}

export default MainLayout;