import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { Context } from '..';
import { deleteOneBasketItem, fetchDevices, getBasket } from '../http/deviceApi';

import { Card, Col, Container, Row } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';

import close from '../assets/close.svg';

export const Basket = observer(() => {
  const { device } = useContext(Context);
  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    getBasket().then((data) => device.setBaskets(data));
  }, [device, rerender]);

  const onDeleteBasketItem = (id) => {
    deleteOneBasketItem(id);
    setRerender((prev) => !prev);
  };

  const onDeleteBasket = () => {
    device.basket.map((product) => {
      onDeleteBasketItem(product.id);
    });
    alert('Заказ сделан успешно!');
    getBasket().then((data) => device.setBaskets(data));
  };

  // ----- Считаем общую сумму, которую юзер набрал в корзину ------- //

  let prices = 0;
  {
    device.basket.map((price) => (prices += Number(price.device.price)));
  }
  return (
    <Container className="d-flex flex-sm-column justify-content-center align-items-center mt-3">
      <h1 className="pb-2">Корзина</h1>

      {/* ------- Считаем общую сумму ------- */}

      <Card className="d-flex flex-row  p-2 justify-content-between align-items-center mb-2">
        <h1 className="pr-2">Итого:</h1>
        <h3 className="pl-2">
          {prices}
          <span className="font-weight-light pl-2"> рублей</span>
        </h3>
      </Card>

      {device.basket.map((product) => (
        <Card className="d-flex w-100 p-2 justify-content-center mb-2" key={product.id}>
          <Row className="d-flex w-100">
            <Col>
              <div className="d-flex flex-row align-items-center">
                <img src={process.env.REACT_APP_API_URL + product.device.img} width={50} />
                <h1 className="pl-3">{product.device.name}</h1>
              </div>
            </Col>
            <Col>
              <div className="d-flex h-100 flex-row justify-content-end align-items-center">
                <h2 className="font-weight-light">{product.device.price} рублей</h2>
                <button onClick={() => onDeleteBasketItem(product.id)} style={{ border: 'none' }}>
                  <img className={'ms-4'} src={close} width="30" height="30" />
                </button>
              </div>
            </Col>
          </Row>
        </Card>
      ))}
      <button
        onClick={() => onDeleteBasket()}
        style={{
          border: 'none',
          width: '100%',
          height: '3rem',
          fontSize: 32,
          backgroundColor: 'green',
        }}
      >
        Заказать
      </button>
    </Container>
  );
});
