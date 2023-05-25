import './App.css';
import {Route, Routes} from "react-router-dom";
import Ofertas from "./pages/ofertas/index";
import Modal from './components/Modal/index';

function App() {
  return (
     <div className="App">
         <Routes>
             <Route exact path="/" element={<Home />} />
             <Route path="/ofertas/:slug/:id" element={<Ofertas />} />
             <Route path="*" element={<>Página não encontrada</>}/>
         </Routes>
     </div>
  );
}

const Home = () => (
    <div>
        Home
    </div>
);

export default App;
