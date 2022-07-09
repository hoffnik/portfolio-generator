// process. is a global object
/* the argv property of process is an array that holds exactly what was typed into the command line upon execution so that we can capture that data and use it in the app */

const inquirer = require('inquirer');
// const fs = require('fs');
// const generateSite = require('./utils/generate-site.js');
// simplified destructured version:
const { writeFile, copyFile } = require('./utils/generate-site.js');

const generatePage = require('./src/page-template.js')

const promptUser = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name? (Required)',
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please enter your name!');
          return false;
        }
      }
    },
      {
        type: 'input',
        name: 'github',
        message: 'Enter your GitHub Username (Required)',
        validate: usernameInput => {
          if (usernameInput) {
            return true;
          } else {
            console.log('Please enter your username!');
            return false;
          }
        }
      },
      {
        type: 'confirm',
        name: 'confirmAbout',
        message: 'Would you like to enter some information about yourself for an "About" section?',
        default: true
      },
      {
        type: 'input',
        name: 'about',
        message: 'Provide some information about yourself:',
        when: ({ confirmAbout }) => {
          if (confirmAbout) {
            return true;
          } else {
            return false;
          }
        }
      }
    ]);
  };

  const promptProject = portfolioData =>{
    
    /* initialize array only on first pass to prevent setting it to empty array over again and deleting all information */
    // If there's no 'projects' array property, create one
if (!portfolioData.projects) {
  portfolioData.projects = [];
}

    console.log(`
      =========================
      Add a new Project
      =========================
    `);
    return inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of your project? (Required)',
        validate: projectInput => {
          if (projectInput) {
            return true;
          } else {
            console.log('Please enter your project name!');
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'description',
        message: 'Provide a description of the project (Required)',
        validate: descriptionInput => {
          if (descriptionInput) {
            return true;
          } else {
            console.log('Please enter your description!');
            return false;
          }
        }
      },
      {
        type: 'checkbox',
        name: 'languages',
        message: 'What did you build this project with? (Check all that apply)',
        choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
      },
      {
        type: 'input',
        name: 'link',
        message: 'Enter the GitHub link to your project. (Required)',
        validate: linkInput => {
          if (linkInput) {
            return true;
          } else {
            console.log('Please enter your link!');
            return false;
          }
        }
      },
      {
        type: 'confirm',
        name: 'feature',
        message: 'Would you like to feature this project?',
        default: false
      },
      {
        type: 'confirm',
        name: 'confirmAddProject',
        message: 'Would you like to enter another project?',
        default: false
      }
    ])
    .then(projectData => {
      portfolioData.projects.push(projectData);
      if (projectData.confirmAddProject) {
        return promptProject(portfolioData);
      } else {
        return portfolioData;
      }
    });
  }

  const pageHTML = generatePage(portfolioData);

  promptUser()
  .then(promptProject)
  .then(portfolioData => {
    return generatePage(portfolioData);
  })
  .then(pageHTML => {
    return writeFile(pageHTML);
  })
  .then(writeFileResponse => {
    console.log(writeFileResponse);
    return copyFile();
  })
  .then(copyFileResponse => {
    console.log(copyFileResponse);
  })
  .catch(err => {
    console.log(err);
  });

  // fs.writeFile('./dist/index.html', pageHTML, err => {
  //   if (err) {
  //     console.log(err);
  //     return;
  //   }
  //   console.log('Page created! Check out index.html in this directory to see it!');
  
  //   fs.copyFile('./src/style.css', './dist/style.css', err => {
  //     if (err) {
  //       console.log(err);
  //       return;
  //     }
  //     console.log('Style sheet copied successfully!');
  //   });
  // });
  // });


// ______________________________________________________________
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
  // const profileDataArgs = process.argv.slice(2);
  // const name = profileDataArgs[0];
  // const github = profileDataArgs[1];
  // or use assignment destructuring to just use one line: const [name, github] = profileDataArgs;

  
