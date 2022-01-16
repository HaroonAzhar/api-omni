import * as Joi from "joi";

const referralFieldNames = [
  "creditsafe_user_comments",
  "creditsafe_mlro_comments",
  "creditsafe_mlro_username",
  "creditsafe_mlro_date",
  "creditsafe_mlro_state",

  "icaew_membership_confirmed_user_comments",
  "icaew_membership_confirmed_mlro_comments",
  "icaew_membership_confirmed_mlro_username",
  "icaew_membership_confirmed_mlro_date",
  "icaew_membership_confirmed_mlro_state",

  "law_society_membership_confirmed_user_comments",
  "law_society_membership_confirmed_mlro_comments",
  "law_society_membership_confirmed_mlro_username",
  "law_society_membership_confirmed_mlro_date",
  "law_society_membership_confirmed_mlro_state",

  "certificate_of_incorporation_user_comments",
  "certificate_of_incorporation_mlro_comments",
  "certificate_of_incorporation_mlro_username",
  "certificate_of_incorporation_mlro_date",
  "certificate_of_incorporation_mlro_state",

  "list_of_shareholders_user_comments",
  "list_of_shareholders_mlro_comments",
  "list_of_shareholders_mlro_username",
  "list_of_shareholders_mlro_date",
  "list_of_shareholders_mlro_state",

  "shareholders_verified_as_individual_user_comments",
  "shareholders_verified_as_individual_mlro_comments",
  "shareholders_verified_as_individual_mlro_username",
  "shareholders_verified_as_individual_mlro_date",
  "shareholders_verified_as_individual_mlro_state",

  "person_with_control_verified_as_individual_user_comments",
  "person_with_control_verified_as_individual_mlro_comments",
  "person_with_control_verified_as_individual_mlro_username",
  "person_with_control_verified_as_individual_mlro_date",
  "person_with_control_verified_as_individual_mlro_state",

  "person_with_interest_verified_as_individual_user_comments",
  "person_with_interest_verified_as_individual_mlro_comments",
  "person_with_interest_verified_as_individual_mlro_username",
  "person_with_interest_verified_as_individual_mlro_date",
  "person_with_interest_verified_as_individual_mlro_state",

  "partner_verified_as_individual_user_comments",
  "partner_verified_as_individual_mlro_comments",
  "partner_verified_as_individual_mlro_username",
  "partner_verified_as_individual_mlro_date",
  "partner_verified_as_individual_mlro_state",

  "partnership_agreement_on_file_user_comments",
  "partnership_agreement_on_file_mlro_comments",
  "partnership_agreement_on_file_mlro_username",
  "partnership_agreement_on_file_mlro_date",
  "partnership_agreement_on_file_mlro_state",

  "company_shareholders_user_comments",
  "company_shareholders_mlro_comments",
  "company_shareholders_mlro_username",
  "company_shareholders_mlro_date",
  "company_shareholders_mlro_state",

  "individuals_shareholders_user_comments",
  "individuals_shareholders_mlro_comments",
  "individuals_shareholders_mlro_username",
  "individuals_shareholders_mlro_date",
  "individuals_shareholders_mlro_state",

  "adverse_media_check_satisfactory_user_comments",
  "adverse_media_check_satisfactory_mlro_comments",
  "adverse_media_check_satisfactory_mlro_username",
  "adverse_media_check_satisfactory_mlro_date",
  "adverse_media_check_satisfactory_mlro_state",

  "copies_on_file_user_comments",
  "copies_on_file_mlro_comments",
  "copies_on_file_mlro_username",
  "copies_on_file_mlro_date",
  "copies_on_file_mlro_state",

  "electronic_document_check_satisfactory_user_comments",
  "electronic_document_check_satisfactory_mlro_comments",
  "electronic_document_check_satisfactory_mlro_username",
  "electronic_document_check_satisfactory_mlro_date",
  "electronic_document_check_satisfactory_mlro_state",

  "is_on_sanctions_list_user_comments",
  "is_on_sanctions_list_mlro_comments",
  "is_on_sanctions_list_mlro_username",
  "is_on_sanctions_list_mlro_date",
  "is_on_sanctions_list_mlro_state",

  "is_pep_user_comments",
  "is_pep_mlro_comments",
  "is_pep_mlro_username",
  "is_pep_mlro_date",
  "is_pep_mlro_state",

  "creditsafe_clear_user_comments",
  "creditsafe_clear_mlro_comments",
  "creditsafe_clear_mlro_username",
  "creditsafe_clear_mlro_date",
  "creditsafe_clear_mlro_state",

  "links_to_high_risk_jurisdiction_user_comments",
  "links_to_high_risk_jurisdiction_mlro_comments",
  "links_to_high_risk_jurisdiction_mlro_username",
  "links_to_high_risk_jurisdiction_mlro_date",
  "links_to_high_risk_jurisdiction_mlro_state",

  "any_suspicion_of_money_laundering_user_comments",
  "any_suspicion_of_money_laundering_mlro_comments",
  "any_suspicion_of_money_laundering_mlro_username",
  "any_suspicion_of_money_laundering_mlro_date",
  "any_suspicion_of_money_laundering_mlro_state",

  "proof_of_right_to_remain_user_comments",
  "proof_of_right_to_remain_mlro_comments",
  "proof_of_right_to_remain_mlro_username",
  "proof_of_right_to_remain_mlro_date",
  "proof_of_right_to_remain_mlro_state",
];

const referralValidation = referralFieldNames.reduce(
  (acc: Record<string, Joi.AnySchema>, fieldName: string) => ({
    ...acc,
    [fieldName]: Joi.string().allow(""),
  }),
  {}
);

const amlKycBody = Joi.object({
  voters_roll: Joi.bool(),
  status: Joi.string().allow(""),
  aml: Joi.bool(),
  aml_details: Joi.string().allow(""),
  ccj: Joi.bool(),
  ccj_details: Joi.string().allow(""),
  cifas: Joi.bool(),
  cifas_details: Joi.string().allow(""),
  creditsafe: Joi.bool(),
  creditsafe_details: Joi.string().allow(""),
  google_search: Joi.bool(),
  google_search_details: Joi.string().allow(""),
  experian_risk_score: Joi.number(),
  proof_of_address: Joi.string().allow(""),
  additional_proof_of_address: Joi.string().allow(""),
  proof_of_right_to_remain: Joi.string().allow(""),
  proof_of_address_details: Joi.string().allow(""),
  proof_of_id: Joi.string().allow(""),
  proof_of_id_details: Joi.string().allow(""),
  proof_of_id_expiry_date: Joi.string().allow(""),
  client_arrival_in_uk: Joi.boolean(),
  third_party_verification: Joi.boolean(),
  is_pep: Joi.boolean(),
  electronic_document_check_satisfactory: Joi.boolean(),
  is_on_sanctions_list: Joi.boolean(),
  copies_on_file: Joi.boolean(),
  adverse_media_check_satisfactory: Joi.boolean(),
  links_to_high_risk_jurisdiction: Joi.string().allow(""),
  any_suspicion_of_money_laundering: Joi.boolean(),
  additional_notes: Joi.string().allow(""),
  creditsafe_clear: Joi.bool(),
  creditsafe_clear_details: Joi.string().allow(""),

  ...referralValidation,
});

export default amlKycBody;
