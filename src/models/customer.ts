import { Entity, Column, OneToMany } from "typeorm";
import { CustomBaseEntity } from "./baseEntity";
import DispensedMedicine from "./dispensedMedicine";

@Entity()
export default class Customer extends CustomBaseEntity {
  @Column({ type: "text", nullable: false })
  name!: string;

  @OneToMany(
    () => DispensedMedicine,
    (dispensedMedicine) => dispensedMedicine.customer,
    { eager: true }
  )
  dispensedMedicines?: DispensedMedicine[];
}
