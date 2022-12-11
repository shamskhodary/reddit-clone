export interface IDbAttributes {
  username?: string;
  password?: string;
  database?: string;
  host?: string;
  port?: number | string;
  dialect?: string;
  urlDatabase?: string;
}
export interface IDatabaseConfig {
  development: IDbAttributes;
  test: IDbAttributes;
  production: IDbAttributes;
}
