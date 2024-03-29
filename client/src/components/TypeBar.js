import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import ListGroup from 'react-bootstrap/ListGroup';

const TypeBar = observer(() => {
  const { device } = useContext(Context);
  return (
    <ListGroup>
      {device.types.map((type) => (
        <ListGroup.Item
          style={{ cursor: 'pointer' }}
          active={device.selectedType.id === type.id}
          key={type.id}
          onClick={() => device.setSelectedType(type)}
        >
          {type.name}
        </ListGroup.Item>
      ))}

      <ListGroup.Item
        style={{ cursor: 'pointer' }}
        key={'onSelectType'}
        onClick={() => device.setSelectedType({})}
      >
        Сбросить
      </ListGroup.Item>
    </ListGroup>
  );
});

export default TypeBar;
