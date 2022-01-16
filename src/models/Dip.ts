import Knex from "knex";

import {
  JsonSchemaInterface,
  PropertiesInterface,
} from "../interfaces/models/JsonSchemaInterface";
import { BaseModel } from "./BaseModel";
import BuildingType from "./Dip/BuildingType";
import LoanAdvanceType from "./Dip/LoanAdvanceType";
import IntroducerType from "./Dip/IntroducerType";
import Contact from "./Dip/Contact";
import Security from "./Dip/Security";
import LoanType from "./Dip/LoanType";
import LoanFinancialHybridTerms from "./Dip/LoanFinancialHybridTerms";
import ContactValue from "./Dip/ContactValue";
import SecurityDipMapping from "./Dip/SecurityDipMapping";
import LoanFinancialDetails from "./Dip/LoanFinancialDetails";
import LoanFinancialDetailsDev from "./Dip/LoanFinancialDetailsDev";
import LoanFinancialDetailsMulti from "./Dip/LoanFinancialDetailsMulti";
import Broker from "./Dip/Broker";
import LoanPropertyDevelopment from "./Dip/LoanPropertyDevelopment";
import Case from "./Case";
import LoanFinancialDrawDowns from "./Dip/LoanFinancialDrawDons";
import CaseProperty from "./Case/CaseProperty";
import PropertyValuationReport from "./PropertyValuationReport";
import CaseOverview from "./Case/CaseOverview";
import ApplicationStep from "./Application/ApplicationStep";
import ApplicationStepStatusType from "./Application/ApplicationStepStatusType";

type DipType = {
  dip_id: "number|pk";
  created_by: "string";
  fk_loan_advance_type_id: "number";
  fk_building_type_id: "number";
  fk_type_of_loan_id: "number";
  fk_contact_id: "number";
  fk_loan_property_development_id: "number";
  fk_loan_financial_details_id: "number";
  fk_introducer_id: "number";
  fk_broker_id: "number";
  fk_case_id: "number";
  fk_originator_id: "number";
};

const getLastValid = <Element>(elements: Element[]): Element =>
  [elements]
    .flat()
    ?.reduce((prev: Element, next: Element) => (next ? next : prev));

export default class Dip extends BaseModel {
  protected _isApplication = false;
  protected _isCaseSummary = false;

  protected _isAll = false;

  tableName(): string {
    return "Origination.Dip";
  }

  setId(id: number) {
    this._id = id;
    return this;
  }

  getSelect() {
    const selectFields = [
      "Case.CreatedAt as date_created",
      "DipIntroducerType.IntroducerType as type_of_introducer",
      "Dip.FkBrokerId as fk_broker_id",
      "Dip.FkOriginatorId as originator",
      "Dip.DipId as dip_id",
      "Case.Id as dip_form_id",
      "Case.CaseNr as case_nr",
      "Case.AdditionalInformation as additional_information",
      "Case.Stage as stage",
      "Case.EditingAsDip as editing_as_dip",
      "Dip.FkCaseId as fk_case_id",
      "Dip.FkContactId as fk_contact_id",
      "Dip.FkLoanPropertyDevelopmentId",
      "DipLoanAdvanceType.AdvanceType as loan_advance_type",
      "DipContactType.ContactType as type_of_applicant",
      "DipContact.ContactId as contact_id",
      "DipCompany.CompanyNumber as company_number",
      "DipBuildingType.BuildingType as building_type",
      "Dip.FkLoanFinancialDetailsId as fk_loan_financial_details_id",
      "DipLoanFinancialDetails.LoanTerm as loan_term",
      "DipLoanType.LoanType as type_of_loan",
      "DipLoanFinancialDetails.MarketValue as market_value",
      "DipLoanFinancialDetails.StartDate as start_date",
      "DipLoanFinancialDetails.FurtherAdvances as further_advances",
      "DipLoanFinancialDetails.LoanPurpose as loan_purpose",
      "DipLoanFinancialDetails.ValueTypeOfLoanAmount as value_type_of_loan_amount",
      "DipLoanFinancialDetails.StartingPoint as starting_point",
      "DipLoanFinancialDetails.InitialNetLoanAmountInput as initial_net_loan_amount",
      "DipLoanFinancialDetails.GrossTotalLoanAmount as gross_loan_amount",
      "DipLoanFinancialDetails.EstimatedInterest as estimated_interest",
      "DipLoanFinancialDetails.PurchasePrice as purchase_price",
      "DipLoanFinancialDetails.ArrangementFeeInput as arrangement_fee_advance_date_value",
      "DipLoanFinancialDetails.ArrangementFeePercent as arrangement_fee_advance_date_percent",
      "DipLoanFinancialDetails.ArrangementFeeRepaymentInput as arrangement_fee_repayment_date_value",
      "DipLoanFinancialDetails.InterestRate as interest_rate",
      "DipLoanFinancialDetails.TitleInsuranceFee as title_insurance_fee",
      "DipLoanFinancialDetails.LegalFee as legal_fee",
      "DipLoanFinancialDetails.IntermediaryCommissionFeeValue as intermediary_commission_fee_value",
      "DipLoanFinancialDetails.IntermediaryCommissionFeePercent as intermediary_commission_fee_percent",
      "DipLoanFinancialDetails.CompletionAdministrationFee as completion_administration_fee",
      "DipLoanFinancialDetails.PremiumForLendersInsurance as premium_for_lenders_insurance",
      "DipLoanFinancialDetails.MaxLtvDayOne as max_ltv",
      "DipLoanFinancialDetails.BrokerFeeInValue as broker_fee_in_value",
      "DipLoanFinancialDetails.BrokerFeeOutValue as broker_fee_out_value",
      "DipLoanFinancialDetails.GrossAmountOfFirstAdvance as gross_amount_of_first_advance",
      "DipLoanFinancialDetails.GrossAmountAtMaturity as gross_amount_at_maturity",
      "DipLoanFinancialDetails.TotalInterest as total_interest",
      "DipLoanFinancialDetails.GrossAmountForLtv as gross_amount_for_ltv",
      "DipLoanFinancialDetails.ArrangementFeeRetainedValue as arrangement_fee_retained_value",
      "DipLoanFinancialDetails.ExitFeeRetainedValue as exit_fee_retained_value",
      "DipLoanFinancialDetails.TotalLoanFacilityExcludingInterest as total_loan_facility_excluding_interest",
      "DipLoanFinancialDetails.ServicedInterestTotal as serviced_interest_total",
      "DipLoanFinancialDetails.GrossDayOneLtv as gross_day_one_ltv",
      "DipLoanFinancialDetails.MaxTotalNetLoanAvailable as max_total_net_loan_available",
      "DipLoanFinancialDetails.TotalFees as total_fees",
      "DipLoanFinancialDetails.TotalLoanAmount as total_loan_amount",
      "DipLoanFinancialDetails.TotalLoanFacility as total_loan_facility",
      "DipLoanFinancialDetails.EstimatedInterest as advanced_interest",
      "DipLoanFinancialDetails.ArrangementFee as arrangement_fee_in_value",
      "DipLoanFinancialDetails.ArrangementFeeRepayment as exit_fee_value",
      "DipLoanFinancialDetails.GrossTotalLoanAmount as gross_loan",
      "DipLoanFinancialDetails.GrossLoanFirstAdvance as gross_loan_first_advance",
      "DipLoanFinancialDetails.InitialNetLoanAmount as net_amount_of_first_advance",
      "DipLoanFinancialDetails.FkLoanFinancialDetailsDevId",
      "DipLoanFinancialDetails.FkHybridTerms",
      "DipLoanFinancialDetails.FkLoanFinancialDetailsMultiId",
      "DipLoanFinancialDetails.IsManualMode as is_manual_mode",
      "DipLoanFinancialDetails.FurtherDrawDownsBorrowing as further_draw_downs_borrowing",
      "DipLoanFinancialDetails.InitialNetLoan as initial_net_loan",
      "DipLoanFinancialDetails.Term as term",
      "DipLoanFinancialDetails.PurposeOfBorrowings as purpose_of_borrowings",
      "DipLoanFinancialDetails.SourceOfDeposit as source_of_deposit",
      "DipLoanFinancialDetails.RepaymentMethod as repayment_method",
      "DipLoanFinancialDetails.RepaymentMethodDetails as repayment_method_details",
      "DipLoanFinancialDetails.ProposedCompletionDate as proposed_completion_date",
      "DipLoanFinancialDetails.ExitFeeIntermediary as exit_fee_intermediary",
      "DipLoanFinancialDetails.Xirr as xirr",
      "DipLoanFinancialDetails.RepaymentDate as repayment_date",
      "DipLoanFinancialDetails.MaturityDate as maturity_date",
      "DipLoanFinancialDetails.Gdltv as gdltv",
      "DipLoanFinancialDetails.Gdltv90Day as gdltv_90_day",
      "DipLoanFinancialDetailsDev.LtvToGdv as ltv_to_gdv",
      "DipLoanPropertyDevelopment.LoanPropertyDevelopmentId as loan_property_development_id",
      "DipLoanPropertyDevelopment.ProgressReport as progress_report",
      "DipLoanPropertyDevelopment.BuildPeriodMonths as build_period",
      "DipLoanPropertyDevelopment.AppraisalReport as appraisal_report",
      "DipLoanFinancialDetailsMulti.LoanFinancialDetailsMultiId as loan_financial_details_multi_id",
      "DipLoanFinancialDetailsMulti.FurtherDrawDowns as further_draw_downs",
      "DipLoanFinancialDetails.FkHybridTerms as fk_hybrid_terms",
      "CaseStatus.Name as status",
      "DipBroker.BrokerId",
      "DipBroker.BrokerCompanyName as broker_company_name",
      "DipBroker.BrokerName as broker_name",
      "DipBroker.BrokerEmail as broker_email",
      "Brokers.CompanyName as broker_company_name",
      "BrokerIndividuals.ContactName as broker_name",
      "BrokerIndividuals.ContactEmail as broker_email",
      "CaseIntroducer.Firm as firm",
      "CaseIntroducer.Introducer as introducer",
      "CaseIntroducer.AddressLine1 as address_line_1",
      "CaseIntroducer.AddressLine2 as address_line_2",
      "CaseIntroducer.City as city",
      "CaseIntroducer.Postcode as postcode",
      "CaseIntroducer.Country as country",
      "CaseIntroducer.PhoneNumber as phone_number",
      "CaseIntroducer.Email as email",
      "CaseIntroducer.InterimPermissionNumber as interim_permission_number",
      "CaseIntroducer.HaveMetClient as have_met_client",
      "CaseSolicitor.CompanyName as s_company_name",
      "CaseSolicitor.ContactName as s_contact_name",
      "CaseSolicitor.AreLeastTwoPartners as s_are_least_two_partners",
      "CaseSolicitor.AddressLine1 as s_address_line_1",
      "CaseSolicitor.AddressLine2 as s_address_line_2",
      "CaseSolicitor.City as s_city",
      "CaseSolicitor.Postcode as s_postcode",
      "CaseSolicitor.Country as s_country",
      "CaseSolicitor.PhoneNumber as s_phone_number",
      "CaseSolicitor.Email as s_email",
      "CaseSolicitor.OmniSolicitorPhoneNumber as s_omni_solicitor_phone_number",
      "CaseSolicitor.OmniSolicitorEmail as s_omni_solicitor_email",
      "CaseSolicitor.FkSolicitorId as s_omni_solicitor_id",
    ];

    const query = BaseModel.getKnex()
      .select(selectFields)
      .from(this.tableName())
      .innerJoin(
        "Origination.Case",
        this.tableName() + ".FkCaseId",
        "Case.CaseId"
      )
      .leftJoin(
        "Origination.CaseIntroducer",
        this.tableName() + ".FkCaseId",
        "CaseIntroducer.FkCaseId"
      )
      .leftJoin(
        "Origination.CaseSolicitor",
        this.tableName() + ".FkCaseId",
        "CaseSolicitor.FkCaseId"
      )
      .leftJoin(
        "Origination.DipLoanFinancialDetails",
        this.tableName() + ".FkLoanFinancialDetailsId",
        "DipLoanFinancialDetails.loanFinancialDetailsId"
      )
      .leftJoin(
        "Origination.DipLoanFinancialDetailsMulti",
        "DipLoanFinancialDetails.FkLoanFinancialDetailsMultiId",
        "DipLoanFinancialDetailsMulti.LoanFinancialDetailsMultiId"
      )
      .leftJoin(
        "Origination.DipLoanAdvanceType",
        this.tableName() + ".FkLoanAdvanceTypeId",
        "DipLoanAdvanceType.LoanAdvanceTypeId"
      )
      .leftJoin(
        "Origination.DipLoanFinancialDetailsDev",
        "DipLoanFinancialDetails.FkLoanFinancialDetailsDevId",
        "DipLoanFinancialDetailsDev.LoanFinancialDetailsDevId"
      )
      .leftJoin(
        "Origination.DipBuildingType",
        this.tableName() + ".FkBuildingTypeId",
        "DipBuildingType.BuildingTypeId"
      )
      .leftJoin(
        "Origination.DipLoanType",
        this.tableName() + ".FkTypeOfLoanId",
        "DipLoanType.LoanTypeId"
      )
      .leftJoin(
        "Origination.DipContact",
        this.tableName() + ".FkContactId",
        "DipContact.ContactId"
      )
      .leftJoin("Origination.CaseStatus", "Case.FkCaseStatusId", "CaseStatusId")
      .leftJoin(
        "Origination.DipContactType",
        "DipContact.FkContactTypeId",
        "DipContactType.ContactTypeId"
      )
      .leftJoin(
        "Origination.DipCompany",
        "DipCompany.CompanyId",
        "DipContact.FkCompanyContactId"
      )
      .leftJoin(
        "Origination.DipLoanPropertyDevelopment",
        this.tableName() + ".FkLoanPropertyDevelopmentId",
        "DipLoanPropertyDevelopment.LoanPropertyDevelopmentId"
      )
      .leftJoin(
        "Origination.DipIntroducerType",
        this.tableName() + ".FkIntroducerId",
        "DipIntroducerType.IntroducerId"
      )
      .leftJoin(
        "Origination.DipBroker",
        this.tableName() + ".FkBrokerId",
        "DipBroker.BrokerId"
      )

      .leftJoin(
        "OriginationAdmin.Brokers",
        "DipBroker.FkBrokerCompanyId",
        "Brokers.Id"
      )
      .leftJoin(
        "OriginationAdmin.BrokerIndividuals",
        "DipBroker.FkBrokerIndividualId",
        "BrokerIndividuals.Id"
      );

    if (this._id) {
      query.where({ DipId: this._id });
    }
    return query;
  }

  public includeAll() {
    this._isAll = true;
    return this;
  }

  async getForm() {
    const drawdonwsFields = [
      "Advance as advance",
      "ArrFeeOut as arr_fee_out",
      "Date as date",
      Dip.getKnex().raw("ROUND(EndBal, 4) as end_bal"),
      Dip.getKnex().raw("ROUND(GrossLtgdv, 4) as gross_ltgdv"),
      Dip.getKnex().raw("ROUND(GrossLtv, 4) as gross_ltv"),
      "Interest as interest",
      "InterestPaid as interest_paid",
      "TotalFees as total_fees",
    ];
    const data = [];
    const loanFinancialHybridTerms = new LoanFinancialHybridTerms();
    const caseOverview = new CaseOverview();
    const contactValue = new ContactValue();
    const form = await this.getSelect();
    const security = new Security();
    const properties = new CaseProperty();
    const valuationModel = new PropertyValuationReport();
    const applicationStepStatusTypeModel = new ApplicationStepStatusType();

    for (let i = 0; i < form.length; i++) {
      const propertiesData = (await properties
        .select()
        .where({ FkCaseId: form[i].fk_case_id })) as Array<
        Record<string, unknown>
      >;
      const securityData = await security.setDipId(form[i].dip_id).select();
      const hybridData = await loanFinancialHybridTerms
        .select()
        .where({ LoanFinancialHybridTermsId: form[i].fk_hybrid_terms });
      const contactData = await contactValue
        .select()
        .fullOuterJoin("OriginationAdmin.Contacts", "FkSharedContactId", "Id")
        .where({ FkContactId: form[i].fk_contact_id });

      form[i].id = form[i].dip_form_id;
      form[i].gross_amount = form[i].gross_loan_amount;
      form[i].applicants = [...contactData];
      form[i].name = [...contactData];
      form[i].hybrid_option = hybridData[0];
      form[i].securities = [...securityData];
      form[i].further_advances = JSON.parse(form[i].further_advances);
      form[i].case_stage = form[i].stage;
      form[i].editing_as_dip = form[i].editing_as_dip;
      form[i].calculator_response = {
        advanced_interest: form[i].advanced_interest,
        arrangement_fee_in_value: form[i].arrangement_fee_in_value,
        broker_fee_in_value: form[i].broker_fee_in_value,
        broker_fee_out_value: form[i].broker_fee_out_value,
        exit_fee_value: form[i].exit_fee_value,
        gross_amount_of_first_advance: form[i].gross_amount_of_first_advance,
        gross_amount_at_maturity: form[i].gross_amount_at_maturity,
        total_interest: form[i].total_interest,
        serviced_interest_total: form[i].serviced_interest_total,
        gross_amount_for_ltv: form[i].gross_amount_for_ltv,
        arrangement_fee_retained_value: form[i].arrangement_fee_retained_value,
        exit_fee_retained_value: form[i].exit_fee_retained_value,
        total_loan_facility_excluding_interest:
          form[i].total_loan_facility_excluding_interest,
        gross_day_one_ltv: form[i].gross_day_one_ltv,
        gross_loan: form[i].gross_loan,
        gross_loan_first_advance: form[i].gross_loan_first_advance,
        max_total_net_loan_available: form[i].max_total_net_loan_available,
        net_amount_of_first_advance: form[i].net_amount_of_first_advance,
        total_fees: form[i].total_fees,
        total_loan_amount: form[i].total_loan_amount,
        total_loan_facility: form[i].total_loan_facility,
        intermediary_commission_fee_value:
          form[i].intermediary_commission_fee_value,
        drawdowns: await new LoanFinancialDrawDowns()
          .select(drawdonwsFields)
          .where({
            FkLoanFinancialDetailsId: form[i].fk_loan_financial_details_id,
          }),

        xirr: form[i].xirr,
        repayment_date: form[i].repayment_date,
        maturity_date: form[i].maturity_date,
        gdltv: form[i].gdltv,
        gdltv_90_day: form[i].gdltv_90_day,
      };

      form[i].broker_company_name = getLastValid(form[i].broker_company_name);
      form[i].broker_email = getLastValid(form[i].broker_email);
      form[i].broker_name = getLastValid(form[i].broker_name);

      form[i].application_loan_details = {
        further_draw_downs_borrowing: form[i].further_draw_downs_borrowing,
        initial_net_loan: form[i].initial_net_loan,
        term: form[i].term,
        purpose_of_borrowings: form[i].purpose_of_borrowings,
        source_of_deposit: form[i].source_of_deposit,
        repayment_method: form[i].repayment_method,
        repayment_method_details: form[i].repayment_method_details,
        proposed_completion_date: form[i].proposed_completion_date,
      };

      form[i].introducer_details = {
        firm: form[i].firm,
        introducer: form[i].introducer,
        address_line_1: form[i].address_line_1,
        address_line_2: form[i].address_line_2,
        city: form[i].city,
        postcode: form[i].postcode,
        country: form[i].country,
        phone_number: form[i].phone_number,
        email: form[i].email,
        interim_permission_number: form[i].interim_permission_number,
        have_met_client: form[i].have_met_client,
      };

      form[i].solicitor_details = {
        contact_name: form[i].s_contact_name,
        company_name: form[i].s_company_name,
        address_line_1: form[i].s_address_line_1,
        address_line_2: form[i].s_address_line_2,
        city: form[i].s_city,
        postcode: form[i].s_postcode,
        country: form[i].s_country,
        phone_number: form[i].s_phone_number,
        email: form[i].s_email,
        omni_solicitor_phone_number: form[i].s_omni_solicitor_phone_number,
        omni_solicitor_email: form[i].s_omni_solicitor_email,
        omni_solicitor_id: form[i].s_omni_solicitor_id,
        are_least_two_partners: form[i].s_are_least_two_partners,
      };

      form[i].summary = await caseOverview.getDataByCaseId(form[i].fk_case_id);

      form[i].properties = await Promise.all(
        propertiesData.map(async (value: { [key: string]: string }) => {
          const valuationData = (await valuationModel
            .select()
            .where({ FkPropertyId: value.case_property_id })) as Array<any>;

          const [
            status = { application_step_status_type: undefined },
          ] = (await applicationStepStatusTypeModel
            .select()
            .where({ ApplicationStepStatusId: value.fk_status_id })) as Array<{
            application_step_status_type: string;
          }>;

          const valuationReportStatusId = valuationData.length
            ? valuationData[0].fk_status_id
            : -1;
          const [
            valuation_report_edit_status = {
              application_step_status_type: undefined,
            },
          ] = (await applicationStepStatusTypeModel.select().where({
            ApplicationStepStatusId: valuationReportStatusId,
          })) as Array<{ application_step_status_type: string }>;

          return {
            id: value.case_property_id,
            date_edited: value.date_edited,
            status: status.application_step_status_type,
            valuation_report: !valuationData.length
              ? {}
              : {
                  valuation_basis: valuationData[0].valuation_basis,
                  valuation_method: valuationData[0].valuation_method,
                  report_date: valuationData[0].report_date,
                  inspection_date: valuationData[0].inspection_date,
                  market_value: valuationData[0].market_value,
                  day_value: valuationData[0].day_value,
                  gdv: valuationData[0].gdv,
                  current_estimated_90_day_market_value:
                    valuationData[0].current_estimated_90_day_market_value,
                  estimated_90_day_gdv: valuationData[0].estimated_90_day_gdv,
                  day_gdv: valuationData[0].day_gdv,
                  reinstatement_value: valuationData[0].reinstatement_value,
                  title_no: valuationData[0].title_no,
                  security_description: valuationData[0].security_description,
                  security_subtype: valuationData[0].security_subtype,
                  first_charge_outstanding:
                    valuationData[0].first_charge_outstanding,
                  number_of_units: valuationData[0].number_of_units,
                  planning_details: valuationData[0].planning_details,
                  planning_reference_numbers: JSON.parse(
                    valuationData[0].planning_reference_numbers
                  ),
                  country: valuationData[0].country,
                  nitrate_neutrality: valuationData[0].nitrate_neutrality,
                  build_duration: valuationData[0].build_duration,
                  build_costs: valuationData[0].build_costs,
                  commencement_date_of_works:
                    valuationData[0].commencement_date_of_works,
                  contractor: valuationData[0].contractor,
                  price_per_square_foot: valuationData[0].price_per_square_foot,
                  price_per_square_meters:
                    valuationData[0].price_per_square_meters,
                  total_square_feet: valuationData[0].total_square_feet,
                  total_square_meters: valuationData[0].total_square_meters,
                  total_value: valuationData[0].total_value,
                  surveyor: valuationData[0].surveyor,
                  report_status: valuationData[0].report_status,
                  market_rent: valuationData[0].market_rent,
                  name_of_the_individual_surveyor:
                    valuationData[0].name_of_the_individual_surveyor,
                  planning_required: valuationData[0].planning_required,
                  link_to_planning_permission:
                    valuationData[0].link_to_planning_permission,
                  build_costs_per_square_foot:
                    valuationData[0].build_costs_per_square_foot,
                  build_costs_per_square_meter:
                    valuationData[0].build_costs_per_square_meter,
                  project_manager: valuationData[0].project_manager,
                  architect: valuationData[0].architect,
                  structural_engineer: valuationData[0].structural_engineer,
                  other_relevant_subcontractors:
                    valuationData[0].other_relevant_subcontractors,
                  omni_experience_with_the_professional_team:
                    valuationData[0].omni_experience_with_the_professional_team,
                  listed_grade: valuationData[0].listed_grade,
                  sang: valuationData[0].sang,
                  sssi: valuationData[0].sssi,
                  anob: valuationData[0].anob,
                  flood_zone: valuationData[0].flood_zone,
                  green_belt: valuationData[0].green_belt,
                  status:
                    valuation_report_edit_status.application_step_status_type,
                  date_edited: valuationData[0].date_edited,
                  esw1: valuationData[0].esw1,
                },
            details: {
              already_owned: value.already_owned,
              being_purchased: value.being_purchased,
              current_value: value.current_value,
              value_after_works: value.value_after_works,
              purchase_price: value.purchase_price,
              purpose_of_borrowings: value.purpose_of_borrowings,
              property_type: value.property_type,
              security_type: value.security_type,
              security_type_other: value.security_type_other,
              years_remaining_on_lease: value.years_remaining_on_lease,
              is_new_build: value.is_new_build,
              is_standard_construction: value.is_standard_construction,
              is_planning_required: value.is_planning_required,
              is_occupied: value.is_occupied,
              is_occupied_by_borrower: value.is_occupied_by_borrower,
              basis_for_occupation: value.basis_for_occupation,
              intentions: value.intentions,
              contact_for_access_valuation_name:
                value.contact_for_access_valuation_name,
              contact_for_access_valuation_phone:
                value.contact_for_access_valuation_phone,
              contact_for_access_valuation_email:
                value.contact_for_access_valuation_email,
              contact_for_payment_valuation_name:
                value.contact_for_payment_valuation_name,
              contact_for_payment_valuation_phone:
                value.contact_for_payment_valuation_phone,
              contact_for_payment_valuation_email:
                value.contact_for_payment_valuation_email,
              selected_contact_for_access_valuation:
                value.selected_contact_for_access_valuation,
              selected_contact_for_payment_valuation:
                value.selected_contact_for_payment_valuation,
              selected_contact_applicant_id_for_access_valuation:
                value.selected_contact_applicant_id_for_access_valuation,
              selected_contact_applicant_id_for_payment_valuation:
                value.selected_contact_applicant_id_for_payment_valuation,
              payment_contact_details_same_as_access_valuation:
                value.payment_contact_details_same_as_access_valuation,
            },
            address: {
              line_1: value.address_line_1,
              line_2: value.address_line_2,
              postcode: value.address_postcode,
              city: value.address_city,
              country: value.address_country,
            },
            charge: {
              opfl_charge_type: value.opfl_charge_type,
              lenders: JSON.parse(value.lenders),
              current_mortgage_outstanding: value.current_mortgage_outstanding,
              security_owner: value.security_owner,
              security_owner_title: value.security_owner_title,
              security_owner_forename: value.security_owner_forename,
              security_owner_middle_name: value.security_owner_middle_name,
              security_owner_surname: value.security_owner_surname,
            },
            title_numbers: JSON.parse(value.title_numbers),
          };
        })
      );

      for (const key in form[i].calculator_response) {
        if (
          key != "intermediary_commission_fee_value" &&
          key != "gross_amount_at_maturity" &&
          form[i].hasOwnProperty(key)
        ) {
          delete form[i][key];
        }
      }
    }
    return form;
  }

  getJsonMapping(): PropertiesInterface<DipType> {
    return {
      building_type: async (db: Knex, value: string) => {
        const buildingType = new BuildingType();
        const data = await buildingType.select().where({ BuildingType: value });
        return {
          key: "fk_building_type_id",
          value: data[0].building_type_id,
        };
      },

      type_of_loan: async (db: Knex, value: string) => {
        const loanType = new LoanType();
        const data = await loanType.select().where({ LoanType: value });
        return {
          key: "fk_type_of_loan_id",
          value: data[0].loan_type_id,
        };
      },

      loan_advance_type: async (db: Knex, value: string) => {
        const loanAdvanceType = new LoanAdvanceType();
        const data = await loanAdvanceType
          .select()
          .where({ AdvanceType: value });
        return {
          key: "fk_loan_advance_type_id",
          value: data[0].loan_advance_type_id,
        };
      },
      type_of_introducer: async (db: Knex, value: string) => {
        const introducer = new IntroducerType();
        const data = await introducer
          .select()
          .where({ IntroducerType: value })
          .catch((e) => {
            throw new e();
          });
        return {
          key: "fk_introducer_id",
          value: data[0].introducer_id,
        };
      },
      originator: "fk_originator_id",
      fk_broker_id: "fk_broker_id",
    };
  }

  async remove() {
    return Dip.getKnex().transaction(async (trx) => {
      const data = (await this.getSelect())[0];
      await new SecurityDipMapping()
        .enableTransaction(trx)
        .delete()
        .where({ FkDipId: data.dip_id });
      await this.enableTransaction(trx).delete().where({ DipId: data.dip_id });
      await new LoanFinancialDetails()
        .enableTransaction(trx)
        .delete()
        .where({ LoanFinancialDetailsId: data.fk_loan_financial_details_id });
      await new LoanFinancialDetailsDev()
        .enableTransaction(trx)
        .delete()
        .where({ LoanFinancialDetailsDevId: data.FkLoanFinancialDetailsDevId });
      await new LoanFinancialDetailsMulti()
        .enableTransaction(trx)
        .delete()
        .where({
          LoanFinancialDetailsMultiId: data.FkLoanFinancialDetailsMultiId,
        });
      await new LoanFinancialHybridTerms()
        .enableTransaction(trx)
        .delete()
        .where({ LoanFinancialHybridTermsId: data.FkHybridTerms });
      if (data.FkBrokerId)
        await new Broker()
          .enableTransaction(trx)
          .delete()
          .where({ BrokerId: data.FkBrokerId });
      await new ContactValue()
        .enableTransaction(trx)
        .delete()
        .where({ FkContactId: data.fk_contact_id });
      await new Contact()
        .enableTransaction(trx)
        .delete()
        .where({ ContactId: data.fk_contact_id });
      await new LoanPropertyDevelopment()
        .enableTransaction(trx)
        .delete()
        .where({ LoanPropertyDevelopmentId: data.FkLoanPropertyDevelopmentId });
      await trx.commit();
    });
  }

  public async updateLoanFinancialDetails(
    data: PropertiesInterface<Record<string, unknown>>
  ) {
    const model = new LoanFinancialDetails();
    const dipData = await this.getSelect();
    await model.setJsonObject(data);
    await model.update().where({
      LoanFinancialDetailsId: dipData[0].fk_loan_financial_details_id,
    });

    const stepModel = new ApplicationStep();
    await stepModel.changeStatus(
      "loan_details",
      dipData[0].fk_case_id,
      "Edited"
    );

    return this;
  }

  public get id() {
    return this._id;
  }

  jsonSchema(): JsonSchemaInterface<DipType> {
    return {
      type: "object",
      required: [],
      properties: {
        dip_id: "number|pk",
        created_by: "string",
        fk_loan_advance_type_id: "number",
        fk_building_type_id: "number",
        fk_type_of_loan_id: "number",
        fk_contact_id: "number",
        fk_loan_property_development_id: "number",
        fk_loan_financial_details_id: "number",
        fk_introducer_id: "number",
        fk_broker_id: "number",
        fk_originator_id: "number",
        fk_case_id: "number",
      },
    };
  }
}
