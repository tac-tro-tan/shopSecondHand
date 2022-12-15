import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { selectCustomer } from "../../../store/userSlice";

import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import { NotificationManager } from "react-notifications";

const paypalScriptOptions = {
    "client-id":
        "AaUpVv8WDVM5uezwsQo79K6YBKmqm3EeLSOx5TFTX4RM2_ephwW68aJ4_ASXYPjbI8OyuXchwgkQ7bRl",
    currency: "USD"
};
function Button({idSP}) {
    const { id, jwtToken } = useSelector(selectCustomer);
    const navigate = useNavigate()
    const createNotification = (type) => {
        switch (type) {
            case 'success':
                NotificationManager.success('đã thanh toán', 'Thành công');
                break;
            case 'error':
                NotificationManager.error('đã có lỗi gì đó xảy ra', 'Thất bại', 3000);
                break;
            default:
                alert("kill me, i'm here");
        }
    }
    /**
     * usePayPalScriptReducer use within PayPalScriptProvider
     * isPending: not finished loading(default state)
     * isResolved: successfully loaded
     * isRejected: failed to load
     */
    const [{ isPending }] = usePayPalScriptReducer();
    const paypalbuttonTransactionProps = {
        style: { layout: "vertical" },
        createOrder(data, actions) {
            return actions.order.create({
                purchase_units: [
                    {
                        amount: {
                            value: "1.00"
                        }
                    }
                ]
            });
        },
        onApprove(data, actions) {
            /**
             * data: {
             *   orderID: string;
             *   payerID: string;
             *   paymentID: string | null;
             *   billingToken: string | null;
             *   facilitatorAccesstoken: string;
             * }
             */
            return actions.order.capture({}).then((details) => {
                // alert(
                //     "Transaction completed by" +
                //     (details?.payer.name.given_name ?? "No details")
                // );

                // alert("Data details: " + JSON.stringify(data, null, 2));
                console.log(data);
                if (data !== null) createNotification('success');
            else createNotification('error')
                const fetchData = async () => {
                    const requestOptions = {
                        method: 'POST',
                        headers: {
                            'accept': ' text/plain',
                            'Authorization': 'Bearer ' + jwtToken
                        }
                    };
                    const response = await fetch('https://localhost:7071/api/Item/Qc?id=' + idSP, requestOptions)
                    const data = await response.json();
                }
                fetchData();
                navigate(-2);
                
            });
        }
    };
    return (
        <>
            {isPending ? <h2>Load Smart Payment Button...</h2> : null}
            <PayPalButtons {...paypalbuttonTransactionProps} />
        </>
    );
}

function CheckOutPay() {
    
    //lấy giá trị idSP
    const location = useLocation()
    const idSP = location.pathname.replace("/checkoutpay/", "");
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

    const handlePay = () => {
        
    }

    return (
        <div id="wrapper">

            <div id="container">

                <div id="info">

                    <img id="product" src={itemProduct.image} style={{ height: "374px", width: "374px" }} />

                    
                </div>

                <div id="payment">

                    <form id="checkout">

                        {/* <input class="card" id="visa" type="button" name="card" value="" />
                        <input class="card" id="mastercard" type="button" name="card" value="" /> */}

                        <label>Tên sản phẩm</label>
                        <br></br>
                        <p>{itemProduct.name}</p>
                        <br></br>
                        <label>Số điện thoại</label>
                        <br></br>
                        <p>{itemProduct.phone}</p>
                        <br></br>
                        <label>Vị trí bán</label>
                        <br></br>
                        <p>{itemProduct.area}</p>
                        <br></br>
                        {/* <input id="cardnumber" type="text" pattern="[0-9]{13,16}" name="cardnumber" requierd="true" placeholder="0123-4567-8901-2345" /> */}

                        <label>Giá quảng cáo</label>
                        <br></br>
                        <p>23,813 đồng</p>
                        <br></br>
                        {/* <input id="cardholder" type="text" name="name" requierd="true" maxlength="50" placeholder="Cardholder" /> */}

                        {/* <label>Expiration Date</label>
                        <label id="cvc-label">CVC/CVV</label>
                        <div id="left">
                            <select name="month" id="month" onchange="" size="1">
                                <option value="00">MM</option>
                                <option value="01">01</option>
                                <option value="02">02</option>
                                <option value="03">03</option>
                                <option value="04">04</option>
                                <option value="05">05</option>
                                <option value="06">06</option>
                                <option value="07">07</option>
                                <option value="08">08</option>
                                <option value="09">09</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                            </select>
                            <p>/</p>
                            <select name="year" id="year" onchange="" size="1">
                                <option value="00">YY</option>
                                <option value="01">16</option>
                                <option value="02">17</option>
                                <option value="03">18</option>
                                <option value="04">19</option>
                                <option value="05">20</option>
                                <option value="06">21</option>
                                <option value="07">22</option>
                                <option value="08">23</option>
                                <option value="09">24</option>
                                <option value="10">25</option>
                            </select>
                        </div>


                        <input id="cvc" type="text" placeholder="Cvc/Cvv" maxlength="3" /> */}
                        <PayPalScriptProvider options={paypalScriptOptions}>
                            <Button idSP={idSP}/>
                        </PayPalScriptProvider>
                    </form>

                </div>

            </div>
        </div>
    );
}

export default CheckOutPay;