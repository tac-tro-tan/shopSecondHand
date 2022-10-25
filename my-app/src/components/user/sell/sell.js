import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import "./sell.css";
import { useSelector } from "react-redux";
import ListItem from "../listItem/listItem";
import { selectCustomer } from "../../../store/userSlice";
import { Link } from "react-router-dom";

function Sell() {

    const { idAcc } = useSelector(selectCustomer);

    const [listItemSell, setlistItemSell] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const requestOptions = {
                method: 'GET'
            };
            const response = await fetch('http://localhost:3003/sanPham', requestOptions)
            const data = await response.json();
            setlistItemSell(data.filter(a => a.id.idCustomer == idAcc));
        }
        fetchData();
    }, []);


    return (
        <div>
            <div className="divv">
                <div style={{ textAlign: "center" }}><h1>Cửa hàng của bạn:</h1></div>
            </div>
            <div>
                <Link to="/themdonban">
                    <button className="btn btn-outline-primary">Thêm đơn hàng</button>
                </Link>
            </div>
            <Container>
                <ListItem listItem={listItemSell}/>
            </Container>
        </div>
    );
}

export default Sell;