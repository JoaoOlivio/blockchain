import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './global.css';
import Principal from "./page/Principal";
import RegistroVeiculo from "./page/RegistroVeiculo";
import HistoricoVeiculo from "./page/HistoricoVeiculo";
import TranferirVeiculo from "./page/TranferirVeiculo";
import Login from "./page/Login";
import Cadastro from "./page/Cadastro";
import Layout from "./Layout";
import AuthRoute from "./AuthRoute";

const App = () => {
  return (
    <Router>
      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />

        <Route path="/" element={<AuthRoute> <Layout /></AuthRoute>}>
          <Route index element={<Principal />} />
          <Route path="/registro-veiculo" element={<RegistroVeiculo />} />
          <Route path="/historico-veiculo" element={<HistoricoVeiculo />} />
          <Route path="/transferir-veiculo" element={<TranferirVeiculo />} />
        </Route>


        {/* <Route path="/" element={<AuthRoute><Layout /></AuthRoute>}> */}

        {/* <Route path="nivel">
          <Route index element={<NivelRequisitos />} />
          <Route path="cadastro" element={<ExercicioCasoDeUso />} />
          <Route path="questoes" element={<CadastroNivelRequisitos />} />
        </Route> */}
      </Routes>
    </Router>
  );
};

export default App;
