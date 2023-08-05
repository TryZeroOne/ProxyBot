const { Composer } = require("telegraf");
const composer = new Composer();
const IsAllowed = require("../functions/isAllowed.js");
const config = require("../config.js");

composer.start(async (message) => {
  if (!IsAllowed(config["Bot"]["AllowedIds"], message.from.id)) {
    message.reply("No rights to use the bot");
    return;
  }
  try {
    message.reply(
      "Hello! Source code: https://github.com/TryZeroOne/ProxyBot",
      {
        reply_markup: {
          keyboard: [
            [
              {
                text: "🚀 Download Proxies",
              },
            ],
          ],
          resize_keyboard: true,
        },
      }
    );
  } catch (err) {
    console.log("Unknown error: " + err);
  }
});
module.exports = composer;
