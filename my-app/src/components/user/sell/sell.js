import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import ListItem from "../listItem/listItem";
import { selectCustomer } from "../../../store/userSlice";
import { Link, useLocation } from "react-router-dom";


function Sell() {
    // id mình
    const { id, jwtToken } = useSelector(selectCustomer);
    // id chủ cửa hàng
    const location = useLocation()
    const idSPtoAcc = location.pathname.replace("/danhsachbanhang/", "");

    const [title, setTitle] = useState("");

    const [pagee, setPagee] = useState(0);

    // phân trang
    const [state, setState] = useState({
        data: [],
        totalRecords: 0
    })

    const getPaginatedData = page => {
        setPagee(page - 1)
    }

    useEffect(() => {
        const fetchData = async (req, res) => {
            try {
                const requestOptions = {
                    method: 'POST',
                    headers: {
                        'accept': ' text/plain',
                        'Authorization': 'Bearer ' + jwtToken,
                        'Content-Type': ' application/json-patch+json'
                    },
                    body: JSON.stringify(
                        {
                            "id": `${idSPtoAcc}`,
                            "page": pagee,
                            "pageSize": 9
                        })
                };
                const response = await fetch('https://localhost:7071/api/Item/searchaccount', requestOptions)
                const data = await response.json();
                setState({
                    data: data.results,
                    totalRecords: data.total
                })

                const requestOptions2 = {
                    method: 'GET',
                    headers: {
                        'accept': ' text/plain',
                        'Authorization': 'Bearer ' + jwtToken
                    }
                };
                const response2 = await fetch('https://localhost:7071/api/Account/' + idSPtoAcc, requestOptions2)
                const data2 = await response2.json();
                setTitle(data2.title);
            } catch (error) {
                res.send(error.stack);
            }
        }
        fetchData();
    }, [pagee])

    // const [listItemSell, setlistItemSell] = useState([]);
    // // dánh sách sản phẩm của chủ cửa hàng
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const requestOptions = {
    //             method: 'GET'
    //         };
    //         const response = await fetch('http://localhost:3003/sanPham', requestOptions)
    //         const data = await response.json();
    //         const listItem = data.filter(a => a.id.idCustomer == idSPtoAcc)
    //         setlistItemSell(listItem);
    //         setTitle(listItem[0].id.titleCustomer)
    //     }
    //     fetchData();
    // }, []);


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
                <ListItem listItem={state} sell={id == idSPtoAcc} getPage={getPaginatedData} />
            </Container>
        </div>
    );
}

export default Sell;