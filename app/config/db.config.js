module.exports = {
    HOST: "localhost",
    USER: "root", //16user1
    PASSWORD: "root", //zPz~j456
    DB: "Test_16_db",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };