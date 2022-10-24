// @ts-nocheck
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
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


    const [scrolls, setScrolls] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 70) {
                setScrolls(true);
            }
            else setScrolls(false);
        }
        window.addEventListener('scroll', handleScroll);
        //Cleanup function
        // xóa event khi hàm unmounted
        return (() => {
            window.removeEventListener('scroll', handleScroll);
        })
    }, []);
    let backgroud = { backgroundColor: (scrolls) ? "#321" : "#124" };

    // data đăng nhập
    const { title, role } = useSelector(selectCustomer);
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
            {scrolls && <div style={{ height: 70 }}></div>}
            <Navbar fixed={scrolls && "top"} style={backgroud}
            >
                <Container>
                    {role == 1 ?
                        <Nav >
                            <Nav.Link as={Link} to="/">TRANG CHỦ</Nav.Link>
                            <Nav.Link as={Link} to="/danhsachbanhang">ĐƠN BÁN</Nav.Link>
                            <Nav.Link as={Link} to="/giohang">GIỎ HÀNG</Nav.Link>
                            <Nav.Link as={Link} to="/gopy">GÓP Ý</Nav.Link>
                            <Nav.Link as={Link} to="/thongtincanhan">THÔNG TIN CÁ NHÂN</Nav.Link>
                        </Nav>
                        : role == 2 ?
                            <Nav >
                                <Nav.Link as={Link} to="/">TÀI KHOẢN</Nav.Link>
                                <Nav.Link as={Link} to="/gopy">GÓP Ý</Nav.Link>
                                <Nav.Link as={Link} to="/thongtincanhan">THÔNG TIN CÁ NHÂN</Nav.Link>
                            </Nav>
                            :
                            <Nav >
                                <Nav.Link as={Link} to="/">TRANG CHỦ</Nav.Link>
                            </Nav>}

                    <Nav pullright>

                        <Nav.Link as={Link} to="/dangnhap" onClick={handleClick}>{title ? `${title}` : "ĐĂNG NHẬP/ĐĂNG KÝ"}</Nav.Link>

                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}
export default Nabar;