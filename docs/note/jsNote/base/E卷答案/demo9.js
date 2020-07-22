const pro = new Promise((resolve, reject) => {
  const innerpro = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(1);
    });
    console.log(2);
    resolve(3);
  });
  innerpro.then((res) => console.log(res));
  resolve(4);
  console.log('yideng');
});
pro.then((res) => console.log(res));
console.log('end');
