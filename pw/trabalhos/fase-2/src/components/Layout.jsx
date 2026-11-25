import { Outlet } from "react-router";
import Cabecalho from "./Cabecalho";
import Rodape from "./Rodape";

function Layout() {
  return (
    <>
      <Cabecalho />
      <Outlet />
      <Rodape />
    </>
  );
}

export default Layout;
