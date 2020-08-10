import {
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { User } from "./user.entity";
@Entity()
export class Company {
  @PrimaryKey({ hidden: true })
  id!: number;

  @Property()
  name!: string;

  @Property()
  email!: string;

  @Property({ fieldName: "business_number" })
  businessNumber!: string;

  @Property()
  uuid!: string;

  @OneToMany(() => User, (x) => x.company, {
    persist: false,
    eager: true,
  })
  users = new Collection<User>(this);

  constructor(
    email: string,
    businessNumber: string,
    uuid: string,
    name: string
  ) {
    this.email = email;
    this.businessNumber = businessNumber;
    this.uuid = uuid;
    this.name = name;
  }
}
