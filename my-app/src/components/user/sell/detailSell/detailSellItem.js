import React, { useState, useEffect, useRef } from "react";
import { Container } from "react-bootstrap";
import "./detailSellItem.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Slide } from 'react-slideshow-image';

function DetailSellItem() {
    //lấy giá trị idSP
    const location = useLocation()
    const idSP = location.pathname.replace("/chitietdonban/", "");
    const navigate = useNavigate()


    // dữ liệu sản phẩm
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
    
    // slide
    const ref = useRef(null);
    let slideRef = React.createRef();
    const [images, setImages] = useState([]);
    const [slideImages, setSlideImages] = useState([]);
    useEffect(() => {
        console.log(itemProduct[0].data.image);
        if (images.length < 1) {
            setSlideImages([itemProduct[0].data.image])
            return;
        };
        const newImageUrls = [];
        images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
        setSlideImages(newImageUrls.map((img) => (`${img}`)))
    }, [images, itemProduct]);

    function onImageChange(e) {
        setImages([...e.target.files]);
    }

    function back() {
        slideRef.current.goBack();
    }

    function next() {
        slideRef.current.goNext();
    }

    function deleteImages() {
        setSlideImages([]);
        ref.current.value = '';
    }

    const properties = {
        duration: 5000,
        autoplay: false,
        transitionDuration: 500,
        arrows: false,
        infinite: true,
        easing: "ease",
        indicators: (i) => <div className="indicator">{i + 1}</div>
    };


    return (
        <div>
            <div className="divv">
                <div style={{ textAlign: "center" }}><h1>Chi tiết đơn bán</h1></div>
            </div>
            <Container>
                <div className="mx-auto col text-center scroll-container" >
                    <div className="d-flex justify-content-between w-100 mt-3">
                        <div className="d-flex flex-column align-items-start">
                            <div className="d-flex">
                                <div>
                                    <button className="btn outline btn-outline-primary me-4"
                                        onClick={() => navigate(-1)}>
                                        Back
                                    </button>
                                </div>
                                <div>
                                    <Link to="/">
                                        <button className="btn outline btn-outline-primary me-4">Lưu</button>
                                    </Link>
                                </div>
                                <div>
                                    <Link to="/">
                                        <button className="btn outline btn-outline-danger">Xóa</button>
                                    </Link>
                                </div>

                            </div>
                            <div className="box2 box-width-2 mx-auto col d-flex justify-content-center" >
                                <div className="d-flex flex-column justify-content-between w-100 mt-3">
                                    <div className="form-floating mb-3">
                                        <input type="text" className="form-control" id="floatingInput"
                                            placeholder="Tên sản phẩm" value={itemProduct[0].data.title} />
                                        <label htmlFor="floatingInput" className="pr-3">Tên sản phẩm</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="text" className="form-control" id="floatingInput"
                                            placeholder="Giá sản phẩm" value={`giá: ${itemProduct[0].data.price} đồng`} />
                                        <label htmlFor="floatingInput" className="pr-3">Giá sản phẩm</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="text" className="form-control" id="floatingInput"
                                            placeholder="Loại sản phẩm" value={itemProduct[0].data.category} />
                                        <label htmlFor="floatingInput" className="pr-3">Loại sản phẩm</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="text" className="form-control" id="floatingInput"
                                            placeholder="Vị trí" value={itemProduct[0].data.address} />
                                        <label htmlFor="floatingInput" className="pr-3">Vị trí</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="text" className="form-control" id="floatingInput"
                                            placeholder="Số điện thoại" value={`giá: ${itemProduct[0].data.price} đồng`} />
                                        <label htmlFor="floatingInput" className="pr-3">Số điện thoại</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-3 anh">
                            <input ref={ref} className="btn btn-outline-info" type="file" multiple accept="image/*" onChange={onImageChange} />
                            <div className="slide-container .react-slideshow-wrapper">
                                <Slide cssClass="slide1" ref={slideRef} {...properties}>
                                    {slideImages.map((each, index) => (
                                        <div key={index} className="each-slide" >
                                            <img className="lazy img-thumbnail" src={each} alt="sample" />
                                        </div>
                                    ))}
                                </Slide>
                            </div>
                            {slideImages.length ? <div>
                                <div className="slide-container buttons">
                                    <button className="btn btn-outline-secondary" onClick={back} type="button">
                                        Go Back
                                    </button>
                                    <button className="btn btn-outline-primary" onClick={next} type="button">
                                        Go Next
                                    </button>
                                </div>
                                <div>
                                    <button className="btn btn-outline-danger" onClick={deleteImages}>Loại bỏ ảnh</button>
                                </div>
                            </div> : null}
                        </div>
                    </div>

                    <div className="mt-3">
                        <div className="form-group">
                            <label htmlFor="exampleFormControlTextarea1">Chi tiết sản phẩm:</label>
                            <textarea
                                maxLength={5000}
                                placeholder="nội dung chi tiết sản phẩm"
                                className="form-control"
                                id="exampleFormControlTextarea1"
                                rows={10}
                                value={itemProduct[0].data.description}
                            />
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default DetailSellItem;