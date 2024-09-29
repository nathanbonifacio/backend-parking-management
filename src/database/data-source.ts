import { DataSource } from 'typeorm';

const dataSource = new DataSource({
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: 'admin',
  database: 'parking_management',
  migrations: [`${__dirname}/migrations/*.ts`],
});

export default dataSource;
