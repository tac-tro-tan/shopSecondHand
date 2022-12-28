import React from "react";
import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent
} from "react-pro-sidebar";
import {
    FaTachometerAlt,
    FaGem,
    FaList,
    FaGithub,
    FaRegLaughWink,
    FaHeart
} from "react-icons/fa";
import "./sidebar.css";

const SiderBer = ({ image, collapsed, rtl, toggled, handleToggleSidebar, clickArea, clickTopic, clickPrice }) => {

    return (
        <ProSidebar
            image={false}
            rtl={rtl}
            collapsed={collapsed}
            toggled={toggled}
            breakPoint="md"
            onToggle={handleToggleSidebar}
        >
            <SidebarHeader>
                <div
                    style={{
                        padding: "24px",
                        textTransform: "uppercase",
                        fontWeight: "bold",
                        fontSize: 14,
                        letterSpacing: "1px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap"
                    }}
                >
                    For Sale
                </div>
            </SidebarHeader>

            <SidebarContent>
                <Menu iconShape="circle">
                    <SubMenu
                        title="Giá"
                        icon={<FaTachometerAlt />}
                        suffix={<span className="badge red">'new'</span>}
                    >
                        <MenuItem><input type="radio" id="hanoi" name="fav_language"
                            value="all" onClick={(e) => { clickPrice(0, 1000000000) }}></input>
                            <label htmlFor="html">Tất cả</label><br></br></MenuItem>
                        <MenuItem><input type="radio" id="hanoi" name="fav_language"
                            value="hà nội" onClick={(e) => { clickPrice(0, 100000) }}></input>
                            <label htmlFor="html">0-&gt;100K</label><br></br></MenuItem>
                        <MenuItem><input type="radio" id="danang" name="fav_language"
                            value="đà nẵng" onClick={(e) => { clickPrice(100000, 1000000) }}></input>
                            <label htmlFor="html">100k-&gt;1tr</label><br></br></MenuItem>
                        <MenuItem><input type="radio" id="hcm" name="fav_language"
                            value="hồ chí minh" onClick={(e) => { clickPrice(1000000, 10000000) }}></input>
                            <label htmlFor="html">1tr-&gt;10tr</label><br></br></MenuItem>
                        <MenuItem><input type="radio" id="hcm" name="fav_language"
                            value="hồ chí minh" onClick={(e) => { clickPrice(10000000, 1000000000) }}></input>
                            <label htmlFor="html">10tr{'<'} </label><br></br></MenuItem>
                    </SubMenu>
                </Menu>
                <Menu iconShape="circle">
                    <SubMenu
                        suffix={<span className="badge yellow">3</span>}
                        title="Địa điểm"
                        icon={<FaRegLaughWink />}
                    >
                        <MenuItem><input type="radio" id="hanoi" name="fav_language"
                            value="all" onClick={(e) => { clickArea(e.target.value) }}></input>
                            <label htmlFor="html">Tất cả</label><br></br></MenuItem>
                        <MenuItem><input type="radio" id="hanoi" name="fav_language"
                            value="hà nội" onClick={(e) => { clickArea(e.target.value) }}></input>
                            <label htmlFor="html">Hà Nội</label><br></br></MenuItem>
                        <MenuItem><input type="radio" id="danang" name="fav_language"
                            value="đà nẵng" onClick={(e) => { clickArea(e.target.value) }}></input>
                            <label htmlFor="html">Đà Nẵng</label><br></br></MenuItem>
                        <MenuItem><input type="radio" id="hcm" name="fav_language"
                            value="hồ chí minh" onClick={(e) => { clickArea(e.target.value) }}></input>
                            <label htmlFor="html">Hồ Chí Minh</label><br></br></MenuItem>
                    </SubMenu>
                    {/* <SubMenu
                        prefix={<span className="badge gray">3</span>}
                        title="withPrefix"
                        icon={<FaHeart />}
                    >
                        <MenuItem>'submenu' 1</MenuItem>
                        <MenuItem>'submenu' 2</MenuItem>
                        <MenuItem>'submenu' 3</MenuItem>
                    </SubMenu> */}
                    <SubMenu title="Thể loại" icon={<FaList />}>

                        <MenuItem>
                            <input type="radio" id="all" name="fav_language1"
                                value="all" onClick={e => clickTopic(e.target.value)}></input>
                            <label htmlFor="html">Tất cả</label><br></br>
                        </MenuItem>

                        <MenuItem>
                            <input type="radio" id="xeco" name="fav_language1"
                                value="Xe cộ" onClick={e => clickTopic(e.target.value)}></input>
                            <label htmlFor="html">Xe cộ</label><br></br>
                        </MenuItem>
                        <MenuItem >
                            <input type="radio" id="dodientu" name="fav_language1"
                                value="Đồ điện tử" onClick={(e) => { clickTopic(e.target.value) }}></input>
                            <label htmlFor="html">Đồ điện tử</label><br></br>
                        </MenuItem>
                        <MenuItem >
                            <input type="radio" id="dodienmay" name="fav_language1"
                                value="Đồ điện máy"
                                onClick={(e) => { clickTopic(e.target.value) }}></input>
                            <label htmlFor="html">Đồ điện máy</label><br></br>
                        </MenuItem>
                        <MenuItem >
                            <input type="radio" id="thoitrang" name="fav_language1"
                                value="Thời trang"
                                onClick={(e) => { clickTopic(e.target.value) }}></input>
                            <label htmlFor="html">Thời trang</label><br></br>
                        </MenuItem>
                        <MenuItem >
                            <input type="radio" id="donoithat" name="fav_language1"
                                value="Đồ nội thất"
                                onClick={(e) => { clickTopic(e.target.value) }}></input>
                            <label htmlFor="html">Đồ nội thất</label><br></br>
                        </MenuItem>
                        {/* <MenuItem>ô tô</MenuItem>
                        <MenuItem>ô tô</MenuItem>
                        <SubMenu title={`'submenu' 3`}>
                            <MenuItem>'submenu' 3.1 </MenuItem>
                            <MenuItem>'submenu' 3.2 </MenuItem>
                            <SubMenu title={`'submenu' 3.3`}>
                                <MenuItem>'submenu' 3.3.1 </MenuItem>
                                <MenuItem>'submenu' 3.3.2 </MenuItem>
                                <MenuItem>'submenu' 3.3.3 </MenuItem>
                            </SubMenu>
                        </SubMenu> */}
                    </SubMenu>
                </Menu>
            </SidebarContent>

            <SidebarFooter style={{ textAlign: "center" }}>
                <div
                    className="sidebar-btn-wrapper"
                    style={{
                        padding: "20px 24px"
                    }}
                >
                </div>
            </SidebarFooter>
        </ProSidebar>
    );
};

export default SiderBer;
