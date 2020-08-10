import { EntityManager, EntityRepository, MikroORM } from "@mikro-orm/core";

import { Company } from "./company.entity";

export const DI = {} as {
  orm: MikroORM;
  em: EntityManager;
  companyRepository: EntityRepository<Company>;
};
