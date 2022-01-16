import request from "supertest";

export {
  createCase,
  convertToDip,
  convertToCompleted,
  convertToApplication,
  addProperties,
  addValuationReport,
  addTerm,
} from "../../../requests";

export const wait = (cb: request.CallbackHandler, delay: number): void => {
  new Promise(() =>
    setTimeout(() => {
      cb(null, null);
    }, delay)
  );
};
