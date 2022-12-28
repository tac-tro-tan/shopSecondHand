import React, { useEffect, useState } from "react";
import styled from "styled-components";
// Components
import ProjectBox from "../Elements/ProjectBox";
import FullButton from "../Buttons/FullButton";

import { Link } from "react-router-dom";
import PaginationComponent from "../../components/pagination/paginationComponent";

export default function Projects() {

  const [pagee, setPagee] = useState(0);

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
          body: JSON.stringify({
            "page": pagee,
            "pageSize": 9
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
  }, [pagee])

  return (
    <Wrapper id="projects">
      <div className="whiteBg">
        <div className="container">
          <HeaderInfo>
            <h1 className="font40 extraBold">Một số sản phẩm nổi bật</h1>
            <p className="font13">
              ...
              <br />
              ...
            </p>
          </HeaderInfo>
          <div className="row textCenter">
            {state.data.map((chil) => (
              <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
                <Link to={"/chitiet/" + chil.id}>
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
          <div className="d-flex justify-content-around">
            {state.totalRecords > 9 &&
              <PaginationComponent
                getAllData={getPaginatedData}
                totalRecords={state.totalRecords}
                itemsCountPerPage={9} />
            }
          </div>
        </div>
      </div>
      <div className="lightBg">
        <div className="container">
          {/* <Advertising className="flexSpaceCenter">
            <AddLeft>
              <AddLeftInner>
                <ImgWrapper className="flexCenter">
                  <img className="radius8" src={AddImage2} alt="add" />
                </ImgWrapper>
              </AddLeftInner>
            </AddLeft>
            <AddRight>
              <h4 className="font15 semiBold">A few words about company</h4>
              <h2 className="font40 extraBold">A Study of Creativity</h2>
              <p className="font12">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
                diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
              </p>
              <ButtonsRow className="flexNullCenter" style={{ margin: "30px 0" }}>
                <div style={{ width: "190px" }}>
                  <FullButton title="Get Started" action={() => alert("clicked")} />
                </div>
                <div style={{ width: "190px", marginLeft: "15px" }}>
                  <FullButton title="Contact Us" action={() => alert("clicked")} border />
                </div>
              </ButtonsRow>
            </AddRight>
          </Advertising> */}
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
`;
const HeaderInfo = styled.div`
  @media (max-width: 860px) {
    text-align: center;
  }
`;
const Advertising = styled.div`
  padding: 100px 0;
  margin: 100px 0;
  position: relative;
  @media (max-width: 1160px) {
    padding: 60px 0 40px 0;
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
  position: relative;
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
  @media (max-width: 860px) {
    width: 80%;
    order: 2;
  }
`;
const AddLeftInner = styled.div`
  width: 100%;
  position: absolute;
  top: -300px;
  left: 0;
  @media (max-width: 1190px) {
    top: -250px;
  }
  @media (max-width: 920px) {
    top: -200px;
  }
  @media (max-width: 860px) {
    order: 1;
    position: relative;
    top: -60px;
    left: 0;
  }
`;
const ImgWrapper = styled.div`
  width: 100%;
  padding: 0 15%;
  img {
    width: 100%;
    height: auto;
  }
  @media (max-width: 400px) {
    padding: 0;
  }
`;
