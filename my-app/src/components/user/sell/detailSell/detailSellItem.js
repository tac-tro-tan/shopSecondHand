import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ModalSellItem from "../modalSellItem/modalSellItem";

function DetailSellItem() {
    //lấy giá trị idSP
    const location = useLocation()
    const idSP = location.pathname.replace("/chitietdonban/", "");
    // dữ liệu sản phẩm
    const [itemProduct, setItemProduct] = useState({
        "id": 1,
        "accountId": "",
        "name": "",
        "topic": "",
        "area": "",
        "price": 0,
        "address": "",
        "phone": "",
        "describe": "",
        "status": 2,
        "image": "",
        "created": ""
    });
    useEffect(() => {
        const fetchData = async () => {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'accept': ' text/plain',
                }
            };
            const response = await fetch('https://localhost:7071/api/Item/' + idSP, requestOptions)
            const data = await response.json();
            setItemProduct(data);
        }
        fetchData();
    }, []);

    return (
        <div>
            <div className="divv">
                <div style={{ textAlign: "center" }}><h1>Chi tiết đơn bán</h1></div>
            </div>
            <ModalSellItem itemProduct={itemProduct} add={false}/>
        </div>
    );
}

export default DetailSellItem;