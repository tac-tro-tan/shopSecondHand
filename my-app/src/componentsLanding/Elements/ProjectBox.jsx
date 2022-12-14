import React from "react";
import styled from "styled-components";

export default function ProjectBox({ img, title, city, price, action}) {
  return (
    <Wrapper>
      <ImgBtn className="aniamte pointer" onClick={action ? () => action() : null}>
        <img className="radius8" src={img} alt="project" style={{height:"45vh",width:"25vw"}}></img>
      </ImgBtn>
      <h4 className="font15 extraBold">{title}</h4>
      <p className="font13" style={{color:"red"}}>{price} đ</p>
      <p className="font13">{city}</p>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  margin-top: 10px;
  img {
    width: 100%;
    height: auto;
    margin: 10px 0;
  }
  h3 {
    padding-bottom: 5px;
  }
`;
const ImgBtn = styled.button`
  background-color: transparent;
  border: 0px;
  outline: none;
  padding: 0px;
  margin: 0px;
  :hover > img {
    opacity: 0.5;
  }
`;