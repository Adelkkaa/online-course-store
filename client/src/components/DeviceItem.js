import React, { useContext } from "react";
import { Card, Col, Image } from "react-bootstrap";
import ratingStar from "../assets/rating.png";
import { useNavigate } from "react-router-dom";
import { DEVICE_ROUTE } from "../utils/constants";
import { Context } from "..";

const DeviceItem = ({ item }) => {
  const navigate = useNavigate();
  const { device } = useContext(Context);
  const name = device.brands.filter((i) => i.id === item.brandId);
  return (
    <Col
      md={3}
      className="mt-3"
      onClick={() => navigate(DEVICE_ROUTE + "/" + item.id)}
    >
      <Card style={{ width: 150, cursor: "pointer" }} border={"light"}>
        <Image
          width={150}
          height={150}
          src={process.env.REACT_APP_API_URL + item.img}
        />
        <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
          <div>{name[0].name}</div>
          <div className="d-flex align-items-center">
            <div>{item.rating}</div>
            <Image width={20} height={18} src={ratingStar} />
          </div>
        </div>
        <div>{item.name}</div>
      </Card>
    </Col>
  );
};

export default DeviceItem;
