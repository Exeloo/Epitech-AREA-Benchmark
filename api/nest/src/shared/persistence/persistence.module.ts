import { Module } from "@nestjs/common";

import { TypeormModule } from "./typeorm/typeorm.module";

@Module({
  imports: [TypeormModule],
  exports: [TypeormModule],
})
export class PersistenceModule {}
