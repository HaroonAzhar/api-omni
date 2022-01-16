import { Request } from "express";
import * as Joi from "joi";

import validateEndpoint from "../../../util/validateEndpoint";
import { valuationObject } from "./patch_valuation_flow";
import status from "./status";

export default (req: Request) => {
  validateEndpoint(req.params, {
    id: Joi.string().min(36).required(),
    applicant_id: Joi.number(),
  });

  const allowIfOtherNull = (schema: Joi.AnySchema, nameOfOther: string) =>
    schema.when(nameOfOther, { is: "manual", otherwise: schema.allow(null) });

  const validation = {
    data: Joi.object({
      id: Joi.string().min(36).required(),
      type: Joi.string().allow("applicant_form").required(),
      attributes: Joi.object({
        properties: Joi.array()
          .items(
            Joi.object({
              status,
              date_edited: Joi.string().allow(""),
              details: {
                already_owned: Joi.boolean(),
                being_purchased: Joi.boolean(),
                current_value: [
                  Joi.string().regex(/^[0-9\\.]+$/),
                  Joi.number(),
                ],
                value_after_works: [
                  Joi.string().regex(/^[0-9\\.]+$/),
                  Joi.number(),
                ],
                purchase_price: [
                  Joi.string().regex(/^[0-9\\.]+$/),
                  Joi.number(),
                ],
                purpose_of_borrowings: Joi.string().allow(""),
                property_type: Joi.string().allow(""),
                security_type: Joi.string().allow(""),
                security_type_other: Joi.string().allow(""),
                is_new_build: Joi.boolean(),
                years_remaining_on_lease: Joi.number(),
                is_standard_construction: Joi.boolean(),
                is_planning_required: Joi.boolean(),
                planning_reference_numbers: Joi.array(),
                is_occupied: Joi.boolean(),
                is_occupied_by_borrower: Joi.boolean(),
                basis_for_occupation: Joi.string().allow(""),
                intentions: Joi.string().allow(""),
                contact_for_access_valuation_name: allowIfOtherNull(
                  Joi.string().allow(""),
                  "selected_contact_for_access_valuation"
                ),
                contact_for_access_valuation_phone: allowIfOtherNull(
                  Joi.string().allow(""),
                  "selected_contact_for_access_valuation"
                ),
                contact_for_access_valuation_email: allowIfOtherNull(
                  Joi.string().email().allow(""),
                  "selected_contact_for_access_valuation"
                ),
                contact_for_payment_valuation_name: allowIfOtherNull(
                  Joi.string().allow(""),
                  "selected_contact_for_payment_valuation"
                ),
                contact_for_payment_valuation_phone: allowIfOtherNull(
                  Joi.string().allow(""),
                  "selected_contact_for_payment_valuation"
                ),
                contact_for_payment_valuation_email: allowIfOtherNull(
                  Joi.string().email().allow(""),
                  "selected_contact_for_payment_valuation"
                ),
                selected_contact_for_access_valuation: Joi.string().allow([
                  "manual",
                  "individual",
                  "introducer",
                ]),
                selected_contact_for_payment_valuation: Joi.string().allow([
                  "manual",
                  "individual",
                  "introducer",
                ]),
                selected_contact_applicant_id_for_access_valuation: Joi.string(),
                selected_contact_applicant_id_for_payment_valuation: Joi.string(),
                payment_contact_details_same_as_access_valuation: Joi.boolean(),
              },
              valuation_report: valuationObject,
              address: {
                line_1: Joi.string().allow(""),
                line_2: Joi.string().allow(""),
                postcode: Joi.string().allow(""),
                city: Joi.string().allow(""),
                country: Joi.string().allow(""),
              },
              charge: {
                opfl_charge_type: Joi.string().allow(""),
                lenders: Joi.array().items(
                  Joi.object({
                    name: Joi.string(),
                    current_mortgage_outstanding: [
                      Joi.string().regex(/^[0-9\\.]+$/),
                      Joi.number(),
                    ],
                  })
                ),
                current_mortgage_outstanding: [
                  Joi.string().regex(/^[0-9\\.]+$/),
                  Joi.number(),
                ],
                security_owner: Joi.string(),
                security_owner_title: Joi.string(),
                security_owner_forename: Joi.string(),
                security_owner_middle_name: Joi.string(),
                security_owner_surname: Joi.string(),
              },
              title_numbers: Joi.array().items(Joi.string()),
            })
          )
          .required(),
      }).required(),
    }),
  };

  validateEndpoint(req.body, validation);
};
