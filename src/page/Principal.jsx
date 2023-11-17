import React from 'react';
import Cadastrar from '../assets/registrar.png';
import Transferir from '../assets/transferir.png';
import Consultar from '../assets/consultar.png';
import CalendarWidget from '../components/CalendarWidget';
import { NavLink } from 'react-router-dom';

function Principal() {
    const carrosCadastrados = [
        // ...dados dos carros
    ];

    return (
        <div className="flex flex-col lg:flex-row bg-gray-100 min-h-screen p-10">
            <div className="flex-grow lg:w-9/12 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <CardAcao
                        titulo="Cadastrar Veículo"
                        descricao="Registre seu veículo de forma rápida e segura."
                        imagemPath={Cadastrar}
                        link='registro-veiculo'
                    />
                    <CardAcao
                        titulo="Transferir Veículo"
                        descricao="Consulte o histórico completo e a autenticidade."
                        imagemPath={Transferir}
                        link='transferir-veiculo'
                    />
                    <CardAcao
                        titulo="Consultar Histórico"
                        descricao="Visualize todo o histórico de transações do veículo."
                        imagemPath={Consultar}
                        link='historico-veiculo'
                    />
                </div>

                {/* Lista de Carros Cadastrados */}
                <div className="bg-white shadow rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-4">Carros Cadastrados</h3>
                    {carrosCadastrados.map((carro) => (
                        <div key={carro.id} className="flex items-center justify-between p-2 hover:bg-gray-50">
                            <span>{carro.nome}</span>
                            <span>{carro.localizacao}</span>
                            <span>{carro.dataCadastro.toLocaleDateString()}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="lg:w-3/12 lg:ml-2 mt-6 lg:mt-0">
                {/* Widget de Calendário */}
                <div className="bg-blue-500 text-white shadow rounded-lg p-6">
                    <CalendarWidget />
                    {/* Outros elementos do widget de calendário */}
                </div>
            </div>
        </div>
    );
}

function CardAcao({ titulo, descricao, imagemPath, link }) {
    return (
        <div className="bg-white shadow rounded-lg overflow-hidden">
            <img className="w-full" src={imagemPath} alt={titulo} />
            <div className="p-6">
                <h2 className="font-bold text-xl mb-2">{titulo}</h2>
                <p className="text-gray-700 text-base mb-4">{descricao}</p>
                <NavLink to={link} >
                    <div className="w-full bg-blue-600 text-white text-center p-2 rounded-lg hover:bg-blue-700 transition-colors duration-300">
                        {titulo.split(' ')[0]}
                    </div>
                </NavLink>

            </div>
        </div>
    );
}

export default Principal;



// Dados dos cards
const cardData = [
    { nome: 'Cadastrar Veículo', legenda: 'Registre seu veículo de forma rápida e segura.', link: '/cadastrar' },
    { nome: 'Transferir Veículo', legenda: 'Consulte o histórico completo e a autenticidade.', link: '/transferir' },
    { nome: 'Consultar Histórico', legenda: 'Visualize todo o histórico de transações do veículo.', link: '/historico' },
    { nome: 'Listar Carros', legenda: 'Veja a lista de todos os veículos cadastrados no sistema.', link: '/listar' },
];
