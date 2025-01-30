import { COUNTRY_FIELDS } from "@/src/features/shared/queries/Country.js";

export const CAREGIVER_AGENCY_EMPLOYEES_FIELDS = `
    id
    invite_to_company_at
    first_name
    last_name
    name
    email
    phone
    phone_country {
        ${COUNTRY_FIELDS}
    }
`;
export const CAREGIVER_AGENCY_FIELDS = `
    id
    name
    description
    percentage_fee
    street
    zip_code
    city
    phone
    is_vat
    vat
    tax_id
    commercial_register
    director_salutation
    director_first_name
    director_last_name
    is_active
    country_id
    caregivers_count
    active_jobs_count
    done_jobs_count 
    video_mamiamia_works {
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
    twilio_number
    is_twilio
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
    country {
        id
        name
    }
    documents {
        id
        file_name
        original_name
    }
    contact_caregiver_user {
        ${CAREGIVER_AGENCY_EMPLOYEES_FIELDS}
    }
    contact_customer_user {
        ${CAREGIVER_AGENCY_EMPLOYEES_FIELDS}
    }
    phone_country {
        ${COUNTRY_FIELDS}
    }
`;

export const CAREGIVER_AGENCY_PRICE_FIELDS = `
    id
    notice_period
    notice_period_value
    arrival_fee
    departure_fee
    calculation_travel_days
    surcharge_type
    price_per_day
    multiplier_rate
    my_costs
    vat
    vat_value
    caregiver_salary
    has_caregiver_access
    has_other_caregivers_choose
    caregiver_agency_price_holidays {
        id
        holiday {
            id
            holiday
            start_at
            end_at
        }
    }
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
    sample_contract {
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
`;
