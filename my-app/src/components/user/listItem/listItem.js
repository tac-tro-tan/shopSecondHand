import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import "./listItem.css";
import { generatePath, Link } from "react-router-dom";
import PaginationComponent from "../../pagination/paginationComponent";
function ListItem({ listItem, sell }) {
    // phân trang
    const [state, setState] = useState({
        data: [],
        totalRecords: 0,
        limit: 6
    })

    useEffect(() => {
        loadData(1)
    }, [listItem])

    const loadData = (page) => {
        setState({
            data: listItem.filter((a, index) => (index >= (page - 1) * 6) && (index < page * 6)),
            totalRecords: listItem.length,
            limit: 6
        })
    }
    const getPaginatedData = page => {
        loadData(page);
    }
    return (
        <Container>
            <div className="mx-auto col text-center scroll-container" >
                <form className="form-inline search1 d-flex row1">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>

                <div className="row">
                    {state.data.map((post, index) => (
                        <React.Fragment key={index * 3}>
                            <div className="col my-3" key={index}>
                                <Link to={sell ? generatePath("/chitietdonban/:idb", { idb: post.id.idSP })
                                    : generatePath("/chitiet/:idd", { idd: post.id.idSP })}>

                                    <div className="card absolute" style={{ width: "15rem", height: "20rem" }}>

                                        <img className="card-img-top" style={{ width: "15rem", height: "13rem" }}
                                            src={post.data.image[post.data.image.length - 1]} alt="Card"></img>

                                        <div className="card-body" style={{ textAlign: "start" }}>
                                            <small className="card-title">{post.data.title}</small>
                                            <strong style={{ color: "red" }} className="card-text price2">{post.data.price}đ</strong>
                                            <sub className="card-text price1">khu vực: {post.data.city} </sub>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            {(index + 1) % 3 === 0 ? <div className="w-100 d-none d-md-block" key={index * 2}></div>
                                : <></>}
                        </React.Fragment>

                    ))}
                    {state.totalRecords > 6 &&
                        <PaginationComponent
                            getAllData={getPaginatedData}
                            totalRecords={state.totalRecords}
                            itemsCountPerPage={state.limit} />
                    }
                </div>
            </div>
        </Container>
    );
}

export default ListItem;