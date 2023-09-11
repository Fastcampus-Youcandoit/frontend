import { BrowserRouter, Routes } from "react-router-dom";
import GlobalStyle from "./styles/globalStyle";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes />
    </BrowserRouter>
  );
}

export default App;
