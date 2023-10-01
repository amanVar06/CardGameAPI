const http = require("http");

require("dotenv").config();

const app = require("./app");
const { connectMongoDB } = require("./services/mongo");
// const { importCharacters } = require("./data/loadCharactersData");

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

async function startServer() {
  try {
    await connectMongoDB();
    // await importCharacters();

    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  } catch (error) {
    console.log(error);
  }
}

startServer();
