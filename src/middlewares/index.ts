import addCors from "./addCors";
import addBodyParser from "./addBodyParser";
import addLusca from "./addLusca";
import addCompression from "./addCompression";
import addAuditLog from "./addAuditLog";
import addAuthentication from "./authentication/addAuthenticationMiddleware";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (app: any) => {
  addCompression(app);
  addLusca(app);
  addBodyParser(app);
  addCors(app);
  addAuthentication(app);
  addAuditLog(app);
};
