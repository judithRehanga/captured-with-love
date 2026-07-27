const fs = require("fs");
const path = require("path");
const readline = require("readline");
const { google } = require("googleapis");

const SCOPES = ["https://www.googleapis.com/auth/drive"];

const credentials = require("./credentials.json").installed;

const { client_secret, client_id, redirect_uris } = credentials;

const oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris[0]
);

const authUrl = oAuth2Client.generateAuthUrl({
  access_type: "offline",
  scope: SCOPES,
  prompt: "consent",
});

console.log("\nOpen this URL in your browser:\n");
console.log(authUrl);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("\nPaste the code here: ", async (code) => {
  try {
    const { tokens } = await oAuth2Client.getToken(code);

    fs.writeFileSync(
      path.join(__dirname, "token.json"),
      JSON.stringify(tokens, null, 2)
    );

    console.log("\n✅ token.json created successfully!");
  } catch (err) {
    console.error(err);
  }

  rl.close();
});