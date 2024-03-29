import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Image, Row } from 'react-bootstrap';
import bigStar from '../assets/bigStar.png';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchOneDevice, addtoBasket, deleteOneDevice } from '../http/deviceApi';
import { Context } from '..';
import jwt_decode from 'jwt-decode';

export const DevicePage = () => {
  const [device, setDevice] = useState({ info: [] });
  const { id } = useParams();
  const { user } = useContext(Context);
  const role = user.isAuth ? jwt_decode(localStorage.getItem('token')).role : null;
  const navigate = useNavigate();

  useEffect(() => {
    fetchOneDevice(id).then((data) => setDevice(data));
  }, []);

  // ------- Создаём функцию для записи ------- //
  const add = () => {
    const formData = new FormData();
    formData.append('deviceId', id);
    addtoBasket(formData).then((response) =>
      alert(`Товар ` + device.name + ` был добавлен в вашу корзину!`),
    );
  };

  const onDeleteDevice = (id) => {
    deleteOneDevice(id).then((response) => console.log(response));
    navigate('/');
  };
  return (
    <Container className="mt-3">
      <Row>
        <Col md={4}>
          <Image width={300} height={300} src={process.env.REACT_APP_API_URL + device.img} />
        </Col>
        <Col md={4}>
          <Form className="d-flex flex-column align-items-center">
            <h2>{device.name}</h2>
            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                background: `url(${bigStar}) no-repeat center center`,
                width: 240,
                height: 240,
                backgroundSize: 'cover',
                fontSize: 64,
              }}
            >
              {device.rating}
            </div>
          </Form>
        </Col>
        <Col md={4}>
          <Card
            className="d-flex flex-column align-items-center justify-content-around"
            style={{
              width: 300,
              height: 300,
              fontSize: 32,
              border: '5px solid lightgray',
            }}
          >
            <h3>От: {device.price} руб.</h3>
            {/* Запускаем функцию */}
            <Button variant={'outline-dark'} onClick={add}>
              Добавить в корзину
            </Button>
            {role === 'ADMIN' && (
              <Button
                variant={'danger'}
                style={{ width: '65%' }}
                onClick={() => onDeleteDevice(id)}
              >
                Удалить товар
              </Button>
            )}
          </Card>
        </Col>
      </Row>
      <Row className="d-flex flex-column m-3">
        <h1>Характеристики</h1>
        {device.info.map((info, index) => (
          <Row
            key={info.id}
            style={{
              background: index % 2 === 0 ? 'lightgray' : 'transparent',
              padding: 10,
            }}
          >
            {info.title}: {info.description}
          </Row>
        ))}
      </Row>
    </Container>
  );
};
