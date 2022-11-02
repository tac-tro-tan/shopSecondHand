import React, { useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectCustomer } from "../../../store/userSlice";
import './chat.css'
function Chat() {
    //cuộn thanh tin nhắn xuống dưới cùng để thấy dòng tin nhắn mới  vừa chat
    const messagesEndRef = useRef(null);
    //
    const { id, title } = useSelector(selectCustomer);
    //danh sách chat của mình
    const [dataChat, setDataChat] = useState([
        {
            "id": 1,
            "idAcc1": 6,
            "idAcc2": 9,
            "chat": [
                {
                    "user": "Ong",
                    "content": "Bypass Trachea to Cutaneous, Open Approach",
                    "time": "19:28:28",
                    "time2": "2022-02-10"
                },
                {
                    "user": "Cu",
                    "content": "Reattachment of Common Bile Duct, Open Approach",
                    "time": "9:37:21",
                    "time2": "2022-08-16"
                }
            ]
        }
    ]);
    //search item listchat
    const [query, setQuery] = useState("");
    //chat box (bên phải)
    const [chatBox, setChatBox] = useState([
        {
            "user": "Ong",
            "content": "Bypass Trachea to Cutaneous, Open Approach",
            "time": "19:28:28",
            "time2": "2022-02-10"
        },
        {
            "user": "Cu",
            "content": "Reattachment of Common Bile Duct, Open Approach",
            "time": "9:37:21",
            "time2": "2022-08-16"
        }
    ]);
    //thêm class đậm màu khi click vào danh sách chat
    const [cssChat, setCssChat] = useState(0);
    //danh sách tên các chater với mình
    const [nameShop, setNameShop] = useState([
        {
            "id": 4,
            "title": "Gang",
            "first_name": "Earl",
            "last_name": "Ayrton",
            "email": "eayrton3@merriam-webster.com",
            "password": "SBZEwl0WDm",
            "phone": "6734248097",
            "address": "8130 Main Drive",
            "gender": "Male",
            "bDay": "12/28/2021",
            "cart": []
        }
    ]);
    // dánh sách sản phẩm của chủ cửa hàng
    useEffect(() => {
        const fetchData = async () => {
            const requestOptions = {
                method: 'GET'
            };
            const response = await fetch('http://localhost:3003/chatted', requestOptions)
            const data = await response.json();
            const listItem = data.filter(a => a.idAcc1 == id || a.idAcc2 == id);
            listItem.forEach(e => {
                e.chat.sort((b, a) => (new Date(b.time2 + " " + b.time) - new Date(a.time2 + " " + a.time)));
            });
            listItem.sort((a, b) => (
                new Date(b.chat[b.chat.length - 1].time2 + " " + b.chat[b.chat.length - 1].time) -
                new Date(a.chat[a.chat.length - 1].time2 + " " + a.chat[a.chat.length - 1].time)));
            setDataChat(listItem);
            //
            const dataShopBoss = [...listItem.map(a => a.idAcc1), ...listItem.map(a => a.idAcc2)]

            const requestOptions2 = {
                method: 'GET'
            };
            const response2 = await fetch('http://localhost:3003/account', requestOptions2)
            const data2 = await response2.json();
            const shopBoss = data2.filter(a => dataShopBoss.includes(a.id));
            setNameShop(shopBoss);
        }
        fetchData();
    }, [chatBox]);
    useEffect(() => {
        scrollToBottom()
    }, [chatBox]);
    //hiện chat khi nhấn vào người chat
    const handleShow = (post) => {
        setChatBox(post.chat)
        setCssChat(post.id)
    }
    //gửi tin nhắn
    const [mess, setMess] = useState("");
    const sendMess = () => {
        let data = dataChat.find(e => e.id == cssChat);
        let today = new Date();
        let time2 = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        fetch('http://localhost:3003/chatted/' + cssChat, {
            method: 'PATCH',
            body: JSON.stringify({
                chat: [
                    ...data.chat,
                    {
                        "user": `${title}`,
                        "content": `${mess}`,
                        "time": `${time}`,
                        "time2": `${time2}`
                    }
                ],
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
        // .then((json) => console.log(json));

        setMess("");
        setChatBox(prev =>
            [
                ...prev,
                {
                    "user": `${title}`,
                    "content": `${mess}`,
                    "time": `${time}`,
                    "time2": `${time2}`
                }
            ]

        );
    }

    //hàm cuộn scroll
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    return (
        <Container>
            <h3 className=" text-center">Messaging</h3>
            <div className="messaging">
                <div className="inbox_msg">
                    <div className="inbox_people">
                        <div className="headind_srch">
                            <div className="recent_heading">
                                <h4>Recent</h4>
                            </div>
                            <div className="srch_bar">
                                <div className="stylish-input-group">
                                    <input type="text" className="search-bar" placeholder="Search"
                                        onChange={event => setQuery(event.target.value)} />
                                    <span className="input-group-addon">
                                        <button type="button"> <i className="fa fa-search" aria-hidden="true"></i> </button>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="inbox_chat">
                            {dataChat.filter(post => {
                                if (query === '' || post.chat[0].user.toLowerCase().includes(query.toLowerCase())) {
                                    return post;
                                }
                                return null;
                            }).map((post, index) => (
                                <div className={cssChat == post.id ? "chat_list active_chat" : "chat_list"}
                                    key={index}
                                    onClick={() => {
                                        handleShow(post);
                                    }}>
                                    <div className="chat_people">
                                        <div className="chat_img">
                                            <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" />
                                        </div>
                                        <div className="chat_ib">
                                            <h5>{post.idAcc1 == id ?
                                                (nameShop.find(a => a.id == post.idAcc2) ?
                                                    nameShop.find(a => a.id == post.idAcc2).title : null) :
                                                (nameShop.find(a => a.id == post.idAcc1) ?
                                                    nameShop.find(a => a.id == post.idAcc1).title : null)}
                                                <span className="chat_date">
                                                    {post.chat[post.chat.length - 1].time + " " + post.chat[post.chat.length - 1].time2}
                                                </span>
                                            </h5>
                                            <p className="three-line-paragraph">
                                                <strong>{post.chat[post.chat.length - 1].user}</strong>
                                                :{post.chat[post.chat.length - 1].content}
                                            </p>
                                        </div>
                                    </div>
                                </div>))
                            }
                        </div>
                    </div>
                    <div className="mesgs">
                        <div className="msg_history">
                            {chatBox.map((post, index) => {
                                let a;
                                (post.user == title) ?
                                    a =
                                    <div className="outgoing_msg" key={index}>
                                        <div className="sent_msg">
                                            <p>{post.content}</p>
                                            <span className="time_date"> {post.time}    |    {post.time2}</span>
                                        </div>
                                    </div>
                                    :
                                    a =
                                    <div className="incoming_msg" key={index}>
                                        <div className="incoming_msg_img">
                                            <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" />
                                        </div>
                                        <div className="received_msg">
                                            <div className="received_withd_msg">
                                                <p>{post.content}</p>
                                                <span className="time_date"> {post.time}    |    {post.time2}</span>
                                            </div>
                                        </div>
                                    </div>
                                return (a)
                            })}
                            <div ref={messagesEndRef}/>
                        </div>
                        <div className="type_msg">
                            <div className="input_msg_write">
                                <input type="text" id="clickMe" placeholder="Type a message"
                                    className="write_msg" value={mess} onChange={e => setMess(e.target.value)} />
                                <button className="msg_send_btn" type="button"
                                    onClick={sendMess}>
                                    <i className="fa fa-paper-plane-o" aria-hidden="true"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default Chat;