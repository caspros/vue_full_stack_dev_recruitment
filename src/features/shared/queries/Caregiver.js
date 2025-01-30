import { CAREGIVER_AGENCY_EMPLOYEES_FIELDS } from "@/src/features/shared/queries/CaregiverAgency.js";
import { COUNTRY_FIELDS } from "@/src/features/shared/queries/Country.js";
import { APPLICATION_FIELDS } from "@/src/features/shared/queries/Application.js";

export const FILE_FIELDS = `
      id
      token
      for
      type
      file_name
      original_name
      title
      description
      aws_url
      created_at
`;

export const JOB_OFFER_PREFERENCE = `
    job_offer_preference {
        number_of_patient {
            id
            name
        }
        living_conditions {
            id
            name
        }
        urbanizations {
            id
            name
        }
        gender
        lift {
            id
            name
        }
        incontinence
        dementia
        night_operations
        other_people_in_house
        has_family_near_by
        urbanization
        living_condition
        smoking
        wishes
        pets
        location {
            id
            location
            zip_code
        }
        locations {
            id
            location
            zip_code
        }
        accommodation
    }
`;

export const CAREGIVER_CARD_FIELDS = `            
        id 
        caregiver_lead_id
        is_match
        is_user
        is_new
        is_active_user
        gender
        caregiver_id
        well_matchings_db_count
        well_matchings_jobs_db_count
        caregiver_agency_id
        matching_status
        active_matches_count
        active_interests_count
        cometchat_uuid
        interest {
            id
        }
        phone_country {
            ${COUNTRY_FIELDS}
        }
        employee {
            ${CAREGIVER_AGENCY_EMPLOYEES_FIELDS}
        }
        active_interests_count
        active_interests_without_matches_count
        active_confirmations {
            id
            arrival_date
            departure_date
            job_offer {
                id
                job_offer_id
                customer {
                    last_name
                    customer_id
                    service_agency_id
                }
            }
             application {
                id
                caregiver_id
                job_offer_id
                reject_type
                reject_message
                is_confirmed_terms
                is_accept_counter_offer
            }
        }
        latest_confirmation {
            id
            arrival_date
            departure_date
            job_offer {
                id
                customer {
                    last_name
                    customer_id
                    service_agency_id
                }
            }
        }
      caregiver_agency {
        name
        avatar {
            aws_url
        }
        video_mamiamia_works {
            aws_url
        }
      }
        update_availability_at
        system_update_availability_at
        reserved_applications {
            id
            arrival_at
            departure_at
            reserved_until_at
            job_offer {
                id
                arrival_at
                departure_at
                job_offer_id
                customer {
                    customer_id
                    last_name
                }
            }
        }
      know_confirmation { 
            id 
      }
      rank
      last_contact_at
      driving_license
      last_name 
      first_name 
      phone 
      updated_at
      germany_skill
      created_at
      requests_count 
      active_requests_count
      active_requests_without_matches_count
      applications_count 
      finally_confirmations_count 
      active_applications_count
      active_not_reserved_applications_count
      all_active_applications_count
      reserved_applications_count
      matching { 
            percentage_match 
            job_offer_id
      }
      available_from
      available_to
      smoking
      salary_wish
      total_cost
      language_id
      language {
            id
            code
            name
      }
      languagables {
            language {
                  id
                  code
                  name
            }
            level
      }
      avatar { 
            id
            token
            for
            type
            file_name
            original_name
            title
            description
            aws_url
      } 
      job_offer_preference {
            number_of_patient {
                  id
                  name
            }
      }
`;

export const MATCHING_DETAIL = `
    percentage_match 
    detail {
        is_know
        is_request
        available
        language
        gender
        smoking
        driving_license
        salary
        number_of_patients
        gender_of_patients
        additional_persons
        night_operations
        lift
        dementia
        incontinence
        location
        family_near_by
        housing
        urbanization
        smoking_household
        animals
        mobilities {
            id
            matching_detail_id
            mobility_id
            is_compliance
        }
    }
    job_offer {
        salary_offered
    }
    caregiver {
        germany_skill
        gender
        smoking
        driving_license
        salary_wish
        ${JOB_OFFER_PREFERENCE}
    }
`;

export const CAREGIVER_CARD_FIELDS_ANONYMIZED = `      
      id 
      gender
      caregiver_agency_id
      driving_license
      last_name 
      rank
      first_name 
      phone 
      updated_at
      germany_skill
      created_at
      matching { 
            ${MATCHING_DETAIL}
      }
      available_from
      available_to
      smoking
      salary_wish
      avatar { 
            id
            token
            for
            type
            file_name
            original_name
            title
            description
            aws_url
      } 
      job_offer_preference {
            number_of_patient {
                  id
                  name
            }
      }
`;

export const CAREGIVER_DETAILS_JOB_OFFER_CONTEXT_FIELDS = `
    matching {
        ${MATCHING_DETAIL}
    }
    request {
        id
        created_at
    }
    confirmation {
        id
    }
    interest {
        id
    }
    latest_application {
        id
        ${APPLICATION_FIELDS}
        root {
            id
            answers {
                ${APPLICATION_FIELDS}
            }
        }
    }
`;

export const CAREGIVER_DETAILS_FIELDS = ` 
    ${CAREGIVER_CARD_FIELDS}
    is_profile_complete
    feature_confirmations {
        id
        arrival_date
        departure_date
    }
    email
    notification_type
    is_on_the_job
    current_availability {
        start_date
        end_date
    }
    application {
        id
    }
    employee {
        ${CAREGIVER_AGENCY_EMPLOYEES_FIELDS}
    }
    hobbies {
        id
        hobby
    }
    personalities {
        id
        personality
    }
    holiday_works {
        holiday {
            id
            holiday
            end_at
            start_at
        }
    }
    summer_works {
        summer_work_month {
            id
            month
        }
    }
    is_reserved
    year_of_birth
    can_apply
    care_experience
    second_phone
    weight
    height
    education
    about
    about_pl
    about_de
    about_en
    description
    nationality {
        id
        nationality
        prefix_number
        code
    }
    has_system_access
    vaccination_status
    last_vaccination_at
    driving_license
    request {
        id
        caregiver_id
        job_offer_id
        message
        rejected_at
        created_at
        updated_at
    }
    application {
        id
    }
    pesel
    germany_skill
    salary_wish
    mobilities {
        id
        mobility
    }
    ${JOB_OFFER_PREFERENCE}
    images {
        id
        token
        for
        type
        file_name
        original_name
        title
        description
        aws_url
    }
    certificates {
        id
        token
        for
        type
        file_name
        original_name
        title
        description
        aws_url
    }
    verification_document {
        id
        token
        for
        type
        file_name
        original_name
        title
        description
        aws_url
    }
    is_nurse
    is_active
    number_of_jobs_done
    phone_country {
        ${COUNTRY_FIELDS}
    }
    second_phone_country {
        ${COUNTRY_FIELDS}
    }
    rating_calculate {
        avg
    }
    ratings_count
    ratings {
        id
        user_id
        caregiver_id
        job_offer_id
        parent_id
        root_id
        dealing_with_patient
        nursing_skill
        household_activities
        reliability
        appearance
        empathy
        message
        return_wish
        created_at
        updated_at
        job_offer {
            id
            job_offer_id
            title
            customer_id
            service_agency_id
            location_id
            visibility
            description
            salary_offered
            salary_bonus
            salary_commission
            arrival_at
            departure_at
            is_sending_automatically_completed
            last_sending_automatically_at
            is_verified
            is_known
            created_at
            updated_at
            requests_count
            active_requests_count
            my_requests_count
            applications_count
            my_applications_count
            reserved_applications_count
            active_applications_count
            my_reserved_applications_count
            my_active_applications_count
            confirmations_count
            user_watches_count
            caregiver_matchings_count
            well_matching_caregivers_count
            counter_offers_count
            interests_count
            active_interests_count
            allow_application
            is_know
            is_rating
            status
            is_match
            caregiver_salary
            customer {
                id
                first_name
                last_name
                location {
                    location
                    zip_code
                }
            }
        }
        customer {
            id
            first_name
            last_name
        }
        answers {
            id
            user_id
            caregiver_id
            job_offer_id
            parent_id
            root_id
            dealing_with_patient
            nursing_skill
            household_activities
            reliability
            appearance
            empathy
            message
            return_wish
            created_at
            updated_at
        }
    }
    rating_calculate {
        id
        caregiver_id
        avg
        dealing_with_patient
        nursing_skill
        household_activities
        reliability
        appearance
        empathy
        created_at
        updated_at
    }
    complete_confirmations {
        id
        arrival_date
        departure_date
        job_offer {
            id
            job_offer_id
            description
            customer {
                last_name
                customer_id
                service_agency_id
            }
        }
    }
    user_like_dislike {
        id
        caregiver_id
        user_id
        type
        reason
    }
    request {
        id
        caregiver_id
        job_offer_id
    }
`;

export const CAREGIVER_LOGS = `
    id
    title
    data
    content
    created_at
    time_ago
    user {
        first_name
        last_name
        avatar {
            ${FILE_FIELDS}
        }
    }
    job_offer {
        id
        job_offer_id
        service_agency {
            name
        }
    }
    logable {
    ... on Request {
        id
        rejected_at
    }
    ... on Application {
        id
        is_counter_offer
        created_at
        rejected_at
    }
    ... on Confirmation {
        id
        rejected_at
        arrival_date 
        departure_date
    }
    ... on Interest {
        id
        rejected_at
    }
}
`;

export const RATING_FIELDS = `
    id
    job_offer {
        id
        customer {
             first_name
             last_name
             location {
                 id
                 location
             }
        }
    }
    avg
    dealing_with_patient
    nursing_skill
    household_activities
    reliability
    appearance
    empathy
    message
    return_wish
    created_at
`;

export const JOB_HISTORIES_FIELDS = `
id
salary
diff_days
arrival_date
departure_date
job_offer {
  id
  rating_caregiver {
    id
    avg
  }
  is_rating
  service_agency {
    name
  }
  customer {
    job_description
    location_id
      location {
          location
          zip_code
          id
      }
  }
}
`;
