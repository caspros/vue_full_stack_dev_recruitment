/* eslint-disable */
import { defineStore } from "pinia";
import gql from "graphql-tag";
import apolloClient from "@/src/apollo.js";
import { CAREGIVER_AGENCY_EMPLOYEES_FIELDS } from "@/src/features/shared/queries/CaregiverAgency.js";
import { COUNTRY_FIELDS } from "@/src/features/shared/queries/Country.js";
import {
  JOB_DETAILS_FIELDS,
  JOB_DETAILS_SA_FIELDS,
} from "@/src/features/shared/queries/JobOffer.js";
import { useCustomListStore } from "@/src/store/customList.js";
import { useAuthorizationStore } from "@/src/store/authorization.js";
import {
  CAREGIVER_DETAILS_FIELDS,
  CAREGIVER_DETAILS_JOB_OFFER_CONTEXT_FIELDS,
  FILE_FIELDS,
} from "@/src/features/shared/queries/Caregiver.js";
import { formatDateToDayMonthYear } from "@/src/features/shared/utils/formatDateToDayMonthYear.js";
import authClient from "@/src/auth.js";
import { APPLICATION_FIELDS } from "@/src/features/shared/queries/Application.js";

const CHAT_ROOMS_FIELD = `
  id
  caregiver_agency_id
  caregiver_id
  name
  first_phone
  second_phone
  last_message_at
  twilio_whats_app_unread_messages_count
  caregiver {
    id
    first_name
    last_name
  }
  twilio_whats_app_last_message {
    id
    twilio_whats_app_room_id
    message_type
    body
    to
    from
    media_content_type
    media_url
    created_at
    updated_at
  }
`;

export const useSharedStore = defineStore({
  id: "sharedStore",
  state: () => ({
    chat: {
      rooms: null,
      messages: null,
    },
    jobOffer: null,
    customers: null,
    caregiverAgencies: null,
    languages: null,
    nationalities: null,
    locations: null,
    mobilities: null,
    summerWorkMonths: null,
    livingConditions: null,
    numberOfPatients: null,
    urbanizations: null,
    lifts: null,
    countries: null,
    holidays: null,
    arrivalTypes: null,
    employees: null,
    tools: null,
    equipments: null,
    pets: null,
    caregiverDetailsData: null,
    caregiverDetailsOffers: null,
  }),
  getters: {
    getDataByKey: function () {
      return function (key) {
        return this[key.field];
      };
    },
  },
  actions: {
    async fetchCaregiverAgencies({ search = "" }) {
      const QUERY_GQL = gql`
        query CaregiverAgencies($search: String) {
          CaregiverAgencies(search: $search) {
            name
            id
          }
        }
      `;

      let variables = {
        // page: 1,
        // limit: 99999999,
      };

      if (search && search.length > 0) {
        variables.search = search;
      }

      apolloClient
        .query({
          query: QUERY_GQL,
          variables,
        })
        .then(result => {
          this.caregiverAgencies = result.data.CaregiverAgencies;
        });
    },
    async fetchCustomers({ search = "" }) {
      const QUERY_GQL = gql`
        query CustomersWithPagination(
          $search: String
          $page: Int!
          $limit: Int!
          $type: String
        ) {
          CustomersWithPagination(
            search: $search
            page: $page
            limit: $limit
            type: $type
          ) {
            total
            per_page
            current_page
            from
            to
            last_page
            has_more_pages
            data {
              id
              monthly_salary
              commission_agent_salary
              last_name
              customer_id
              location {
                location
                zip_code
              }
              job_offers {
                id
                arrival_at
                departure_at
                visibility
                title
              }
            }
          }
        }
      `;

      let variables = {
        page: 1,
        limit: 10,
        type: "active",
      };

      if (search && search.length > 0) {
        variables.search = search;
      }

      apolloClient
        .query({
          query: QUERY_GQL,
          variables,
        })
        .then(result => {
          this.customers = result.data.CustomersWithPagination.data;
        });
    },
    updateJobOfferData: function (data) {
      if (data.arrival_at) {
        data.arrival_at = new Date(data.arrival_at);
      }
      if (data.departure_at) {
        data.departure_at = new Date(data.departure_at);
      }
      data.visible_caregiver_agency_ids = [];
      if (data.visible_caregiver_agencies) {
        for (let i in data.visible_caregiver_agencies) {
          data.visible_caregiver_agency_ids.push(
            data.visible_caregiver_agencies[i].id,
          );
        }
      }
      if (!this.jobOffer || (this.jobOffer && this.jobOffer.id !== data.id)) {
        this.jobOffer = data;
      } else {
        this.jobOffer = { ...this.jobOffer, ...data };
      }
    },
    setJobOffersConfirmationField({ key, value }) {
      if (this.jobOffer?.confirmation) {
        this.jobOffer.confirmation[key] = value;
      }
    },
    async fetchJobOfferData({ id }) {
      const storeAuthorization = useAuthorizationStore();
      const QUERY_GQL = gql`
        query JobOffer($id: Int!, $with_counts: Boolean!, $counts: [String!]!) {
          JobOffer(id: $id, with_counts: $with_counts, counts: $counts) {
            ${
              storeAuthorization.userType === "serviceAgency"
                ? JOB_DETAILS_SA_FIELDS
                : JOB_DETAILS_FIELDS
            }
          }
        }
      `;

      await apolloClient
        .query({
          query: QUERY_GQL,
          variables: {
            id: id,
            with_counts: true,
            counts: [
              "myRequests",
              "myApplications",
              "applications",
              "activeApplications",
              "reservedApplications",
              "activeInterests",
              "activeRequests",
              "wellMatchingApplications",
            ],
          },
        })
        .then(result => {
          this.updateJobOfferData(result.data.JobOffer);
        });
    },
    setApplicationUserWatch: function (ids) {
      const MUTATION_GQL = gql`
        mutation StoreUserWatch($ids: [Int!]!) {
          StoreUserWatch(ids: $ids, type: "application")
        }
      `;
      apolloClient
        .mutate({
          mutation: MUTATION_GQL,
          variables: {
            ids: ids,
          },
        })
        .then(result => {
          // ds
        })
        .catch(error => {
          console.error("Wystąpił błąd podczas mutacji:", error);
        });
    },
    setJobDetailsUserWatch: function (id) {
      const MUTATION_GQL = gql`
        mutation StoreUserWatch($ids: [Int!]!) {
          StoreUserWatch(ids: $ids, type: "jobOffer")
        }
      `;
      apolloClient
        .mutate({
          mutation: MUTATION_GQL,
          variables: {
            ids: [id],
          },
        })
        .catch(error => {
          // Obsługa błędów
          console.error("Wystąpił błąd podczas mutacji:", error);
        });
    },
    async fetchEmployeesQuery({ force = false }) {
      if (this.employees && !force) {
        return;
      }
      const QUERY_GQL = gql`
        query CaregiverAgencyEmployees {
          CaregiverAgencyEmployees(page: 1, limit: 9999) {
            data { ${CAREGIVER_AGENCY_EMPLOYEES_FIELDS} }
          }
        }
      `;
      apolloClient
        .query({
          query: QUERY_GQL,
        })
        .then(result => {
          const employees = result.data.CaregiverAgencyEmployees.data;
          for (let i in employees) {
            delete employees[i].__typename;
          }
          this.employees = employees;
        });
    },
    async fetchPetsQuery() {
      if (this.pets) {
        return;
      }
      const QUERY_GQL = gql`
        query Pets {
          Pets {
            pet
            id
          }
        }
      `;
      apolloClient
        .query({
          query: QUERY_GQL,
        })
        .then(result => {
          this.pets = result.data.Pets;
        });
    },
    async fetchEquipmentsQuery() {
      if (this.equipments) {
        return;
      }
      const QUERY_GQL = gql`
        query Equipments {
          Equipments {
            equipment
            id
          }
        }
      `;
      apolloClient
        .query({
          query: QUERY_GQL,
        })
        .then(result => {
          this.equipments = result.data.Equipments;
        });
    },
    async fetchToolsQuery() {
      if (this.tools) {
        return;
      }
      const QUERY_GQL = gql`
        query Tools {
          Tools {
            tool
            id
          }
        }
      `;
      apolloClient
        .query({
          query: QUERY_GQL,
        })
        .then(result => {
          this.tools = result.data.Tools;
        });
    },
    async fetchLiftsQuery() {
      if (this.lifts) {
        return;
      }
      const QUERY_GQL = gql`
        query Lifts {
          Lifts {
            name
            id
          }
        }
      `;
      await apolloClient
        .query({
          query: QUERY_GQL,
        })
        .then(result => {
          this.lifts = result.data.Lifts;
        });
    },
    async fetchUrbanizationsQuery() {
      if (this.urbanizations) {
        return;
      }
      const QUERY_GQL = gql`
        query Urbanizations {
          Urbanizations {
            name
            id
          }
        }
      `;
      apolloClient
        .query({
          query: QUERY_GQL,
        })
        .then(result => {
          this.urbanizations = result.data.Urbanizations;
        });
    },
    async fetchNumberOfPatientsQuery() {
      if (this.numberOfPatients) {
        return;
      }
      const QUERY_GQL = gql`
        query NumberOfPatients {
          NumberOfPatients {
            name
            id
          }
        }
      `;
      await apolloClient
        .query({
          query: QUERY_GQL,
        })
        .then(result => {
          this.numberOfPatients = result.data.NumberOfPatients;
        });
    },
    async fetchLivingConditionsQuery() {
      if (this.livingConditions) {
        return;
      }
      const QUERY_GQL = gql`
        query LivingConditions {
          LivingConditions {
            name
            id
          }
        }
      `;
      apolloClient
        .query({
          query: QUERY_GQL,
        })
        .then(result => {
          this.livingConditions = result.data.LivingConditions;
        });
    },
    async fetchMobilitiesQuery() {
      if (this.mobilities) {
        return;
      }
      const QUERY_GQL = gql`
        query Mobilities {
          Mobilities {
            mobility
            id
          }
        }
      `;
      await apolloClient
        .query({
          query: QUERY_GQL,
        })
        .then(result => {
          this.mobilities = result.data.Mobilities;
        });
    },
    async fetchLocationsQuery({ search = "" }) {
      const QUERY_GQL = gql`
        query LocationsWithPagination(
          $search: String
          $page: Int!
          $limit: Int!
        ) {
          LocationsWithPagination(search: $search, page: $page, limit: $limit) {
            total
            per_page
            current_page
            from
            to
            last_page
            has_more_pages
            data {
              id
              location
              zip_code
            }
          }
        }
      `;

      let variables = {
        page: 1,
        limit: 10,
      };

      if (search && search.length > 0) {
        variables.search = search;
      }

      apolloClient
        .query({
          query: QUERY_GQL,
          variables,
        })
        .then(result => {
          let locations = result.data.LocationsWithPagination.data;

          locations = locations.sort((a, b) => {
            const zipA = a.zip_code;
            const zipB = b.zip_code;
            if (zipA < zipB) {
              return -1;
            }
            if (zipA > zipB) {
              return 1;
            }
            return 0;
          });
          this.locations = locations;
        });
    },
    async fetchLanguagesQuery() {
      if (this.languages) {
        return;
      }
      const QUERY_GQL = gql`
        query Languages {
          Languages {
            id
            code
            name
          }
        }
      `;
      apolloClient
        .query({
          query: QUERY_GQL,
        })
        .then(result => {
          this.languages = result.data.Languages;
        });
    },
    async fetchNationalitiesQuery() {
      if (this.nationalities) {
        return;
      }
      const QUERY_GQL = gql`
        query Nationalities {
          Nationalities {
            id
            nationality
            prefix_number
            code
          }
        }
      `;
      apolloClient
        .query({
          query: QUERY_GQL,
        })
        .then(result => {
          this.nationalities = result.data.Nationalities;
        });
    },
    async fetchSummerWorkMonthsQuery() {
      if (this.summerWorkMonths) {
        return;
      }
      const QUERY_GQL = gql`
        query SummerWorkMonths {
          SummerWorkMonths {
            id
            month
          }
        }
      `;
      apolloClient
        .query({
          query: QUERY_GQL,
        })
        .then(result => {
          const months = result.data.SummerWorkMonths;
          for (let i in months) {
            delete months[i].__typename;
          }
          this.summerWorkMonths = months;
        });
    },
    async fetchArrivalTypesQuery() {
      if (this.arrivalTypes) {
        return;
      }
      const QUERY_GQL = gql`
        query ArrivalTypes {
          ArrivalTypes {
            id
            type
          }
        }
      `;
      apolloClient
        .query({
          query: QUERY_GQL,
        })
        .then(result => {
          const arrivalTypes = result.data.ArrivalTypes;
          for (let i in arrivalTypes) {
            delete arrivalTypes[i].__typename;
          }
          this.arrivalTypes = arrivalTypes;
        });
    },
    async fetchCountriesQuery() {
      if (this.countries) {
        return;
      }
      const QUERY_GQL = gql`
        query Countries {
          Countries {
            ${COUNTRY_FIELDS}
          }
        }
      `;
      await authClient
        .query({
          query: QUERY_GQL,
        })
        .then(result => {
          const countries = result.data.Countries;
          for (let i in countries) {
            delete countries[i].__typename;
          }
          this.countries = countries;
        });
    },
    async fetchHolidaysQuery() {
      if (this.holidays) {
        return;
      }
      const QUERY_GQL = gql`
        query Holidays {
          Holidays {
            id
            holiday
            start_at
            end_at
          }
        }
      `;
      apolloClient
        .query({
          query: QUERY_GQL,
        })
        .then(result => {
          const holidays = result.data.Holidays;
          for (let i in holidays) {
            delete holidays[i].__typename;
          }
          this.holidays = holidays;
        });
    },
    updateCaregiverDetailsData: function (data) {
      if (
        this.caregiverDetailsData &&
        this.caregiverDetailsData.id === data.id
      ) {
        this.caregiverDetailsData = { ...this.caregiverDetailsData, ...data };
      } else {
        this.caregiverDetailsData = data;
      }
      // if (
      //   !this.caregiverDetailsData ||
      //   (this.caregiverDetailsData && this.caregiverDetailsData.id !== data.id)
      // ) {
      //   this.caregiverDetailsData = data;
      // } else {
      //   this.caregiverDetailsData = { ...this.caregiverDetailsData, ...data };
      // }
    },
    clearCaregiverDetailsData: function () {
      this.caregiverDetailsData = null;
    },
    async fetchCaregiverDetailsData({ id, job_offer_id = null }) {
      const QUERY_GQL = gql`
        query Caregiver($id: Int! $job_offer_id: Int $with_counts: Boolean!, $counts: [String!]!) {
          Caregiver(id: $id, job_offer_id: $job_offer_id with_counts: $with_counts, counts: $counts) {
            ${CAREGIVER_DETAILS_FIELDS}
            ${job_offer_id ? CAREGIVER_DETAILS_JOB_OFFER_CONTEXT_FIELDS : ""}
              status {
                  name
                  date
              }
          }
        }
      `;

      await apolloClient
        .query({
          query: QUERY_GQL,
          variables: {
            id: id,
            job_offer_id: job_offer_id,
            with_counts: true,
            counts: [
              "finallyConfirmations",
              "requests",
              "activeApplications",
              "allActiveApplications",
              "reservedApplications",
              "activeRequests",
              "activeMatches",
              "activeInterests",
              "activeNotReservedApplications",
              "activeRequestsWithoutMatches",
              "activeInterestsWithoutMatches",
            ],
          },
        })
        .then(result => {
          this.updateCaregiverDetailsData(result.data.Caregiver);
        });
    },
    async fetchRoomsWithPagination({ search = null, page = 1 }) {
      const QUERY_GQL = gql`
        query TwilioWhatsAppRoomsWithPagination(
          $page: Int!
          $limit: Int!
          $search: String
        ) {
          TwilioWhatsAppRoomsWithPagination(
            page: $page
            limit: $limit
            search: $search
          ) {
            total
            per_page
            current_page
            from
            to
            last_page
            has_more_pages
            data {
              ${CHAT_ROOMS_FIELD}
            }
          }
        }
      `;

      await apolloClient
        .query({
          query: QUERY_GQL,
          variables: {
            page,
            limit: 30,
            search,
          },
        })
        .then(result => {
          this.chat.rooms = {
            ...result.data.TwilioWhatsAppRoomsWithPagination,
            search,
            data:
              this.chat.rooms?.data && this.chat.rooms?.search === search
                ? [
                    ...this.chat.rooms.data,
                    ...result.data.TwilioWhatsAppRoomsWithPagination.data,
                  ]
                : result.data.TwilioWhatsAppRoomsWithPagination.data,
          };
        });
    },
    storeTwilioWhatsAppRoom: async function ({ caregiver_id }) {
      const MUTATION_GQL = gql`
        mutation StoreTwilioWhatsAppRoom(
          $caregiver_id: Int
        ) {
          StoreTwilioWhatsAppRoom(
            caregiver_id: $caregiver_id
          ) {
            ${CHAT_ROOMS_FIELD}
          }
        }
      `;
      try {
        const result = await apolloClient.mutate({
          mutation: MUTATION_GQL,
          variables: {
            caregiver_id,
          },
        });
        return { result };
      } catch (error) {
        console.log(error);
        let { graphQLErrors } = error;
        return { error: graphQLErrors };
      }
    },
    sendMessage: function ({ body, room_id }) {
      const MUTATION_GQL = gql`
        mutation SendMessageWhatsApp(
          $body: String
          $twilio_whats_app_room_id: Int
        ) {
          SendMessageWhatsApp(
            body: $body
            twilio_whats_app_room_id: $twilio_whats_app_room_id
          )
        }
      `;

      if (this.chat.rooms?.data?.length > 0) {
        const index = this.chat.rooms.data.findIndex(
          item => item.id === room_id,
        );
        if (index >= 0) {
          this.chat.rooms.data[index].twilio_whats_app_last_message = {
            body,
            created_at: formatDateToDayMonthYear(new Date(), { hour: true }),
            id: 737,
            media_content_type: null,
            media_url: null,
            message_type: null,
            twilio_whats_app_room_id: 3,
            updated_at: formatDateToDayMonthYear(new Date(), { hour: true }),
          };
        }
      }

      apolloClient
        .mutate({
          mutation: MUTATION_GQL,
          variables: {
            body,
            twilio_whats_app_room_id: room_id,
          },
        })
        .then(result => {
          // ds
        })
        .catch(error => {
          console.error("Wystąpił błąd podczas mutacji:", error);
        });
    },
    setReadMessageWhatsApp: function ({ room_id }) {
      const MUTATION_GQL = gql`
        mutation SetReadMessageWhatsApp($twilio_whats_app_room_id: Int) {
          SetReadMessageWhatsApp(
            twilio_whats_app_room_id: $twilio_whats_app_room_id
          )
        }
      `;
      apolloClient
        .mutate({
          mutation: MUTATION_GQL,
          variables: {
            twilio_whats_app_room_id: room_id,
          },
        })
        .then(result => {
          // ds
        })
        .catch(error => {
          console.error("Wystąpił błąd podczas mutacji:", error);
        });
    },
    addMessage(message) {
      if (this.chat.messages) {
        const index = this.chat.messages.data.findIndex(
          item => item.id === message.id,
        );
        if (index === -1) {
          this.chat.messages.data.unshift(message);
        }
      }
    },
    setRoomVisited({ room_id }) {
      if (this.chat?.rooms?.data) {
        let room = this.chat.rooms.data.find(item => item.id === room_id);
        room.twilio_whats_app_unread_messages_count = 0;
      }
    },
    async fetchMessagesWithPagination({ room_id = null }) {
      this.chat.messages = null;
      const QUERY_GQL = gql`
        query TwilioWhatsAppMessagesWithPagination(
          $twilio_whats_app_room_id: Int!
          $page: Int!
          $limit: Int!
        ) {
          TwilioWhatsAppMessagesWithPagination(
            twilio_whats_app_room_id: $twilio_whats_app_room_id
            page: $page
            limit: $limit
          ) {
            total
            per_page
            current_page
            from
            to
            last_page
            has_more_pages
            data {
              id
              twilio_whats_app_room_id
              message_type
              body
              to
              from
              media_content_type
              media_url
              created_at
              updated_at
              is_read
            }
          }
        }
      `;

      apolloClient
        .query({
          query: QUERY_GQL,
          variables: {
            page: 1,
            limit: 30,
            twilio_whats_app_room_id: room_id,
          },
        })
        .then(result => {
          this.chat.messages = result.data.TwilioWhatsAppMessagesWithPagination;
        });
    },
    rejectConfirmation: async function ({
      id,
      reject_departure_at,
      reject_message,
      is_reject_confirmed_terms,
    }) {
      const MUTATION_GQL = gql`
        mutation RejectConfirmation(
          $id: Int!
          $reject_departure_at: String
          $reject_message: String
          $is_reject_confirmed_terms: Boolean
        ) {
          RejectConfirmation(
            id: $id
            reject_departure_at: $reject_departure_at
            reject_message: $reject_message
            is_reject_confirmed_terms: $is_reject_confirmed_terms
          ) {
            id
          }
        }
      `;

      try {
        const result = await apolloClient.mutate({
          mutation: MUTATION_GQL,
          variables: {
            id,
            reject_departure_at,
            reject_message,
            is_reject_confirmed_terms,
          },
        });
        return { result: result.data.RejectConfirmation };
      } catch (error) {
        let { graphQLErrors } = error;
        return { error: graphQLErrors };
      }
    },
    async sendJobsToCaregivers({}) {
      const QUERY = gql`
        mutation SendJobsToCaregivers {
          SendJobsToCaregivers
        }
      `;

      try {
        const result = await apolloClient.mutate({
          mutation: QUERY,
        });
        return {
          result: result.data.SendJobsToCaregivers,
        };
      } catch (error) {
        console.log(error);
        let { graphQLErrors } = error;
        return { error: graphQLErrors };
      }
    },
    async setConfirmedUserWatch(ids, type) {
      const MUTATION_GQL = gql`
        mutation StoreUserWatch($ids: [Int!]!, $type: String) {
          StoreUserWatch(ids: $ids, type: $type)
        }
      `;
      apolloClient
        .mutate({
          mutation: MUTATION_GQL,
          variables: {
            ids: ids,
            type: type,
          },
        })
        .then(result => {
          // ds
        })
        .catch(error => {
          console.error("Wystąpił błąd podczas mutacji:", error);
        });
    },
    async storeFile({
      file = null,
      title = "",
      description = "",
      type,
      forType,
    }) {
      const STORE_FILE_MUTATION = gql`
        mutation StoreFile(
          $for: String!
          $type: String
          $title: String
          $description: String
          $file: Upload
        ) {
          StoreFile(
            for: $for
            type: $type
            title: $title
            description: $description
            file: $file
          ) {
            id
            token
            for
            type
            file_name
            title
            description
            aws_url
            original_name
          }
        }
      `;

      try {
        const result = await apolloClient.mutate({
          mutation: STORE_FILE_MUTATION,
          variables: {
            file,
            title,
            description,
            type,
            for: forType,
          },
        });
        return {
          result: result.data.StoreFile,
        };
      } catch (error) {
        console.log(error);
        let { graphQLErrors } = error;
        return { error: graphQLErrors };
      }
    },
    async destroyFile({ id }) {
      const DESTROY_FILE_MUTATION = gql`
        mutation DestroyFile($id: Int) {
          DestroyFile(id: $id)
        }
      `;

      try {
        const result = await apolloClient.mutate({
          mutation: DESTROY_FILE_MUTATION,
          variables: {
            id,
          },
        });
        return {
          result: result.data.DestroyFile,
        };
      } catch (error) {
        console.log(error);
        let { graphQLErrors } = error;
        return { error: graphQLErrors };
      }
    },
    async fetchCaregiverPdfOffers({ caregiver_id, job_offer_id }) {
      const QUERY_GQL = gql`
        query CaregiverPdfOffers($caregiver_id: Int!, $job_offer_id: Int!) {
          CaregiverPdfOffers(caregiver_id: $caregiver_id, job_offer_id: $job_offer_id) {
            id
            file {
              ${FILE_FIELDS}
            }
          }
        }
      `;

      await apolloClient
        .query({
          query: QUERY_GQL,
          variables: {
            caregiver_id,
            job_offer_id,
          },
        })
        .then(result => {
          this.caregiverDetailsOffers = result.data.CaregiverPdfOffers;
          return {
            result: result.data.CaregiverPdfOffers,
          };
        });
    },
  },
});
