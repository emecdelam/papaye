import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { hash, verify } from "~/utils/hash";
@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string

    @Column()
    name: string

    @Column()
    password: string

    static async init(email: string, name: string, password: string): Promise<User> {
        let user = new User()
        let hashed = await hash(password);
        user.email = email
        user.name = name
        user.password = hashed
        return user;
    }

    async checkPassword(password: string): Promise<boolean> {
        return await verify(password, this.password)
    }
}