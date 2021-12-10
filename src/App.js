import './assets/styles/App.scss';
import 'antd/dist/antd.css';
import Header from './components/header/Header';
import Login from './layouts/login/Login';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Register from './layouts/register/Register';
import Hompage from './layouts/homepage/Hompage';
import Home from './layouts/homepage/Home';
import Account from './layouts/account/Account';
import Analysis from './layouts/analysis/Analysis';
import ViewPopulation from './layouts/view/ViewPopulation';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route path="/home" element={<Hompage />} >
            <Route index element={<Home />} />
            <Route path={`account`} element={<Account />} />
            <Route path={`analysis`} element={<Analysis />} />
            <Route path={`population`} element={<ViewPopulation />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
