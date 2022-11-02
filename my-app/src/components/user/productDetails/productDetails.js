// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import "./productDetails.css";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import { Link, useNavigate, useLocation, generatePath } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCustomer } from "../../../store/userSlice";

function ProductDetails() {
    // id sản phẩm
    const location = useLocation()
    const idSP = location.pathname.replace("/chitiet/", "");
    // id các sản phẩm được mình lưu
    const { cart } = useSelector(selectCustomer);
    // kiểm tra sản phẩm này được thêm vào giỏ hàng hay chưa
    const [addToCart, setAddToCart] = useState(cart.includes(Number(idSP)));
    // thông tin sản phẩm
    const navigate = useNavigate()
    const [itemProduct, setItemProduct] = useState([{
        "id": {
            "idSP": 0,
            "SDT": "",
            "idCustomer": 0
        },
        "data": {
            "status": true,
            "city": "",
            "address": "",
            "category": "",
            "title": "",
            "description": " ",
            "image": "https://cdn.chotot.com/mK4xJxBedDtJWuqdwu_23RvMyoO7qm-bt4Gg5NpdVBs/preset:view/plain/2e29b541396806f88d579f1ba3e07b37-2794832054110024626.jpg",
            "price": 0,
            "siteURL": "https://xe.chotot.com/mua-ban-oto-quan-cau-giay-ha-noi/100072055.htm"
        }
    }]);
    useEffect(() => {
        const fetchData = async () => {
            const requestOptions = {
                method: 'GET'
            };
            const response = await fetch('http://localhost:3003/sanPham', requestOptions)
            const data = await response.json();
            setItemProduct(data.filter(a => a.id.idSP == idSP));
        }
        fetchData();
    }, []);

    var title = String.raw`
             ___| |_  ___  _____ __      _  ___  _____ ___
            / __| __|/ _  |  __/ \ \ /\ / // _  |  __// __|
            \__ | |_  (_| | |     \ V  V /  (_| | |   \__ |
            |___/\__|\__,_|_|      \_/\_/  \__,_|_|   |___/
        `;
    var content = String.raw`${itemProduct[0].data.description}`;

    const slideImages = [
        {
            url: 'http://dummyimage.com/154x183.png/5fa2dd/ffffff',
            caption: 'ảnh 1'
        },
        {
            url: 'https://www.elle.vn/wp-content/uploads/2017/07/25/hinh-anh-dep-1.jpg',
            caption: 'ảnh 1'
        },

        {
            url: 'https://i.pinimg.com/736x/56/86/03/568603cbd1860c67bf8f6776cbe7f885.jpg',
            caption: 'ảnh 1'
        },
    ];

    const changeAddCart = () => {
        setAddToCart(!addToCart);
    }

    return (

        <Container>
            <div className="mx-auto col text-center scroll-container" >
                <section id="phapluat" className="divv">
                    <div className="d-flex justify-content-between w-100 mt-3">

                        <div className="d-flex flex-column align-items-start" style={{ textAlign: "start" }}>
                            <div className="d-flex">
                                <div>
                                    <button className="btn outline btn-outline-primary me-4"
                                        onClick={() => navigate(-1)}>
                                        Back
                                    </button>
                                </div>
                                <div>
                                    <Link to={generatePath("/danhsachbanhang/:idc", { idc: itemProduct[0].id.idCustomer })}>
                                        <button className="btn outline btn-outline-primary">Cửa hàng</button>
                                    </Link>
                                </div>
                            </div>

                            <div className="p-1 " ><h4>{itemProduct[0].data.title}</h4></div>
                            <div className="p-1">
                                <Link to="/">
                                    <button className="btn outline btn-outline-primary">Chat với người bán</button>
                                </Link>
                            </div>
                            {addToCart ?
                                <div className="p-1">
                                    <button className="btn outline btn-outline-danger"
                                        onClick={changeAddCart}>Xóa khỏi giỏ hàng</button>
                                </div>
                                :
                                <div className="p-1">
                                    <button className="btn outline btn-outline-primary"
                                        onClick={changeAddCart}>Thêm vào giỏ hàng</button>
                                </div>
                            }

                            <div className="border border-info rounded p-1">
                                <div className="p-1"><span >giá: {itemProduct[0].data.price} đồng</span></div>
                                <div className="p-1"><span >sdt: {itemProduct[0].id.SDT}</span></div>
                                <div className="p-1"><span >thể loại: {itemProduct[0].data.category}</span></div>
                                <div className="p-1"><span >Vị trí: {itemProduct[0].data.address}</span></div>

                            </div>


                        </div>
                        <div className="anh mt-3">
                            <div className="slide-container" >
                                <Slide>
                                    {slideImages.map((slideImage, index) => (
                                        <div className="each-slide d-flex flex-column img-responsive-wrap " key={index}>
                                            <img style={{ width: "100%", height: "100%" }} className="lazy img-thumbnail img-inner" src={itemProduct[0].data.image} alt="sample" />

                                        </div>
                                    ))}
                                </Slide>
                            </div>
                        </div>
                    </div>


                    <div className="mt-3">

                        <pre style={{ textAlign: "start" }}>
                            {content}
                        </pre>

                        <div>
                            <pre> {title} </pre>
                        </div>

                    </div>


                </section>
            </div>
        </Container>
    );
}

export default ProductDetails;