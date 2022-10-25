import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import "./myCart.css";
import ListItem from "../listItem/listItem";
import { useSelector } from "react-redux";
import { selectCustomer } from "../../../store/userSlice";

function MyCart() {

    const { idAcc } = useSelector(selectCustomer);


    const [listItemCart, setlistItemCart] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const requestOptions = {
                method: 'GET'
            };
            const response = await fetch('http://localhost:3003/sanPham', requestOptions)
            const data = await response.json();
            setlistItemCart(data.filter(a => a.id.idCustomer == idAcc));
        }
        fetchData();
    }, []);

    return (
        <div>
            <div className="divv">
                <div style={{ textAlign: "center" }}><h1>Giỏ hàng của bạn:</h1></div>
            </div>
            <Container>
                <ListItem listItem={listItemCart} />
            </Container>
        </div>
    );
}

export default MyCart;