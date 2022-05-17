// process. is a global object
/* the argv property of process is an array that holds exactly what was typed into the command line upon execution so that we can capture that data and use it in the app */

const profileDataArgs = process.argv.slice(2, process.argv.length);

const printProfileData = (profileDataArr) => {
    console.log(profileDataArr);
  };
  
  printProfileData(profileDataArgs);
  