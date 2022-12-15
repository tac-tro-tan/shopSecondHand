import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import "./listItem.css";
import { generatePath, Link } from "react-router-dom";
import PaginationComponent from "../../pagination/paginationComponent";
function ListItem({ listItem, sell, getPage }) {
    
    return (
        <div className="row">
            {listItem.data.map((post, index) => (
                <React.Fragment key={index * 3}>
                    <div className="col my-3" key={index}>
                        <Link to={sell ? generatePath("/chitietdonban/:idb", { idb: post.id })
                            : generatePath("/chitiet/:idd", { idd: post.id })}>

                            <div className="card absolute" style={{ width: "15rem", height: "20rem" }}>

                                <img className="card-img-top" style={{ width: "15rem", height: "13rem" }}
                                    src={post.image} alt="Card"></img>

                                <div className="card-body" style={{ textAlign: "start" }}>
                                    <small className="card-title">{post.name}</small>
                                    <strong style={{ color: "red" }} className="card-text price2">{post.price}đ</strong>
                                    <sub className="card-text price1">khu vực: {post.area} </sub>
                                </div>
                            </div>
                        </Link>
                    </div>
                    {(index + 1) % 3 === 0 ? <div className="w-100 d-none d-md-block" key={index * 2}></div>
                        : <></>}
                </React.Fragment>

            ))}
            {listItem.totalRecords > 9 &&
                <PaginationComponent
                    getAllData={getPage}
                    totalRecords={listItem.totalRecords}
                    itemsCountPerPage={9} />
            }
        </div>
    );
}

export default ListItem;