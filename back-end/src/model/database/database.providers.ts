//import { Professor } from 'src/professor/professor.entity';

import { TurmaAluno } from 'src/turma/entities/turma-aluno';
import { TurmaDia } from 'src/turma/entities/turma-dia';
import { Turma } from 'src/turma/entities/turma.entity';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: process.env.HOST,
        port: parseInt(process.env.PORT),
        username: process.env.USERNAME_DB,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        entities: [Turma, TurmaAluno, TurmaDia],
        synchronize: true, //toda vez que rodar a aplicação, o nest vai tentar sincronizar o db com as classes
      });

      return dataSource.initialize();
    },
  },
];
