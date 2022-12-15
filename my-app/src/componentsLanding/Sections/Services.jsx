import React from "react";
import styled from "styled-components";
// Components
import ClientSlider from "../Elements/ClientSlider";
import FullButton from "../Buttons/FullButton";
import ProjectBox from "../Elements/ProjectBox";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCustomer } from "../../store/userSlice";

export default function Services() {

  const { title,id } = useSelector(selectCustomer);

  const imggg = [
    "https://firebasestorage.googleapis.com/v0/b/muabandocu.appspot.com/o/file%2F1d984e0b9b5d072ce997be13e5f8e8c2-2795651272731945424.jpg?alt=media&token=7a00ba4c-6940-450b-87eb-262884d5a7ad",
    "https://firebasestorage.googleapis.com/v0/b/muabandocu.appspot.com/o/file%2F29f61d2380dc31b5b87b32ac6d7871ab-2774343780256170510.jpg?alt=media&token=2d00a4cb-97a8-4e02-b763-4047a0fa8e78",
    "https://firebasestorage.googleapis.com/v0/b/muabandocu.appspot.com/o/file%2F1c3717df1b6ad23ffe4d3d42c02374ef-2791125198423456545.jpg?alt=media&token=a324a609-ac60-4976-83b4-08a154ab8b54",
    "https://firebasestorage.googleapis.com/v0/b/muabandocu.appspot.com/o/file%2F2e29b541396806f88d579f1ba3e07b37-2794832054110024626.jpg?alt=media&token=b7cace3a-4d5b-418e-87ce-cdbbc1c45980"
  ]

  const [state, setState] = useState({
    data: [],
    totalRecords: 0
  })

  useEffect(() => {
    const fetchData = async (req, res) => {
      try {
        const requestOptions = {
          method: 'POST',
          headers: {
            'accept': ' text/plain',
            'Content-Type': 'application/json-patch+json'
          },
          body: JSON.stringify({
            "page": 0,
            "pageSize": 3
          })
        };
        const response = await fetch('https://localhost:7071/api/Item/getpay', requestOptions)
        const data = await response.json();
        setState({
          data: data.results,
          totalRecords: data.total
        })
        console.log(data);
      } catch (error) {
        res.send(error.stack);
      }
    }
    fetchData();
  }, [])

  return (
    <Wrapper id="services">
      <div className="lightBg" style={{ padding: "50px 0" }}>
        <div className="container">
          <ClientSlider />
        </div>
      </div>
      <div className="whiteBg" style={{ padding: "60px 0" }}>
        <div className="container">
          <HeaderInfo>
            <h1 className="font40 extraBold"> Các sản phẩm nổi bật nhất</h1>
            <p className="font13">
              Sản phẩm được hiển thị nổi bật hơn, xuất hiện ở vị trí ưu tiên,
              <br />
              tần suất xuất hiện nhiều hơn
            </p>
          </HeaderInfo>
          <div className="row textCenter">
            {state.data.map((chil) => (
              <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
                <Link to={"/chitiet/"+chil.id}>
                <ProjectBox
                  img={chil.image}
                  title={chil.name}
                  city={chil.area}
                  price={chil.price}
                />
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="lightBg">
          <div className="container">
            <Advertising className="flexSpaceCenter">
              <AddLeft>
                <h4 className="font15 semiBold">kết nối tới mọi miền</h4>
                <h2 className="font40 extraBold">Chợ cũ</h2>
                <p className="font12">
                  Từ mọi miền đất nước, chúng tôi giúp người bán và người mua đồ cũ liên lạc và trao đổi thông tin với nhau,
                  để các bạn có thể mua bán trực tiếp với nhau
                </p>
                <ButtonsRow className="flexNullCenter" style={{ margin: "30px 0" }}>
                  <div style={{ width: "190px" }}>
                  <Link to="/home">
                    <FullButton title="Mua" action={() => alert("clicked")} />
                    </Link>
                  </div>
                  <div style={{ width: "190px", marginLeft: "15px" }}>
                  <Link to={title?"/danhsachbanhang/"+id:"/dangnhap"}>
                
                    <FullButton title="Bán" action={() => alert("clicked")} border />
                    </Link>
                  </div>
                </ButtonsRow>
              </AddLeft>
              <AddRight>
                <AddRightInner>
                  <div className="flexNullCenter">
                    <AddImgWrapp1 className="flexCenter">
                      <img src={imggg[0]} alt="office" style={{height:"406px",width:"285px"}}/>
                    </AddImgWrapp1>
                    <AddImgWrapp2>
                      <img src={imggg[1]} alt="office" style={{height:"333px",width:"197px"}}/>
                    </AddImgWrapp2>
                  </div>
                  <div className="flexNullCenter">
                    <AddImgWrapp3>
                      <img src={imggg[2]} alt="office" style={{height:"125px",width:"112px"}}/>
                    </AddImgWrapp3>
                    <AddImgWrapp4>
                      <img src={imggg[3]} alt="office" style={{height:"224px",width:"197px"}}/>
                    </AddImgWrapp4>
                  </div>
                </AddRightInner>
              </AddRight>
            </Advertising>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
`;
const ServiceBoxRow = styled.div`
  @media (max-width: 860px) {
    flex-direction: column;
  }
`;
const ServiceBoxWrapper = styled.div`
  width: 20%;
  margin-right: 5%;
  padding: 80px 0;
  @media (max-width: 860px) {
    width: 100%;
    text-align: center;
    padding: 40px 0;
  }
`;
const HeaderInfo = styled.div`
  @media (max-width: 860px) {
    text-align: center;
  }
`;
const Advertising = styled.div`
  margin: 80px 0;
  padding: 100px 0;
  position: relative;
  @media (max-width: 1160px) {
    padding: 100px 0 40px 0;
  }
  @media (max-width: 860px) {
    flex-direction: column;
    padding: 0 0 30px 0;
    margin: 80px 0 0px 0;
  }
`;
const ButtonsRow = styled.div`
  @media (max-width: 860px) {
    justify-content: space-between;
  }
`;
const AddLeft = styled.div`
  width: 50%;
  p {
    max-width: 475px;
  }
  @media (max-width: 860px) {
    width: 80%;
    order: 2;
    text-align: center;
    h2 {
      line-height: 3rem;
      margin: 15px 0;
    }
    p {
      margin: 0 auto;
    }
  }
`;
const AddRight = styled.div`
  width: 50%;
  position: absolute;
  top: -70px;
  right: 0;
  @media (max-width: 860px) {
    width: 80%;
    position: relative;
    order: 1;
    top: -40px;
  }
`;
const AddRightInner = styled.div`
  width: 100%;
`;
const AddImgWrapp1 = styled.div`
  width: 48%;
  margin: 0 6% 10px 6%;
  img {
    width: 100%;
    height: auto;
    border-radius: 1rem;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
    -moz-box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
  }
`;
const AddImgWrapp2 = styled.div`
  width: 30%;
  margin: 0 5% 10px 5%;
  img {
    width: 100%;
    height: auto;
    border-radius: 1rem;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
    -moz-box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
  }
`;
const AddImgWrapp3 = styled.div`
  width: 20%;
  margin-left: 40%;
  img {
    width: 100%;
    height: auto;
    border-radius: 1rem;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
    -moz-box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
  }
`;
const AddImgWrapp4 = styled.div`
  width: 30%;
  margin: 0 5%auto;
  img {
    width: 100%;
    height: auto;
    border-radius: 1rem;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
    -moz-box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
  }
`;