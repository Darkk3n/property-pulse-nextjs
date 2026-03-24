import '@/assets/styles/globals.css';
import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import React from 'react';

interface MainLayoutProps {
    children: React.ReactNode;
}

export const metadata = {
    title: 'Property Pulse',
    keywords: 'renta, property, real estate',
    description: 'Find the perfect rental property'
}

const MainLayout = ({ children }: MainLayoutProps) => {
    return (<html>
        <body>
            <NavBar />
            <main>{children}</main>
            <Footer />
        </body>
    </html>);
}

export default MainLayout;