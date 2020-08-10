import { Company } from "./company.entity";
import {
  Collection,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryKey,
  ManyToOne,
  Property,
  wrap,
  IdentifiedReference,
} from "mikro-orm";
@Entity()
export class User {
  @PrimaryKey({ hidden: true })
  id!: number;

  @Property()
  email!: string;

  @Property({ fieldName: "first_name" })
  firstName!: string;

  @Property({ fieldName: "last_name" })
  lastName!: string;

  @Property({ hidden: true })
  password!: string;

  @Property()
  uuid!: string;

  @Property({ hidden: true })
  dateCreated!: Date;

  @ManyToOne(() => Company, { eager: false })
  company: Company;

  constructor(
    email: string,
    firstName: string,
    lastName: string,
    uuid: string,
    password: string,
    company: any
  ) {
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.uuid = uuid;
    this.company = company;
    this.password = password;
  }

  /**
   * setId
   */
  public setId(id: number) {
    this.id = id;
  }
}
