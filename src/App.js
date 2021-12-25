import './assets/styles/App.scss';
import 'antd/dist/antd.css';
import Header from './components/header/Header';
import Login from './layouts/login/Login';
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Register from './layouts/register/Register';
import Hompage from './layouts/homepage/Hompage';
import Home from './layouts/homepage/Home';
import Account from './layouts/account/Account';
import Analysis from './layouts/analysis/Analysis';
import ViewPopulation from './layouts/view/ViewPopulation';
import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';
import Declare from './layouts/declare/Declare';
import Profile from './layouts/profile/Profile';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route exact path="/login" element={<PublicRoute />}>
            <Route exact path='/login' element={<Login/>}/>
          </Route>
          <Route exact path="/register" element={<PrivateRoute />}>
            <Route exact path='/register' element={<Register/>}/>
          </Route>
          <Route exact path="/declare" element={<PrivateRoute />}>
            <Route exact path='/declare' element={<Declare/>}/>
          </Route>
          <Route exact path="/edit/:id" element={<PrivateRoute />}>
            <Route exact path='/edit/:id' element={<Declare type="EDIT" />}/>
          </Route>
          <Route exact path="/profile" element={<PrivateRoute />}>
            <Route exact path='/profile' element={<Profile />}/>
          </Route>
          <Route exact path="/" element={<Navigate replace to="/login" />} />
          
          <Route exact path="/dashboard" element={<PrivateRoute />}>
            <Route exact path="/dashboard" element={<Hompage />} >
              <Route index element={<Navigate replace to="/dashboard/account" />} />
              <Route path={`account`} element={<Account />} />
              <Route path={`analysis`} element={<Analysis />} />
              <Route path={`population`} element={<ViewPopulation />} />
            </Route>
          </Route>

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
