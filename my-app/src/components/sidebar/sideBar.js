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
import "./sidebar.css"

const SiderBer = ({ image, collapsed, rtl, toggled, handleToggleSidebar }) => {
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
                    <MenuItem
                        icon={<FaTachometerAlt />}
                        suffix={<span className="badge red">'new'</span>}
                    >
                        Price
                    </MenuItem>
                    <div className="row">
                        <input className="form-control form-control-sm col input1" type="text" placeholder="min"></input>
                        <input className="form-control form-control-sm col input1" type="text" placeholder="max"></input>
                    </div>
                    {/* <MenuItem icon={<FaGem />}> 'min-max'</MenuItem> */}
                </Menu>
                <Menu iconShape="circle">
                    <SubMenu
                        suffix={<span className="badge yellow">3</span>}
                        title="Location"
                        icon={<FaRegLaughWink />}
                    >
                        <MenuItem><input type="radio" id="hanoi" name="fav_language" value="hanoi"></input>
                            <label htmlFor="html">Hà Nội</label><br></br></MenuItem>
                        <MenuItem><input type="radio" id="danang" name="fav_language" value="danang"></input>
                            <label htmlFor="html">Đà Nẵng</label><br></br></MenuItem>
                        <MenuItem><input type="radio" id="hcm" name="fav_language" value="hcm"></input>
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
                    <SubMenu title="Category" icon={<FaList />}>
                        <MenuItem>'submenu' 1 </MenuItem>
                        <MenuItem>'submenu' 2 </MenuItem>
                        <SubMenu title={`'submenu' 3`}>
                            <MenuItem>'submenu' 3.1 </MenuItem>
                            <MenuItem>'submenu' 3.2 </MenuItem>
                            <SubMenu title={`'submenu' 3.3`}>
                                <MenuItem>'submenu' 3.3.1 </MenuItem>
                                <MenuItem>'submenu' 3.3.2 </MenuItem>
                                <MenuItem>'submenu' 3.3.3 </MenuItem>
                            </SubMenu>
                        </SubMenu>
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
