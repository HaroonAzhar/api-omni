import { Request } from "express";

export default function validate(
  validationFn: (req: Request) => void
): (
  target: Record<string, any>,
  propertyName: string,
  propertyDesciptor: PropertyDescriptor
) => PropertyDescriptor {
  return function (
    target: Record<string, any>,
    propertyName: string,
    propertyDesciptor: PropertyDescriptor
  ) {
    const method = propertyDesciptor.value;

    propertyDesciptor.value = function (...args: any[]) {
      validationFn.apply(this, args);
      return method.apply(this, args);
    };
    return propertyDesciptor;
  };
}
