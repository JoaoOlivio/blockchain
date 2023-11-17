import React, { useState } from 'react';

function HistoricoVeiculo() {
  const [veiculoEncontrado, setVeiculoEncontrado] = useState(false);
  const [dadosVeiculo, setDadosVeiculo] = useState(null); // Supõe-se que você irá buscar esses dados

  const buscarVeiculo = () => {
    // Lógica de busca do veículo
    // Se o veículo for encontrado, setar os dados do veículo e mudar 'veiculoEncontrado' para 'true'
    // setDadosVeiculo(resultadoDaBusca);
    setVeiculoEncontrado(true);
  };

  return (
    <div className="container mx-auto p-4">

      {/* Card Superior com Imagem do Veículo e Campo de Busca */}
      <div className="flex flex-col md:flex-row items-center justify-between bg-white rounded-lg border-blue-500 border-2 p-6 shadow-md mb-10">
        {/* Metade com a Imagem do Veículo */}
        <div className="md:w-1/2 p-4">
          <img src="path-to-your-vehicle-image.jpg" alt="Veículo" className="rounded-lg" />
        </div>
        {/* Metade com o Título e Campo de Busca */}
        <div className="md:w-1/2 p-4 flex flex-col items-start justify-center">
          <h2 className="text-2xl font-bold mb-4">Consulta de Histórico</h2>
          <div className="w-full">
            <input
              type="search"
              placeholder="Digite o chassi ou placa do veículo"
              className="p-2 w-full border-2 border-gray-300 rounded-md shadow-sm"
            />
            <button
              onClick={buscarVeiculo}
              className="mt-2 bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded w-full transition duration-300">
              Buscar
            </button>
          </div>
        </div>
      </div>

      {/* Card Inferior com Detalhe do Veículo e Histórico de Transferência */}
      {veiculoEncontrado && (
        <div className="flex flex-col md:flex-row bg-white border-blue-500 border-2 shadow-md rounded-lg p-6">
          <div className="md:w-1/2 p-4 border-r-2 rounded border-blue-500">
            <h3 className="text-xl font-bold mb-2">Detalhes do Veículo</h3>
            <ul>
              <li><strong>Marca e Modelo:</strong> Ford Mustang</li>
              <li><strong>Ano:</strong> 2020</li>
              <li><strong>Cor:</strong> Azul</li>
              <li><strong>Placa:</strong> ABC-1234</li>
            </ul>
          </div>
          <div className="md:w-1/2 p-4">
            <h3 className="text-xl font-bold mb-2">Histórico de Transferência</h3>
            <ul className="overflow-auto h-48">
              {/* Substitua com histórico real de transferências do veículo */}
              <li className="px-6 py-4 whitespace-no-wrap bg-gray-300  rounded-lg text-md leading-5 font-medium text-gray-900">
                Transferido em 12/01/2021 para João Silva
              </li>
              {/* Mais itens de histórico se necessário */}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default HistoricoVeiculo;
