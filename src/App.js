import './assets/styles/App.scss';
import 'antd/dist/antd.css';
import Header from './components/header/Header';
import Login from './layouts/login/Login';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Register from './layouts/register/Register';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
