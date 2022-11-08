import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectCustomer, updateCustomer } from "../../../store/userSlice";
import { NotificationContainer, NotificationManager } from 'react-notifications';

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
    const { id, first_name, last_name, email, phone, address, gender, bDay } = useSelector(selectCustomer);

    const dispatch = useDispatch();

    const [infor, setInfor] = useState({
        name: first_name + " " + last_name,
        email: email,
        phone: phone,
        bDay: bDay,
        address: address,
        gender: gender
    });

    const changeInfor = (e) => {
        let a = e.target.attributes[2].value;
        let b = e.target.value;
        setInfor(prevState => ({
            ...prevState,    // keep all other key-value pairs
            [a]: b       // update the value of specific key
        }))
    }

    const resetForm = () => {
        setInfor({
            name: first_name + " " + last_name,
            email: email,
            phone: phone,
            bDay: bDay,
            address: address,
            gender: gender
        });
    }


    const saveForm = () => {
        const fetchData = async () => {
            const requestOptions2 = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            };
            const response2 = await fetch('http://localhost:3003/account/' + id, requestOptions2)
            const data2 = await response2.json();
            console.log(data2);
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    {
                        ...data2,
                        "first_name": `${infor.name.slice(0, infor.name.lastIndexOf(" ") - 1)}`,
                        "last_name": `${infor.name.slice(infor.name.lastIndexOf(" "))}`,
                        "email": `${infor.email}`,
                        "phone": `${infor.phone}`,
                        "address": `${infor.address}`,
                        "gender": `${infor.gender}`,
                        "bDay": `${infor.bDay}`
                    }
                )
            };
            const response = await fetch('http://localhost:3003/account/' + id, requestOptions)
            const data = await response.json();
            console.log(data);
            dispatch(updateCustomer(data));
            if (data !== null) createNotification('success');
            else createNotification('error')
        }
        fetchData();
    }

    return (
        <div>
            <div className="divv" style={{ textAlign: "center" }}><h1>Thông tin cá nhân</h1></div>
            <Container>
                <div className="box2 box-width-2 mx-auto col d-flex justify-content-center" >
                    <div className="d-flex flex-column justify-content-between w-100 mt-3">
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="name" placeholder="Họ tên"
                                onChange={(e) => changeInfor(e)} value={infor.name} />
                            <label htmlFor="floatingInput" className="pr-3">Họ tên</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="gender" placeholder="Giới tính"
                                onChange={(e) => changeInfor(e)} value={infor.gender} />
                            <label htmlFor="floatingInput" className="pr-3">Giới tính</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="bDay" placeholder="Ngày sinh"
                                onChange={(e) => changeInfor(e)} value={infor.bDay} />
                            <label htmlFor="floatingInput" className="pr-3">Ngày sinh</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="address" placeholder="Địa chỉ"
                                onChange={(e) => changeInfor(e)} value={infor.address} />
                            <label htmlFor="floatingInput" className="pr-3">Địa chỉ</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="email" placeholder="Email"
                                onChange={(e) => changeInfor(e)} value={infor.email} />
                            <label htmlFor="floatingInput" className="pr-3">Email</label>
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
                <NotificationContainer />
            </Container>
        </div>
    );
}

export default PersonInfor;