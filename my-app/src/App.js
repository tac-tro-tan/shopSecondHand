import './App.css';
import Footer from './components/footer/footer';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'react-pro-sidebar/dist/css/styles.css';
import Nabar from './components/nav/navbar.component';
import Home from './components/user/home/Home.component';
import ProductDetails from './components/user/productDetails/productDetails';
import Login from './components/login/login';
import PersonInfor from './components/user/personInfor/personInfor';
import ChangePass from './components/user/changePasswork/changePass';
import Sell from './components/user/sell/sell';
import AddSellItem from './components/user/sell/addSell/addSellItem';
import 'react-slideshow-image/dist/styles.css'
import DetailSellItem from './components/user/sell/detailSell/detailSellItem';

function App() {
  return (<>
    <Router>
      <div className="App">
        <Nabar />
        <div className='minibody'>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/chitiet" element={<ProductDetails />} />
            <Route exact path="/dangnhap" element={<Login />} />
            <Route exact path="/thongtincanhan" element={<PersonInfor />} />
            <Route exact path="/doimatkhau" element={<ChangePass />} />
            <Route exact path="/danhsachbanhang" element={<Sell />} />
            <Route exact path="/themdonban" element={<AddSellItem />} />
            <Route exact path="/chitietdonban" element={<DetailSellItem />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  </>
  );
}

export default App;
