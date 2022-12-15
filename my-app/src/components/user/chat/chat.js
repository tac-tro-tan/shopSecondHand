import React, { useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { selectCustomer } from "../../../store/userSlice";
import './chat.css'
function Chat() {
    //lấy giá trị id trên thanh path
    const location = useLocation()
    const idChater = location.pathname.replace("/chat/", "");

    //cuộn thanh tin nhắn xuống dưới cùng để thấy dòng tin nhắn mới  vừa chat
    const messagesEndRef = useRef(null);
    //
    const { id, title, jwtToken } = useSelector(selectCustomer);
    //danh sách chat của mình bên trái
    const [dataChat, setDataChat] = useState([
        {
            "id": 1,
            "accountId1": "1c4ed8f5-67cc-483d-3b20-08dac91fa5f7",
            "accountId2": "e8a513d1-250d-47ba-3b21-08dac91fa5f7",
            "name1": "",
            "name2": "",
            "messages": [
                {
                    "id": 3,
                    "accountId": "9798ab46-ca9f-4735-3b22-08dac91fa5f7",
                    "name": "Gang",
                    "content": "hi chào cậu",
                    "created": "2022-12-05T09:54:20.6779055"
                }
            ],
            "nameChat": ""
        }
    ]);

    //gửi tin nhắn
    const [mess, setMess] = useState("");
    //search item listchat
    const [query, setQuery] = useState("");
    //chat box (bên phải)
    const [chatBox, setChatBox] = useState({
        "id": 3,
        "accountId1": "1c4ed8f5-67cc-483d-3b20-08dac91fa5f7",
        "accountId2": "9798ab46-ca9f-4735-3b22-08dac91fa5f7",
        "name1": "",
        "name2": "",
        "messages": [
            {
                "id": 3,
                "accountId": "9798ab46-ca9f-4735-3b22-08dac91fa5f7",
                "name": "Gang",
                "content": "hi chào cậu",
                "created": "2022-12-05T09:54:20.6779055",
                "time": ""
            }
        ]
    });

    // dánh sách chat lít item
    useEffect(() => {
        const fetchData = async () => {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'accept': ' text/plain',
                    'Authorization': 'Bearer ' + jwtToken
                }
            };
            const response = await fetch('https://localhost:7071/api/Chat/get all?accountId=' + id, requestOptions)
            const data = await response.json();
            data.forEach(x => {
                if (x.name1 != title) x.nameChat = x.name1;
                if (x.name2 != title) x.nameChat = x.name2;
            });
            setDataChat(data);
            const acc = data.map(x => {
                if (x.accountId1 != id) return x.accountId1;
                if (x.accountId2 != id) return x.accountId2;
                return null;
            })
            const numm = acc.indexOf(idChater);
            //nếu nhấn vào mục tin nhắn trên navbar
            if (idChater == id) {
                setChatBox(data[0]);
            }//nếu nhấn vào mục chat với người bán và đã có đoạn chat
            else if (numm != -1) {
                setChatBox(data[numm]);
            } else {
                //chưa thì tạo đoạn chat mới
                const fetchData = async (req, res) => {
                    try {
                        //tạo đoạn chat mới
                        const requestOptions = {
                            method: 'POST',
                            headers: {
                                'accept': ' text/plain',
                                'Authorization': 'Bearer ' + jwtToken,
                                'Content-Type': ' application/json-patch+json'
                            },
                            body: JSON.stringify(
                                {
                                    "accountId1": id,
                                    "accountId2": idChater
                                })
                        };
                        const response = await fetch('https://localhost:7071/api/Chat/add', requestOptions)
                        const data = await response.json();

                        //thêm 1 câu chat "hi chào cậu"
                        const requestOptions2 = {
                            method: 'POST',
                            headers: {
                                'accept': ' text/plain',
                                'Authorization': 'Bearer ' + jwtToken,
                                'Content-Type': ' application/json-patch+json'
                            },
                            body: JSON.stringify(
                                {
                                    "idChat": id,
                                    "message": "hi chào cậu"
                                })
                        };
                        const response2 = await fetch('https://localhost:7071/api/Chat/chat?id=' + data.id, requestOptions2)
                        const data2 = await response2.json();

                        setChatBox(data2);
                    } catch (error) {
                        res.send(error.stack);
                    }
                }
                fetchData();
            }
        }
        fetchData();
    }, []);

    //realtime cập nhật chat
    useEffect(() => {
        const intervalId = setInterval(() => {
            const fetchData = async (req, res) => {
                try {
                    const requestOptions2 = {
                        method: 'GET',
                        headers: {
                            'accept': ' text/plain',
                            'Authorization': 'Bearer ' + jwtToken
                        }
                    };
                    const response2 = await fetch('https://localhost:7071/api/Chat/get all?accountId=' + id, requestOptions2)
                    const data2 = await response2.json();
                    data2.forEach(x => {
                        if (x.name1 != title) x.nameChat = x.name1;
                        if (x.name2 != title) x.nameChat = x.name2;
                        x.messages.forEach(y => {
                            const word = new Date(y.created);
                            const word2 = word.toString();
                            const word3 = word2.split(" ");
                            y.time = word3[4] + " " + word3[1] + "/" + word3[2] + "/" + word3[3];
                        })
                    });

                    data2.sort(function (a, b) {
                        a = new Date(a.messages[a.messages.length-1].created).getTime();
                        b = new Date(b.messages[b.messages.length-1].created).getTime();
                        return a > b ? -1 : a < b ? 1 : 0;
                    })

                    setDataChat(data2);
                    data2.forEach(x => {
                        if (x.id == chatBox.id) setChatBox(x);
                    })
                } catch (error) {
                    res.send(error.stack);
                }
            }
            fetchData();
        }, 3000)
        return () => clearInterval(intervalId);
    })
    //hiện chat khi nhấn vào người chat
    const handleShow = (post) => {
        setChatBox(post)
        console.log(post);
    }

    const sendMess = () => {
        const fetchData = async (req, res) => {
            try {
                const requestOptions = {
                    method: 'POST',
                    headers: {
                        'accept': ' text/plain',
                        'Authorization': 'Bearer ' + jwtToken,
                        'Content-Type': 'application/json-patch+json'
                    },
                    body: JSON.stringify(
                        {
                            "idChat": id,
                            "message": mess
                        })
                };
                const response = await fetch('https://localhost:7071/api/Chat/chat?id=' + chatBox.id, requestOptions)
                const data = await response.json();

                const requestOptions2 = {
                    method: 'GET',
                    headers: {
                        'accept': ' text/plain',
                        'Authorization': 'Bearer ' + jwtToken
                    }
                };
                const response2 = await fetch('https://localhost:7071/api/Chat/get all?accountId=' + id, requestOptions2)
                const data2 = await response2.json();
                data2.forEach(x => {
                    if (x.name1 != title) x.nameChat = x.name1;
                    if (x.name2 != title) x.nameChat = x.name2;
                });
                setDataChat(data2);
                data2.forEach(x => {
                    if (x.id == chatBox.id) setChatBox(x);
                })
            } catch (error) {
                res.send(error.stack);
            }
        }
        fetchData();
        setMess("");
        const scrollToBottom = () => {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
        }
        scrollToBottom();
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
                                if (query === '' || post.nameChat.toLowerCase().includes(query.toLowerCase())) {
                                    return post;
                                }
                                return null;
                            }).map((post, index) => (
                                <div className={chatBox.id == post.id ? "chat_list active_chat" : "chat_list"}
                                    key={index}
                                    onClick={() => { handleShow(post); }}
                                >
                                    <div className="chat_people">
                                        <div className="chat_img">
                                            <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" />
                                        </div>
                                        <div className="chat_ib">
                                            <h5>{post.nameChat}
                                                <span className="chat_date">
                                                    {post.messages[post.messages.length - 1].time}
                                                </span>
                                            </h5>
                                            <p className="three-line-paragraph">
                                                <strong>{post.messages[post.messages.length - 1].name}</strong>
                                                :{post.messages[post.messages.length - 1].content}
                                            </p>
                                        </div>
                                    </div>
                                </div>))
                            }
                        </div>
                    </div>
                    <div className="mesgs">
                        <div className="msg_history">
                            {chatBox.messages.map((post, index) => {
                                let a;
                                (post.name == title) ?
                                    a =
                                    <div className="outgoing_msg" key={index}>
                                        <div className="sent_msg">
                                            <p>{post.content}</p>
                                            <span className="time_date"> {post.time}</span>
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
                                                <span className="time_date"> {post.time}</span>
                                            </div>
                                        </div>
                                    </div>
                                return (a)
                            })}
                            <div ref={messagesEndRef} />
                        </div>
                        <div className="type_msg">
                            <div className="input_msg_write">
                                <input type="text" id="clickMe" placeholder="Type a message"
                                    className="write_msg" value={mess} onChange={e => setMess(e.target.value)} />
                                <button className="msg_send_btn" type="button" onClick={sendMess}>
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