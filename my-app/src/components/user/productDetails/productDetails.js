// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Zoom } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import { Link, useNavigate, useLocation, generatePath } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCustomer } from "../../../store/userSlice";

function ProductDetails() {

    const [chatting,setChatting]= useState(true);
    const [title, setTitle] = useState("");
    const { id,jwtToken } = useSelector(selectCustomer);
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
            if(data.accountId == id) setChatting(false);
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
            const response3 = await fetch('https://localhost:7071/api/Cart/get?id='+id+'&page=0&pageSize=40', requestOptions3)
            const data3 = await response3.json();
            const listId = data3.results.map(x=>x.itemId);
            let k = listId.indexOf(data.id);
            if(k>=0){
                setAddToCart(data3.results[k].id);
            }
        }
        fetchData();
        console.log(itemProduct);
    }, []);

    var title2 = String.raw`
             ___| |_  ___  _____ __      _  ___  _____ ___
            / __| __|/ _  |  __/ \ \ /\ / // _  |  __// __|
            \__ | |_  (_| | |     \ V  V /  (_| | |   \__ |
            |___/\__|\__,_|_|      \_/\_/  \__,_|_|   |___/
    `;
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
                    const response = await fetch('https://localhost:7071/api/Cart/'+addToCart, requestOptions)
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

            <div className="mx-auto col text-center scroll-container" >
                {/* <div class="tourTitle">
                    <h1>Tour Miền Bắc Du lịch Vịnh Hạ Long - Yên Tử - Sapa - Bản Cát Cát từ Sài Gòn 2023</h1>
                </div>

                <div class="mod-content row">
                    <div id="vnt-main" class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                        <div id="vnt-slide-thumbnail" class="slick-init slick-initialized slick-slider">
                            <div class="slick-list draggable">
                                <div class="slick-track" style="opacity: 1; width: 774px;">
                                    <div class="slick-slide slick-current slick-active" data-slick-index="0" aria-hidden="false" style="width: 774px; position: relative; left: 0px; top: 0px; z-index: 999; opacity: 1;">
                                        <div>
                                            <div class="item" style="width: 100%; display: inline-block;">
                                                <div class="img">
                                                    <img src="https://dulichviet.com.vn/images/bandidau/NOI-DIA/Sapa/cho-sapa-du-lich-mien-bac-gia-re.jpg" alt="Tour Miền Bắc Du lịch Vịnh Hạ Long - Yên Tử - Sapa - Bản Cát Cát từ Sài Gòn 2023" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="hidden-lg hidden-md">
                            <div class="boxPrice">
                                <div class="price">
                                    <div class="txt">Giá từ:</div>
                                    <div class="red" id="gia_mb">7,799,000 đ</div>
                                </div>
                                <div class="bot">
                                    <div class="form-group">
                                        <input type="text" name="dDate" id="dDate_mb" class="form-control bg-white dDate date-readonly dropdown-toggle" value="05-01-2023" readonly="" />
                                    </div>
                                    <div class="btn-booking dt">
                                        <button type="button" class="btn-order-tour">đặt tour</button> </div>
                                </div>
                            </div>
                        </div>
                        <div class="boxTour" id="flag1">
                            <div class="title"><span class="fa-info-circle">Điểm nhấn hành trình</span></div>
                            <div class="content">
                                <table align="left" border="0" cellpadding="10" cellspacing="10" style="width:100%;"><tbody><tr><td style="width: 20%;"><strong><span style="color:#555555;">Hành trình:</span></strong></td><td><font color="#555555"><b>Vịnh Hạ Long - Yên Tử - Sa Pa - Bản Cát Cát</b></font></td></tr><tr><td><strong><span style="color:#555555;">Lịch trình:</span></strong></td><td><strong><span style="color:#555555;">4 ngày 3 đêm</span></strong></td></tr><tr><td><strong><span style="color:#555555;">Ngày khởi hành:</span></strong></td><td><strong><span style="color:#555555;">05,12/01;&nbsp;09,16,23/02;&nbsp;02,09,16,23/03/2023</span></strong></td></tr><tr><td><strong><span style="color:#555555;">Vận chuyển:</span></strong></td><td><strong><span style="color:#555555;">Máy bay khứ hồi &amp; xe du lịch đời mới</span></strong></td></tr><tr><td>&nbsp;</td><td>&nbsp;</td></tr></tbody></table><p style="text-align: justify;"><em><strong>Tour Miền Bắc Du lịch Vịnh Hạ Long - Yên Tử - Sapa - Bản Cát Cát từ Sài Gòn 2023 -&nbsp;</strong>Miền Bắc là nơi khởi nguồn văn hóa ngàn năm văn hiến của dân tộc Việt Nam. Du lịch miền Bắc du khách sẽ được khám phá những thắng cảnh thiên nhiên đẹp mê hồn cùng nhiều công trình kiến trúc ấn tượng được tạo nên bởi bàn tay khéo léo của con người. Cùng <strong>Du Lịch Việt</strong> tìm hiểu những địa điểm <strong>du lịch miền bắc</strong> hấp dẫn nhất như Hà Nội - Hạ Long,... để bắt đầu lên kế hoạch cho chuyến du lịch ngay nhé!</em></p> <div class="linkMore text-right"><a href="javascript:void(0)" id="xemthem" data-id="16358" data-table="tour"><span>Xem thêm »</span></a></div>
                            </div>
                        </div>
                        <div class="boxTour" id="flag2">
                            <div class="title"><span class="fa-map-o">Lịch trình</span></div>
                            <div class="content">
                                <div class="listDay">
                                    <div class="day active">
                                        <div class="titDay"><span>NGÀY 1 |</span> TP.HCM – HÀ NỘI – LÀO CAI – SAPA (Ăn trưa, chiều)</div>
                                        <div class="arrow-up" style=""></div>
                                        <div class="contDay" style="display: block;">
                                            <div class="the-content desc">
                                                <p><strong>Sáng:</strong> Quý khách có mặt tại ga quốc nội, sân bay Tân Sơn Nhất trước giờ bay ít nhất ba tiếng.
                                                </p><ul>
                                                    <li>Đại diện công ty Du Lịch Việt đón và hỗ trợ Quý Khách làm thủ tục đón chuyến bay đi <strong>Hà Nội</strong>.</li>
                                                    <li>Đến sân bay <strong>Nội Bài</strong>, Hướng dẫn viên đón đoàn khởi hành đến <strong>Lào Cai</strong> trên con đường cao tốc dài nhất Việt Nam - mạch nối liền giữa Hà Nội và các tỉnh Tây Bắc.</li>
                                                </ul>
                                                <strong>Trưa:&nbsp;</strong>Dùng bữa trưa.
                                                <ul>
                                                    <li>Đoàn tiếp tục đến <strong>thị trấn vùng cao Sapa</strong>, tận hưởng cảnh sắc núi rừng như tranh vẽ và khám phá cuộc sống của đồng bào dân tộc ít người miền Tây Bắc.</li>
                                                </ul>
                                                &nbsp;
                                                <div style="text-align: center;"><img alt="" src="/images/bandidau/NOI-DIA/Sapa/thi-tran-vung-cao-du-lich-viet.jpg" /><br />
                                                    &nbsp;</div>
                                                <ul>
                                                    <li>Thăm <strong>bản Cát Cát</strong>, tìm hiểu nghề dệt nhuộm của <strong>dân tộc H’Mông</strong> và trạm thủy điện Cát Cát thời Pháp – nơi có 3 dòng nước hợp nhau thành dòng suối Mường Hoa.</li>
                                                </ul>
                                                &nbsp;
                                                <div style="text-align: center;"><img alt="" src="/images/bandidau/NOI-DIA/Sapa/dan-toc-hmong-du-lich-viet(1).jpg" style="width: 700px; height: 389px;" /><br />
                                                    &nbsp;</div>
                                                <div style="text-align: justify;"><strong>Chiều:&nbsp;&nbsp;&nbsp; </strong>Dùng bữa chiều. Nghỉ đêm tại Sapa. Tự do dạo phố, tham quan nhà thờ đá Sapa, tham dự đêm <strong>chợ Tình</strong> (nếu đi vào tối thứ 7).</div><p></p> </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div id="flagEnd"></div>
                    </div>
                    <div id="vnt-sidebar" class="col-lg-4 col-md-4 col-sm-12 col-xs-12 hidden-sm hidden-xs">
                        <div class="boxDesign1">
                            <div class="name">Tour Miền Bắc Du lịch Vịnh Hạ Long - Yên Tử - Sapa - Bản Cát Cát từ Sài Gòn 2023</div>
                            <div class="attr">
                                <ul>
                                    <li>
                                        <div class="at">Mã tour</div>
                                        <div class="as">16358 &nbsp;</div>
                                    </li>
                                    <li>
                                        <div class="at">Thời gian:</div>
                                        <div class="as">4 ngày 3 đêm</div>
                                    </li>
                                    <li>
                                        <div class="at">Khởi hành:</div>
                                        <div class="as">05,12/01;&nbsp;09,16,23/02;&nbsp;02,09,16,23/03/2023 &nbsp;</div>
                                    </li>
                                    <li>
                                        <div class="at">Vận Chuyển:</div>
                                        <div class="as">
                                            Xe du lịch, Máy bay &nbsp;
                                        </div>
                                    </li>
                                    <li>
                                        <div class="at">Xuất phát:</div>
                                        <div class="as">Từ
                                            Hồ Chí Minh &nbsp;
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="mnfixed_wrap" style="position: relative; height: 408px;">
                            <div class="mnfixed_self mnfixed_fixed_fixed" style="width: 376.656px; z-index: 101; position: initial; top: initial; left: initial; bottom: initial;">
                                <div class="boxFix">
                                    <div class="boxPrice">
                                        <div class="price">
                                            <div class="txt">Giá từ:</div>
                                            <div class="red" id="giactt">7,799,000 đ</div>
                                        </div>
                                        <div class="bot">
                                            <div class="form-group">
                                                <input type="text" name="dDate" id="dDate" class="form-control bg-white dDate date-readonly dropdown-toggle" value="05-01-2023" readonly="" />
                                            </div>
                                            <div class="btn-booking dt">
                                                <input type="hidden" name="tourid" id="tourid" value="16358" />
                                                <input type="hidden" name="con" id="con" value="10" />
                                                <input type="hidden" name="hasvisa" id="hasvisa" value="" />
                                                <button type="button" class="btn-order-tour">đặt tour</button> </div>
                                        </div>
                                    </div>
                                    <div class="boxDesign2">
                                        <ul>
                                            <li class="active"><a href="#flag1"><span class="fa-info-circle">Điểm nhấn hành trình</span></a></li>
                                            <li class=""><a href="#flag2"><span class="fa-map">Lịch trình</span></a></li>
                                            <li class=""><a href="#flag3"><span class="fa-paperclip">Dịch vụ bao gồm và không bao gồm</span></a></li>
                                            <li class=""><a href="#flag4"><span class="fa-sticky-note">Ghi chú</span></a></li>
                                            <li class=""><a href="#flag5"><span class="fa-calendar-check-o">Ngày khởi hành khác</span></a></li>

                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}



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
                                    <Link to={"/danhsachbanhang/" + itemProduct.accountId}>
                                        <button className="btn outline btn-outline-primary">Cửa hàng của {title}</button>
                                    </Link>
                                </div>
                            </div>

                            <div className="p-1 " ><h4>{itemProduct.name}</h4></div>
                            {chatting?<div className="p-1">
                                <Link to={"/chat/" + itemProduct.accountId}>
                                    <button className="btn outline btn-outline-primary">Chat với người bán</button>
                                </Link>
                            </div>:<></>}
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
                                <div className="p-1"><span >giá: {itemProduct.price} đồng</span></div>
                                <div className="p-1"><span >sdt: {itemProduct.phone}</span></div>
                                <div className="p-1"><span >thể loại: {itemProduct.topic}</span></div>
                                <div className="p-1"><span >Vị trí: {itemProduct.address}</span></div>
                            </div>
                        </div>
                        <div className="anh mt-3">
                            <div className="slide-container">
                                <Zoom {...zoomOutProperties}>
                                    {images.map((each, index) => (
                                        <img className="lazy rounded" key={index}
                                            style={{ maxHeight: "22rem", width: "100%" }} src={each}
                                        />
                                    ))}
                                </Zoom>
                            </div>
                        </div>
                    </div>


                    <div className="mt-3">
                        <pre style={{ textAlign: "start" }}>
                            {content}
                        </pre>
                        <div>
                            <pre> {title2} </pre>
                        </div>
                    </div>
                </section>
            </div>
        </Container>
    );
}

export default ProductDetails;