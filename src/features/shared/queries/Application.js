import { CAREGIVER_AGENCY_PRICE_FIELDS } from "@/src/features/shared/queries/CaregiverAgency.js";

export const APPLICATION_FIELDS = `
    is_counter_offer
    surcharge_new_year
    surcharge_good_friday
    surcharge_easter_sunday
    surcharge_labour_day
    surcharge_ascension_day
    surcharge_whit_monday
    surcharge_germany_unity
    surcharge_first_christmas_day
    surcharge_second_christmas_day
    id
    salary
    arrival_at
    departure_at
    reserved_until_at
    active_until_at
    caregiver_id
    job_offer_id
    departure_fee
    arrival_fee
    holiday_surcharge
    message
    summer_charge
    calculation_days
    notice_period
    created_at
    is_active  
    is_accept_counter_offer
    is_reserved
    calculation_of_travel_days
    calculation_days
    caregiver {
        germany_skill
        care_experience
        year_of_birth
        salary_wish
        cost
        number_of_jobs_done
        rank
        rating_avg
        caregiver_agency {
            caregiver_agency_price {
               ${CAREGIVER_AGENCY_PRICE_FIELDS}
                sample_contract {
                    aws_url
                    original_name
                }
            }
        }
    }
`;

export const APPLICATIONS_FIELDS = `
    is_counter_offer

    id
    salary
    arrival_at
    departure_at
    reserved_until_at
    active_until_at
    caregiver_id
    job_offer_id
    departure_fee
    arrival_fee
    holiday_surcharge
    message
    message_pl
    message_de
    message_en
    summer_charge
    calculation_days
    notice_period
    created_at
    is_active  
    is_accept_counter_offer
    is_reserved
    surcharge_new_year
    surcharge_good_friday
    surcharge_easter_sunday
    surcharge_labour_day
    surcharge_ascension_day
    surcharge_whit_monday
    surcharge_germany_unity
    surcharge_first_christmas_day
    surcharge_second_christmas_day
    caregiver {
        caregiver_agency {
            caregiver_agency_price {
                sample_contract {
                    aws_url
                    original_name
                }
                calculation_travel_days
                caregiver_agency_price_summer_works {
                    id
                    period_type
                    period_value
                    is_enabled
                    summer_work_month {
                        id
                        month
                    }
                }
            }
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
      user_watch {
        id
      }
`;

export const JOB_OFFER_ACCEPTED_APPLICATIONS_FIELDS = `
    id
    salary
    caregiver_id
    job_offer_id
    application_id
    salary
    message
    arrival_date
    arrival_time_from
    arrival_time_to
    departure_date
    final_confirmed_at
    is_confirm_binding
    rejected_at
    is_reject_confirmed_terms
    reject_type
    reject_message
    reject_departure_at
    created_at
    updated_at
    caregiver {
      germany_skill
      care_experience
      year_of_birth
      salary_wish
      cost
      number_of_jobs_done
      rank
      rating_avg
          first_name
          last_name
          year_of_birth
          gender
          images {
            id
            token
            for
            type
            original_name
            file_name
            title
            description
            location
            created_at
            updated_at
            aws_url
          }
           confirmation {
                    id
                    caregiver_id
                    job_offer_id
                    application_id
                    created_at
                }
      caregiver_agency {
        caregiver_agency_price {
            sample_contract {
                aws_url
                original_name
            }
        }
    }
}
application {
    ${APPLICATION_FIELDS}
    holiday_surcharge
    root {
      id
      answers {
          ${APPLICATION_FIELDS}
      }
    }
    user_watch {
      id
    }
    job_offer {
      id
      job_offer_id
    }
    caregiver {
      germany_skill
      care_experience
      year_of_birth
      salary_wish
      cost
      number_of_jobs_done
      rank
      rating_avg
      first_name
      last_name
      year_of_birth
      gender
      images {
          id
          token
          for
          type
          original_name
          file_name
          title
          description
          location
          created_at
          updated_at
          aws_url
      }
}  
}
`;
