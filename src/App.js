
import './App.css';
import Headers from './components/Headers';
import Home from './pages/Home';
import Footer from './components/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import Forgotpassword from './pages/Forgotpassword';
import Admin from './pages/Admin';
import User from './pages/User';
import Addproduct from './pages/Addproduct';
import Adminnav from './pages/Adminnav';
import Viewproduct from './pages/Viewproduct';
import Vieworders from './pages/Vieworders';
import Viewusers from './pages/Viewusers';
import Editprofile from './pages/Editprofile';
import Editproduct from './pages/Editproduct';
import Home2 from './pages/Home2';
import Men from './pages/Men';
import Women from './pages/Women';
import Kids from './pages/Kids';
import Changepassword from './pages/Changepassword';
import Usereditprofile from './pages/Usereditprofile';
import Wishlist from './pages/Wishlist';
import Viewcart from './pages/Viewcart';
import Payment from './pages/Payment';
import Checkout from './pages/Checkout';
import Success from './pages/Success';
import { Route,Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <div className="App">
      <Headers/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/forgotpassword' element={<Forgotpassword/>}/>
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/user' element={<User/>}/>
        <Route path='/addproduct' element={<Addproduct/>}/>
        <Route path='/adminnav' element={<Adminnav/>}/>
        <Route path='/viewproduct' element={<Viewproduct/>}/>
        <Route path='/vieworders' element={<Vieworders/>}/>
        <Route path='/viewusers' element={<Viewusers/>}/>
        <Route path='/editprofile' element={<Editprofile/>}/>
        <Route path='/editproduct' element={<Editproduct/>}/>
        <Route path='/home2' element={<Home2/>}/>
        <Route path='/men' element={<Men/>}/>
        <Route path='/women' element={<Women/>}/>
        <Route path='/kids' element={<Kids/>}/>
        <Route path='/change' element={<Changepassword/>}/>
        <Route path='/usereditprofile' element={<Usereditprofile/>}/>
        <Route path='/wishlist' element={<Wishlist/>}/>
        <Route path='/viewcart' element={<Viewcart/>}/>
        <Route path='/payment' element={<Payment/>}/>
        <Route path='/checkout' element={<Checkout/>}/>
        <Route path='/success' element={<Success/>}/>
        

      </Routes>
      <Footer/>
      <ToastContainer/>
      
     
    </div>
  );
}

export default App;
