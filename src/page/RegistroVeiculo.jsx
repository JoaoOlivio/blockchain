import React from 'react';

function RegistroVeiculo() {
  // Funções e estados aqui...

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-4xl font-bold text-center mb-8 text-blue-800">Registrar Novo Veículo</h2>
      <div className="max-w-2xl mx-auto bg-white shadow-2xl rounded-lg p-10">
        <form>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Coluna Esquerda */}
            <div>
              <label className="block mb-5">
                <span className="text-gray-700">Chassi do Veículo</span>
                <input type="text" className="mt-1 p-3 block w-full border-gray-300 rounded-md shadow-sm"/>
              </label>
              <label className="block mb-5">
                <span className="text-gray-700">Marca e Modelo</span>
                <input type="text" className="mt-1 p-3 block w-full border-gray-300 rounded-md shadow-sm"/>
              </label>
            </div>
            {/* Coluna Direita */}
            <div>
              <label className="block mb-5">
                <span className="text-gray-700">Ano de Fabricação</span>
                <input type="number" className="mt-1 p-3 block w-full border-gray-300 rounded-md shadow-sm"/>
              </label>
              <label className="block mb-5">
                <span className="text-gray-700">Cor</span>
                <input type="text" className="mt-1 p-3 block w-full border-gray-300 rounded-md shadow-sm"/>
              </label>
            </div>
          </div>
          <label className="block mb-5">
            <span className="text-gray-700">Placa</span>
            <input type="text" className="mt-1 p-3 block w-full border-gray-300 rounded-md shadow-sm"/>
          </label>
          <label className="block mb-5">
            <span className="text-gray-700">Descrição Adicional</span>
            <textarea className="mt-1 p-3 block w-full border-gray-300 rounded-md shadow-sm" rows="4"></textarea>
          </label>
          <button type="submit" className="w-full bg-blue-700 hover:bg-blue-900 text-white font-bold py-3 px-4 rounded-lg transition duration-300">
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegistroVeiculo;
