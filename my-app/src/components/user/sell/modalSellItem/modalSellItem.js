import React, { useState, useEffect, useRef } from "react";
import { Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Zoom } from 'react-slideshow-image';

function ModalSellItem({ itemProduct, add }) {

    const navigate = useNavigate()

    // slide
    const ref = useRef(null);
    const [images, setImages] = useState([]);
    const [slideImages, setSlideImages] = useState([]);
    useEffect(() => {
        if (images.length < 1) {
            setSlideImages(itemProduct[0].data.image)
            return;
        };
        const newImageUrls = [];
        images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
        setSlideImages(newImageUrls.map((img) => (`${img}`)))
    }, [images, itemProduct]);

    function onImageChange(e) {
        setImages([...e.target.files]);

    }

    function deleteImages() {
        setSlideImages([]);
        ref.current.value = '';
    }

    const zoomOutProperties = {
        duration: 5000,
        transitionDuration: 500,
        infinite: true,
        indicators: true,
        scale: 0.4,
        arrows: true
    };

    return (
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
                            {add ? <></> :
                                <div>
                                    <Link to="/">
                                        <button className="btn outline btn-outline-danger">Xóa</button>
                                    </Link>
                                </div>
                            }


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
                                        placeholder="Giá sản phẩm"
                                        value={`giá: ${itemProduct[0].data.price} đồng`} />
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
                        <input ref={ref} className="btn btn-outline-info" type="file"
                            multiple accept="image/*" onChange={onImageChange} />
                        <div className="slide-container">
                            <Zoom {...zoomOutProperties}>
                                {slideImages.map((each, index) => (
                                    <img className="lazy rounded" key={index}
                                        style={{ maxHeight: "22rem", width: "100%" }} src={each}
                                    />
                                ))}
                            </Zoom>
                        </div>
                        {slideImages.length > 1 ?
                            <div>
                                <button className="btn btn-outline-danger" onClick={deleteImages}>Loại bỏ ảnh</button>
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
    );
}

export default ModalSellItem;