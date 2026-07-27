const { google } = require("googleapis");
const fs = require("fs");

const credentials = require("../credentials.json").installed;
const token = require("../token.json");

const {
  client_secret,
  client_id,
  redirect_uris,
} = credentials;

const oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris[0]
);

oAuth2Client.setCredentials(token);

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