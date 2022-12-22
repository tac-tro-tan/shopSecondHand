import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { NotificationManager } from "react-notifications";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCustomer } from "../../../store/userSlice";
import "./changePass.css";

function ChangePass() {
    //thông báo
    const createNotification = (type) => {
        switch (type) {
            case 'success':
                NotificationManager.success('đã cập nhật mật khẩu', 'Thành công');
                break;
            case 'error':
                NotificationManager.error('đã có lỗi gì đó xảy ra', 'Thất bại', 3000);
                break;
            default:
                alert("kill me, i'm here");
        }
    }
    //thông tin của mình
    const { id, jwtToken } = useSelector(selectCustomer);


    const navigate = useNavigate();

    const [infor, setInfor] = useState({
        "oldPassword": "",
        "password": "",
        "confirmPassword": ""
      });

    const handleClick = () => {
        const fetchData = async (req, res) => {
            try {
                const requestOptions = {
                    method: 'POST',
                    headers: {
                        'accept': ' text/plain',
                        'Authorization': 'Bearer ' + jwtToken,
                        'Content-Type': ' application/json-patch+json'
                    },
                    body: JSON.stringify(infor)
                };
                const response = await fetch('https://localhost:7071/api/Account/' + id, requestOptions)
                const data = await response.json();
                console.log(data);
                createNotification("success");
            } catch (error) {
                createNotification("error")
                res.send(error.stack);
            }
        }
        fetchData();
    }

    

    const changeInfor = (e) => {
        let a = e.target.attributes.id.value;
        let b = e.target.value;
        setInfor(prevState => ({
            ...prevState,    // keep all other key-value pairs
            [a]: b       // update the value of specific key
        }))
    }

    return (
        <div>
            <div className="divv" style={{ textAlign: "center" }}><h1>Đổi mật khẩu</h1></div>
            <Container>
                <div className="box2 box-width-2 mx-auto col d-flex justify-content-center" >
                    <div className="d-flex flex-column justify-content-between w-100 mt-3">
                        <div className="form-floating mb-3">
                            <input type="password" className="form-control" id="oldPassword" 
                            placeholder="Mật khẩu cũ" onChange={(e) => changeInfor(e)} value={infor.oldPassword}/>
                            <label htmlFor="floatingInput" className="pr-3">Mật khẩu cũ</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="password" className="form-control" id="password" 
                            placeholder="Mật khẩu mới" onChange={(e) => changeInfor(e)} value={infor.password}/>
                            <label htmlFor="floatingInput" className="pr-3">Mật khẩu mới</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input type="password" className="form-control" id="confirmPassword" 
                            placeholder="Nhập lại mật khẩu mới" onChange={(e) => changeInfor(e)} 
                            value={infor.confirmPassword}/>
                            <label htmlFor="floatingInput" className="pr-3">Nhập lại mật khẩu mới</label>
                        </div>

                        <div className="d-flex justify-content-around">
                            <button className="btn btn-outline-danger" onClick={() => navigate(-1)}>Trở về</button>
                            <button className="btn btn-outline-primary" onClick={handleClick}>Lưu</button>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default ChangePass;