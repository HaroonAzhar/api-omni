import { Inject } from '@nestjs/common';
import { FIREBASE_ADMIN_APP, FirebaseAdminAppInstance } from '@v2/utils/firebase-admin';

import { UserIdentitiesProvider } from './users.service';

export class FirebaseIdentitiesProvider implements UserIdentitiesProvider {
  constructor(@Inject(FIREBASE_ADMIN_APP) private readonly firebaseAdminApp: FirebaseAdminAppInstance) {}
  async getIdentities() {
    const identities = await this.firebaseAdminApp.auth().listUsers();
    return identities.users.map((userRecord) => userRecord.email);
  }
}
