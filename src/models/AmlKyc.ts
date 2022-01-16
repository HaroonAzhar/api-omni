import { BaseModel } from "./BaseModel";
import {
  JsonSchemaInterface,
  PropertiesInterface,
} from "../interfaces/models/JsonSchemaInterface";
import { JsonProps } from "../util/utilityTypes";

type AmlKyc = {
  aml_kyc_id: number;
  status: string;
  fk_applicant_id: number;
  fk_applicant_company_id: number;
  voters_roll: boolean;
  aml: boolean;
  aml_details?: string;
  ccj: boolean;
  ccj_details?: string;
  cifas: boolean;
  cifas_details?: string;
  creditsafe: boolean;
  creditsafe_details?: string;
  google_search: boolean;
  google_search_details?: string;
  experian_risk_score: number;
  proof_of_address: string;
  proof_of_address_details: string;
  additional_proof_of_address: string;
  proof_of_right_to_remain: string;
  proof_of_id: string;
  proof_of_id_details: string;
  proof_of_id_expiry_date: string;
  client_arrival_in_uk: boolean;
  third_party_verification: boolean;
  is_pep: boolean;
  electronic_document_check_satisfactory: boolean;
  is_on_sanctions_list: boolean;
  copies_on_file: boolean;
  adverse_media_check_satisfactory: boolean;
  links_to_high_risk_jurisdiction: string;
  any_suspicion_of_money_laundering: boolean;
  additional_notes: string;
  aml_kyc_company_id: number;
  icaew_membership_confirmed: boolean;
  person_with_interest_verified_as_individual: boolean;
  corporate_structure: string;
  verification_company_is_subsidiary: boolean;
  sedol_no_exchange: string;
  evidence_of_authority_to_act_for_firm: boolean;
  number_of_individuals: string;
  partner_verified_as_individual: boolean;
  evidence_of_trading_address: string;
  purpose_of_partnership: string;
  partnership_agreement_on_file: string;
  person_with_control_verified_as_individual: boolean;
  certificate_of_incorporation: boolean;
  list_of_shareholders: boolean;
  verification_documents_on_file: string;
  shareholders_verified_as_individual: boolean;
  law_society_membership_confirmed: boolean;
  settlor_type: string;
  trustee_type: string;
  controller_type: string;
  source_of_funds_confirmed: boolean;
  creditsafe_clear: boolean;
  creditsafe_clear_details: string;
  individuals_shareholders: boolean;
  company_shareholders: boolean;

  creditsafe_user_comments: string;
  creditsafe_mlro_comments: string;
  creditsafe_mlro_username: string;
  creditsafe_mlro_date: string;
  creditsafe_mlro_state: string;

  icaew_membership_confirmed_user_comments: string;
  icaew_membership_confirmed_mlro_comments: string;
  icaew_membership_confirmed_mlro_username: string;
  icaew_membership_confirmed_mlro_date: string;
  icaew_membership_confirmed_mlro_state: string;

  law_society_membership_confirmed_user_comments: string;
  law_society_membership_confirmed_mlro_comments: string;
  law_society_membership_confirmed_mlro_username: string;
  law_society_membership_confirmed_mlro_date: string;
  law_society_membership_confirmed_mlro_state: string;

  certificate_of_incorporation_user_comments: string;
  certificate_of_incorporation_mlro_comments: string;
  certificate_of_incorporation_mlro_username: string;
  certificate_of_incorporation_mlro_date: string;
  certificate_of_incorporation_mlro_state: string;

  list_of_shareholders_user_comments: string;
  list_of_shareholders_mlro_comments: string;
  list_of_shareholders_mlro_username: string;
  list_of_shareholders_mlro_date: string;
  list_of_shareholders_mlro_state: string;

  shareholders_verified_as_individual_user_comments: string;
  shareholders_verified_as_individual_mlro_comments: string;
  shareholders_verified_as_individual_mlro_username: string;
  shareholders_verified_as_individual_mlro_date: string;
  shareholders_verified_as_individual_mlro_state: string;

  person_with_control_verified_as_individual_user_comments: string;
  person_with_control_verified_as_individual_mlro_comments: string;
  person_with_control_verified_as_individual_mlro_username: string;
  person_with_control_verified_as_individual_mlro_date: string;
  person_with_control_verified_as_individual_mlro_state: string;

  person_with_interest_verified_as_individual_user_comments: string;
  person_with_interest_verified_as_individual_mlro_comments: string;
  person_with_interest_verified_as_individual_mlro_username: string;
  person_with_interest_verified_as_individual_mlro_date: string;
  person_with_interest_verified_as_individual_mlro_state: string;

  partner_verified_as_individual_user_comments: string;
  partner_verified_as_individual_mlro_comments: string;
  partner_verified_as_individual_mlro_username: string;
  partner_verified_as_individual_mlro_date: string;
  partner_verified_as_individual_mlro_state: string;

  partnership_agreement_on_file_user_comments: string;
  partnership_agreement_on_file_mlro_comments: string;
  partnership_agreement_on_file_mlro_username: string;
  partnership_agreement_on_file_mlro_date: string;
  partnership_agreement_on_file_mlro_state: string;

  company_shareholders_user_comments: string;
  company_shareholders_mlro_comments: string;
  company_shareholders_mlro_username: string;
  company_shareholders_mlro_date: string;
  company_shareholders_mlro_state: string;

  individuals_shareholders_user_comments: string;
  individuals_shareholders_mlro_comments: string;
  individuals_shareholders_mlro_username: string;
  individuals_shareholders_mlro_date: string;
  individuals_shareholders_mlro_state: string;

  adverse_media_check_satisfactory_user_comments: string;
  adverse_media_check_satisfactory_mlro_comments: string;
  adverse_media_check_satisfactory_mlro_username: string;
  adverse_media_check_satisfactory_mlro_date: string;
  adverse_media_check_satisfactory_mlro_state: string;

  copies_on_file_user_comments: string;
  copies_on_file_mlro_comments: string;
  copies_on_file_mlro_username: string;
  copies_on_file_mlro_date: string;
  copies_on_file_mlro_state: string;

  electronic_document_check_satisfactory_user_comments: string;
  electronic_document_check_satisfactory_mlro_comments: string;
  electronic_document_check_satisfactory_mlro_username: string;
  electronic_document_check_satisfactory_mlro_date: string;
  electronic_document_check_satisfactory_mlro_state: string;

  is_on_sanctions_list_user_comments: string;
  is_on_sanctions_list_mlro_comments: string;
  is_on_sanctions_list_mlro_username: string;
  is_on_sanctions_list_mlro_date: string;
  is_on_sanctions_list_mlro_state: string;

  is_pep_user_comments: string;
  is_pep_mlro_comments: string;
  is_pep_mlro_username: string;
  is_pep_mlro_date: string;
  is_pep_mlro_state: string;

  creditsafe_clear_user_comments: string;
  creditsafe_clear_mlro_comments: string;
  creditsafe_clear_mlro_username: string;
  creditsafe_clear_mlro_date: string;
  creditsafe_clear_mlro_state: string;

  links_to_high_risk_jurisdiction_user_comments: string;
  links_to_high_risk_jurisdiction_mlro_comments: string;
  links_to_high_risk_jurisdiction_mlro_username: string;
  links_to_high_risk_jurisdiction_mlro_date: string;
  links_to_high_risk_jurisdiction_mlro_state: string;

  any_suspicion_of_money_laundering_user_comments: string;
  any_suspicion_of_money_laundering_mlro_comments: string;
  any_suspicion_of_money_laundering_mlro_username: string;
  any_suspicion_of_money_laundering_mlro_date: string;
  any_suspicion_of_money_laundering_mlro_state: string;

  proof_of_right_to_remain_user_comments: string;
  proof_of_right_to_remain_mlro_comments: string;
  proof_of_right_to_remain_mlro_username: string;
  proof_of_right_to_remain_mlro_date: string;
  proof_of_right_to_remain_mlro_state: string;
};

const properties: Array<keyof AmlKyc> = [
  "fk_applicant_id",
  "status",
  "voters_roll",
  "aml",
  "aml_details",
  "ccj",
  "ccj_details",
  "cifas",
  "cifas_details",
  "creditsafe",
  "creditsafe_details",
  "google_search",
  "google_search_details",
  "experian_risk_score",
  "proof_of_address",
  "proof_of_address_details",
  "additional_proof_of_address",
  "proof_of_right_to_remain",
  "proof_of_id",
  "proof_of_id_details",
  "proof_of_id_expiry_date",
  "client_arrival_in_uk",
  "third_party_verification",
  "is_pep",
  "electronic_document_check_satisfactory",
  "is_on_sanctions_list",
  "copies_on_file",
  "adverse_media_check_satisfactory",
  "links_to_high_risk_jurisdiction",
  "any_suspicion_of_money_laundering",
  "additional_notes",
  "corporate_structure",
  "fk_applicant_id",
  "verification_company_is_subsidiary",
  "sedol_no_exchange",
  "evidence_of_authority_to_act_for_firm",
  "number_of_individuals",
  "partner_verified_as_individual",
  "icaew_membership_confirmed",
  "person_with_interest_verified_as_individual",
  "evidence_of_trading_address",
  "purpose_of_partnership",
  "partnership_agreement_on_file",
  "person_with_control_verified_as_individual",
  "certificate_of_incorporation",
  "list_of_shareholders",
  "verification_documents_on_file",
  "shareholders_verified_as_individual",
  "law_society_membership_confirmed",
  "settlor_type",
  "trustee_type",
  "controller_type",
  "source_of_funds_confirmed",
  "fk_applicant_company_id",
  "creditsafe_clear",
  "creditsafe_clear_details",
  "individuals_shareholders",
  "company_shareholders",

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

export default class AmlKycModel extends BaseModel {
  tableName(): string {
    return "Origination.AmlKyc";
  }

  getJsonMapping(): PropertiesInterface<string> {
    return this.makeObjectFromArray<AmlKyc>(properties);
  }

  jsonSchema(): JsonSchemaInterface<JsonProps<AmlKyc>> {
    return {
      type: "object",
      required: [],
      properties: {
        ...this.makeObjectFromArray<AmlKyc>(properties),
        aml_kyc_id: "id|pk",
      },
    };
  }
}
