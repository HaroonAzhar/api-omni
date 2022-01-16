export class ModelError extends Error {
  constructor(message: string) {
    super();
    this.name = "ModelError";
    this.message = message;
  }
}
