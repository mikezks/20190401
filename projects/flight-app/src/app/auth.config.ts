import {AuthConfig} from "angular-oauth2-oidc";

/**
 * Angular App mit...
 * npm start -- --port 8081
 * ...auf Port 8081 starten, damit der Identity Server die Anfrage akzeptiert.
 */
export const authConfig: AuthConfig = {
  issuer: 'https://steyer-identity-server.azurewebsites.net/identity',
  redirectUri: window.location.origin + '/index.html',
  clientId: 'spa-demo',
  scope: 'openid profile email voucher'
};