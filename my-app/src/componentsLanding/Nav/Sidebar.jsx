import React from "react";
import styled from "styled-components";
// Assets
import CloseIcon from "../../assets/svg/CloseIcon";
import LogoIcon from "../../assets/svg/Logo";
//Navbar cũ
import { generatePath, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { selectCustomer, updateCustomer } from "../../store/userSlice";
import {
  Nav,
  NavDropdown
} from 'react-bootstrap';

export default function Sidebar({ sidebarOpen, toggleSidebar }) {
  // data đăng nhập
  const { title, id } = useSelector(selectCustomer);
  const dispatch = useDispatch();
  function handleClick() {
    dispatch(updateCustomer(""));
  }
  return (
    <Wrapper className="animate darkBg" sidebarOpen={sidebarOpen}>
      <SidebarHeader className="flexSpaceCenter">
        <Link
          onClick={() => toggleSidebar(!sidebarOpen)}
          className="flexNullCenter" to="tintuc">
          <LogoIcon />
          <h1 style={{ marginLeft: "15px" }} className="font20 whiteColor">
            Chợ cũ
          </h1>
        </Link>
        <CloseBtn onClick={() => toggleSidebar(!sidebarOpen)} className="animate pointer">
          <CloseIcon />
        </CloseBtn>
      </SidebarHeader>

      <UlStyle className="flexNullCenter flexColumn">
        {title ?
          <React.Fragment>
            <li className="semiBold font15 pointer">
              <Link
                onClick={() => toggleSidebar(!sidebarOpen)}
                activeClass="active"
                className="whiteColor"
                spy={true}
                smooth={true}
                offset={-60} to="/" style={{ padding: "10px 15px" }}>Chợ</Link>
            </li>
            <li className="semiBold font15 pointer">
              <Link
                onClick={() => toggleSidebar(!sidebarOpen)}
                activeClass="active"
                className="whiteColor"
                spy={true}
                smooth={true}
                offset={-60} to={generatePath("/danhsachbanhang/:idc", { idc: id })}
                style={{ padding: "10px 15px" }}
              >
                Cửa hàng của tôi
              </Link>
            </li>
            <li className="semiBold font15 pointer">
              <Link
                onClick={() => toggleSidebar(!sidebarOpen)}
                activeClass="active"
                className="whiteColor"
                spy={true}
                smooth={true}
                offset={-60} style={{ padding: "10px 15px" }} to="/giohang">Giỏ hàng</Link>
            </li>
            <li className="semiBold font15 pointer">
              <Link
                onClick={() => toggleSidebar(!sidebarOpen)}
                activeClass="active"
                className="whiteColor"
                spy={true}
                smooth={true}
                offset={-60} style={{ padding: "10px 15px" }} to="/gopy">Góp ý</Link>
            </li>
            <li className="semiBold font15 pointer">
              <Link
                onClick={() => toggleSidebar(!sidebarOpen)}
                activeClass="active"
                className="whiteColor"
                spy={true}
                smooth={true}
                offset={-60} style={{ padding: "10px 15px" }} to={"/chat/" + id}>Tin nhắn</Link>
            </li>
          </React.Fragment> :
          <React.Fragment>
            <li className="semiBold font15 pointer">
              <Link
                onClick={() => toggleSidebar(!sidebarOpen)}
                activeClass="active"
                className="whiteColor"
                spy={true}
                smooth={true}
                offset={-60} to="tintuc" style={{ padding: "10px 15px" }}>Tin tức</Link>
            </li>
            <li className="semiBold font15 pointer">
              <Link
                onClick={() => toggleSidebar(!sidebarOpen)}
                activeClass="active"
                className="whiteColor"
                spy={true}
                smooth={true}
                offset={-60} to="/" style={{ padding: "10px 15px" }}>Chợ</Link>
            </li>
          </React.Fragment>
        }
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
      </UlStyle>
    </Wrapper>
  );
}

const Wrapper = styled.nav`
  width: 400px;
  height: 100vh;
  position: fixed;
  top: 0;
  padding: 0 30px;
  right: ${(props) => (props.sidebarOpen ? "0px" : "-400px")};
  z-index: 9999;
  @media (max-width: 400px) {
    width: 100%;
  }
`;
const SidebarHeader = styled.div`
  padding: 20px 0;
`;
const CloseBtn = styled.button`
  border: 0px;
  outline: none;
  background-color: transparent;
  padding: 10px;
`;
const UlStyle = styled.ul`
  padding: 40px;
  li {
    margin: 20px 0;
  }
`;
