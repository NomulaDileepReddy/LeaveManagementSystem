import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import UserDashboard from './Pages/usermodule/UserDashboard';
import ProtectedRoutes from './Pages/ProtectedRoutes';
import MyLeave from './Pages/usermodule/MyLeave';
import ApplyLeave from './Pages/usermodule/ApplyLeave';
import AdminDashboard from './Pages/adminmodule/AdminDashboard'
import AllLeave from './Pages/adminmodule/AllLeave';
import AllUsers from './Pages/adminmodule/AllUsers';
import Balance from './Pages/usermodule/Balance';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Public Pages */}

          <Route path='/' element={<ProtectedRoutes path="/login">
            <UserDashboard />
          </ProtectedRoutes>}>

          </Route>
          <Route path='/signup' element={<Signup />}></Route>
          {/* Private Pages */}
          <Route path='/userdashboard' element={<ProtectedRoutes path="/">
            <UserDashboard />
          </ProtectedRoutes>}>
          </Route>
          <Route path='/applyleave' element={<ProtectedRoutes path="/">
            <ApplyLeave />
          </ProtectedRoutes>}>
          </Route>
          <Route path='/myleave' element={<ProtectedRoutes path="/">
            <MyLeave />
          </ProtectedRoutes>}>
          </Route>

          <Route path='/balance' element={<ProtectedRoutes path="/">
            <Balance />
          </ProtectedRoutes>}>
          </Route>

          <Route path='/login' element={<Login />}></Route>
          <Route path='/admindashboard' element={<AdminDashboard/>}></Route>
          <Route path='/allleave' element={<AllLeave/>}></Route>
          <Route path='/allusers' element={<AllUsers/>}></Route>
        </Routes>
      </BrowserRouter>
    </div >
  );
}

export default App;
