import { Column, Entity, OneToMany } from "typeorm";
import { CustomBaseEntity } from "./baseEntity";
import DispensedMedicine from "./dispensedMedicine";

@Entity()
export default class Medicine extends CustomBaseEntity {
  @Column({ type: "text", nullable: false })
  name!: string;

  @Column()
  description?: string;

  @Column({ default: 0 })
  quantity?: number;

  @OneToMany(() => DispensedMedicine, (dispensedMedicine) => dispensedMedicine.medicine)
  dispensedMedicines?: DispensedMedicine[];
}
