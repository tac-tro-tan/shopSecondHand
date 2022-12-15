import React, { useEffect, useState, memo } from "react";
import ListItem from "../listItem/listItem";
import SiderBer from '../../sidebar/sideBar';
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectCustomer } from "../../../store/userSlice";

function Home() {
    const { id, jwtToken } = useSelector(selectCustomer);
    // danh sách tất cả sản phẩm+sidebar
    const [pagee, setPagee] = useState(0);

    const [placeholderSearch, setPlaceholderSearch] = useState(" tìm kiếm");
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
                        'Content-Type': 'application/json-patch+json'
                    },
                    body: JSON.stringify(
                        {
                            "page": pagee,
                            "pageSize": 9
                        })
                };
                const response = await fetch('https://localhost:7071/api/Item/get', requestOptions)
                const data = await response.json();
                setState({
                    data: data.results,
                    totalRecords: data.total
                })
            } catch (error) {
                res.send(error.stack);
            }
        }
        fetchData();

        function countOccurrences(arr) {
            return arr.reduce(function (a, b) {
                a[b] = a[b] + 1 || 1
                return a;
            }, {});
        }

        const fetchData2 = async (req, res) => {
            try {
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        'accept': ' text/plain',
                        'Authorization': 'Bearer ' + jwtToken
                    }
                };
                const response = await fetch('https://localhost:7071/api/Cart/get?id=' + id + '&page=0&pageSize=40', requestOptions)
                const data = await response.json();
                const listId = data.results.map(x => x.itemId);
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
                const arr1 = data2.results.filter(item => listId.includes(item.id));
                const arr2 = arr1.map(x => x.topic);
                const obj = countOccurrences(arr2);
                var result = Object.keys(obj).map((key) => [key, obj[key]]);
                let k = 0;
                let k2 = "";
                result.forEach(x => {
                    if (x[1] > k) k = x[1]
                })
                result.forEach(x => {
                    if (x[1] == k) k2 = x[0]
                })
                setPlaceholderSearch("bạn có muốn mua " + k2);
            } catch (error) {
                res.send(error.stack);
            }
        }
        fetchData2();
    }, [pagee])

    const [searchh, setSearchh] = useState("");
    const onSearch = () => {
        const fetchData = async (req, res) => {
            try {
                if (searchh == "") {
                    const requestOptions = {
                        method: 'POST',
                        headers: {
                            'accept': ' text/plain',
                            'Content-Type': 'application/json-patch+json'
                        },
                        body: JSON.stringify(
                            {
                                "page": pagee,
                                "pageSize": 9
                            })
                    };
                    const response = await fetch('https://localhost:7071/api/Item/get', requestOptions)
                    const data = await response.json();
                    setState({
                        data: data.results,
                        totalRecords: data.total
                    })
                } else {
                    const requestOptions = {
                        method: 'POST',
                        headers: {
                            'accept': ' text/plain',
                            'Content-Type': 'application/json-patch+json'
                        },
                        body: JSON.stringify(
                            {
                                "keyWord": `${searchh}`,
                                "page": 0,
                                "pageSize": 9
                            })
                    };
                    const response = await fetch('https://localhost:7071/api/Item/search', requestOptions)
                        .then(response => response.json())
                        .then(data => {
                            setState({
                                data: data.results,
                                totalRecords: data.total
                            })
                        });
                }


            } catch (error) {
                res.send(error.stack);

            }
        }
        fetchData();
    }

    const clickArea = (e) => {
        const fetchData = async (req, res) => {
            try {
                if (e == "all") {
                    const requestOptions = {
                        method: 'POST',
                        headers: {
                            'accept': ' text/plain',
                            'Content-Type': 'application/json-patch+json'
                        },
                        body: JSON.stringify(
                            {
                                "page": pagee,
                                "pageSize": 9
                            })
                    };
                    const response = await fetch('https://localhost:7071/api/Item/get', requestOptions)
                    const data = await response.json();
                    setState({
                        data: data.results,
                        totalRecords: data.total
                    })
                } else {
                    const requestOptions = {
                        method: 'POST',
                        headers: {
                            'accept': ' text/plain',
                            'Content-Type': 'application/json-patch+json'
                        },
                        body: JSON.stringify(
                            {
                                "keyWord": e,
                                "page": 0,
                                "pageSize": 9
                            })
                    };
                    const response = await fetch('https://localhost:7071/api/Item/searcharea', requestOptions)
                        .then(response => response.json())
                        .then(data => {
                            setState({
                                data: data.results,
                                totalRecords: data.total
                            })
                        });
                }


            } catch (error) {
                res.send(error.stack);

            }
        }
        fetchData();

    }
    const clickTopic = (e) => {
        const fetchData = async (req, res) => {
            try {
                if (e == "all") {
                    const requestOptions = {
                        method: 'POST',
                        headers: {
                            'accept': ' text/plain',
                            'Content-Type': 'application/json-patch+json'
                        },
                        body: JSON.stringify(
                            {
                                "page": pagee,
                                "pageSize": 9
                            })
                    };
                    const response = await fetch('https://localhost:7071/api/Item/get', requestOptions)
                    const data = await response.json();
                    setState({
                        data: data.results,
                        totalRecords: data.total
                    })
                } else {
                    const requestOptions = {
                        method: 'POST',
                        headers: {
                            'accept': ' text/plain',
                            'Content-Type': 'application/json-patch+json'
                        },
                        body: JSON.stringify(
                            {
                                "keyWord": e,
                                "page": 0,
                                "pageSize": 9
                            })
                    };
                    const response = await fetch('https://localhost:7071/api/Item/searchtopic', requestOptions)
                        .then(response => response.json())
                        .then(data => {
                            setState({
                                data: data.results,
                                totalRecords: data.total
                            })
                        });
                }


            } catch (error) {
                res.send(error.stack);

            }
        }
        fetchData();
    }
    const clickPrice = (min, max) => {
        const fetchData = async (req, res) => {
            try {
                const requestOptions = {
                    method: 'POST',
                    headers: {
                        'accept': ' text/plain',
                        'Content-Type': 'application/json-patch+json'
                    },
                    body: JSON.stringify(
                        {
                            "price1": min,
                            "price2": max,
                            "page": 0,
                            "pageSize": 9
                        })
                };
                const response = await fetch('https://localhost:7071/api/Item/searchprice', requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        setState({
                            data: data.results,
                            totalRecords: data.total
                        })
                    });
            } catch (error) {
                res.send(error.stack);
            }
        }
        fetchData();
    }

    return (
        <div className="d-flex flex-row">
            <div className='sider'>
                <SiderBer clickArea={clickArea} clickTopic={clickTopic} clickPrice={clickPrice} />
            </div>
            {/* hiển thị danh sách sản phẩm với đầu vào là: 
            listItem:danh sách sản phẩm và sell:có phải danh sách sản phẩm của mình hay không  */}
            <Container>
                <div className="mx-auto col text-center scroll-container" >
                    <div className="form-inline search1 d-flex row1">
                        <input className="form-control mr-sm-2" type="search" placeholder={placeholderSearch}
                            aria-label="Search" value={searchh} onChange={(e) => { setSearchh(e.target.value) }}></input>
                        <button className="btn btn-outline-success my-2 my-sm-0" onClick={onSearch}>Search</button>
                    </div>
                    <ListItem listItem={state} sell={false} getPage={getPaginatedData} />
                </div>
            </Container>
        </div>
    );
}

export default Home;