import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Role {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "text", nullable: false, unique: true })
  name!: string;
}
