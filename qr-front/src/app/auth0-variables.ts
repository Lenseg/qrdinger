interface AuthConfig {
  CLIENT_ID: string;
  CLIENT_DOMAIN: string;
  AUDIENCE: string;
  REDIRECT: string;
  SCOPE: string;
}

export const AUTH_CONFIG: AuthConfig = {
  CLIENT_ID: 'quG8oDSz97R8HBaiY6BOuqIxbHL7fmjt',
  CLIENT_DOMAIN: 'lenseg.auth0.com',
  AUDIENCE: '/codes/',
  REDIRECT: 'http://localhost:4210/callback',
  SCOPE: 'openid'
};
