import { useEffect, useState } from "react";
// Renomeando 'BrowserRouter' para 'Router' na importação
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ResultsTable from './pages/DistanceBtwCustomerAndSeller/ResultsTable.jsx'; // ajuste o caminho conforme necessário
import Home from './pages/Home.jsx'; // exemplo de outra página
import MapView from "./pages/DistanceBtwCustomerAndSeller/MapView.jsx";

function App() {
  const [jsonData, setJsonData] = useState(null);
  return (
    // ADICIONE A PROPRIEDADE 'basename' AQUI
    <Router basename="/pages-vbn">
      <Routes>
        <Route path="/" element={<Home setJsonData={setJsonData} />} />
        <Route path="/results" element={<ResultsTable data={jsonData} />} />
        <Route path="/maps" element={<MapView associations={jsonData} />} />
      </Routes>
    </Router>
  );
}

export default App;