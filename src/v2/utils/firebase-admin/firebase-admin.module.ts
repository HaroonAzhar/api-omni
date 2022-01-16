import { Global, Module } from '@nestjs/common';

import { FirebaseAdminService } from './firebase-admin.service';
import { adminAppFactory } from './firebase-admin-app.provider';

@Global()
@Module({
  providers: [FirebaseAdminService, adminAppFactory],
  exports: [FirebaseAdminService, adminAppFactory],
})
export class FirebaseAdminModule {}
