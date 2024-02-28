import { Column, Entity, ManyToOne } from "typeorm";
import Customer from "./customer";
import Medicine from "./medicine";
import { CustomBaseEntity } from "./baseEntity";

@Entity()
export default class DispensedMedicine extends CustomBaseEntity {
  @Column({ default: 0 })
  quantity!: number;

  @ManyToOne(() => Customer, (customer) => customer.dispensedMedicines)
  customer!: Customer;

  @ManyToOne(() => Medicine, (medicine) => medicine.dispensedMedicines, {
    eager: true,
  })
  medicine!: Medicine;
}
