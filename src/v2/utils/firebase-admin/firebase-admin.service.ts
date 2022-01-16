import { Injectable, Logger } from '@nestjs/common';
import * as admin from 'firebase-admin';

import { firebaseAdmin } from '../../../util/firebaseAdmin';

@Injectable()
export class FirebaseAdminService {
  private readonly logger: Logger;
  private firebaseAdminApp: admin.app.App;

  constructor() {
    this.firebaseAdminApp = firebaseAdmin;

    this.logger = new Logger('FirebaseAdmin');
    this.logger.log('Injectable Firebase Admin app is initialized by existing app');
  }

  getFirebaseAdminApp() {
    return this.firebaseAdminApp;
  }
}
