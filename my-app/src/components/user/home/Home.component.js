import React, { useEffect, useState, memo } from "react";
import ListItem from "../listItem/listItem";
import SiderBer from '../../sidebar/sideBar';

function Home() {
    // danh sách tất cả sản phẩm+sidebar
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
            {/* hiển thị danh sách sản phẩm với đầu vào là: 
            listItem:danh sách sản phẩm và sell:có phải danh sách sản phẩm của mình hay không  */}
            <ListItem listItem={listItemHome} sell={false}/>
        </div>
    );
}

export default Home;