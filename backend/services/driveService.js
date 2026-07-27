const { google } = require("googleapis");
const fs = require("fs");

const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// console.log("CLIENT ID:", process.env.GOOGLE_CLIENT_ID ? "Loaded" : "Missing");
// console.log("CLIENT SECRET:", process.env.GOOGLE_CLIENT_SECRET ? "Loaded" : "Missing");
// console.log("REDIRECT URI:", process.env.GOOGLE_REDIRECT_URI ? "Loaded" : "Missing");
// console.log("ACCESS TOKEN:", process.env.GOOGLE_ACCESS_TOKEN ? "Loaded" : "Missing");
// console.log("REFRESH TOKEN:", process.env.GOOGLE_REFRESH_TOKEN ? "Loaded" : "Missing");
// console.log("SCOPE:", process.env.GOOGLE_TOKEN_SCOPE ? "Loaded" : "Missing");
// console.log("TOKEN TYPE:", process.env.GOOGLE_TOKEN_TYPE ? "Loaded" : "Missing");
// console.log("EXPIRY:", process.env.GOOGLE_TOKEN_EXPIRY ? "Loaded" : "Missing");

oAuth2Client.setCredentials({
  access_token: process.env.GOOGLE_ACCESS_TOKEN,
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  scope: process.env.GOOGLE_TOKEN_SCOPE,
  token_type: process.env.GOOGLE_TOKEN_TYPE,
  expiry_date: Number(process.env.GOOGLE_TOKEN_EXPIRY),
});

const drive = google.drive({
  version: "v3",
  auth: oAuth2Client,
});

async function getOrCreateFolder(folderName) {
  const parentFolder = process.env.GOOGLE_DRIVE_PARENT_FOLDER;

  const query = `
    mimeType='application/vnd.google-apps.folder'
    and name='${folderName}'
    and '${parentFolder}' in parents
    and trashed=false
  `;

  const response = await drive.files.list({
    q: query,
    fields: "files(id,name)",
  });

  if (response.data.files.length > 0) {
    return response.data.files[0].id;
  }

  const folder = await drive.files.create({
    requestBody: {
      name: folderName,
      mimeType: "application/vnd.google-apps.folder",
      parents: [parentFolder],
    },
    fields: "id",
  });

  return folder.data.id;
}

async function uploadToDrive(file, folderId) {
  const response = await drive.files.create({
    requestBody: {
      name: file.originalname,
      parents: [folderId],
    },
    media: {
      mimeType: file.mimetype,
      body: fs.createReadStream(file.path),
    },
    fields: "id,name",
  });

  fs.unlinkSync(file.path);

  return response.data;
}

module.exports = {
  uploadToDrive,
  getOrCreateFolder,
};