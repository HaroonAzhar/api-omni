import cors from "cors";
import express from "express";

const createCorsOptions = (): cors.CorsOptions => {
  const corsOriginWhitelist = process.env.CORS_ORIGIN_WHITELIST as string;

  let corsOriginWhitelistCallbacks = [] as Array<(origin: string) => boolean>;
  if (corsOriginWhitelist) {
    corsOriginWhitelistCallbacks = corsOriginWhitelist
      .split(" ")
      .map((corsOriginWhitelistEntry): ((origin: string) => boolean) => {
        if (corsOriginWhitelistEntry.indexOf(":REGEX:") === 0) {
          const corsRegExp = new RegExp(
            corsOriginWhitelistEntry.replace(":REGEX:", "")
          );

          return (origin: string): boolean => corsRegExp.test(origin);
        }

        return (origin: string): boolean => corsOriginWhitelistEntry === origin;
      })
      .filter((item) => !!item);
  }

  const corsOptions = {
    origin(
      origin: string,
      callback: (err: null | Error, allow?: boolean) => void
    ) {
      if (
        !origin ||
        corsOriginWhitelistCallbacks.some((whiteListCallback): boolean =>
          whiteListCallback(origin)
        )
      ) {
        callback(null, true);
      } else {
        callback(new Error(`Origin '${origin}' not allowed by CORS`));
      }
    },
    credentials: true,
  };
  return corsOptions;
};

export default (app: express.Application) => {
  app.use(cors(createCorsOptions()));
};
