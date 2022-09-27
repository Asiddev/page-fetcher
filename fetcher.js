const request = require("request");
const fs = require("fs");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
// request("https://www.google.com/fdsafsafsa.html", (error, response, body) => {
//   console.log("error:", error); // Print the error if one occurred
//   console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
//   console.log("body:", body); // Print the HTML for the Google homepage.
// });

const args = process.argv.slice(2);

const fetcher = function (args) {
  let url = args[0];
  let path = args[1];
  request(`${url}`, (error, response, body) => {
    if (error) {
      console.log(
        `There was a problem with your URL: ${url} or path: ${path}. Pleaes check again`
      );
      process.exit();
    }

    if (fs.existsSync(path)) {
      console.log("it already exists", path);
      rl.question(
        `There is already a file at ${path} Would you like to overwrite? Press any key other than 'y' to quit:   `,
        (answer) => {
          if (answer === "y") {
            fs.writeFile(`${path}`, body, () => {
              console.log(
                `Downloaded and overwritten. ${body.length} bytes to ${path}`
              );
              process.exit();
            });
          } else {
            console.log("You have chosen not to overwrite. Have a good day!");
            process.exit();
          }
        }
      );
    } else
      fs.writeFile(`${path}`, body, () => {
        console.log(`Downloaded and saved ${body.length} bytes to ${path}`);
        process.exit();
      });
  });
};
fetcher(args);

// fetcher("http://www.example.edu/", "index.html");
