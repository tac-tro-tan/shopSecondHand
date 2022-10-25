import React, { memo, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import "./listItem.css";
import { Link } from "react-router-dom";
import PaginationComponent from "../../pagination/paginationComponent";
function ListItem({ listItem }) {
    const [state, setState] = useState({
        data: [],
        totalRecords: 0,
        limit: 6
    })


    useEffect(() => {
        let timerId = setTimeout(() => {
            loadData(1)
        }, 1000);
        return () => {
            clearTimeout(timerId);
        };
    }, [listItem])



    const loadData = (page) => {
        setState({
            data: listItem.filter((a, index) => (index >= (page - 1) * 6) && (index < page * 6)),
            totalRecords: listItem.length,
            limit: 6
        })
        console.log(listItem);
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
                                <Link to="/chitiet">
                                    <div className="card absolute" style={{ width: "15rem", height: "18rem" }}>
                                        <img className="card-img-top" height="190px" src={post.data.image} alt="Card"></img>
                                        <div className="card-body">
                                            <h6 className="card-title">{post.data.title}</h6>
                                            <p className="card-text price1">giá: {post.data.price} đồng</p>
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