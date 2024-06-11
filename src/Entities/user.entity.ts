import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'UserEntity'})
export class UserEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn()
    CreatedDate: Date;

    @Column()
    usernname: string;

    @Column({unique: true})
    email:string

    @Column()
    password: string
}