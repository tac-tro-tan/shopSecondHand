import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
// Assets
import Oto from "../../assets/img/clients/oto.png"
import XeMay from "../../assets/img/clients/xemay.png";
import DoDienTu from "../../assets/img/clients/dodientu.png";
import DoNoiThat from "../../assets/img/clients/donoithat.png";
import ThoiTrang from "../../assets/img/clients/thoitrang.png";
import DoDienMay from "../../assets/img/clients/dodienmay.png";
import DichVu from "../../assets/img/clients/dichvu.png";

import { Link } from "react-router-dom";

export default function ClientSlider() {

  const mangLogo = [
    { img: Oto, title: "Ô tô" },
    { img: XeMay, title: "Xe máy" },
    { img: DoDienTu, title: "Đồ điện tử" },
    { img: DoDienMay, title: "Đồ điện máy" },
    { img: ThoiTrang, title: "Thời trang" },
    { img: DoNoiThat, title: "Đồ nội thất" },
    { img: DichVu, title: "Dịch vụ" }
  ]
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div>
      <Slider {...settings}>
        {mangLogo.map(chil => (
          <Link to={"/home/search"+chil.title}>
            <LogoWrapper className="d-flex flex-column align-items-center rounded">
              <ImgStyle className="rounded-circle" src={chil.img} alt="client logo" />
              <span>{chil.title}</span>
            </LogoWrapper>
          </Link>
        ))}
      </Slider>
    </div>
  );
}

const LogoWrapper = styled.div`
  cursor: pointer;
  transition: box-shadow .3s;
  :hover {
    box-shadow: 0 0 11px rgba(33,33,33,.2); 
    color: red;
  }
  :focus-visible {
    outline: none;
    border: 0px;
  }
`;
const ImgStyle = styled.img`
  height: 100%;
  background-color: #b4aed1ee;
`;