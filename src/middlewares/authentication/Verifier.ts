import { AuthUser } from "./AuthUser";

export interface Verifier {
  verify: (token: string) => Promise<AuthUser>;
}
