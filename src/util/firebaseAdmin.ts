import * as admin from "firebase-admin";

let app = undefined;

if (process.env.FIREBASE_CONFIG && process.env.FIREBASE_CONFIG.length > 0) {
  const serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG);

  const params = {
    type: serviceAccount.type,
    projectId: serviceAccount.project_id,
    privateKeyId: serviceAccount.private_key_id,
    privateKey: serviceAccount.private_key,
    clientEmail: serviceAccount.client_email,
    clientId: serviceAccount.client_id,
    authUri: serviceAccount.auth_uri,
    tokenUri: serviceAccount.token_uri,
    authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
    clientC509CertUrl: serviceAccount.client_x509_cert_url,
  };

  if (params.projectId) {
    app = admin.initializeApp({
      credential: admin.credential.cert(params),
    });
  }
}

export const firebaseAdmin = app;
