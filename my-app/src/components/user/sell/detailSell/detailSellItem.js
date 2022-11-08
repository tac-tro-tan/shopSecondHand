import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ModalSellItem from "../modalSellItem/modalSellItem";

function DetailSellItem() {
    //lấy giá trị idSP
    const location = useLocation()
    const idSP = location.pathname.replace("/chitietdonban/", "");
    // dữ liệu sản phẩm
    const [itemProduct, setItemProduct] = useState([{
        "id": {
            "idSP": 0,
            "SDT": "",
            "idCustomer": 0
        },
        "data": {
            "status": true,
            "city": "",
            "address": "",
            "category": "",
            "title": "",
            "description": " ",
            "image": ["https://cdn.chotot.com/mK4xJxBedDtJWuqdwu_23RvMyoO7qm-bt4Gg5NpdVBs/preset:view/plain/2e29b541396806f88d579f1ba3e07b37-2794832054110024626.jpg"],
            "price": 0,
            "siteURL": "https://xe.chotot.com/mua-ban-oto-quan-cau-giay-ha-noi/100072055.htm"
        }
    }]);
    useEffect(() => {
        const fetchData = async () => {
            const requestOptions = {
                method: 'GET'
            };
            const response = await fetch('http://localhost:3003/sanPham', requestOptions)
            const data = await response.json();
            setItemProduct(data.filter(a => a.id.idSP == idSP));
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