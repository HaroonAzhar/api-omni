export default class HttpException extends Error {
  public readonly message: any;

  constructor(
    private readonly response: string | Record<string, unknown>,
    private readonly status: number
  ) {
    super();
    this.message = response;
  }

  public getResponse(): string | Record<string, unknown> {
    return this.response;
  }

  public getStatus(): number {
    return this.status;
  }
}
