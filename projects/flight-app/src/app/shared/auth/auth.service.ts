import { Injectable } from '@angular/core';
import {OAuthService} from "angular-oauth2-oidc";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  get username() {
    const claims = this.oauthService.getIdentityClaims();
    return claims ? claims['given_name'] : null;
  };

  constructor(private oauthService: OAuthService) { }

  login(): void {
    // this.username = 'Peter';
    this.oauthService.initImplicitFlow();
  }

  logout(): void {
    // this.username = null;
    this.oauthService.logOut();
  }
}
