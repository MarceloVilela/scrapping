"use strict";

var _typeorm = require("typeorm");

// create a connection using modified connection options
const create = async () => {
  const connection = await (0, _typeorm.createConnections)([{
    "name": "staging",
    "type": "postgres",
    "host": "isilo.db.elephantsql.com",
    "port": 5432,
    "username": "swmwqfow",
    "password": "eK_mvLyoZbKIeKwqREf4sHddWMlQMGpN",
    "database": "swmwqfow",
    "entities": ["./dist/modules/**/infra/typeorm/entities/*.js"],
    "migrations": ["./dist/shared/infra/typeorm/migrations/*.js"],
    "cli": {
      "migrationsDir": "./dist/shared/infra/typeorm/migrations"
    }
  }, {
    "name": "mongo_staging",
    "type": "mongodb",
    "url": "mongodb+srv://marcelo:UU8F9epw6cxPlgvF@cluster0-fq4ze.mongodb.net/tracking?retryWrites=true",
    "useUnifiedTopology": true,
    "ssl": true,
    "entities": ["./dist/modules/**/infra/typeorm/schemas/*.js"],
    "logging": "all"
  }]);
};

create();