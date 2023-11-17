import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { logInWithEmailAndPassword } from '../config/firebase';
import FormInput from '../components/Botoes/FormInput';
import * as yup from 'yup';

function Login() {

  const [inputs, setInputs] = useState({})
  const [erros, setErros] = useState({})
  const [response, setResponse] = useState({});
  const [erroLogin, setErroLogin] = useState(null)

  const navigate = useNavigate();

  const validator = yup.object().shape({
    email: yup.string().email("E-mail inválido.").required('E-email é obrigatório'),
    senha: yup.string().required("Senha é obrigatório")
  })

  function handleChange(e) {
    const name = e.target.name
    const value = e.target.value
    setInputs({ ...inputs, [name]: value })
  }

  function validar() {
    validator.validate(inputs, { abortEarly: false }).then(() => {
      setErros({});
      logInWithEmailAndPassword(inputs?.email, inputs?.senha, setResponse)
    }).catch((error) => {
      setErros({});
      error.inner.forEach((err) => {
        setErros((prevErros) => ({ ...prevErros, [err.path]: err.message }));
      });
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    validar();
  }

  useEffect(() => {
    if (response.status == 400) {
      setErroLogin(true) // Abrir o modal após receber a resposta
    } else if (response.status == 200) {
      navigate("/")
    }
  }, [response])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-4">
          Login do Sistema
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6" noValidate autoComplete="off">

          {erroLogin == null ? '' : <p className='text-md font-semibold bg-red-500 text-white p-2 rounded-md'> {response.message} </p>}

          <FormInput type="email" field="email" label="E-mail" placeholder="email@email.com" error={erros?.email} onChange={handleChange} value={inputs?.email} />
          <FormInput type="password" field="senha" label="Senha" placeholder="Senha" error={erros?.senha} onChange={handleChange} value={inputs?.senha} />
          
          <div className="flex justify-between items-center mb-4 mt-3">
           
            <NavLink to={'/cadastro'} className="text-blue-500 hover:underline">
              Cadastrar-se
            </NavLink>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
