import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import ListItem from "../listItem/listItem";
import { selectCustomer } from "../../../store/userSlice";
import { Link, useLocation } from "react-router-dom";

function Sell() {
    // id mình
    const { id } = useSelector(selectCustomer);
    // id chủ cửa hàng
    const location = useLocation()
    const idSPtoAcc = location.pathname.replace("/danhsachbanhang/", "");

    const [title, setTitle] = useState("");
    const [listItemSell, setlistItemSell] = useState([]);
    // dánh sách sản phẩm của chủ cửa hàng
    useEffect(() => {
        const fetchData = async () => {
            const requestOptions = {
                method: 'GET'
            };
            const response = await fetch('http://localhost:3003/sanPham', requestOptions)
            const data = await response.json();
            const listItem = data.filter(a => a.id.idCustomer == idSPtoAcc)
            setlistItemSell(listItem);
            setTitle(listItem[0].id.titleCustomer)
        }
        fetchData();
    }, []);

    return (
        <div>
            <div className="divv">
                <div style={{ textAlign: "center" }}><h1>Cửa hàng của {title}:</h1></div>
            </div>
            <div style={{ textAlign: "center" }}>
                {id == idSPtoAcc ?
                    <Link to="/themdonban">
                        <button className="btn btn-outline-primary">Thêm đơn hàng</button>
                    </Link> : <></>}

            </div>
            <Container>
                {/* nếu cửa hàng này là cửa hàng của mình thì 
                sẽ chuyển đến trang detailSellItem thay vì trang productDetail*/}
                <ListItem listItem={listItemSell} sell={id == idSPtoAcc} />
            </Container>
        </div>
    );
}

export default Sell;