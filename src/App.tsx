import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Proprietaires from './pages/Proprietaire'

import Sites from "./pages/Sites";
import NotFound from './pages/NotFound';
import DetailProprietaire from './components/PageProprietaire/detailsProprio';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Sites />} />
        <Route path="/proprietaire" element={<Proprietaires />} />
        <Route path="/detailproprio" element={<DetailProprietaire />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
