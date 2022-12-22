// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Zoom } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import { Link, useNavigate, useLocation, generatePath } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCustomer } from "../../../store/userSlice";
import "./product.css"

function ProductDetails() {

    const [chatting, setChatting] = useState(true);
    const [title, setTitle] = useState("");
    const { id, jwtToken } = useSelector(selectCustomer);
    // id sản phẩm
    const location = useLocation()
    const idSP = location.pathname.replace("/chitiet/", "");

    // kiểm tra sản phẩm này được thêm vào giỏ hàng hay chưa
    const [addToCart, setAddToCart] = useState(false);
    // thông tin sản phẩm
    const navigate = useNavigate()
    const [itemProduct, setItemProduct] = useState({
        "id": 1,
        "accountId": "1c4ed8f5-97cc-483d-3b20-08dac91fa5f7",
        "name": "air blade đen nhám zin siêu đẹp odo thấp bstp q8 - 100244889",
        "topic": "xe cộ",
        "area": "Hồ Chí Minh",
        "price": 29800000,
        "address": "Xã Vĩnh Lộc B, Huyện Bình Chánh, Tp Hồ Chí Minh",
        "phone": "9594540249",
        "describe": "Airblade Robot 125i Đèn Led From bỏ mẫu khoá từ Xe đk cuối 2019 bản đặc biệt BLACK EDITION ONE BST dễ đọc : 59 - L2 : 324.89 - 32489 Tài Mãi Bốn Mùa Phát Lộc - 100244889",
        "status": 2,
        "image": "string",
        "created": "2022-11-21T09:52:29.9981008"
    });
    useEffect(() => {
        const fetchData = async () => {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'accept': ' text/plain',
                }
            };
            const response = await fetch('https://localhost:7071/api/Item/' + idSP, requestOptions)
            const data = await response.json();
            if (data.accountId == id) setChatting(false);
            setItemProduct(data);

            const requestOptions2 = {
                method: 'GET',
                headers: {
                    'accept': ' text/plain',
                    'Authorization': 'Bearer ' + jwtToken
                }
            };
            const response2 = await fetch('https://localhost:7071/api/Account/' + data.accountId, requestOptions2)
            const data2 = await response2.json();

            setTitle(data2.title);

            const requestOptions3 = {
                method: 'GET',
                headers: {
                    'accept': ' text/plain',
                    'Authorization': 'Bearer ' + jwtToken
                }
            };
            const response3 = await fetch('https://localhost:7071/api/Cart/get?id=' + id + '&page=0&pageSize=40', requestOptions3)
            const data3 = await response3.json();
            const listId = data3.results.map(x => x.itemId);
            let k = listId.indexOf(data.id);
            if (k >= 0) {
                setAddToCart(data3.results[k].id);
            }
        }
        fetchData();
        console.log(itemProduct);
    }, []);

    const formatter = new Intl.NumberFormat('vi', {style : 'currency', currency : 'VND'});
      
    // nội dung
    var content = String.raw`${itemProduct.describe}`;

    const changeAddCart = () => {
        if (addToCart) {
            const fetchData = async (req, res) => {
                try {
                    const requestOptions = {
                        method: 'DELETE',
                        headers: {
                            'accept': ' text/plain',
                            'Authorization': 'Bearer ' + jwtToken
                        },
                        body: JSON.stringify(
                            {
                                "accountId": id,
                                "itemId": idSP
                            })
                    };
                    const response = await fetch('https://localhost:7071/api/Cart/' + addToCart, requestOptions)
                    const data = await response.json();
                    console.log(data);
                } catch (error) {
                    res.send(error.stack);
                }
            }
            fetchData();
            setAddToCart(0);
        }
        else {
            const fetchData = async (req, res) => {
                try {
                    const requestOptions = {
                        method: 'POST',
                        headers: {
                            'accept': ' text/plain',
                            'Authorization': 'Bearer ' + jwtToken,
                            'Content-Type': ' application/json-patch+json'
                        },
                        body: JSON.stringify(
                            {
                                "accountId": id,
                                "itemId": idSP
                            })
                    };
                    const response = await fetch('https://localhost:7071/api/Cart/add', requestOptions)
                    const data = await response.json();
                    console.log(data);
                    setAddToCart(data.id);
                } catch (error) {
                    res.send(error.stack);
                }
            }
            fetchData();
        }
    }
    // slide
    const zoomOutProperties = {
        duration: 5000,
        transitionDuration: 500,
        infinite: true,
        indicators: true,
        scale: 0.4,
        arrows: true
    };
    let ii = itemProduct.image.split("$$$");
    ii.pop();
    let images = ii;

    return (

        <Container>
            <div class="tourTitle d-flex">
                <div>
                    <button className="btn outline btn-outline-primary me-4"
                        onClick={() => navigate(-1)}>
                        Back
                    </button>
                </div>
                <h1>{itemProduct.name}</h1>
            </div>

            <div class="mod-content row">
                <div id="vnt-main" class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                    <div id="vnt-slide-thumbnail" class="slick-init slick-initialized slick-slider">
                        <div class="slick-list draggable">
                            <div class="slick-slide slick-current slick-active so2"
                                data-slick-index="0" aria-hidden="false">
                                <div>
                                    <div class="item so3 d-flex justify-content-center" >
                                        <div className="anh mt-3  ">
                                            <div className="slide-container">
                                                <Zoom {...zoomOutProperties}>
                                                    {images.map((each, index) => (
                                                        <img className="lazy rounded" key={index}
                                                            style={{ height: "22rem", width: "100%" }} src={each}
                                                        />
                                                    ))}
                                                </Zoom>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="boxTour" id="flag1">
                        <div class="title"></div>
                        <div class="content d-flex flex-column so9">
                            <table align="left" border="0" cellpadding="10" cellspacing="10" >
                                <tbody>
                                    <tr>
                                        <td >
                                            <strong><span >Xem thêm:</span></strong>
                                        </td>
                                        <td>
                                            <div>
                                                <Link to={"/danhsachbanhang/" + itemProduct.accountId}>
                                                <button className="btn outline btn-outline-primary">
                                                    Cửa hàng của {title}</button>
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong><span >Giỏ hàng:</span></strong>
                                        </td>
                                        <td>
                                            {addToCart ?
                                                <button className="btn outline btn-outline-danger"
                                                    onClick={changeAddCart}>Xóa</button>
                                                :
                                                <button className="btn outline btn-outline-primary"
                                                    onClick={changeAddCart}>Thêm</button>
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong><span >Nhắn tin với người bán:</span></strong>
                                        </td>
                                        <td>
                                            {chatting && <div className="p-1">
                                                <Link to={"/chat/" + itemProduct.accountId}>
                                                    <button className="btn outline btn-outline-primary">Chat</button>
                                                </Link>
                                            </div>}</td>
                                    </tr>
                                
                                    <tr>
                                        <td>&nbsp;</td>
                                        <td>&nbsp;</td>
                                    </tr>
                                </tbody>
                            </table>
                            <p ><em>{content}</em></p>
                        </div>
                    </div>
                    <div id="flagEnd"></div>
                </div>
                <div id="vnt-sidebar" class="col-lg-4 col-md-4 col-sm-12 col-xs-12 hidden-sm hidden-xs">
                    <div class="boxDesign1">
                        <div class="name">{itemProduct.name}</div>
                        <div class="attr">
                            <ul>
                                <li>
                                    <div class="at">Giá: </div>
                                    <div class="as">{formatter.format(itemProduct.price)}</div>
                                </li>
                                <li>
                                    <div class="at">Số điện thoại:</div>
                                    <div class="as">{itemProduct.phone}</div>
                                </li>
                                <li>
                                    <div class="at">Thể loại:</div>
                                    <div class="as">{itemProduct.topic}</div>
                                </li>
                                <li>
                                    <div class="at">Vị trí:</div>
                                    <div class="as">{itemProduct.address}</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default ProductDetails;