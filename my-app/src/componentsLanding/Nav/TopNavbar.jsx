import React, { useEffect, useState } from "react";
import styled from "styled-components";
// Components
import Sidebar from "../Nav/Sidebar";
import Backdrop from "../Elements/Backdrop";
// Assets
import LogoIcon from "../../assets/svg/Logo";
import BurgerIcon from "../../assets/svg/BurgerIcon";
//Navbar cũ
import { generatePath, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { selectCustomer, updateCustomer } from "../../store/userSlice";
import {
  Nav,
  NavDropdown
} from 'react-bootstrap';


export default function TopNavbar() {
  // data đăng nhập
  const { title, id } = useSelector(selectCustomer);
  const dispatch = useDispatch();
  function handleClick() {
    dispatch(updateCustomer(""));
  }

  const [y, setY] = useState(window.scrollY);
  const [sidebarOpen, toggleSidebar] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => setY(window.scrollY));
    return () => {
      window.removeEventListener("scroll", () => setY(window.scrollY));
    };
  }, [y]);


  return (
    <>
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      {sidebarOpen && <Backdrop toggleSidebar={toggleSidebar} />}
      <Wrapper className="flexCenter animate whiteBg" style={y > 100 ? { height: "60px" } : { height: "80px" }}>
        <NavInner className="container flexSpaceCenter">
          <Link className="pointer flexNullCenter" to="tintuc" smooth={true}>
            <LogoIcon />
            <h1 style={{ marginLeft: "15px" }} className="font20 extraBold">
              Chợ cũ
            </h1>
          </Link>
          <BurderWrapper className="pointer" onClick={() => toggleSidebar(!sidebarOpen)}>
            <BurgerIcon />
          </BurderWrapper>
          <UlWrapper className="flexNullCenter">
            {title ?
              <React.Fragment>
                <li className="semiBold font15 pointer">
                  <Link to="tintuc" style={{ padding: "10px 15px" }}>Tin tức</Link>
                </li>
                <li className="semiBold font15 pointer">
                  <Link to="/" style={{ padding: "10px 15px" }}>Chợ</Link>
                </li>
                <li className="semiBold font15 pointer">
                  <Link to={generatePath("/danhsachbanhang/:idc", { idc: id })}
                    style={{ padding: "10px 15px" }}
                  >
                    Cửa hàng của tôi
                  </Link>
                </li>
                <li className="semiBold font15 pointer">
                  <Link style={{ padding: "10px 15px" }} to="/giohang">Giỏ hàng</Link>
                </li>
                <li className="semiBold font15 pointer">
                  <Link style={{ padding: "10px 15px" }} to="/gopy">Góp ý</Link>
                </li>
                <li className="semiBold font15 pointer">
                  <Link style={{ padding: "10px 15px" }} to={"/chat/" + id}>Tin nhắn</Link>
                </li>
              </React.Fragment> :
              <React.Fragment>
                <li className="semiBold font15 pointer">
                  <Link to="tintuc" style={{ padding: "10px 15px" }}>Tin tức</Link>
                </li>
                <li className="semiBold font15 pointer">
                  <Link to="/" style={{ padding: "10px 15px" }}>Chợ</Link>
                </li>
              </React.Fragment>
            }
          </UlWrapper>
          <UlWrapperRight className="flexNullCenter">
            {title ?
              <li className="semiBold font15 pointer flexCenter">
                <NavDropdown title={title} align="end" className="radius8 lightBg"
                  style={{ padding: "10px 15px" }}>
                  <NavDropdown.Item >
                    <Nav.Link as={Link} to="/thongtincanhan">
                      Thông tin cá nhân
                    </Nav.Link>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item >
                    <Nav.Link as={Link} to="/dangnhap" onClick={handleClick}>
                      Đăng xuất
                    </Nav.Link>
                  </NavDropdown.Item>
                </NavDropdown>
              </li> :
              <li className="semiBold font15 pointer">
                <Link style={{ padding: "10px 30px 10px 0" }}
                  to="/dangnhap"
                  onClick={handleClick}>
                  Log in
                </Link>
              </li>
            }
          </UlWrapperRight>
        </NavInner>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.nav`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
`;
const NavInner = styled.div`
  position: relative;
  height: 100%;
`
const BurderWrapper = styled.button`
  outline: none;
  border: 0px;
  background-color: transparent;
  height: 100%;
  padding: 0 15px;
  display: none;
  @media (max-width: 760px) {
    display: block;
  }
`;
const UlWrapper = styled.ul`
  display: flex;
  @media (max-width: 760px) {
    display: none;
  }
`;
const UlWrapperRight = styled.ul`
  @media (max-width: 760px) {
    display: none;
  }
`;


