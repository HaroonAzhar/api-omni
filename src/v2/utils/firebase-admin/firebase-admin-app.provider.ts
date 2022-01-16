import { FIREBASE_ADMIN_APP } from './constants';
import { FirebaseAdminService } from './firebase-admin.service';

export const adminAppFactory = {
  provide: FIREBASE_ADMIN_APP,
  useFactory: async (firebaseAdminAppService: FirebaseAdminService) => {
    return firebaseAdminAppService.getFirebaseAdminApp();
  },
  inject: [FirebaseAdminService],
};
