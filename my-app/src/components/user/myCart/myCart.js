import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import ListItem from "../listItem/listItem";
import { useSelector } from "react-redux";
import { selectCustomer } from "../../../store/userSlice";

function MyCart() {
    // id các sản phẩm được mình lưu
    const { id,jwtToken } = useSelector(selectCustomer);
    // danh sách sản phẩm mình lưu

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
                    method: 'GET',
                    headers: {
                        'accept': ' text/plain',
                        'Authorization': 'Bearer ' + jwtToken
                    }
                };
                const response = await fetch('https://localhost:7071/api/Cart/get?id='+id+'&page=' + pagee + '&pageSize=9', requestOptions)
                const data = await response.json();
                const listId = data.results.map(x=>x.itemId);
                const requestOptions2 = {
                    method: 'POST',
                    headers: {
                        'accept': ' text/plain',
                        'Content-Type': 'application/json-patch+json'
                    },
                    body: JSON.stringify(
                        {
                            "page": 0,
                            "pageSize": 40
                        })
                };
                const response2 = await fetch('https://localhost:7071/api/Item/get', requestOptions2)
                const data2 = await response2.json();
                setState({
                    data: data2.results.filter(item=>listId.includes(item.id)),
                    totalRecords: data.total
                })
            } catch (error) {
                res.send(error.stack);
            }
        }
        fetchData();
    }, [pagee])

    return (
        <div>
            <div className="divv">
                <div style={{ textAlign: "center" }}><h1>Giỏ hàng của bạn:</h1></div>
            </div>
            <Container>
                <ListItem listItem={state} sell={false} getPage={getPaginatedData} />
            </Container>
        </div>
    );
}

export default MyCart;