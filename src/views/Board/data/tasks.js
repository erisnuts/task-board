//   id: 'TSK-0001',
//   title: '',
//   firstName: '',
//   lastName: '',
//   status: '',
//   type: '',
//   date: ''

import { STATUSES, TYPES } from '../constants';

function* idMaker() {
  let index = 0;
  while (true) yield 'TSK-' + `${index++}`.padStart(4, '0');
}

const genId = idMaker();

const statuses = STATUSES;
const types = TYPES;

const firstNames = ['Arnold', 'Brian'];
const lastNames = ['Smith', 'Hunter'];

const randomDate = (start, end) =>
  new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

const getTitle = () => {
  // prettier-ignore
  const words = [
    // eslint-disable-next-line max-len
    'lorem', 'ipsum', 'dolor', 'sit', 'amet,', 'consectetur', 'adipiscing', 'elit', 'ut', 'aliquam,', 'purus', 'sit', 'amet', 'luctus', 'venenatis,', 'lectus', 'magna', 'fringilla', 'urna,', 'porttitor', 'rhoncus', 'dolor', 'purus', 'non', 'enim', 'praesent', 'elementum', 'facilisis', 'leo,', 'vel', 'fringilla', 'est', 'ullamcorper', 'eget', 'nulla', 'facilisi', 'etiam', 'dignissim', 'diam', 'quis', 'enim', 'lobortis', 'scelerisque', 'fermentum', 'dui', 'faucibus', 'in', 'ornare', 'quam', 'viverra', 'orci', 'sagittis', 'eu', 'volutpat', 'odio', 'facilisis', 'mauris', 'sit', 'amet', 'massa', 'vitae', 'tortor', 'condimentum', 'lacinia', 'quis', 'vel', 'eros', 'donec', 'ac', 'odio', 'tempor', 'orci', 'dapibus', 'ultrices', 'in', 'iaculis', 'nunc', 'sed', 'augue', 'lacus,', 'viverra', 'vitae', 'congue', 'eu,', 'consequat', 'ac', 'felis', 'donec', 'et', 'odio', 'pellentesque', 'diam', 'volutpat', 'commodo', 'sed', 'egestas', 'egestas', 'fringilla', 'phasellus', 'faucibus', 'scelerisque', 'eleifend', 'donec', 'pretium', 'vulputate', 'sapien', 'nec', 'sagittis', 'aliquam', 'malesuada', 'bibendum', 'arcu', 'vitae', 'elementum'
  ];
  const text = [];
  let x = Math.floor(Math.random() * 20 + 2);
  while (--x) text.push(words[Math.floor(Math.random() * words.length)]);
  return text.join(' ');
};

const getRandomFromArray = (arr) => arr[Math.floor(Math.random() * arr.length)];

export default class Tasks {
  constructor(props) {
    this.tasks = this.generateTasks((props && props.length) || 20);
  }

  generateTasks = (length = 10) => {
    return Array.from({ length }, () => {
      const now = new Date();
      const date = randomDate(now, new Date(2020, 11, 31));
      const createdAt = randomDate(new Date(2020, 0, 1), now);
      const updatedAt = randomDate(createdAt, now);

      return {
        id: genId.next().value,
        title: getTitle(),
        status: getRandomFromArray(statuses),
        type: getRandomFromArray(types),
        date,
        firstName: getRandomFromArray(firstNames),
        lastName: getRandomFromArray(lastNames),
        createdAt,
        updatedAt,
      };
    });
  };

  updateItemStatus = (id, status) => {
    return new Promise((resolve) => {
      const item = this.tasks.find((item) => item.id === id);
      item.status = status;
      this.tasks = [...this.tasks.filter((item) => item.id !== id), item];

      resolve(this.tasks);
    });
  };
}
