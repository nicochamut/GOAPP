import React from "react";
import styled from "styled-components";
import tesoreria from "../Assets/tesoreria.png";
import botoleum from "../Assets/botoleum.png";

const Hero = () => {
  return (
    <HeroStyled>
      <h1>
        <span>GO</span>APP
      </h1>
      <div className="icons">
        <Button className="button">
          <div className="image">
            {" "}
            <img src={tesoreria} />{" "}
          </div>

          <div className="descrip">
            <h4>Tesoreria</h4>
          </div>
        </Button>
        <Button className="button">
          <div className="image">
            {" "}
            <img src={tesoreria} />{" "}
          </div>

          <div className="descrip">
            <h4>Maestros</h4>
          </div>
        </Button>
        <Button className="button">
          <div className="image">
            {" "}
            <img src={tesoreria} />{" "}
          </div>

          <div className="descrip">
            <h4>Turnos</h4>
          </div>
        </Button>

        <Button className="tesoreria">
          <img src={tesoreria} />
          <h4>Saldo Clientes</h4>
        </Button>
        <Button className="tesoreria">
          <img src={tesoreria} />
          <h4>Saldo Proveedores</h4>
        </Button>
      </div>
      <div className="IAbutton">
        <div>
          <img src={botoleum} />
          <h3>
            <span>IA</span> Asistente
          </h3>
        </div>
      </div>
    </HeroStyled>
  );
};

const HeroStyled = styled.div`
  /* background: linear-gradient(200deg, #000000 20%, #139dd6 100%); */
  background: #1b1b1b;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  h1 {
    font-size: 4rem;
    letter-spacing: 5px;
    font-weight: 700;
    margin-bottom: -2rem;
    margin-top: 2rem;

    background: linear-gradient(
      to right,
      #1b1b1b 20%,
      #32ff9c2e 100%,
      #32ff9c3d 100%,
      #32ff9c 100%
    );
    width: 100%;
    text-align: center;
    color: white;

    span {
      color: #139dd6;
    }
  }
  .icons {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    background: #1b1b1b;

    height: 30rem;
    margin-bottom: -3rem;

    img {
      width: 4rem;
      filter: invert(1);
      margin-bottom: 10px;
    }
  }

  .IAbutton {
    width: 50%;
    text-align: center;
    height: 6rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    span {
      color: #32ff9c;
    }
    img {
      width: 7rem;
      margin-bottom: -1.5rem;
    }
  }
`;

const Button = styled.div`
  text-align: center;
  height: 136px;
  width: 136px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0.5rem;
  margin: 1rem;

  border-radius: 20px;
  background: #1b1b1b;
  box-shadow: -14px -14px 27px #131313, 14px 14px 27px #232323;
  h4 {
    height: 15px;
    margin-bottom: 20px;
    color: #ffffff;
  }
`;

export default Hero;
