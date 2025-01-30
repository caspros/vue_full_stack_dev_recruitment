export const JOB_LIST_FIELDS = `
    id
    visibility
    arrival_at
    departure_at
    user_watches_count
    location {
        id
        location
        zip_code
    }
    salary_offered
    title
    job_activities {
        id
        caregiver {
            first_name
            last_name
        }
    }
    customer {
        id
        last_name
        location {
            zip_code
            location
        }
        customer_id
    }
    service_agency {
        name
    }
    active_applications_count
    applications_count
    requests_count
    job_offer_id
    applications {
        caregiver {
            first_name
            last_name
        }
    }
    request {
        id
    }
`;

export const JOB_LIST_FIELDS_SA = `
    ${JOB_LIST_FIELDS}
    active_applications_count
    final_confirmation {
        caregiver {
            first_name
            last_name
            caregiver_agency {
                name
            }
            rating_calculate {
                avg
            }
        }
    }
`;
