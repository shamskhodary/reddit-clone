export interface IDbAttributes {
  username?: string;
  password?: string;
  database?: string;
  host?: string;
  port?: number | string;
  dialect?: string;
  urlDatabase?: string;
  dialectOptions?: IDialectOptions;
  ssl?: IDialectOptions;
}

export interface IDialectOptions {
  ssl: {
    require: boolean;
    rejectUnauthorized: boolean;
  };
}
export interface IDatabaseConfig {
  development: IDbAttributes;
  test: IDbAttributes;
  production: IDbAttributes;
}
