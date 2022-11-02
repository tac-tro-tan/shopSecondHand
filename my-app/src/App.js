// @ts-nocheck
import './App.css';
import Footer from './components/footer/footer';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
import MyCart from './components/user/myCart/myCart';
import FeedBack from './components/user/feedBack/feedBack';
import { useSelector } from 'react-redux';
import { selectCustomer } from './store/userSlice';
import Protected from './components/protectPath/protected';
import Chat from './components/user/chat/chat';

function App() {

  const { title } = useSelector(selectCustomer);

  return (<>
    <Router>
      <div className="App">
        <Nabar />
        <div className='minibody'>
          <Routes>
            <Route path="home" element={<Home />} />
            {/* sửa mọi đường dẫn vớ vẩn thành /home */}
            <Route path="*" element={<Navigate replace to="/home" />} />
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
            <Route exact path="/giohang" element={<Protected isLoggedIn={title}>
              <MyCart />
            </Protected>} />
            <Route exact path="/gopy" element={<Protected isLoggedIn={title}>
              <FeedBack />
            </Protected>} />
            <Route path="/chat" element={<Protected isLoggedIn={title}>
              <Chat />
            </Protected>} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  </>
  );
}

export default App;
