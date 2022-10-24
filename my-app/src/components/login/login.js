import React, { useState } from "react";
import { Button, Container, Form, FormGroup } from "react-bootstrap";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateCustomer } from "../../store/userSlice";

function Login() {
    const navigate = useNavigate();
    //fetch dữ liệu database
    const [username, setUsername] = useState("");
    const [pass, setPass] = useState("")
    //lưu bằng redux
    const dispatch = useDispatch();

    function handleClick() {
        const fetchData = async () => {
            const requestOptions = {
                method: 'GET'
            };
            const response = await fetch('http://localhost:3003/account', requestOptions)
            const data = await response.json();
            const customer = data.filter(a => (a.email == username && a.password == pass));
            console.log(customer[0])
            dispatch(updateCustomer(customer[0]));
        }
        fetchData();
        navigate("/");
    }
    return (
        <>
            <div className="divv" style={{ textAlign: "center" }}><h1>Đăng nhập</h1></div>
            <Container>
                <div className="box2 box-width-2 mx-auto col d-flex justify-content-center" >
                    <Form >
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Email"

                                value={username}
                                onChange={e => setUsername(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Mật khẩu</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Nhập mật khẩu"
                                required="required"
                                value={pass}
                                onChange={e => setPass(e.target.value)}
                            />
                        </Form.Group>
                        <FormGroup>
                            <Form.Check
                                type="switch"
                                id="custom-switch"
                                label="Ghi nhớ"
                            />
                        </FormGroup>
                    </Form>
                    <div className="d-flex flex-column align-self-center">
                        <div className="but2">
                            <Button variant="primary" onClick={handleClick}>
                                Xác nhận
                            </Button>
                        </div>
                        <p className="forgot-password text-right">
                            Quên <a href="#a">mật khẩu?</a>
                        </p>
                        <p className="forgot-password text-right">
                            <a href="#a">Đăng ký</a>
                        </p>
                    </div>

                </div>
            </Container>
        </>
    )
}
export default Login;