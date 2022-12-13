import { Sequelize } from 'sequelize-typescript';
import { DEVELOPMENT, SEQUELIZE, TEST, PRODUCTION } from 'src/constants';
import { User, Post, Topic, Comment, Save, Votes } from 'src/entities';

import { databaseConfig } from './database.config';

const { NODE_ENV } = process.env;
export const databaseProvider = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      let config;
      switch (NODE_ENV) {
        case DEVELOPMENT:
          config = databaseConfig.development;
          break;

        case TEST:
          config = databaseConfig.test;
          break;

        case PRODUCTION:
          config = databaseConfig.production;
          break;

        default:
          config = databaseConfig.development;
      }
      const sequelize = new Sequelize(config);
      sequelize.addModels([User, Post, Comment, Topic, Save, Votes]);
      await sequelize.sync({ force: false, logging: false });
      return sequelize;
    },
  },
];
