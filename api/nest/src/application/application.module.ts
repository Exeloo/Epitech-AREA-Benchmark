import { Module } from "@nestjs/common";

import { HTTPModule } from "./http/http.module";

@Module({
  imports: [HTTPModule],
})
export class ApplicationModule {}
