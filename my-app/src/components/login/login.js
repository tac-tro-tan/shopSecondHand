import React from "react";
import { Button, Container, Form, FormGroup} from "react-bootstrap";
import "./login.css";

function Login() {
    return (
        <>
        <div className="divv" style={{textAlign: "center"}}><h1>Đăng nhập</h1></div>
        <Container>
            <div className="box2 box-width-2 mx-auto col d-flex justify-content-center" >
                <Form >   
                    <Form.Group>
                        <Form.Label>Tài khoản</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Tài khoản"
                            required="required"
                        />
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                        <Form.Label>Mật khẩu</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Nhập mật khẩu" 
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
                        <Button variant="primary">
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