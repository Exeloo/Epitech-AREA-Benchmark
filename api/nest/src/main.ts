import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import * as bodyParser from "body-parser";
import { useContainer } from "class-validator";
import "dotenv/config";
import * as hbs from "hbs";
import helmet from "helmet";
import { WINSTON_MODULE_NEST_PROVIDER } from "nest-winston";
import { join } from "path";

import { AllExceptionFilter } from "~/application/http/common/filters/all-exception.filter";

import { AppModule } from "./app.module";

const rawBodyBuffer = (req, _, buffer, encoding) => {
  if (buffer && buffer.length) {
    req.rawBody = buffer.toString(encoding ?? "utf8");
  }
};

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bodyParser: false,
    bufferLogs: true,
  });
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  app.useStaticAssets(join(__dirname, "..", "public"));
  app.setBaseViewsDir(join(__dirname, "..", "views"));
  app.setViewEngine("hbs");
  hbs.registerPartials(join(__dirname, "..", "views/partials"));

  // Apply Helmet security headers for 'production', 'preview', 'prepoduction' modes
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          scriptSrc: [`'self'`, `https: 'unsafe-inline'`, `'unsafe-eval'`],
          frameAncestors: process.env.WEBAPP_DOMAINS?.split(",") ?? ["'none'"],
        },
      },
    }),
  );
  app.enableCors({ origin: process.env.WEBAPP_DOMAINS?.split(",") });

  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalPipes(
    new ValidationPipe({ transform: true, enableDebugMessages: true }),
  );
  app.useGlobalFilters(new AllExceptionFilter());
  app.use(bodyParser.urlencoded({ verify: rawBodyBuffer, extended: true }));
  app.use(bodyParser.json({ verify: rawBodyBuffer }));
  await app.listen(3000);
}
bootstrap();
