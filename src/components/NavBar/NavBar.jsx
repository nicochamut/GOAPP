import React from "react";
import styled from "styled-components";

const NavBar = () => {
  return (
    <NavStyled>
      <h2>{/* <span className="IA">IA</span> Asistente */}</h2>
      <h2 className="GOAPP">GOAPP</h2>
    </NavStyled>
  );
};

const NavStyled = styled.div`
  position: absolute;
  top: 0;
  display: flex;
  justify-content: space-between;
  height: 3rem;
  align-items: center;
  width: 100%;
  padding: 0px 20px 0px 20px;
  color: white;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 13.5px;
  letter-spacing: 1px;
  background: black;
  text-align: center;
  .IA {
    color: #12ff8e;
  }
  .GOAPP {
    color: #139dd6;
  }
`;

export default NavBar;
