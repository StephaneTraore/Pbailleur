import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Proprietaires from './pages/Proprietaire'

import Sites from "./pages/Sites";
import NotFound from './pages/NotFound';
import DetailProprietaire from './components/PageProprietaire/detailsProprio';
import Contrat from './pages/Contrat';
import Quartier from './pages/Quartier';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Sites />} />
        <Route path="/proprietaire" element={<Proprietaires />} />
        <Route path="/detailproprio" element={<DetailProprietaire />} />
        <Route path="/contrat" element={<Contrat />} />
        <Route path="/quartier" element={<Quartier />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
