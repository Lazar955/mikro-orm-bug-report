import {
  EntityManager,
  EntityRepository,
  MikroORM,
  QueryOrder,
} from "mikro-orm";

import { Company } from "../src/company.entity";
import { User } from "../src/user.entity";

export const DI = {} as {
  orm: MikroORM;
  em: EntityManager;
  companyRepository: EntityRepository<Company>;
};

describe("test", async () => {
  afterAll(() => DI.orm.close(true));
  it("find company and all users", async () => {
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

    // const generator = DI.orm.getSchemaGenerator();
    // await generator.dropSchema();
    // await generator.createSchema();

    DI.companyRepository = DI.orm.em.getRepository(Company);

    const res = await DI.companyRepository.find({ id: 1 });

    // Considering eager loading is true, we should get Collection { initialized: true, dirty: false }
    console.log(res);

    await DI.orm.close(true);
  });
});
