import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import FormInput from '../components/Botoes/FormInput';
import { registerWithEmailAndPassword } from '../config/firebase';

function Cadastro() {
  // Estados para gerenciar os inputs do formulário, erros de validação e resposta do login.
  const [inputs, setInputs] = useState({});
  const [erros, setErros] = useState({});
  const [response, setResponse] = useState({});
  const [erroLogin, setErroLogin] = useState(null);

  // Hook para navegar programaticamente após o cadastro.
  const navigate = useNavigate();

  // Esquema de validação para os campos do formulário.
  const validator = yup.object().shape({
    nome: yup.string().required('Nome é obrigatório'),
    cpf: yup.string().required('CPF é obrigatório'),
    email: yup.string().email('E-mail inválido.').required('E-mail é obrigatório'),
    senha: yup.string().required('Senha é obrigatória')
  });

  // Atualiza os valores dos inputs conforme o usuário digita.
  function handleChange(e) {
    const { name, value } = e.target;
    console.log([name], ':', value);
    setInputs({ ...inputs, [name]: value });
  }

  // Valida os inputs e tenta registrar o usuário.
  function validar() {
    validator
      .validate(inputs, { abortEarly: false })
      .then(() => {
        setErros({});
        registerWithEmailAndPassword(inputs?.nome, inputs?.email, inputs?.senha, inputs?.cpf, setResponse);
      })
      .catch((error) => {
        const newErrors = error.inner.reduce((acc, err) => ({ ...acc, [err.path]: err.message }), {});
        setErros(newErrors);
      });
  }

  // Submete o formulário e chama a função de validação.
  function handleSubmit(e) {
    e.preventDefault();
    validar();
  }

  // Observa a resposta da tentativa de cadastro e navega conforme o resultado.
  useEffect(() => {
    if (response.status === 400) {
      setErroLogin(true); // Exibir mensagem de erro caso o status seja 400.
    } else if (response.status === 200) {
      navigate('/login'); // Redirecionar para o login caso o status seja 200.
    }
  }, [response, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-4">
          Cadastro de Usuário
        </h2>
        <form onSubmit={handleSubmit} noValidate autoComplete="off">
          {erroLogin == null ? (
            ''
          ) : (
            <p className="text-md font-semibold bg-red-500 text-white p-2 rounded-md">
              <i className="bi bi-exclamation-circle-fill"></i> {response.message}
            </p>
          )}

          <FormInput
            type="text"
            field="nome"
            label="Nome"
            placeholder="Digite seu nome"
            error={erros?.nome}
            onChange={handleChange}
            value={inputs?.nome}
          />
          <FormInput
            type="email"
            field="email"
            label="E-mail"
            placeholder="email@email.com"
            error={erros?.email}
            onChange={handleChange}
            value={inputs?.email}
          />
          <FormInput
            type="text"
            field="cpf"
            label="CPF"
            placeholder="Digite seu CPF"
            error={erros?.cpf}
            onChange={handleChange}
            value={inputs?.cpf}
          />
          <FormInput
            type="password"
            field="senha"
            label="Senha"
            placeholder="Senha"
            error={erros?.senha}
            onChange={handleChange}
            value={inputs?.senha}
            autoComplete="new-password"
          />

          <div className="flex justify-between items-center mb-4 mt-3">
            <NavLink to={'/login'} className="text-blue-700 hover:underline">
              Lembrou da sua conta ? Clique aqui.
            </NavLink>
          </div>

          <div>
            <button
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Cadastro;
