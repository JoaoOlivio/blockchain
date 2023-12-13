import React, { useState } from 'react';
import { db } from '../config/firebase'; // Ajuste para o caminho correto do arquivo de configuração do Firebase
import { query, collection, where, getDocs } from 'firebase/firestore';
import { web3, contract } from '../config/block';

function TransferirVeiculo() {
  const [cpfEncontrado, setCpfEncontrado] = useState(false);
  const [mensagemErro, setMensagemErro] = useState('');
  const [dadosUsuario, setDadosUsuario] = useState(null);


  const [inputs, setInputs] = useState({
    chassi: '',
    cpf: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }));
  };



  // Função para verificar se o CPF está cadastrado no sistema
  const verificarCpf = async () => {
    const q = query(collection(db, "usuarios"), where("cpf", "==", inputs?.cpf));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      setCpfEncontrado(false);
      setMensagemErro('CPF não cadastrado no sistema.');
    } else {
      setCpfEncontrado(true);
      setMensagemErro('');

      // Supondo que só exista um usuário com o CPF especificado
      const userData = querySnapshot.docs[0].data();
      setDadosUsuario(userData);
    }
  };

  // // Função para simular a transferência (adicione a lógica de integração com a blockchain aqui)
  // const transferir = (e) => {
  //   e.preventDefault();
  //   if (cpfEncontrado) {
  //     console.log(`Transferindo veículo de chassi ${chassi} para o novo proprietário com CPF ${cpf}.`);
  //     // Adicione aqui a lógica de transferência
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const accounts = await web3.eth.getAccounts();
      await contract.methods.transferVehicle(inputs?.chassi, inputs?.cpf, dadosUsuario?.nome).send({ from: accounts[0] });
      console.log('Veículo transferido com sucesso.');
    } catch (error) {
      console.error('Erro ao transferir o veículo:', error);
    }
  };


  return (
    <div className="container mx-auto p-6">
      <h2 className="text-4xl font-bold text-center mb-8 text-blue-800">Transferir Veículo</h2>
      <div className="max-w-2xl mx-auto bg-white shadow-2xl rounded-lg p-10">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block mb-2 text-gray-700">
              Chassi do Veículo
            </label>
            <input
              type="text"
              name='chassi'
              onChange={handleChange}
              value={inputs.chassi}
              className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm p-3"
              placeholder="Digite o chassi do veículo"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-gray-700">
              CPF do Novo Proprietário
            </label>
            <div className="flex">
              <input
                type="text" // Alterado de 'number' para 'text' para aceitar CPF formatado
                onChange={handleChange}
                name='cpf'
                value={inputs.cpf}
                className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm p-3"
                placeholder="Digite o cpf do novo proprietário"
                required
              />
              <button
                type="button"
                onClick={verificarCpf}
                className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
              >
                Buscar
              </button>
            </div>
            {mensagemErro && <p className="text-red-500 text-sm mt-2">{mensagemErro}</p>}
          </div>
          {cpfEncontrado && (
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-800 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
            >
              Transferir
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default TransferirVeiculo;
