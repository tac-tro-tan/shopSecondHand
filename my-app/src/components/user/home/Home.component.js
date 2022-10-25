import React, { useEffect, useState, memo } from "react";
import ListItem from "../listItem/listItem";
import SiderBer from '../../sidebar/sideBar';

function Home() {
    const [listItemHome, setListItemHome] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const requestOptions = {
                method: 'GET'
            };
            const response = await fetch('http://localhost:3003/sanPham', requestOptions)
            const data = await response.json();
            setListItemHome(data);
        }
        fetchData();
    }, []);

    return (
        <div className="d-flex flex-row">
            <div className='sider'>
                <SiderBer />
            </div>
            <ListItem listItem={listItemHome} />
        </div>
    );
}

export default Home;