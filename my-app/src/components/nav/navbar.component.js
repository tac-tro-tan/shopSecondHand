// @ts-nocheck
import { generatePath, Link } from "react-router-dom";
import {
    Navbar,
    Nav,
    NavDropdown,
    Container
} from 'react-bootstrap';
import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { selectCustomer, updateCustomer } from "../../store/userSlice";

function Nabar() {

    // data đăng nhập
    const { title, id } = useSelector(selectCustomer);
    const dispatch = useDispatch();
    function handleClick() {
        dispatch(updateCustomer(""));
    }

    return (
        <>
            <Navbar bg="primary" variant="light" expand="lg" >
                <Navbar.Brand href="/"><img
                    src="https://inkythuatso.com/uploads/images/2021/09/logo-cong-an-09-13-27-02.jpg-09-13-27-02.jpg"
                    alt="" width={30} height={30} style={{ marginLeft: 80 }}
                />MUA BÁN ĐỒ CŨ</Navbar.Brand>
                <NavDropdown.Divider />
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" >
                </Navbar.Collapse>
            </Navbar>
            <Navbar style={{backgroundColor: "rgb(167, 190, 32)"}}>
                <Container>
                    {title ?
                        <Nav >
                            <Nav.Link as={Link} to="/">TRANG CHỦ</Nav.Link>
                            <Nav.Link as={Link} to={generatePath("/danhsachbanhang/:idc", { idc: id })}>ĐƠN BÁN</Nav.Link>
                            <Nav.Link as={Link} to="/giohang">GIỎ HÀNG</Nav.Link>
                            <Nav.Link as={Link} to="/gopy">GÓP Ý</Nav.Link>
                            <Nav.Link as={Link} to="/chat">TIN NHẮN</Nav.Link>
                        </Nav>
                        :
                        <Nav >
                            <Nav.Link as={Link} to="/">TRANG CHỦ</Nav.Link>
                        </Nav>}

                    <Nav pullright>
                        {title ?
                            <NavDropdown title={title} align="end" >
                                <NavDropdown.Item >
                                    <Nav.Link as={Link} to="/thongtincanhan">THÔNG TIN CÁ NHÂN</Nav.Link>
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item >
                                    <Nav.Link as={Link} to="/dangnhap" onClick={handleClick}>ĐĂNG XUẤT</Nav.Link>
                                </NavDropdown.Item>
                            </NavDropdown>
                            :
                            <Nav.Link as={Link} to="/dangnhap" onClick={handleClick}>ĐĂNG NHẬP/ĐĂNG KÝ</Nav.Link>
                        }



                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}
export default Nabar;