import { Sequelize } from "sequelize";

const {
  DB_DIALECT: DIALECT,
  DB_USERNAME: USERNAME,
  DB_PASSWORD: PASSWORD,
  DB_HOST: HOST,
  DB_PORT: PORT,
  DB
} = process.env;

const sequelize = new Sequelize(
  `${DIALECT}://${USERNAME}:${PASSWORD}@${HOST}:${PORT}/${DB}`
);

async function testConnection() {
  await sequelize.authenticate();
  console.log("Successfully connected to DB!");
}

export default sequelize;
export { testConnection as testDBConnection };
