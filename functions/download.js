const axios = require("axios");
const config = require("../config.js");
const fs = require("fs");

function download(url, file) {
  return axios
    .get(url)
    .then((response) => {
      fs.appendFile(file, response.data, (err) => {
        if (err) {
          return err;
        }
      });
    })
    .catch((err) => {
      throw err;
    });
}

function FilterUniqueLines(inputFilename, outputFilename, callback) {
  const uniqueLines = new Set();

  fs.readFile(inputFilename, "utf8", (err, data) => {
    if (err) {
      return;
    }

    const lines = data.split("\n");
    lines.forEach((line) => {
      const trimmedLine = line.trim();
      if (trimmedLine !== "") {
        uniqueLines.add(trimmedLine);
      }
    });

    const uniqueData = Array.from(uniqueLines).join("\n");

    fs.writeFile(outputFilename, uniqueData, "utf8", (err) => {
      if (err) {
        return;
      }

      callback(outputFilename);
    });
  });
}

// http
// socks4
// socks5
// all
function Download(proto, callback) {
  fs.mkdir("./temp/", { recursive: true }, (err) => {});
  var urls = [];

  const filename =
    "./temp/" +
    proto +
    Math.floor(Date.now() / 1000) +
    Math.floor(Math.random() * (5000 - 100 + 1)) +
    100 +
    ".txt";

  const filenameUnique =
    "./temp/UNIQUE_" +
    proto +
    Math.floor(Date.now() / 1000) +
    Math.floor(Math.random() * (5000 - 100 + 1)) +
    100 +
    ".txt";

  switch (proto) {
    case "http":
      urls = config["Proxies"]["HTTP"];
      break;
    case "socks5":
      urls = config["Proxies"]["SOCKS5"];
      break;
    case "socks4":
      urls = config["Proxies"]["SOCKS4"];
      break;
    case "all":
      urls.push(...config["Proxies"]["HTTP"]);
      urls.push(...config["Proxies"]["SOCKS5"]);
      urls.push(...config["Proxies"]["SOCKS4"]);
      break;
  }

  const downloadPromises = [];

  urls.forEach((url) => {
    downloadPromises.push(download(url, filename));
  });

  Promise.all(downloadPromises).then(() => {
    callback(filename, filenameUnique);
  });
}

module.exports = {
  FilterUniqueLines,
  Download,
};
