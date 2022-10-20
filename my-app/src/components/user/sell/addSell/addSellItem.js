import React, { useState, useEffect, useRef } from "react";
import { Container } from "react-bootstrap";
import "./addSellItem.css";
import { Link } from "react-router-dom";
import { Slide } from 'react-slideshow-image';


function AddSellItem() {
    const ref = useRef(null);
    let slideRef = React.createRef();
    const [images, setImages] = useState([]);
    const [slideImages, setSlideImages] = useState([]);
    useEffect(() => {
        if (images.length < 1) return;
        const newImageUrls = [];
        images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
        setSlideImages(newImageUrls.map((img) => (`${img}`)))
    }, [images]);

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
                <div style={{ textAlign: "center" }}><h1>Thêm đơn bán</h1></div>
            </div>
            <Container>
                <div className="mx-auto col text-center scroll-container" >
                    <section id="phapluat" className="divv">
                        <div className="d-flex justify-content-between w-100 mt-3">

                            <div className="d-flex flex-column align-items-start">
                                <div className="d-flex">
                                    <div>
                                        <Link to="/">
                                            <button className="btn outline btn-outline-primary me-4">nút back</button>
                                        </Link>
                                    </div>
                                    <div>
                                        <Link to="/">
                                            <button className="btn outline btn-outline-primary">Lưu</button>
                                        </Link>
                                    </div>

                                </div>
                                <div className="box2 box-width-2 mx-auto col d-flex justify-content-center" >
                                    <div className="d-flex flex-column justify-content-between w-100 mt-3">
                                        <div className="form-floating mb-3">
                                            <input type="text" className="form-control" id="floatingInput" placeholder="Tên sản phẩm" />
                                            <label htmlFor="floatingInput" className="pr-3">Tên sản phẩm</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input type="text" className="form-control" id="floatingInput" placeholder="Giá sản phẩm" />
                                            <label htmlFor="floatingInput" className="pr-3">Giá sản phẩm</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input type="text" className="form-control" id="floatingInput" placeholder="Loại sản phẩm" />
                                            <label htmlFor="floatingInput" className="pr-3">Loại sản phẩm</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input type="text" className="form-control" id="floatingInput" placeholder="Vị trí bán" />
                                            <label htmlFor="floatingInput" className="pr-3">Vị trí bán</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input type="text" className="form-control" id="floatingInput" placeholder="Số điện thoại" />
                                            <label htmlFor="floatingInput" className="pr-3">Số điện thoại</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-3 anh">
                                <input ref={ref} className="btn btn-outline-info" type="file" multiple accept="image/*" onChange={onImageChange} />
                                <div className="slide-container .react-slideshow-wrapper" style={{height:"550px"}}>
                                    <Slide ref={slideRef} {...properties}>
                                        {slideImages.map((each, index) => (
                                            <div key={index} className="each-slide" >
                                                <img style={{ width: "375px", height: "500px" }} src={each} alt="sample" />
                                            </div>
                                        ))}
                                    </Slide>
                                </div>
                                {slideImages.length?<div>
                                    <div className="slide-container buttons">
                                    <button className="btn btn-outline-secondary" onClick={back} type="button">
                                        Go Back
                                    </button>
                                    <button className="btn btn-outline-primary"  onClick={next} type="button">
                                        Go Next
                                    </button>
                                </div>
                                <div>
                                    <button className="btn btn-outline-danger"  onClick={deleteImages}>Loại bỏ ảnh</button>
                                </div>
                                </div>:null}
                                
                                {/* <div className="slide-container" >


                                    <Slide>

                                        {slideImages.map((slideImage, index) => (
                                            <div style={{ maxWidth: "450px", height: "auto" }} className="each-slide" key={index}>
                                                <span>{slideImage.caption}</span>
                                                <img className="lazy img1" src={slideImage.url} alt="sample" />

                                            </div>
                                        ))}

                                    </Slide>





                                </div> */}
                            </div>
                        </div>

                        <div className="mt-3">
                            <div className="form-group">
                                <label htmlFor="exampleFormControlTextarea1">Example textarea</label>
                                <textarea
                                    maxLength={5000}
                                    placeholder="nội dung chi tiết sản phẩm"
                                    className="form-control"
                                    id="exampleFormControlTextarea1"
                                    rows={10}
                                >

                                </textarea>
                            </div>
                        </div>

                    </section>
                </div>
            </Container>
        </div>
    );
}

export default AddSellItem;