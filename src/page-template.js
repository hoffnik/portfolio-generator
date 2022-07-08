const generatePage = (name, github) => {
    // return `
    //   Name: ${userName}
    //   GitHub: ${githubName}
    // `;

    return `
  <!DOCTYPE html> 
  <html lang="en"> 
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Portfolio Demo</title>
  </head>

  <body>
    <h1>${name}</h1>
    <h2><a href="https://github.com/${github}">Github</a></h2>
  </body>
  </html>
  `;

  }; // Use template literals to insert the variables inside the function block
  // we can also use template literals to create multi line strings, just add a keyboard return

  module.export = generatePage;