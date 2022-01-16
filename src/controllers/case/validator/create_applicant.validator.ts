import { Request } from "express";
import * as Joi from "joi";

import validateEndpoint from "../../../util/validateEndpoint";
import creditHistoryBody from "./credit_history_body";
import amlKycBody from "./aml_kyc_body";
import status from "./status";
import assetsLiabilitiesAdditionalBody from "./assets_liabilities_additional_body";

export const individualRules = Joi.object({
  applicant_id: Joi.number(),
  notReady: Joi.any(),
  status,
  date_edited: Joi.string().allow(""),
  links: Joi.string().allow(""),
  fk_shared_contact_id: Joi.number(),
  personal_data: Joi.object({
    title: Joi.string(),
    forename: Joi.string(),
    middle_name: Joi.string().allow(""),
    surname: Joi.string(),
    other_name: Joi.string(),
    date_of_birth: Joi.string(),
    city_of_birth: Joi.string(),
    country_of_birth: Joi.string(),
    insurance_number: Joi.string().allow(""),
    nationality: Joi.string(),
    second_nationality: Joi.string(),
    has_dual_nationality: Joi.boolean(),
    permanent_resident: Joi.boolean(),
    marital_status: Joi.string(),
    marital_other_value: Joi.string().allow(""),
    mothers_maiden_name: Joi.string().allow(""),
    uk_residential_status: Joi.string().allow(""),
    information_regarding_property_residence: Joi.string().allow(""),
  }),
  addresses: Joi.array().items(
    Joi.object({
      address_line_1: Joi.string(),
      address_line_2: Joi.string(),
      postcode: Joi.string(),
      city: Joi.string(),
      country: Joi.string(),
      how_long_here_months: Joi.number(),
      how_long_here_years: Joi.number(),
      security_address: Joi.string(),
    })
  ),
  contact: Joi.object({
    home_phone: Joi.string(),
    mobile_phone: Joi.string(),
    work_phone: Joi.string(),
    email: Joi.string().email(),
    contact_method: Joi.string(),
    number_of_dependants: Joi.number(),
  }),
  declarations_signatures: Joi.object({
    declaration: Joi.boolean(),
    signature: Joi.boolean(),
    date_of_declaration: Joi.string().allow(""),
    date_of_signature: Joi.string().allow(""),
  }),
  credit_history: creditHistoryBody,
  liabilities: Joi.array().items(
    Joi.object({
      type: Joi.string(),
      description: Joi.string(),
      net_value: Joi.number(),
    })
  ),
  assets: Joi.array().items(
    Joi.object({
      type: Joi.string(),
      description: Joi.string().allow(""),
      gross_value: Joi.number(),
      outstanding_debt: Joi.number(),
      net_value: Joi.number(),
    })
  ),
  property_portfolio: Joi.array().items(
    Joi.object({
      is_where_resides: Joi.boolean(),
      address_line_1: Joi.string().allow(""),
      address_line_2: Joi.string().allow(""),
      postcode: Joi.string().allow(""),
      city: Joi.string().allow(""),
      country: Joi.string().allow(""),
      name_of_lender: Joi.string().allow(""),

      estimated_value: Joi.number(),
      current_debt: Joi.number(),
      monthly_mortgage: Joi.number(),
      monthly_rental: Joi.number(),
    })
  ),
  assets_liabilities_additional: assetsLiabilitiesAdditionalBody,
  aml_kyc: amlKycBody,
});

export const companyRules = Joi.object({
  applicant_id: Joi.number(),
  base_data: Joi.object({
    name: Joi.string(),
    applicant_name: Joi.string(),
    company_number: Joi.string(),
    email: Joi.string().email().allow(""),
    number_of_partners: [Joi.string().regex(/^[0-9]+$/), Joi.number()],
    company_type: Joi.string(),
    date_of_creation: Joi.date(),
    date_of_incorporation: Joi.date(),
    company_other_type_value: Joi.string().allow(""),
    company_registration_number: [Joi.string().regex(/^[0-9]+$/), Joi.number()],
    nature_of_business: Joi.string(),
    trading_since: Joi.string(),
  }),
  address: Joi.object({
    registered: Joi.object({
      address_line_1: Joi.string(),
      address_line_2: Joi.string().allow(""),
      postcode: Joi.string(),
      city: Joi.string(),
      country: Joi.string(),
    }),
    correspondence: Joi.object({
      address_line_1: Joi.string(),
      address_line_2: Joi.string(),
      postcode: Joi.string(),
      city: Joi.string(),
      country: Joi.string(),
    }),
    is_correspondence_same: Joi.boolean(),
  }),
  directors: Joi.array().items(
    Joi.object({
      name: Joi.string(),
      links: Joi.string(),
      fk_shared_contact_id: Joi.string().allow(""),
      is_guarantor: Joi.boolean(),
    })
  ),
  shared_holders: Joi.array().items(
    Joi.object({
      is_guarantor: Joi.boolean(),
      name: Joi.string(),
      links: Joi.string(),
      held: Joi.number(),
      isCompany: Joi.boolean(),
      company: Joi.array(),
      fk_shared_contact_id: Joi.string().allow(""),
      company_number: Joi.string().allow(""),
    })
  ),
  accountant: Joi.object({
    name: Joi.string(),
    surname: Joi.string(),
    firm: Joi.string(),
    address: Joi.object({
      address_line_1: Joi.string(),
      address_line_2: Joi.string(),
      postcode: Joi.string(),
      city: Joi.string(),
      country: Joi.string(),
    }),
    qualification: Joi.string(),
  }),
  aml_kyc: Joi.object(),
});

export default (req: Request) => {
  validateEndpoint(req.params, {
    id: Joi.string().min(36).required(),
  });

  const validation = {
    data: Joi.object({
      id: Joi.string().min(36).required(),
      type: Joi.string().allow("applicant_form").required(),
      attributes: Joi.object({
        individuals: Joi.array().items(individualRules),
        company: companyRules,
      }),
    }),
  };

  validateEndpoint(req.body, validation);
};
