import React, { useState } from 'react';
import Car from '../assets/car.png';
import { contract } from '../config/block';


function HistoricoVeiculo() {
  const [veiculoEncontrado, setVeiculoEncontrado] = useState(false);
  const [dadosVeiculo, setDadosVeiculo] = useState(null); // Supõe-se que você irá buscar esses dados

  const [chassi, setChassi] = useState('');
  const [historicoTransferencias, setHistoricoTransferencias] = useState([]);


  const buscarVeiculo = async () => {
    try {
      const veiculo = await contract.methods.getVehicle(chassi).call();
      await getTransferHistory(chassi);
      setDadosVeiculo({
        modelo: veiculo.model,
        year: veiculo.year,
        cor: veiculo.color,
        placa: veiculo.placa,
        chassi: veiculo.chassi
      });
      setVeiculoEncontrado(true);
    } catch (error) {
      console.error("Erro ao buscar veículo:", error);
      setVeiculoEncontrado(false);
    }
  };

  const getTransferHistory = async (_chassi) => {
    try {
      const transfers = await contract.methods.getTransferHistory(_chassi).call();

      const formattedTransfers = transfers.map(transfer => {
        // Convertendo o timestamp de BigInt para Number antes de criar a data
        const timestamp = Number(transfer.timestamp);

        return {
          // Usando o timestamp convertido
          timestamp: new Date(timestamp * 1000).toLocaleString(),
          cpf: transfer.cpf,
          nome: transfer.nome
        };
      });

      // Ordenando as transferências pela data, da mais recente para a mais antiga
      formattedTransfers.sort((a, b) => {
        // Se 'a' é mais recente que 'b', então coloque 'a' antes de 'b' (resultado negativo para a.sort()).
        return new Date(b.timestamp) - new Date(a.timestamp);
      });

      console.log(formattedTransfers);


      setHistoricoTransferencias(formattedTransfers);

    } catch (error) {
      console.error("Erro ao buscar o histórico de transferências:", error);
    }
  };


  return (
    <div className="container mx-auto p-4">

      <div className="flex flex-col md:flex-row items-center justify-between bg-white rounded-lg border-blue-500 border-2 p-6 shadow-md mb-10">
        <div className="md:w-1/2 p-4">
          <img src={Car} alt="Veículo" className="rounded-lg" />
        </div>
        <div className="md:w-1/2 p-4 flex flex-col items-start justify-center">
          <h2 className="text-2xl font-bold mb-4">Consulta de Histórico</h2>
          <div className="w-full">
            <input
              type="text"
              value={chassi}
              onChange={(e) => setChassi(e.target.value)}
              placeholder="Digite o chassi do veículo"
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
              <li><strong>Chassi:</strong> {dadosVeiculo?.chassi}</li>
              <li><strong>Marca e Modelo:</strong> {dadosVeiculo?.modelo}</li>
              <li><strong>Ano:</strong> {dadosVeiculo?.year}</li>
              <li><strong>Cor:</strong> {dadosVeiculo?.cor}</li>
              <li><strong>Placa:</strong> {dadosVeiculo?.placa}</li>
            </ul>
          </div>
          <div className="md:w-1/2 p-4">
            <h3 className="text-xl font-bold mb-2">Histórico de Transferência</h3>
            <ul className="overflow-auto h-48">
              {historicoTransferencias.map((transferencia, index) => (
                <li key={index} className="px-6 mb-2 py-4 whitespace-no-wrap bg-gray-300 rounded-lg text-md leading-5 font-medium text-gray-900">
                  Transferido em {transferencia.timestamp} para {transferencia?.nome}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default HistoricoVeiculo;
