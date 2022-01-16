import { firebaseAdmin } from "../../../util/firebaseAdmin";
import { Verifier } from "../Verifier";

export class Firebase implements Verifier {
  async verify(token: string) {
    if ((process.env.REQUIRE_AUTHENTICATION as string) == "true") {
      return await firebaseAdmin.auth().verifyIdToken(token);
    }
    return Promise.resolve({ email: "email_without_authentication@mail.com" });
  }
}
