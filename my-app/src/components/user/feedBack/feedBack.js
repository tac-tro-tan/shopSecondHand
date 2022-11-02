import React, { useState, useEffect, useRef } from "react";
import { Button, Container, FloatingLabel, Form } from "react-bootstrap";
import "./feedBack.css";


function FeedBack() {
    
    return (
        <div>
            <div className="divv">
                <div style={{ textAlign: "center" }}><h1>Góp ý</h1></div>
            </div>
            <Container>
            <div className="box2 box-width-1 mx-auto">
                <Form id="create-course-form"  >
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Tiêu đề</Form.Label>
                        <Form.Control type="input" placeholder="Tiêu đề" />
                    </Form.Group>
                    <Form.Label>Nội dung cụ thể:</Form.Label>
                    <FloatingLabel controlId="floatingTextarea2" label="Nội dung">
                        <Form.Control
                            as="textarea"
                            placeholder="Leave a comment here"
                            style={{ height: '13rem' }}
                        />
                    </FloatingLabel>
                    <div style={{ alignItems: "center", textAlign: "center", margin: 10 }}>
                        <Button variant="primary" type="button">
                            Gửi
                        </Button>
                    </div>
                </Form>
            </div>
            </Container>
        </div>
    );
}

export default FeedBack;