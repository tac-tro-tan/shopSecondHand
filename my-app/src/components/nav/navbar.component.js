// @ts-nocheck
import { generatePath, Link } from "react-router-dom";
import {
    Nav,
    NavDropdown
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
            <nav className='navbar navbar-expand-lg navbar-light bg-light'>
                <div className='container'>
                    <div className='navbar-header'>
                        <div className='btn1 navbar-brand page-scroll'>
                            <Link to="tintuc" className='btn1 page-scroll'>Chợ cũ</Link>
                        </div>
                    </div>

                    <div className='collapse navbar-collapse'>
                        <ul className='d-flex nav navbar-nav navbar-right'>
                            {title ?
                                <React.Fragment>
                                    <li>
                                        <Link to="tintuc" className='btn1 page-scroll'>Tin tức</Link>
                                    </li>
                                    <li>
                                        <Link to="/" className='btn1 page-scroll'>Chợ</Link>
                                    </li>
                                    <li>
                                        <Link to={generatePath("/danhsachbanhang/:idc", { idc: id })}
                                            className='btn1 page-scroll'
                                        >
                                            Cửa hàng của tôi
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className='btn1 page-scroll' to="/giohang">Giỏ hàng</Link>
                                    </li>
                                    <li>
                                        <Link className='btn1 page-scroll' to="/gopy">Góp ý</Link>
                                    </li>
                                    <li>
                                        <Link className='btn1 page-scroll' to={"/chat/" + id}>Tin nhắn</Link>
                                    </li>
                                    <li>
                                        <NavDropdown title={title} align="end">
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
                                    </li>
                                </React.Fragment> :
                                <React.Fragment>
                                    <li>
                                        <Link to="tintuc" className='btn1 page-scroll'>Tin tức</Link>
                                    </li>
                                    <li>
                                        <Link to="/" className='btn1 page-scroll'>Chợ</Link>
                                    </li>
                                    <li>
                                        <Link className='btn1 page-scroll'
                                            to="/dangnhap"
                                            onClick={handleClick}>
                                            Đăng nhập/Đăng ký
                                        </Link>
                                    </li>
                                </React.Fragment>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}
export default Nabar;