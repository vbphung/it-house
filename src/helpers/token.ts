import config from "config";
import jwt from "jsonwebtoken";

class Token {
  constructor(
    readonly _id: string,
    readonly plan: string,
    readonly payload: any = {},
    readonly expiresIn: string | number = "7d"
  ) {}

  sign() {
    return jwt.sign(
      {
        _id: this._id,
        plan: this.plan,
        ...this.payload,
      },
      config.get("tokenSecret"),
      {
        expiresIn: this.expiresIn,
      }
    );
  }

  decode(token: string) {
    const { _id, plan, ...payload }: any = jwt.verify(
      token,
      config.get("tokenSecret")
    );

    return new Token(_id, plan, payload);
  }
}

export default Token;
