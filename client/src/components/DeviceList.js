import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Row } from 'react-bootstrap';
import { Context } from '../index';
import DeviceItem from './DeviceItem';

const typeID = {
  смартфон: 2,
  ноутбук: 3,
  ОЗУ: 5,
  процессор: 6,
  видеокарта: 7,
};

const price = {
  'До 30 т.р.': 30000,
  'До 70 т.р.': 70000,
  Неважно: 9999999999999,
};

const DeviceList = observer(({ customFilter }) => {
  const { device } = useContext(Context);
  let sortDevices;

  if (customFilter) {
    const filter = customFilter[0].map((item, index) =>
      index == 0 ? typeID[`${item}`] : index === customFilter[0].length - 1 ? price[item] : item,
    );
    sortDevices = device.devices.filter((item) => {
      let boolean = customFilter[0].length > 2 ? false : true;
      item.info.map((it) => {
        if (
          (customFilter[0].length > 2 &&
            filter[1] === 'игровой/для монтажа' &&
            it.description == 'Дискретная') ||
          (customFilter[0].length > 2 &&
            filter[1] === 'программирование' &&
            it.description >= '512' &&
            it.title == 'Объем встроенной памяти') ||
          filter[1] === 'серфинг в интернете'
        ) {
          boolean = true;
        }
      });
      if (item.price <= filter[filter.length - 1] && item.typeId === filter[0] && boolean) {
        return item;
      }
    });
  }

  return (
    <Row className="d-flex">
      {/* {device.devices.map((device) => (
        <DeviceItem key={device.id} item={device} />
      ))} */}
      {!customFilter
        ? device.devices.map((device) => <DeviceItem key={device.id} item={device} />)
        : sortDevices.map((device) => <DeviceItem key={device.id} item={device} />)}
    </Row>
  );
});

export default DeviceList;
