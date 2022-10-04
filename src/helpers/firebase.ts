import config from "config";
import { ServiceAccount } from "firebase-admin";
import * as admin from "firebase-admin";

const initFirebaseApp = () => {
  const serviceAcc = config.get("firebase.serviceAccount");

  const cert = admin.credential.cert(serviceAcc as ServiceAccount);
  const firebase = admin.initializeApp({ credential: cert });

  return firebase;
};

export default initFirebaseApp();
