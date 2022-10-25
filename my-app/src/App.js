// @ts-nocheck
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
import MyCart from './components/user/myCart/myCart';
import FeedBack from './components/user/feedBack/feedBack';

function App() {
  

  // const [listItemCart,setListItemCart] = useState([]);
  // useEffect(()=>{
  //   const fetchData = async () => {
  //     const requestOptions = {
  //         method: 'GET'
  //     };
  //     const response = await fetch('http://localhost:3003/sanPham', requestOptions)
  //     const data = await response.json();
  //     setListItemCart(data.filter(a=>a.id.idCustomer == idAcc));
  // }
  // fetchData();
  // },[])

  return (<>
    <Router>
      <div className="App">
        <Nabar />
        <div className='minibody'>
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/chitiet" element={<ProductDetails />} />
            <Route exact path="/dangnhap" element={<Login />} />
            <Route exact path="/thongtincanhan" element={<PersonInfor />} />
            <Route exact path="/doimatkhau" element={<ChangePass />} />
            <Route exact path="/danhsachbanhang" element={<Sell />} />
            <Route exact path="/themdonban" element={<AddSellItem />} />
            <Route exact path="/chitietdonban" element={<DetailSellItem />} />
            <Route exact path="/giohang" element={<MyCart />} />
            <Route exact path="/gopy" element={<FeedBack />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  </>
  );
}

export default App;
