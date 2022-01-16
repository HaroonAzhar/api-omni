import "module-alias/register";
import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { ResponseDataTransformInterceptor } from "@v2/modules/app/interceptors/response-data.interceptor";
import { ExcludeNullInterceptor } from "@v2/modules/app/interceptors/response-exlude-null.interceptor";

import { AppModule } from "./v2";
import { BaseModel } from "./models/BaseModel";
import connectWithCurrentApp from "./nest/connectWithCurrentApp";
import db from "./db";

BaseModel.registerKnex(db);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    })
  );

  app.useGlobalInterceptors(new ResponseDataTransformInterceptor());
  app.useGlobalInterceptors(new ExcludeNullInterceptor());
  connectWithCurrentApp(app);

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
