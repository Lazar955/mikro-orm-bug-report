import {
  Collection,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryKey,
  Property,
  wrap,
} from "mikro-orm";
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

  @Property({ fieldName: "date_created", hidden: true })
  dateCreated!: Date;

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
