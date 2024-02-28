import { Column, Entity, ManyToOne } from "typeorm";
import { CustomBaseEntity } from "./baseEntity";
import Role from "./role";

@Entity()
export default class User extends CustomBaseEntity {
  @Column({ type: "text", nullable: false })
  username!: string;

  @Column({ type: "text", nullable: false })
  name!: string;

  @Column({ type: "text", nullable: false })
  password!: string;

  @ManyToOne(() => Role, { eager: true })
  role!: Role;
}
