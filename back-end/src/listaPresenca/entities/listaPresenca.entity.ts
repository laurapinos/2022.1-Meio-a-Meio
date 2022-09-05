import { Aluno } from 'src/aluno/entities/aluno.entity';
import { Turma } from 'src/turma/entities/turma.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ListaPresenca {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    data: Date;

    @ManyToOne(()=> Turma, (turma)=> turma.listaPresenca)
    turma: Turma;

    @ManyToMany(()=> Aluno)
    @JoinTable()
    alunos: Aluno[];
}
