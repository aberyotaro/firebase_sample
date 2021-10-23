import * as firebase from 'firebase/app';
import {getAuth, signInWithCustomToken} from 'firebase/auth';
import admin from 'firebase-admin';

const firebaseConfig = {
    apiKey: '',
    authDomain: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
}

const serviceAccount = {
    type: '',
    project_id: '',
    private_key_id: '',
    private_key: '',
    client_email: '',
    client_id: '',
    auth_uri: '',
    token_uri: '',
    auth_provider_x509_cert_url: '',
    client_x509_cert_url: '',
}

firebase.initializeApp(firebaseConfig);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const userId = 'sample_uid'
const tenantId = 'sample_tenant_id'
const tenantManager = admin.auth().tenantManager();
const tenantAuth = tenantManager.authForTenant(tenantId);

// カスタムトークン取得
const token = tenantAuth.createCustomToken(userId).then(token => {
    console.log(token)
}).catch(err => {
    console.log(err);
});

// login
const auth = getAuth();
auth.tenantId = tenantId
signInWithCustomToken(auth, token).then((credential) => {
    console.log(credential)
}).catch(e => {
    console.log(e)
});
