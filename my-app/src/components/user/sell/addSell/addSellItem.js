import React from "react";
import ModalSellItem from "../modalSellItem/modalSellItem";
import "./addSellItem.css";

function AddSellItem() {
    const itemProduct = [{
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
            "image": [""],
            "price": 0,
            "siteURL": ""
        }
    }];

    return (
        <div>
            <div className="divv">
                <div style={{ textAlign: "center" }}><h1>Thêm đơn bán</h1></div>
            </div>
            <ModalSellItem itemProduct={itemProduct} add={true}/>
        </div>
    );
}

export default AddSellItem;