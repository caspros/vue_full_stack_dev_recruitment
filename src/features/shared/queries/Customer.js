import { FILE_FIELDS } from "./Caregiver.js";

export const CUSTOMER_FIELDS = `
      id 
      locale
      arrival_at 
      departure_at 
      other_people_in_house
      tasks_taken_over
      tasks_taken_over_de
      tasks_taken_over_pl
      tasks_taken_over_en
      job_description
      job_description_de
      job_description_en
      job_description_pl
      patients { 
            id
            weight
            height
            year_of_birth
            care_level
            dementia
            incontinence
            gender 
            mobility_id
            lift_id
            mobility {
                  id
                  mobility
            }
            tools {
                  id
                  tool
            }
            dementia_description
            dementia_description_en
            dementia_description_de
            dementia_description_pl
            other_tools
            other_tools_pl
            other_tools_de
            other_tools_en
            dementia
            incontinence
            night_operations
            care_level
            smoking
            features_condition
            features_condition_en
            features_condition_de
            features_condition_pl
            night_operations_description
            night_operations_description_de
            night_operations_description_en
            night_operations_description_pl
            lift_description
            lift_description_de
            lift_description_en
            lift_description_pl
            lift_mobility_description
            lift_mobility_description_pl
            lift_mobility_description_de
            lift_mobility_description_en
            incontinence_feces
            incontinence_urine
      } 
      gender 
      location {
            id
            zip_code
            location
      }
      customer_caregiver_wish {
            id
            gender
            germany_skill
            driving_license
            smoking
            other_wishes
            other_wishes_pl
            other_wishes_de
            other_wishes_en
            night_operations
            night_operations_pl
            night_operations_en
            night_operations_de
            shopping
            shopping_be_done
            shopping_be_done_pl
            shopping_be_done_de
            shopping_be_done_en
            tasks
            tasks_pl
            tasks_de
            tasks_en
            is_open_for_all
            driving_license_gearbox
      }
`;

export const CUSTOMER_FIELDS_DETAILS = `
    description
    urbanization {
        id
        name
    }
    other_equipments
    other_equipments_pl
    other_equipments_de
    other_equipments_en
    caregiver_accommodated
    caregiver_accommodated_description
    pets_other
    is_pet_dog
    is_pet_cat
    is_pet_other
    has_family_near_by
    day_care_facility
    internet
    pets
    accommodation
    equipments {
        id
        equipment
    }
    accommodation_comment
    accommodation_comment_pl
    accommodation_comment_en
    accommodation_comment_de
    day_care_facility
    description_of_pets
    day_care_facility_description
    day_care_facility_description_de
    day_care_facility_description_en
    day_care_facility_description_pl
    caregiver_time_off
    caregiver_time_off_de
    caregiver_time_off_pl
    caregiver_time_off_en
    other_people_in_house_description
    other_people_in_house_description_pl
    other_people_in_house_description_de
    other_people_in_house_description_en
    accommodation_description
    accommodation_description_pl
    accommodation_description_de
    accommodation_description_en
`;

export const CUSTOMER_FIELDS_DETAILS_SA = `
    email
    is_user
    first_name
    last_name
    was_import_pdf
    was_translate
    customer_id
    location_id
    monthly_salary
    commission_agent_salary
    status
    invoice_party
    language_id
    can_caregiver_review
    can_request_caregiver
    job_description
    job_description_de
    job_description_en
    job_description_pl
    other_equipments
    other_equipments_pl
    other_equipments_de
    other_equipments_en
    pets
    caregiver_accommodated
    caregiver_accommodated_description
    pets_other
    is_pet_dog
    is_pet_cat 
    is_pet_other
    description_of_pets
    service_agency {
        name
        phone
        avatar {
            aws_url
        }
        owner {
            first_name
            last_name
            email
            avatar {
                aws_url
            }
        }
    }
    current_job_offer {
        id
        arrival_at
        visibility
        requests_count
        active_applications_count
        active_requests_count 
        active_interests_count 
        applications_count
        interests_count
        final_confirmation {
            caregiver {
                id
                first_name
                last_name
                caregiver_agency {
                    id
                    name
                }
            }
        }
    }
    next_job_offer {
        id
        visibility
        requests_count
        active_applications_count
        active_requests_count 
        active_interests_count 
        applications_count
        interests_count
        final_confirmation {
            caregiver {
                id
                first_name
                last_name
                caregiver_agency {
                    id
                    name
                }
            }
        }
    }
    job_offers {
        id
        arrival_at
        departure_at
        visibility
        confirmation {
            id
        }
    }
    customer_contract {
        id
        salutation
        title
        first_name
        last_name
        street_number
        phone
        email
        location_id
        location {
            id
            location
            zip_code
        }
    }
    customer_contacts {
        id
        salutation
        title
        first_name
        last_name
        phone
        email
    }
    tasks_taken_over
    tasks_taken_over_de
    tasks_taken_over_pl
    tasks_taken_over_en
    day_care_facility
    other_people_in_house
    has_family_near_by
    urbanization_id
    accommodation
    internet
    pesel
    visibility
    accommodation_comment
    accommodation_comment_pl
    accommodation_comment_en
    accommodation_comment_de
    visible_caregiver_agencies {
        id
    }
    images {
        ${FILE_FIELDS}
    }
    equipments {
        id
        equipment
    }
    ratings {
        id
        living_situation
        patients
        caregiver_tasks
        residential_area
        message
        created_at
        updated_at
    }
    rating_calculate {
        id
        customer_id
        avg
        living_situation
        patients
        caregiver_tasks
        residential_area
        created_at
        updated_at
    }
    ${CUSTOMER_FIELDS}
    ${CUSTOMER_FIELDS_DETAILS}
`;
