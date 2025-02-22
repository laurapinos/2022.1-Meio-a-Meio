import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '781781',
        database: 'meioameio',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true, //toda vez que rodar a aplicação, o nest vai tentar sincronizar o db com as classes
      });

      return dataSource.initialize();
    },
  },
];
