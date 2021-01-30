const slots = ['first', 'second', 'third'];

const users = [
  { id: 1, name: 'Justin', slot: 'first' },
  { id: 2, name: 'Tricia', slot: 'first' },
  { id: 3, name: 'Atish', slot: 'second' },
  { id: 4, name: 'Zack', slot: 'second' },
  { id: 5, name: 'Megan', slot: 'third' },
  { id: 6, name: 'Laura', slot: 'third' },
  { id: 7, name: 'Chris', slot: 'first' },
];

const first = document.querySelector('#first'),
  firstUsers = document.createElement('div'),
  second = document.querySelector('#second'),
  secondUsers = document.createElement('div'),
  third = document.querySelector('#third'),
  thirdUsers = document.createElement('div'),
  bucket = document.querySelector('#buckets');

first.appendChild(firstUsers);
second.appendChild(secondUsers);
third.appendChild(thirdUsers);

for (let user of users) {
  let userNode = document.createElement('h3');
  userNode.innerHTML = user.name;
  userNode.id = `user-${user.id}`;
  switch (user.slot) {
    case 'first':
      firstUsers.appendChild(userNode);
      break;
    case 'second':
      secondUsers.appendChild(userNode);
      break;
    case 'third':
      thirdUsers.appendChild(userNode);
  }
}

const buttonFunc = (target) => {
  let parent = target.parentNode,
    selected = [...parent.querySelectorAll('.selected')],
    destination;
  if (target.className === 'back') {
    destination =
      parent.id === 'second'
        ? first.querySelector('div')
        : second.querySelector('div');
    moveSelectedBack(parent, selected, destination);
  } else if (target.className === 'forward') {
    destination =
      parent.id === 'second'
        ? third.querySelector('div')
        : second.querySelector('div');
    moveSelectedForward(parent, selected, destination);
  }
  sortUsers(destination);
};

const moveSelectedBack = (parent, selected, destination) => {
  if (parent.id === 'first') return;
  for (let node of selected) {
    destination.appendChild(node);
  }
  parent.childNodes = [...parent.childNodes];
};

const moveSelectedForward = (parent, selected, destination) => {
  if (parent.id === 'third') return;
  for (let node of selected) {
    destination.appendChild(node);
  }
};

const selectFunc = (target) => {
  target.classList.toggle('selected');
};

const sortUsers = (destination) => {
  console.log(destination);
  [...destination.childNodes]
    .sort((a, b) => {
      a = parseInt(a.id.slice(5), 10);
      b = parseInt(b.id.slice(5), 10);
      return a - b;
    })
    .forEach((node) => {
      destination.appendChild(node);
    });
};

bucket.addEventListener('click', (event) => {
  const target = event.target;
  if (target.tagName === 'BUTTON') {
    buttonFunc(target);
  } else if (target.tagName === 'H3') {
    selectFunc(target);
  }
});
