import { Serializer, Error as ApiError } from "jsonapi-serializer";
import { Response } from "express";
import * as Inflector from "inflected";

import HttpException from "../../util/exceptions/http.exception";

type ApiJsonResponseType = {
  collectionName: string;
  res: Response;
  id?: string;
  attributes: string[];
  data?: Record<string, unknown>;
};

export default class BaseController {
  public ApiJsonResponse(val: ApiJsonResponseType) {
    const UuidSerializer = new Serializer(val.collectionName, {
      id: val.id,
      attributes: val.attributes,
      pluralizeType: false,
      keyForAttribute: function (attribute) {
        return Inflector.underscore(attribute);
      },
    });

    const serializeData = UuidSerializer.serialize(val.data);
    val.res.send(serializeData);
  }

  public static ApiJsonError(
    res: Response,
    data: { code: string; title: string; detail: string; errors?: [] }
  ) {
    if (data instanceof HttpException) {
      res.status(data.getStatus());
      res.send({
        errors: [data.getResponse()],
      });
      return;
    }

    const errors = data.hasOwnProperty("errors")
      ? data
      : new ApiError({
          code: data.code,
          title: data.title,
          detail: data.detail || data.toString(),
        });
    res.status(500);
    res.send(errors);
  }
}
