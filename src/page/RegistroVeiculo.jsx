import React, { useState } from 'react';
import { web3, contract } from './../config/block'; // Substitua pelo caminho correto

function RegistroVeiculo() {
  const [inputs, setInputs] = useState({
    chassi: '',
    marcaModelo: '',
    anoFabricacao: '',
    cor: '',
    placa: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Dados do veículo:', inputs);

    try {
      const accounts = await web3.eth.getAccounts();
      await contract.methods.registerVehicle(inputs?.chassi, inputs?.marcaModelo, inputs?.anoFabricacao, inputs?.placa, inputs?.cor)
        .send({ from: accounts[0] });
      // Adicionalmente, você pode lidar com o recebimento do evento ou confirmação aqui
    } catch (error) {
      console.error('Erro ao enviar para o contrato:', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-4xl font-bold text-center mb-8 text-blue-800">Registrar Novo Veículo</h2>
      <div className="max-w-2xl mx-auto bg-white shadow-2xl rounded-lg p-10">
        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Coluna Esquerda */}
            <div>
              <label className="block mb-5">
                <span className="text-gray-700">Chassi do Veículo</span>
                <input
                  type="text"
                  name="chassi"
                  onChange={handleChange}
                  value={inputs.chassi}
                  className="mt-1 p-3 block w-full border-gray-300 rounded-md shadow-sm"
                  placeholder="Digite o chassi do veículo"
                />
              </label>
              <label className="block mb-5">
                <span className="text-gray-700">Marca e Modelo</span>
                <input
                  type="text"
                  name="marcaModelo"
                  onChange={handleChange}
                  value={inputs.marcaModelo}
                  className="mt-1 p-3 block w-full border-gray-300 rounded-md shadow-sm"
                  placeholder="Digite a marca e modelo"
                />
              </label>
            </div>
            {/* Coluna Direita */}
            <div>
              <label className="block mb-5">
                <span className="text-gray-700">Ano de Fabricação</span>
                <input
                  type="text"
                  name="anoFabricacao"
                  onChange={handleChange}
                  value={inputs.anoFabricacao}
                  className="mt-1 p-3 block w-full border-gray-300 rounded-md shadow-sm"
                  placeholder="Digite o ano"
                />
              </label>
              <label className="block mb-5">
                <span className="text-gray-700">Cor</span>
                <input
                  type="text"
                  name="cor"
                  onChange={handleChange}
                  value={inputs.cor}
                  className="mt-1 p-3 block w-full border-gray-300 rounded-md shadow-sm"
                  placeholder="Digite a cor"
                />
              </label>
            </div>
          </div>
          <label className="block mb-5">
            <span className="text-gray-700">Placa</span>
            <input
              type="text"
              name="placa"
              onChange={handleChange}
              value={inputs.placa}
              className="mt-1 p-3 block w-full border-gray-300 rounded-md shadow-sm"
              placeholder="Digite a placa"
            />
          </label>
          {/* <label className="block mb-5">
            <span className="text-gray-700">Descrição Adicional</span>
            <textarea className="mt-1 p-3 block w-full border-gray-300 rounded-md shadow-sm" rows="4"></textarea>
          </label> */}
          <button type="submit" className="w-full bg-blue-700 hover:bg-blue-900 text-white font-bold py-3 px-4 rounded-lg transition duration-300">
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegistroVeiculo;
