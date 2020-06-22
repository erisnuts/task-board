import React, { Fragment } from 'react';

import useCurrentWitdh from 'hooks/useCurrentWidth';

import classnames from 'classnames';

import './index.css';

const Drawer = ({ item, isOpen, onClose }) => {
  const width = useCurrentWitdh();

  return (
    <div
      className={classnames(
        'drawer__wrapper',
        { visible: isOpen },
        item && item.type
      )}
      style={{ maxWidth: width - 80 }}
    >
      {item && (
        <Fragment>
          <div className='drawer__header'>
            {item.id}, {item.status}
            <span onClick={onClose} className='drawer__close' />
          </div>
          <div className='drawer__content'>
            <div>{item.title}</div>
          </div>
          <div>
            {`{${item.lastName}, ${item.firstName}}`}, {item.date.toDateString()}
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default Drawer;
