import React from "react";
import ModalSellItem from "../modalSellItem/modalSellItem";
import "./addSellItem.css";

function AddSellItem() {
    const itemProduct = {
        "id": 1,
        "accountId": "",
        "name": "",
        "topic": "",
        "area": "",
        "price": 0,
        "address": "",
        "phone": "",
        "describe": "",
        "image": "",
        "created": ""
    };

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