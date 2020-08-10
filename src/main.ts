import {
  EntityManager,
  EntityRepository,
  MikroORM,
  RequestContext,
  OneToMany,
  Collection,
  PrimaryKeyType,
  QueryOrder,
} from "mikro-orm";

import { Entity, PrimaryKey, Property, ManyToOne } from "mikro-orm";
import { Company } from "./company.entity";
import { User } from "./user.entity";

export const DI = {} as {
  orm: MikroORM;
  em: EntityManager;
  companyRepository: EntityRepository<Company>;
  userRepository: EntityRepository<User>;
};

describe("", async () => {
  beforeAll(async () => {
    DI.orm = await MikroORM.init({
      type: "postgresql",
      entities: [Company, User],
      dbName: "postgres",
      logger: console.log.bind(console),
      debug: true,
      host: "localhost",
      port: 6500,
      password: "postgress",
      user: "postgres",
    });
    DI.em = DI.orm.em;

    DI.companyRepository = DI.orm.em.getRepository(Company);
    DI.userRepository = DI.orm.em.getRepository(User);
  });
});

test("find company with all users", async () => {
  const res = await DI.companyRepository.find({ id: 1 });
  console.log(res);
});
