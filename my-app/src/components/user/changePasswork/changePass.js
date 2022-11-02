import React from "react";
import { Container } from "react-bootstrap";
import "./changePass.css";
function ChangePass() {

    return (
        <div>
            <div className="divv" style={{ textAlign: "center" }}><h1>Đổi mật khẩu</h1></div>
            <Container>
                <div className="box2 box-width-2 mx-auto col d-flex justify-content-center" >
                    <div className="d-flex flex-column justify-content-between w-100 mt-3">
                        <div className="form-floating mb-3">
                            <input type="password" className="form-control" id="floatingInput" placeholder="Mật khẩu cũ" />
                            <label htmlFor="floatingInput" className="pr-3">Mật khẩu cũ</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="password" className="form-control" id="floatingInput" placeholder="Mật khẩu mới" />
                            <label htmlFor="floatingInput" className="pr-3">Mật khẩu mới</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input type="password" className="form-control" id="floatingInput" placeholder="Nhập lại mật khẩu mới" />
                            <label htmlFor="floatingInput" className="pr-3">Nhập lại mật khẩu mới</label>
                        </div>

                        <div className="d-flex justify-content-around">
                            <button className="btn btn-outline-danger">hủy</button>
                            <button className="btn btn-outline-primary">lưu</button>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default ChangePass;