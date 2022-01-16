import "reflect-metadata";

const boot = async () => {
  await import("./app");
};

import { updateExpireTime } from "./case";

boot()
  .then(async () => {
    await updateExpireTime();
  })
  .catch((e) => {
    console.error(e);
  });
