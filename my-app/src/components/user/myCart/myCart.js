import React from "react";
import { Container } from "react-bootstrap";
import "./myCart.css";
import { Link } from "react-router-dom";

function MyCart() {

    return (
        <div>
            <div className="divv">
                <div style={{ textAlign: "center" }}><h1>Giỏ hàng của bạn:</h1></div>
            </div>
            <Container>
                <div className="mx-auto col text-center scroll-container" >
                    <div className="row row1">

                        <div className="col">
                            <Link to="/chitiet">
                                <div className="card w-15">
                                    <img className="card-img-top" height="190px" src="" alt="Card image cap"></img>
                                    <div className="card-body">
                                        <h5 className="card-title">Quạt cũ 5 năm</h5>
                                        <p className="card-text">Price: 50k</p>
                                    </div>
                                </div>
                            </Link>
                        </div>

                        <div className="col">
                            <div className="card w-15">
                                <img className="card-img-top" height="190px" src="" alt="Card image cap"></img>
                                <div className="card-body">
                                    <h5 className="card-title">Quạt cũ 5 năm</h5>
                                    <p className="card-text">Price: 50k</p>
                                </div>
                            </div>
                        </div>

                        <div className="col">
                            <div className="card " style={{ width: "15rem" }}>
                                <img className="card-img-top" height="190px" src="" alt="Card image cap"></img>
                                <div className="card-body">
                                    <h5 className="card-title">Quạt cũ 5 năm</h5>
                                    <p className="card-text">Price: 50k</p>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="row row1">
                        <div className="col">
                            <div className="card " style={{ width: "15rem" }}>
                                <img className="card-img-top" height="190px" src="" alt="Card image cap"></img>
                                <div className="card-body">
                                    <h5 className="card-title">Quạt cũ 5 năm</h5>
                                    <p className="card-text">Price: 50k</p>
                                </div>
                            </div>
                        </div>

                        <div className="col">
                            <div className="card " style={{ width: "15rem" }}>
                                <img className="card-img-top" height="190px" src="" alt="Card image cap"></img>
                                <div className="card-body">
                                    <h5 className="card-title">Quạt cũ 5 năm</h5>
                                    <p className="card-text">Price: 50k</p>
                                </div>
                            </div>
                        </div>

                        <div className="col">
                            <div className="card " style={{ width: "15rem" }}>
                                <img className="card-img-top" height="190px" src="" alt="Card image cap"></img>
                                <div className="card-body">
                                    <h5 className="card-title">Quạt cũ 5 năm</h5>
                                    <p className="card-text">Price: 50k</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default MyCart;