// process. is a global object
/* the argv property of process is an array that holds exactly what was typed into the command line upon execution so that we can capture that data and use it in the app */

const fs = require('fs');
const generatePage = require('./src/page-template.js')

// const printProfileData = profileDataArr => {
//   // This...
//   for (let i = 0; i < profileDataArr.length; i += 1) {
//     console.log(profileDataArr[i]);
//   }

//   console.log('================');

//   // Is the same as this...
//   profileDataArr.forEach((profileItem) => {
//     console.log(profileItem)
//     // or even cleaner: profileDataArr.forEach(profileItem => console.log(profileItem));
//   });
// };
  
  // printProfileData(profileDataArgs);

  // const generatePage = () => 'Name: Jane, Github: janehub';
  // console.log(generatePage());
  const profileDataArgs = process.argv.slice(2);
  const name = profileDataArgs[0];
  const github = profileDataArgs[1];
  // or use assignment destructuring to just use one line: const [name, github] = profileDataArgs;
  
  fs.writeFile('index.html', generatePage(name, github), err => {
    if (err) throw new Error(err);
  
    console.log('Portfolio complete! Check out index.html to see the output!');
  });
  
