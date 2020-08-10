import { MikroORM } from "@mikro-orm/core";

import { Company } from "../src/company.entity";
import { User } from "../src/user.entity";
import { DI } from "../src/main";

describe("test if users entities are eagerly loaded", async () => {
  afterAll(() => DI.orm.close(true));
  it("should find company and all users", async () => {
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

    const generator = DI.orm.getSchemaGenerator();
    await generator.dropSchema();
    await generator.createSchema();

    DI.companyRepository = DI.em.getRepository(Company);

    const company = new Company("email", "num", "123", "name");

    company.users.add(new User("e1", "f", "l", "1", "pw", company));
    company.users.add(new User("e2", "f", "l", "2", "pw", company));
    company.users.add(new User("e3", "f", "l", "3", "pw", company));

    DI.em.persist(company);
    await DI.em.flush();
    DI.em.clear();

    const res = await DI.companyRepository.find({ id: 1 });

    expect(res[0].users.isInitialized()).toEqual(true);

    await DI.orm.close(true);
  });
});
