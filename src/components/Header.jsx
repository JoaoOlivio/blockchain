import { signOut } from 'firebase/auth';
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase'

function Header() {

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/');
        } catch (error) {
            console.error('Erro ao sair:', error);
        }
    };


    return (
        <header className="bg-white shadow-sm">
            <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
                <a href="/" className="text-blue-600 text-3xl font-bold">Veículos na Blockchain</a>
                <div className="hidden md:flex space-x-4">
                    <a href="/" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Home</a>
                    <NavLink to="/login" onClick={handleLogout} className="text-gray-600 hover:text-blue-600 transition-colors duration-300">
                        Sair
                    </NavLink>

                    {/* Adicione mais links de navegação conforme necessário */}
                </div>
            </nav>
        </header>
    );
}

export default Header;
