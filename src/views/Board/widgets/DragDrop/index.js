import React, { useState } from 'react';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import classnames from 'classnames';

import { STATUSES } from '../../constants';

import './index.css';

const DragDrop = ({
  items: defautItems,
  updateItemStatus,
  activeId,
  openDrawer,
}) => {
  const [items, setItems] = useState(defautItems);

  const onDragEnd = ({ destination, draggableId }) => {
    // dropped outside the list
    if (!destination) {
      return;
    }

    updateItemStatus(draggableId, destination.droppableId).then((nextItems) =>
      setItems(nextItems)
    );
  };

  const groupBy = (xs, key) => {
    return xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  return (
    <div className='dragdrop-container'>
      <DragDropContext onDragEnd={onDragEnd}>
        {STATUSES.map((status, key) => (
          <Column
            key={key}
            status={status}
            className={classnames({ shrink: !!activeId })}
            items={groupBy(items, 'status')[status] || []}
            onClick={openDrawer}
            activeId={activeId}
          />
        ))}
      </DragDropContext>
    </div>
  );
};

export default DragDrop;

const Column = ({ items, status, onClick, activeId, className }) => {
  const compare = (a, b) => {
    const priority = { COULD: 2, SHOULD: 1, MUST: 0 };

    if (`${a.firstName} ${a.lastName}` === `${b.firstName} ${b.lastName}`)
      return priority[a.type] < priority[b.type] ? -1 : 1;

    //prettier-ignore
    return `${a.firstName} ${a.lastName}` < `${b.firstName} ${b.lastName}` ? -1 : 1;
  };

  return (
    <Droppable droppableId={status}>
      {(provided, snapshot) => (
        <div className={classnames('droppable-column', className)}>
          <div className='droppable-column__header'>{status}</div>
          <div
            className='droppable-column__content'
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {items.sort(compare).map((item, key) => (
              <Card
                key={item.id}
                item={item}
                index={key}
                onClick={onClick}
                active={activeId === item.id}
              />
            ))}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
};

const Card = ({ item, index, onClick, active }) => {
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={() => onClick(item)}
          className={classnames('draggable-card', {
            active,
          })}
          style={provided.draggableProps.style}
        >
          <div className='draggable-card__header'>
            <div className={classnames('draggable-card__label', item.type)} />
          </div>
          <div className='draggable-card__content'>{item.title}</div>
          <div className='draggable-card__footer'>
            <div className='draggable-card__footer__avatar'>
              {item.firstName[0]}
              {item.lastName[0]}
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};
