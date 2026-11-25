import { Routes, Route } from "react-router";
import Layout from "./components/Layout";
import Inicio from "./pages/Inicio";
import Sobre from "./pages/Sobre";
import Contato from "./pages/Contato";
import Detalhe from "./pages/Detalhe";
import NaoEncontrada from "./pages/NaoEncontrada";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Inicio />} />
        <Route path="sobre" element={<Sobre />} />
        <Route path="contato" element={<Contato />} />
        <Route path="produtos/:id" element={<Detalhe />} />
        <Route path="*" element={<NaoEncontrada />} />
      </Route>
    </Routes>
  );
}

export default App;
