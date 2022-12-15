import { DEVELOPMENT, TEST, PRODUCTION } from 'src/constants';

import { databaseConfig } from './database.config';

const { NODE_ENV } = process.env;

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

export default config;
