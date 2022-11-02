import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import ListItem from "../listItem/listItem";
import { useSelector } from "react-redux";
import { selectCustomer } from "../../../store/userSlice";

function MyCart() {
    // id các sản phẩm được mình lưu
    const { cart } = useSelector(selectCustomer);
    // danh sách sản phẩm mình lưu
    const [listItemCart, setlistItemCart] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const requestOptions = {
                method: 'GET'
            };
            const response = await fetch('http://localhost:3003/sanPham', requestOptions)
            const data = await response.json();
            setlistItemCart(data.filter(a => cart.includes(a.id.idSP)));
        }
        fetchData();
    }, []);

    return (
        <div>
            <div className="divv">
                <div style={{ textAlign: "center" }}><h1>Giỏ hàng của bạn:</h1></div>
            </div>
            <Container>
                <ListItem listItem={listItemCart} sell={false} />
            </Container>
        </div>
    );
}

export default MyCart;