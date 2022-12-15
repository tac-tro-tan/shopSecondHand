// @ts-nocheck
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'react-pro-sidebar/dist/css/styles.css';
import Home from './components/user/home/Home.component';
import ProductDetails from './components/user/productDetails/productDetails';
import Login from './components/login/login';
import PersonInfor from './components/user/personInfor/personInfor';
import ChangePass from './components/user/changePasswork/changePass';
import Sell from './components/user/sell/sell';
import AddSellItem from './components/user/sell/addSell/addSellItem';
import 'react-slideshow-image/dist/styles.css'
import DetailSellItem from './components/user/sell/detailSell/detailSellItem';
import MyCart from './components/user/myCart/myCart';
import FeedBack from './components/user/feedBack/feedBack';
import { useSelector } from 'react-redux';
import { selectCustomer } from './store/userSlice';
import Protected from './components/protectPath/protected';
import Chat from './components/user/chat/chat';
import Footer from "./componentsLanding/Sections/Footer"

import { Helmet } from "react-helmet";
// Screens
import Landing from "./screens/Landing.jsx";
import "./App.css";
import TopNavbar from './componentsLanding/Nav/TopNavbar';
import CheckOutPay from './components/user/sell/checkoutPay';
import { NotificationContainer } from 'react-notifications';

function App() {

  const { title } = useSelector(selectCustomer);

  return (
    <Router>
      <TopNavbar />
      <div className='minibody'>
        <Routes>
          <Route path="tintuc" element={
            <>
              <Helmet>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link href="https://fonts.googleapis.com/css2?family=Khula:wght@400;600;800&display=swap" rel="stylesheet" />
              </Helmet>
              <Landing />
            </>
          } />
          <Route path="/home" element={<Home />} />
          {/* sửa mọi đường dẫn vớ vẩn thành /home */}
          <Route path="*" element={<Navigate replace to="/tintuc" />} />
          <Route exact path="/dangnhap" element={<Login />} />
          <Route path="/chitiet/:idd" element={<ProductDetails />} />
          <Route exact path="/danhsachbanhang/:idc" element={<Sell />} />

          {/* <Protected/> giúp: nếu ko có tài khoản mà nhấn vào
             /thongtincanhan thi chuyen huong den trang /home */}
          <Route exact path="/thongtincanhan" element={<Protected isLoggedIn={title}>
            <PersonInfor />
          </Protected>
          } />
          <Route exact path="/doimatkhau" element={<Protected isLoggedIn={title}>
            <ChangePass />
          </Protected>} />
          <Route exact path="/themdonban" element={<Protected isLoggedIn={title}>
            <AddSellItem />
          </Protected>} />
          <Route exact path="/chitietdonban/:idb" element={<Protected isLoggedIn={title}>
            <DetailSellItem />
          </Protected>} />
          <Route exact path="/checkoutpay/:idb" element={<Protected isLoggedIn={title}>
            <CheckOutPay />
          </Protected>} />
          <Route exact path="/giohang" element={<Protected isLoggedIn={title}>
            <MyCart />
          </Protected>} />
          <Route exact path="/gopy" element={<Protected isLoggedIn={title}>
            <FeedBack />
          </Protected>} />
          <Route path="/chat/:idc" element={<Protected isLoggedIn={title}>
            <Chat />
          </Protected>} />
        </Routes>
        <NotificationContainer />
      </div>
      <Footer />
    </Router>
  );
}

export default App;
