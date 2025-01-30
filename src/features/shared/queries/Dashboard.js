export const DASHBOARD_FIELDS = `
    id
    job_offer_id
    caregiver_id
    activitable_type
    activitable_id
    created_at
    updated_at
    is_match
    activitable {
        ... on Application {
            is_counter_offer
            rejected_at
        }
    }
    job_offer {
        id
        job_offer_id
        customer {
            last_name
        }
    }
    caregiver {
        id
        first_name
        last_name
        phone
        phone_country {
            prefix_phone
        }
        employee {
            first_name
            last_name
        }
        caregiver_agency {
            id
            name
        }
    }
`;
