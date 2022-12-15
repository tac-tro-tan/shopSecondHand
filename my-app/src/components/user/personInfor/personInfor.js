import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectCustomer, updateCustomer } from "../../../store/userSlice";
import { NotificationManager } from 'react-notifications';
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Sstorage from "../../../fireBaseConfig";

function PersonInfor() {
    //thông báo
    const createNotification = (type) => {
        switch (type) {
            case 'success':
                NotificationManager.success('đã cập nhật thông tin', 'Thành công');
                break;
            case 'error':
                NotificationManager.error('đã có lỗi gì đó xảy ra', 'Thất bại', 3000);
                break;
            default:
                alert("kill me, i'm here");
        }
    }
    //thông tin của mình
    const { id, jwtToken, fisrtName, lastname, title, phone, address, url_Image } = useSelector(selectCustomer);

    const dispatch = useDispatch();

    const [infor, setInfor] = useState({
        fisrtName: fisrtName,
        lastname: lastname,
        title: title,
        phone: phone,
        address: address,
        url_Image: url_Image
    });

    const changeInfor = (e) => {
        let a = e.target.attributes.id.value;
        let b = e.target.value;
        setInfor(prevState => ({
            ...prevState,    // keep all other key-value pairs
            [a]: b       // update the value of specific key
        }))
    }

    const resetForm = () => {
        setInfor({
            name: fisrtName + " " + lastname,
            title: title,
            phone: phone,
            address: address,
            url_Image: url_Image
        });
    }


    const saveForm = () => {
        console.log(infor)
        const fetchData = async (req, res) => {
            try {
                const requestOptions = {
                    method: 'PUT',
                    headers: {
                        'accept': ' text/plain',
                        'Authorization': 'Bearer ' + jwtToken,
                        'Content-Type': ' application/json-patch+json'
                    },
                    body: JSON.stringify(infor)
                };
                const response = await fetch('https://localhost:7071/api/Account/' + id, requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        dispatch(updateCustomer(data));
                        console.log(data);
                        createNotification("success");
                    });

            } catch (error) {
                createNotification("error")
                res.send(error.stack);
            }
        }
        fetchData();
    }

    function onImageChange(e) {
        let file = e.target.files;
        if (!file) {
            alert("Please upload an image first!");
        }
        const storageRef = ref(Sstorage, `/avatar/${file.name}`);

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
                    setInfor(prevState => ({
                        ...prevState,    // keep all other key-value pairs
                        url_Image: url       // update the value of specific key
                    }))
                });
            }
        );

    }

    return (
        <div>
            <div className="divv" style={{ textAlign: "center" }}><h1>Thông tin cá nhân</h1></div>
            <Container>
                <div className="box2 box-width-2 mx-auto col d-flex justify-content-center" >
                    <div className="d-flex flex-column justify-content-between w-100 mt-3">
                        <div className="form-floating mb-3">
                            <input type="file" id="avatar" name="avatar" accept="image/*"
                                onChange={onImageChange} className="btn btn-outline-info" />
                            <img src={infor.url_Image} alt="avatar" style={{ height: "50vh", width: "30vw" }}
                                className="rounded-circle" />
                        </div>
                        <div className="d-flex mb-3">
                            <div className="form-floating">
                                <input type="text" className="form-control me-1" id="fisrtName" placeholder="Họ tên"
                                    onChange={(e) => changeInfor(e)} value={infor.fisrtName} />
                                <label htmlFor="floatingInput" className="pr-3">Họ</label>
                               
                            </div>
                            <div className="form-floating">
                                <input type="text" className="form-control ms-1" id="lastname" placeholder="Họ tên"
                                    onChange={(e) => changeInfor(e)} value={infor.lastname} />
                                <label htmlFor="floatingInput" className="pr-3">Tên</label>
                            </div>
                        </div>

                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="address" placeholder="Địa chỉ"
                                onChange={(e) => changeInfor(e)} value={infor.address} />
                            <label htmlFor="floatingInput" className="pr-3">Địa chỉ</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="title" placeholder="title"
                                onChange={(e) => changeInfor(e)} value={infor.title} />
                            <label htmlFor="floatingInput" className="pr-3">title</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="phone" placeholder="Số điện thoại"
                                onChange={(e) => changeInfor(e)} value={infor.phone} />
                            <label htmlFor="floatingInput" className="pr-3">Số điện thoại</label>
                        </div>
                        <div className="d-flex justify-content-around">
                            <button className="btn btn-outline-danger" onClick={resetForm}>hủy</button>
                            <button className="btn btn-outline-primary" onClick={saveForm}>lưu</button>
                            <Link to="/doimatkhau">
                                <button className="btn btn-outline-info">đổi mật khẩu</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default PersonInfor;