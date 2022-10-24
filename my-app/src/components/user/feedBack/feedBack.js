import React, { useState, useEffect, useRef } from "react";
import { Button, Container, FloatingLabel, Form } from "react-bootstrap";
import "./feedBack.css";


function FeedBack() {
    const ref = useRef(null);
    let slideRef = React.createRef();
    const [images, setImages] = useState([]);
    const [slideImages, setSlideImages] = useState([]);
    useEffect(() => {
        if (images.length < 1) return;
        const newImageUrls = [];
        images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
        setSlideImages(newImageUrls.map((img) => (`${img}`)))
    }, [images]);

    function onImageChange(e) {
        setImages([...e.target.files]);
    }

    function back() {
        slideRef.current.goBack();
    }

    function next() {
        slideRef.current.goNext();
    }

    function deleteImages() {
        setSlideImages([]);
        ref.current.value = '';
    }

    const properties = {
        duration: 5000,
        autoplay: false,
        transitionDuration: 500,
        arrows: false,
        infinite: true,
        easing: "ease",
        indicators: (i) => <div className="indicator">{i + 1}</div>
    };

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
                            style={{ height: '150px' }}
                        />
                    </FloatingLabel>
                    <div style={{ alignItems: "center", textAlign: "center", margin: 20 }}>
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