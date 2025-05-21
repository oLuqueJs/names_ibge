import { env } from 'process';
import { DataSource } from 'typeorm';
import { User } from '../../modules/user/model/user.entity';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT! || 5432,
        database: process.env.DB_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        entities: [User],

        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
