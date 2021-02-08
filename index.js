const users = [
  { id: 1, name: 'Justin', slot: 'first', selected: false },
  { id: 2, name: 'Tricia', slot: 'first', selected: false },
  { id: 3, name: 'Atish', slot: 'second', selected: false },
  { id: 4, name: 'Zack', slot: 'second', selected: false },
  { id: 5, name: 'Megan', slot: 'third', selected: false },
  { id: 6, name: 'Laura', slot: 'third', selected: false },
  { id: 7, name: 'Chris', slot: 'first', selected: false },
];

const bucket = document.querySelector('#buckets');

const refreshLists = () => {
  const userBuckets = [
    document.querySelector('#first > div'),
    document.querySelector('#second > div'),
    document.querySelector('#third > div'),
  ];

  userBuckets.forEach((bucket) => removeChildren(bucket));

  for (let user of users) {
    let userNode = document.createElement('h3');
    userNode.innerHTML = user.name;
    userNode.id = `user-${user.id}`;
    if (user.selected) {
      userNode.classList.toggle('selected');
    }
    switch (user.slot) {
      case 'first':
        userBuckets[0].appendChild(userNode);
        break;
      case 'second':
        userBuckets[1].appendChild(userNode);
        break;
      case 'third':
        userBuckets[2].appendChild(userNode);
    }
  }
};

const removeChildren = (node) => {
  [...node.childNodes].forEach((child) => {
    node.removeChild(child);
  });
};

const buttonFunc = (target) => {
  let parent = target.parentNode,
    selectedUsers = users.filter((user) => {
      return user.slot === parent.id && user.selected;
    }),
    destination;

  if (target.className === 'back') {
    destination = parent.id === 'second' ? 'first' : 'second';
  } else if (target.className === 'forward') {
    destination = parent.id === 'second' ? 'third' : 'second';
  }
  selectedUsers.forEach((user) => {
    user.slot = destination;
  });
  refreshLists();
};

const selectFunc = (target) => {
  target.classList.toggle('selected');
  let id = target.id.slice(5) - 1;
  users[id].selected = !users[id].selected;
};

refreshLists();

bucket.addEventListener('click', (event) => {
  const target = event.target;
  if (target.tagName === 'BUTTON') {
    buttonFunc(target);
  } else if (target.tagName === 'H3') {
    selectFunc(target);
  }
});
