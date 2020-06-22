import React, { useState } from 'react';

import DragDrop from './widgets/DragDrop';
import Drawer from './widgets/Drawer';

import Tasks from './data/tasks';

import './index.css';

const Board = ({ tasks, updateItemStatus }) => {
  const [drawerItem, setDrawerItem] = useState(null);

  const openDrawer = (drawerItem) => {
    setDrawerItem(drawerItem);
  };

  const closeDrawer = () => {
    setDrawerItem(null);
  };

  return (
    <div className='board'>
      <Header />

      <DragDrop
        items={tasks}
        updateItemStatus={updateItemStatus}
        activeId={drawerItem && drawerItem.id}
        openDrawer={openDrawer}
      />

      <Drawer item={drawerItem} isOpen={!!drawerItem} onClose={closeDrawer} />
    </div>
  );
};

Board.defaultProps = new Tasks({ length: 50 });

export default Board;

const Header = () => <div className='header'>erisnuts/task-board</div>;
