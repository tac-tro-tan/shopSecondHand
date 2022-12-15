import React, { useState, useEffect, useRef } from "react";
import { Container } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Zoom } from 'react-slideshow-image';

import Sstorage from "../../../../fireBaseConfig.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useSelector } from "react-redux";
import { selectCustomer } from "../../../../store/userSlice.js";
import {  NotificationManager } from 'react-notifications';
import Popup from "../../../deleteModal/Popup.js";

function ModalSellItem({ itemProduct, add }) {
    //lấy giá trị idSP
    const location = useLocation()
    const idSP = location.pathname.replace("/chitietdonban/", "");
    
    //thông báo
    const createNotification = (type) => {
        switch (type) {
            case 'success':
                NotificationManager.success('đã lưu', 'Thành công');
                break;
            case 'error':
                NotificationManager.error('Đã xóa', 'Xóa', 3000);
                break;
            default:
                alert("kill me, i'm here");
        }
    }
    // id mình
    const { id, jwtToken } = useSelector(selectCustomer);

    const navigate = useNavigate()

    const [itemUpLoad, setItemUpLoad] = useState(itemProduct);

    const [imgSting, setImgSting] = useState("string");

    const [diaachi, setDiaachi] = useState({
        xa1: "diachi[0]",
        huyen1: "diachi[1]",
        tinh1: "diachi[2]"
    })

    useEffect(() => {
        setItemUpLoad(itemProduct);
        setImgSting(itemProduct.image);
        let diachi = itemProduct.address.split(", ");
        setDiaachi(
            {
                xa1: diachi[0],
                huyen1: diachi[1],
                tinh1: diachi[2]
            }
        )
    }, [itemProduct.id])


    // slide
    const ref1 = useRef(null);
    const [images, setImages] = useState([]);
    const [slideImages, setSlideImages] = useState([]);
    useEffect(() => {
        if (images.length < 1) {
            let ii = imgSting.split("$$$");
            ii.pop();
            setSlideImages(ii);
            return;
        };

        const newImageUrls = [];
        images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
        setSlideImages(newImageUrls.map((img) => (`${img}`)))
    }, [images, itemUpLoad]);

    function onImageChange(e) {
        let ii = [...e.target.files];
        setImages(ii);
        let imgString = "";
        if (!ii) {
            alert("Please upload an image first!");
        }
        ii.map((file) => {
            const storageRef = ref(Sstorage, `/file/${file.name}`);

            // progress can be paused and resumed. It also exposes progress updates.
            // Receives the storage reference and the file to upload.
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const percent = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                },
                (err) => console.log(err),
                () => {
                    // download url
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        imgString += url + "$$$";
                        setImgSting(imgString);
                    });
                }
            );
        })
    }

    function deleteImages() {
        setSlideImages([]);
        ref1.current.value = '';
    }

    const zoomOutProperties = {
        duration: 5000,
        transitionDuration: 500,
        infinite: true,
        indicators: true,
        scale: 0.4,
        arrows: true
    };
    //submit


    const submitt = () => {
        if (add) {
            const fetchData = async () => {
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
                            "name": itemUpLoad.name,
                            "topic": itemUpLoad.topic,
                            "area": itemUpLoad.area,
                            "price": itemUpLoad.price,
                            "address": diaachi.xa1 + ", " + diaachi.huyen1 + ", " + diaachi.tinh1,
                            "phone": itemUpLoad.phone,
                            "describe": itemUpLoad.describe,
                            "image": imgSting
                        })
                };
                const response = await fetch('https://localhost:7071/api/Item/add', requestOptions)
                const data = await response.json();
                console.log(data);
            }
            fetchData();
        } else {
            const fetchData = async () => {
                const requestOptions = {
                    method: 'PUT',
                    headers: {
                        'accept': ' text/plain',
                        'Authorization': 'Bearer ' + jwtToken,
                        'Content-Type': ' application/json-patch+json'
                    },
                    body: JSON.stringify(
                        {
                            "accountId": id,
                            "name": itemUpLoad.name,
                            "topic": itemUpLoad.topic,
                            "area": itemUpLoad.area,
                            "price": itemUpLoad.price,
                            "address": diaachi.xa1 + ", " + diaachi.huyen1 + ", " + diaachi.tinh1,
                            "phone": itemUpLoad.phone,
                            "describe": itemUpLoad.describe,
                            "image": imgSting
                        })
                };
                const response = await fetch('https://localhost:7071/api/Item/' + itemProduct.id, requestOptions)
                const data = await response.json();
                console.log(data);
            }
            fetchData();
        }
        navigate(-1);
    }

    const handleChange = (e) => {
        let k = e.target.value;
        let j = e.target.attributes.id.value;
        setItemUpLoad(prev => ({
            ...prev,
            [j]: k
        })
        )
    }

    const [huyen, setHuyen] = useState([]);
    const countryy = (city) => {
        const fetchData = async () => {
            const requestOptions = {
                method: 'GET'
            };
            const response = await fetch('https://provinces.open-api.vn/api/?depth=2', requestOptions)
            const data = await response.json();
            const cti = data.filter(e => e.name === "Thành phố " + city)
            setDiaachi(prev => ({
                ...prev,
                tinh1: cti[0].name
            }))
            setHuyen(cti[0].districts);
        }
        fetchData();
    }

    const [xaa, setXaa] = useState([])
    const huyenn = (e) => {
        const fetchData = async () => {
            const requestOptions = {
                method: 'GET'
            };
            const response = await fetch('https://provinces.open-api.vn/api/d/' + e + '?depth=2', requestOptions)
            const data = await response.json();
            setDiaachi(prev => ({
                ...prev,
                huyen1: data.name
            }))

            setXaa(data.wards);
        }
        fetchData();
    }

    const deletee = () => {
        const fetchData = async () => {
            const requestOptions = {
                method: 'DELETE',
                headers: {
                    'accept': ' text/plain',
                    'Authorization': 'Bearer ' + jwtToken
                }
            };
            const response = await fetch('https://localhost:7071/api/Item/' + itemProduct.id, requestOptions)
            const data = await response.json();
        }
        fetchData();
        createNotification('error');
        navigate(-1);
    }
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(!show);

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
                                <button className="btn outline btn-outline-primary me-4" onClick={() => { submitt(); createNotification('success'); }}>Lưu</button>
                            </div>
                            {add ? <></> :

                                <div>
                                    <button className="btn outline btn-outline-danger" onClick={() => { handleShow(); }}>Xóa</button>
                                </div>


                            }
                            <Popup handleDeleteTrue={deletee} handleShow={handleShow} show={show}></Popup>

                        </div>
                        
                        <div className="box2 box-width-2 mx-auto col d-flex justify-content-center" >
                            <div className="d-flex flex-column justify-content-between w-100 mt-3">
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="name"
                                        placeholder="Tên sản phẩm" value={itemUpLoad.name}
                                        onChange={(e) => handleChange(e)} />
                                    <label htmlFor="floatingInput" className="pr-3">Tên sản phẩm</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="price"
                                        placeholder="Giá sản phẩm" onChange={(e) => handleChange(e)}
                                        value={itemUpLoad.price} />
                                    <label htmlFor="floatingInput" className="pr-3">Giá sản phẩm</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <select class="form-select" aria-label="Thể loại"
                                        id="topic" onChange={(e) => {
                                            handleChange(e);
                                        }}>
                                        <option selected hidden >{itemUpLoad.topic}</option>
                                        <option value="Xe cộ">Xe cộ</option>
                                        <option value="Đồ điện tử">Đồ điện tử</option>
                                        <option value="Đồ điện máy">Đồ điện máy</option>
                                        <option value="Thời trang">Thời trang</option>
                                        <option value="Đồ nội thất">Đồ nội thất</option>
                                    </select>
                                    <label htmlFor="floatingInput" className="pr-3">Thể loại</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <select class="form-select" aria-label="Default select example"
                                        id="area" onChange={(e) => {
                                            handleChange(e);
                                            countryy(e.target.value);
                                        }}>
                                        <option selected hidden>{diaachi.tinh1}</option>
                                        <option value="Hà Nội">Hà Nội</option>
                                        <option value="Đà Nẵng">Đà Nẵng</option>
                                        <option value="Hồ Chí Minh">Hồ Chí Minh</option>
                                    </select>
                                    <label htmlFor="floatingInput" className="pr-3">Thành phố</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <select class="form-select" aria-label="Default select example"
                                        id="area2" onChange={(e) => { huyenn(e.target.value) }}>
                                        <option selected hidden>{diaachi.huyen1}</option>

                                        {huyen.map((t, index) => (
                                            <option value={t.code} key={index}>{t.name}</option>
                                        ))}
                                    </select>
                                    <label htmlFor="floatingInput" className="pr-3">Quận, Huyện</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <select class="form-select" aria-label="Default select example"
                                        id="area3" onChange={(e) => {
                                            setDiaachi(prev => ({
                                                ...prev,
                                                xa1: e.target.value
                                            }))
                                        }}>
                                        <option selected hidden>{diaachi.xa1}</option>
                                        {xaa.map((t, index) => (
                                            <option value={t.name} key={index}>{t.name}</option>
                                        ))}
                                    </select>
                                    <label htmlFor="floatingInput" className="pr-3">Xã, Phường</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="phone"
                                        placeholder="Số điện thoại" value={itemUpLoad.phone}
                                        onChange={(e) => handleChange(e)} />
                                    <label htmlFor="floatingInput" className="pr-3">Số điện thoại</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-3 anh">
                        <input ref={ref1} className="btn btn-outline-info" type="file"
                            multiple accept="image/*" onChange={onImageChange} />
                        <div className="slide-container">
                            <Zoom {...zoomOutProperties}>
                                {slideImages.map((each, index) => (
                                    <img className="lazy rounded dilo" key={index}
                                        src={each}
                                    />
                                ))}
                            </Zoom>
                        </div>
                        {slideImages.length > 1 ?
                            <div>
                                <button className="btn btn-outline-danger" onClick={deleteImages}>Loại bỏ ảnh</button>
                            </div> : null}
                            {itemProduct.status == 2 && 
                            <table className="m-5" border='0' cellpadding='10' cellspacing='0' align='center'>
                                <tr>
                                    <td align='center'><label>làm nổi bật sản phẩm có trả phí</label></td>
                                </tr>
                                <tr>
                                    <td align='center'>
                                        <Link to={"/checkoutpay/"+idSP}>
                                               <img src='https://www.paypalobjects.com/webstatic/en_AU/i/buttons/btn_paywith_primary_l.png' alt='Thanh toán bằng PayPal | Lớn' />
                                        </Link>
                                    </td>
                                </tr>
                            </table>
                        }
                    </div>
                </div>

                <div className="mt-3">
                    <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1">Chi tiết sản phẩm:</label>
                        <textarea
                            maxLength={5000}
                            placeholder="nội dung chi tiết sản phẩm"
                            className="form-control"
                            id="describe"
                            rows={10}
                            value={itemUpLoad.describe}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default ModalSellItem;