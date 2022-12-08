import React, { useState } from "react";
import { Button, Container, FloatingLabel, Form } from "react-bootstrap";
import "./feedBack.css";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { useSelector } from "react-redux";
import { selectCustomer } from "../../../store/userSlice";

function FeedBack() {

    const { id,jwtToken } = useSelector(selectCustomer);
    //thông báo
    const createNotification = (type) => {
        switch (type) {
            case 'success':
                NotificationManager.success('đã gửi góp ý', 'Thành công');
                break;
            case 'error':
                NotificationManager.error('đã có lỗi gì đó xảy ra', 'Thất bại', 3000);
                break;
            default:
                alert("kill me, i'm here");
        }
    }
    // tiêu đề và nội dung
    const [post, setPost] = useState({
        title: "",
        content: ""
    })

    const changePost = (e) => {
        let a = e.target.attributes[0].value;
        let b = e.target.value;
        setPost(prevState => ({
            ...prevState,    // keep all other key-value pairs
            [a]: b       // update the value of specific key
        }))
    }

    const submit = () => {
        const fetchData = async () => {
            const requestOptions = {
                method: 'POST',
                headers: { 
                    'accept': ' text/plain',
                    'Authorization': 'Bearer ' + jwtToken,
                    'Content-Type': 'application/json-patch+json'
                 },
                body: JSON.stringify(
                    {
                        "accountId": `${id}`,
                        "title": `${post.title}`,
                        "content": `${post.content}`
                    }
                )
            };
            const response = await fetch('https://localhost:7071/api/Feedback', requestOptions)
            const data = await response.json();
            console.log(data);
            if (data !== null) createNotification('success');
            else createNotification('error')
        }
        fetchData();
        setPost({
            title: "",
            content: ""
        });
    }

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
                            <Form.Control type="input" placeholder="title"
                                value={post.title} onChange={e => changePost(e)}
                            />
                        </Form.Group>
                        <Form.Label>Nội dung cụ thể:</Form.Label>
                        <FloatingLabel controlId="floatingTextarea2" label="Nội dung">
                            <Form.Control as="textarea" placeholder="content"
                                style={{ height: '13rem' }} value={post.content} onChange={e => changePost(e)}
                            />
                        </FloatingLabel>
                        <div style={{ alignItems: "center", textAlign: "center", margin: 10 }}>
                            <Button variant="primary" type="button" onClick={submit}>
                                Gửi
                            </Button>
                        </div>
                    </Form>
                </div>
                <NotificationContainer />
            </Container>
        </div>
    );
}

export default FeedBack;