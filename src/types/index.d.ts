interface String {
  capitalize(): string;
}

interface Array<T> {
  underscore(): any;
}

declare namespace Express {
  export interface Request {
     user?: string
  }
}