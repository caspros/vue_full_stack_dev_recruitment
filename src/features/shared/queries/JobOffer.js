import {
  CAREGIVER_CARD_FIELDS_ANONYMIZED,
  CAREGIVER_DETAILS_FIELDS,
  FILE_FIELDS,
  JOB_OFFER_PREFERENCE,
} from "./Caregiver.js";
import { APPLICATION_FIELDS } from "./Application.js";
import { CUSTOMER_FIELDS, CUSTOMER_FIELDS_DETAILS_SA } from "./Customer.js";
import { CUSTOMER_FIELDS_DETAILS } from "./Customer.js";
import { JOB_LIST_FIELDS_SA } from "@/src/features/shared/queries/JobList.js";

export const CONFIRMATION_ARRIVAL_FIELDS = `
    id
    arrival_type_id
    arrival_company
    contact_person
    phone_number
    arrival_date
    arrival_time_from
    arrival_time_to
    note
    arrival_type {
        id
        type
    }
`;

export const CONFIRMATION_DEPARTURE_FIELDS = `
    id
    contact_person
    phone_number
    departure_date
    departure_time_from
    departure_time_to
    note
`;

export const JOB_CARD_FIELDS = `
    id 
    out_of_date_at 
    title
    title_pl
    title_de
    title_en 
    caregiver_salary
    well_matching_applications_count
    is_know
    is_known
    active_request {
        id
    }
    active_interest {
        id
    }
    active_application {
        id
    }
    created_at
    job_offer_id 
    arrival_at
    departure_at
    description
    allow_application
    my_active_applications_count
    active_applications_count
    reserved_applications_count
    my_reserved_applications_count
      confirmations_count
      user_watches_count
      active_applications_count
    user_like_dislike { 
        type 
        id
    } 
    user_watch { 
        id 
    } 
    best_matching { 
        id 
        percentage_match 
    } 
    service_agency {
        name
        street
        zip_code
        city
        phone
        created_at
        active_jobs_count
        avatar {
            ${FILE_FIELDS}
        }
    }
    confirmation {
        id
        application_id
        is_confirm_binding
        invoices {
            ${FILE_FIELDS}
        }
        contract {
            ${FILE_FIELDS}
        }
        signed_contract {
            ${FILE_FIELDS}
        }
        arrival {
            ${CONFIRMATION_ARRIVAL_FIELDS}
        }
        departure {
            ${CONFIRMATION_DEPARTURE_FIELDS}
        }
        application {
            holiday_surcharge
            notice_period
            notice_period_value
            arrival_fee
            departure_fee
            summer_charge
            caregiver_salary
            salary
        }
        contract_contact {
            id
            confirmation_id
            salutation
            title
            first_name
            last_name
            phone
            email
            created_at
            updated_at
        }
        contract_patient {
            id
            confirmation_id
            salutation
            title
            first_name
            last_name
            phone
            email
            street_number
            zip_code
            city
            created_at
            updated_at
        }
    }
    my_applications_count 
    my_requests_count
    well_matching_caregivers_count 
    applications_count 
    salary_offered 
    active_interests_count
    active_requests_count
    know_confirmation { 
        id 
    } 
    languagables { 
        level 
        language { 
          code 
        } 
    }
    customer {
      ${CUSTOMER_FIELDS}
      patients {
                  id
                  weight
                  year_of_birth
                  care_level
                  gender 
                  mobility {
                        id
                        mobility
                  }
                  tools {
                        id
                        tool
                  }
                  dementia
                  incontinence
                  night_operations
                  lift {
                        name
                        id
                  }
                  features_condition
            }
      }
`;

export const JOB_DETAILS_FIELDS = ` 
      ${JOB_CARD_FIELDS}
      customer {
            ${CUSTOMER_FIELDS}
            ${CUSTOMER_FIELDS_DETAILS}
      }
`;

export const JOB_DETAILS_SA_FIELDS = ` 
      ${JOB_CARD_FIELDS}
     ${JOB_LIST_FIELDS_SA}
      customer_id
      is_expired
      visibility
      salary_commission
      salary_bonus
        reject_confirmations {
            id
        }
      temp_visibility {
        visibility
      }
      salary_offered
        rating_caregiver {
            id
        }
      visible_caregiver_agencies {
            id
            name
      }
      customer {
            ${CUSTOMER_FIELDS}
            ${CUSTOMER_FIELDS_DETAILS_SA}
      }
      confirmation {
            id
            contract {
                ${FILE_FIELDS}
            }
            invoices {
                ${FILE_FIELDS}
            }
            signed_contract {
                ${FILE_FIELDS}
            }
            arrival {
                ${CONFIRMATION_ARRIVAL_FIELDS}
            }
            departure {
                contact_person
                phone_number
                departure_date
                departure_time_from
                departure_time_to
                note
            }
            application {
                  ${APPLICATION_FIELDS}
            }
            caregiver {
                  ${CAREGIVER_DETAILS_FIELDS}
            }
      }
`;

export const JOB_OFFER_APPLICATIONS_FIELDS = `
    ${APPLICATION_FIELDS}
    root {
        id
        answers {
            ${APPLICATION_FIELDS}
        }
    }
    caregiver { 
        caregiver_id
        ${CAREGIVER_CARD_FIELDS_ANONYMIZED}
    }
    user_watch {
        id
    }
`;

export const JOB_OFFER_APPLICATIONS_FIELDS_SA = `
    ${APPLICATION_FIELDS}
    caregiver { 
        ${CAREGIVER_DETAILS_FIELDS}
    }
    user_watch {
        id
    }
`;
