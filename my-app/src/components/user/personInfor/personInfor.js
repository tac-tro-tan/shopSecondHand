import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./personInfor.css";
function PersonInfor() {

    return (
        <div>
            <div className="divv" style={{ textAlign: "center" }}><h1>Thông tin cá nhân</h1></div>
            <Container>
                <div className="box2 box-width-2 mx-auto col d-flex justify-content-center" >
                    <div className="d-flex flex-column justify-content-between w-100 mt-3">
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="floatingInput" placeholder="Họ tên"/>
                            <label for="floatingInput" className="pr-3">Họ tên</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="floatingInput" placeholder="Giới tính" />
                            <label for="floatingInput" className="pr-3">Giới tính</label>
                        </div>
                        
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="floatingInput" placeholder="Vị trí bán" />
                            <label for="floatingInput" className="pr-3">Vị trí bán</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="floatingInput" placeholder="Số điện thoại" />
                            <label for="floatingInput" className="pr-3">Số điện thoại</label>
                        </div>
                        <div className="d-flex justify-content-around">
                            <button className="btn btn-outline-danger">hủy</button>
                            <button className="btn btn-outline-primary">lưu</button>
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