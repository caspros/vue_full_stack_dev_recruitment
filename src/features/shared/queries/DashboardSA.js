export const DASHBOARD_SA_FIELDS = `
    created_at
    id
    status
    job_offer_id
    job_offer {
        job_offer_id
        customer {
            last_name
        }
    }
    caregiver {
        first_name
        last_name
        caregiver_agency {
            name
        }
    }
`;
