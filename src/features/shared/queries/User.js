import { COUNTRY_FIELDS } from "@/src/features/shared/queries/Country.js";
import {
  CAREGIVER_DETAILS_FIELDS,
  FILE_FIELDS,
} from "@/src/features/shared/queries/Caregiver.js";
import { CUSTOMER_FIELDS_DETAILS_SA } from "@/src/features/shared/queries/Customer.js";

export const USER_FIELDS = `
  id
  locale
  salutation
  name
  first_name
  last_name
  title
  position
  email
  phone
  created_at
  updated_at
  email_verified_at
  unread_twilio_whats_app_messages
  is_first_login 
  notification_types {
    id
    employee_id
    name
    email
    is_turn_on
  }
  phone_country {
    ${COUNTRY_FIELDS}
  }
  avatar { 
        ${FILE_FIELDS}
  } 
  banners {
    id
    name
  }
  roleables {
    id
    roleable_type
  }
  faq {
    answer
    question
    order
  }
  cometchat_uuid
  current_roleable {
    id
    role {
      name
    }
    roleable_id
    roleable_type
    roleable {
      ... on CaregiverAgency {
        id
        caregivers_count
        name
        twilio_number
      }
      ... on Customer {
        ${CUSTOMER_FIELDS_DETAILS_SA}
      }
      ... on Caregiver {
        ${CAREGIVER_DETAILS_FIELDS}
        mobilities {
          id
        }
        job_offer_preference {
          gender
          night_operations
          number_of_patient {
            id
          }
          other_people_in_house
        }
        education
        employee {
          first_name
          last_name
          position
          phone
          avatar {
            aws_url
          }
          phone_country {
            prefix_phone
            flag
            id
          }
        }
        caregiver_agency {
          name
          avatar {
            aws_url
          }
          cometchat_uuid
        }
        nationality_id
        first_name
        last_name
        pesel
        phone
        gender
        year_of_birth
        weight
        height
        vaccination_status
        last_vaccination_at
        hobbies {
          id
          hobby
        }
        personalities {
          id
          personality
        }
        about
        phone_country {
          id
          prefix_phone
          flag
        }
        education
        is_nurse
        germany_skill
        languagables {
          language_id
        }
        driving_license
        images {
          file_name
          aws_url
          id
          type
          original_name
        }
        smoking
        care_experience
      }
    }
  }
`;
