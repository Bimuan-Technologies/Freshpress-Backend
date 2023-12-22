/* eslint-disable prettier/prettier */
import {
  Request,
  Response,
  NextFunction,
} from 'express';

export class ResponseHeaderMiddlewareBuilder {
  private readonly headersToBeAdded: {
    [name: string]:
      | string
      | number
      | readonly string[];
  };

  private readonly headersToBeRemoved: string[];

  /** This is  class to build a middlware to set request headers
   * @example
   *
   * app.use(new ResponseHeaderMiddlewareBuilder()
   * .add("X-Frame-Options", "SAMEORIGIN")
   * .add("Strict-Transport-Security","max-age=15552000; includeSubDomains")
   * .set())
   */
  constructor() {
    this.headersToBeAdded = {};
    this.headersToBeRemoved = [];
  }

  public add(
    name: string,
    value: string | number | readonly string[],
  ) {
    this.headersToBeAdded[name] = value;

    return this;
  }

  public remove(name: string) {
    this.headersToBeRemoved.push(name);
    return this;
  }

  public build() {
    return (
      _req: Request,
      res: Response,
      next: NextFunction,
    ) => {
      for (const key in this.headersToBeAdded) {
        res.setHeader(
          key,
          this.headersToBeAdded[key],
        );
      }

      this.headersToBeRemoved.forEach((name) => {
        res.removeHeader(name);
      });

      next();
    };
  }
}
