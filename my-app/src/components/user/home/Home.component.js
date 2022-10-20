import React from "react";
import { Container } from "react-bootstrap";
import "./home.css";
import { Link } from "react-router-dom";
import SideBer from "../../sidebar/sideBar"
function Home() {

    return (
        <div className="d-flex flex-row">
            <div className='sider'>
              <SideBer/>
          </div>
            <Container>
                <div className="mx-auto col text-center scroll-container" >
                    <section id="phapluat" className="divv"
                        style={{ alignItems: "center", textAlign: "center", alignSelf: "center", alignContent: "center" }}>
                        <form className="form-inline search1 d-flex row1">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form>
                        <div className="row row1">

                            <div className="col">
                                <Link to="/chitiet">
                                    <div className="card " style={{ width: "15rem" }}>
                                        <img className="card-img-top" height="190px" src="" alt="Card image cap"></img>
                                        <div className="card-body">
                                            <h5 className="card-title">Quạt cũ 5 năm</h5>
                                            <p className="card-text">Price: 50k</p>
                                        </div>
                                    </div>
                                </Link>
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
                    </section>
                </div>
            </Container>
        </div>
    );
}

export default Home;