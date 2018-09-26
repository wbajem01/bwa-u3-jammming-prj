let joanna =[ {id: 0}, {id: 1}, {id: 2}, {id: 3}]
console.log(joanna)

let belle = { id: 1};
console.log('Belle\'s id = ' + belle.id)

for (let i = 0; i < joanna.length; i++) {
  if (belle.id == joanna[i].id) {
    joanna.splice(i, 1)
  }
  console.log(joanna);
};
