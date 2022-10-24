// @ts-nocheck
import React from "react";
import { Container } from "react-bootstrap";
import "./productDetails.css";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import { Link } from "react-router-dom";

function ProductDetails() {

    var title = String.raw`
             ___| |_  ___  _____ __      _  ___  _____ ___
            / __| __|/ _  |  __/ \ \ /\ / // _  |  __// __|
            \__ | |_  (_| | |     \ V  V /  (_| | |   \__ |
            |___/\__|\__,_|_|      \_/\_/  \__,_|_|   |___/
        `;
    var content = String.raw`

    iMac 27" with new 1TB SDD and a Macbook pro Retina 15" model for sale, they're old but work solid and
    I have been used them to edit, grade, 8K RED raw, and pretty much anything for years.

    45,000 YEN pick up.

    The iMac is 2011 model, i7 3.4ghz full details in images, perfect condition and super quick now with
    the SSD installed.

    35,000 YEN pick up.

    Macbook Pro 15inch Retina, works perfect but some of the clear coat I think it is has been rubbing 
    off the screen, can be noticed on solid black backgrounds but no issues once screen is full colour
     displaying images or video etcs...
    Also have a PS3 for sale 10,000 yen and a PS4 30,000 yen.`;

    const slideImages = [
        {
            url: 'http://dummyimage.com/154x183.png/5fa2dd/ffffff',
            caption: 'ảnh 1'
        },
        {
            url: 'https://www.elle.vn/wp-content/uploads/2017/07/25/hinh-anh-dep-1.jpg',
            caption: 'ảnh 1'
        },

        {
            url: 'https://i.pinimg.com/736x/56/86/03/568603cbd1860c67bf8f6776cbe7f885.jpg',
            caption: 'ảnh 1'
        },
    ];

    return (
        <div>
            <Container>
                <div className="mx-auto col text-center scroll-container" >
                    <section id="phapluat" className="divv">
                        <div className="d-flex justify-content-between w-100 mt-3">

                            <div className="d-flex flex-column align-items-start">
                                <div className="d-flex">
                                    <div>
                                        <Link to="/">
                                            <button className="btn outline btn-outline-primary me-4">nút back</button>
                                        </Link>
                                    </div>
                                    <div>
                                        <Link to="/">
                                            <button className="btn outline btn-outline-primary">Cửa hàng</button>
                                        </Link>
                                    </div>
                                </div>

                                <div className="p-1"><h3>Quạt 5 năm</h3></div>
                                <div className="p-1"><span className="border border-info rounded p-1">giá:50k</span></div>
                                <div className="p-1"><span className="border border-info rounded p-1">sdt:0123123123</span></div>
                                <div className="p-1"><span className="border border-info rounded p-1">thể loại:đồ điện tử</span></div>
                                <div className="p-1"><span className="border border-info rounded p-1">Khu vực: Hòa Khánh-Liên Chiểu-Đà nẵng</span></div>
                                <div className="p-1">
                                    <Link to="/">
                                        <button className="btn outline btn-outline-primary">Chat với người bán</button>
                                    </Link>
                                </div>
                                <div className="p-1">
                                    <Link to="/">
                                        <button className="btn outline btn-outline-primary">Thêm vào giỏ hàng</button>
                                    </Link>
                                </div>
                            </div>
                            <div className="anh mt-3">
                                <div className="slide-container" >
                                    <Slide>
                                        {slideImages.map((slideImage, index) => (
                                            <div className="each-slide d-flex flex-column img-responsive-wrap " key={index}>
                                                <img style={{ width: "100%", height: "100%" }} className="lazy img-thumbnail img-inner" src={slideImage.url} alt="sample" />
                                            </div>
                                        ))}
                                    </Slide>
                                </div>
                            </div>
                        </div>


                        <div className="mt-3">

                            <pre style={{ textAlign: "start" }}>{content}
                            </pre>

                            <div>
                                <pre> {title} </pre>
                            </div>

                        </div>


                    </section>
                </div>
            </Container>
        </div>
    );
}

export default ProductDetails;