const { Composer } = require("telegraf");
const IsAllowed = require("../functions/isAllowed.js");

const composer = new Composer();
const fs = require("fs");
const config = require("../config.js");
const { Input } = require("telegraf");
const { Download, FilterUniqueLines } = require("../functions/download");

composer.hears("🚀 Download Proxies", async (message) => {
  if (!IsAllowed(config["Bot"]["AllowedIds"], message.from.id)) {
    message.reply("No rights to use the bot");
    return;
  }

  message.reply("Select protocol", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "🌐 HTTP/S",
            callback_data: "downloadHttpAction",
          },
          {
            text: "🌐 SOCKS 4",
            callback_data: "downloadSocks4Action",
          },
          {
            text: "🌐 SOCKS 5",
            callback_data: "downloadSocks5Action",
          },
        ],
        [
          {
            text: "🌐 ALL",
            callback_data: "downloadAllAction",
          },
        ],
      ],
    },
  });
});

composer.action("downloadHttpAction", async (message) => {
  try {
    message.deleteMessage();
  } catch {}
  let uniqlines;
  let lines;

  try {
    Download("http", (filename, unique) => {
      FilterUniqueLines(filename, unique, async (output) => {
        await getLines(output, async (err, count) => {
          if (err) {
            console.error(err);
            message.reply("Error");
            return;
          }
          uniqlines = count;

          await getLines(filename, async (err, count) => {
            if (err) {
              console.error(err);
              message.reply("Error");
              return;
            }

            lines = count;

            await message.replyWithMarkdownV2(
              "📊 ***Statistics:***\n_*Total proxy urls:*_ `" +
                config["Proxies"]["HTTP"].length +
                "`\n_*Proxy count:*_ `" +
                lines +
                "`\n_*Unique proxy count:*_ `" +
                uniqlines +
                "`"
            );

            await message.sendMediaGroup([
              {
                type: "document",
                media: Input.fromLocalFile(filename),
                caption: "🌐 All Proxies",
              },
              {
                type: "document",
                media: Input.fromLocalFile(output),
                caption: "🌐 Only unique proxies",
              },
            ]);

            await fs.unlink(filename, (err) => {});
            await fs.unlink(unique, (err) => {});
          });
        });
      });
    });
  } catch (err) {
    console.log(err);
    message.reply("Error");
    return;
  }
});

composer.action("downloadSocks5Action", async (message) => {
  try {
    message.deleteMessage();
  } catch {}
  let uniqlines;
  let lines;

  try {
    Download("socks5", (filename, unique) => {
      FilterUniqueLines(filename, unique, async (output) => {
        await getLines(output, async (err, count) => {
          if (err) {
            console.error(err);
            message.reply("Error");
            return;
          }
          uniqlines = count;

          await getLines(filename, async (err, count) => {
            if (err) {
              console.error(err);
              message.reply("Error");
              return;
            }

            lines = count;

            await message.replyWithMarkdownV2(
              "📊 ***Statistics:***\n_*Total proxy urls:*_ `" +
                config["Proxies"]["SOCKS5"].length +
                "`\n_*Proxy count:*_ `" +
                lines +
                "`\n_*Unique proxy count:*_ `" +
                uniqlines +
                "`"
            );

            await message.sendMediaGroup([
              {
                type: "document",
                media: Input.fromLocalFile(filename),
                caption: "🌐 All Proxies",
              },
              {
                type: "document",
                media: Input.fromLocalFile(output),
                caption: "🌐 Only unique proxies",
              },
            ]);

            await fs.unlink(filename, (err) => {});
            await fs.unlink(unique, (err) => {});
          });
        });
      });
    });
  } catch (err) {
    console.log(err);
    message.reply("Error");
    return;
  }
});

composer.action("downloadSocks4Action", async (message) => {
  try {
    message.deleteMessage();
  } catch {}
  let uniqlines;
  let lines;

  try {
    Download("socks4", (filename, unique) => {
      FilterUniqueLines(filename, unique, async (output) => {
        await getLines(output, async (err, count) => {
          if (err) {
            console.error(err);
            message.reply("Error");
            return;
          }
          uniqlines = count;

          await getLines(filename, async (err, count) => {
            if (err) {
              console.error(err);
              message.reply("Error");
              return;
            }

            lines = count;

            await message.replyWithMarkdownV2(
              "📊 ***Statistics:***\n_*Total proxy urls:*_ `" +
                config["Proxies"]["SOCKS4"].length +
                "`\n_*Proxy count:*_ `" +
                lines +
                "`\n_*Unique proxy count:*_ `" +
                uniqlines +
                "`"
            );

            await message.sendMediaGroup([
              {
                type: "document",
                media: Input.fromLocalFile(filename),
                caption: "🌐 All Proxies",
              },
              {
                type: "document",
                media: Input.fromLocalFile(output),
                caption: "🌐 Only unique proxies",
              },
            ]);

            await fs.unlink(filename, (err) => {});
            await fs.unlink(unique, (err) => {});
          });
        });
      });
    });
  } catch (err) {
    console.log(err);
    message.reply("Error");
    return;
  }
});

composer.action("downloadAllAction", async (message) => {
  try {
    message.deleteMessage();
  } catch {}
  let uniqlines;
  let lines;

  try {
    Download("all", (filename, unique) => {
      FilterUniqueLines(filename, unique, async (output) => {
        await getLines(output, async (err, count) => {
          if (err) {
            console.error(err);
            message.reply("Error");
            return;
          }
          uniqlines = count;

          await getLines(filename, async (err, count) => {
            if (err) {
              console.error(err);
              message.reply("Error");
              return;
            }

            lines = count;

            let urlcount =
              config["Proxies"]["SOCKS5"].length +
              config["Proxies"]["HTTP"].length +
              config["Proxies"]["SOCKS4"].length;

            await message.replyWithMarkdownV2(
              "📊 ***Statistics:***\n_*Total proxy urls:*_ `" +
                urlcount +
                "`\n_*Proxy count:*_ `" +
                lines +
                "`\n_*Unique proxy count:*_ `" +
                uniqlines +
                "`"
            );

            await message.sendMediaGroup([
              {
                type: "document",
                media: Input.fromLocalFile(filename),
                caption: "🌐 All Proxies",
              },
              {
                type: "document",
                media: Input.fromLocalFile(output),
                caption: "🌐 Only unique proxies",
              },
            ]);

            await fs.unlink(filename, (err) => {});
            await fs.unlink(unique, (err) => {});
          });
        });
      });
    });
  } catch (err) {
    console.log(err);
    message.reply("Error");
    return;
  }
});

function getLines(filePath, callback) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      callback(err, null);
      return;
    }

    const lineCount = data.split("\n").length;
    callback(null, lineCount);
  });
}

module.exports = composer;
