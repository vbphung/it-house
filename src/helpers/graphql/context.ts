import { Request } from "express";
import { TokenExpiredError } from "jsonwebtoken";
import lodash from "lodash";

import Token from "../token";

class Context {
  public req: Request;
  public token?: Token;
  public isAuth = false;
  public isExpired = false;

  constructor(params: { req: Request }) {
    this.req = params.req;

    const tk = lodash.get(this.req.headers, "auth-token");
    if (tk) {
      try {
        this.token = Token.decode(tk as string);
        this.isAuth = true;
      } catch (err) {
        if (err instanceof TokenExpiredError) {
          this.isExpired = true;
        }
      }
    }
  }

  get userId() {
    if (!this.isAuth) {
      return null;
    }

    return this.token?._id;
  }

  get scopes(): string[] {
    if (!this.isAuth || !this.token) {
      return [];
    }

    return lodash.get(this.token, "payload.scopes", []);
  }

  auth(plans: string[]) {
    if (!this.isAuth || !this.token) {
      throw new Error("unauthorized");
    }

    if (!plans.includes(this.token?.plan)) {
      throw new Error("permission denied");
    }

    return this;
  }

  grant(scopes: string[]) {
    if (!this.isAuth || !this.token) {
      throw new Error("unauthorized");
    }

    if (!scopes.every((scope) => this.scopes.includes(scope))) {
      throw new Error("permission denied");
    }

    return this;
  }
}

export default Context;
