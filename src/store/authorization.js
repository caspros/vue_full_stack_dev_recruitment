import { defineStore } from "pinia";
import gql from "graphql-tag";
import apolloClient from "@/src/apollo.js";
import authClient from "@/src/auth.js";
import { useCustomListStore } from "@/src/store/customList.js";
import { COUNTRY_FIELDS } from "@/src/features/shared/queries/Country.js";
import { setRecordUser } from "@/src/features/shared/utils/recorder.js";
import i18n from "@/src/assets/config.js";
import { CUSTOMER_FIELDS_DETAILS_SA } from "@/src/features/shared/queries/Customer.js";
import { USER_FIELDS } from "@/src/features/shared/queries/User.js";

const loadUIKitSettingsBuilder = () => {
  return import("@cometchat/uikit-shared").then(
    module => module.UIKitSettingsBuilder,
  );
};

const loadCometChatUIKit = () => {
  return import("@cometchat/chat-uikit-vue").then(
    module => module.CometChatUIKit,
  );
};

const loadCometChat = () => {
  return import("@cometchat/chat-sdk-javascript").then(
    module => module.CometChat,
  );
};

export const useAuthorizationStore = defineStore({
  id: "authorizationStore",
  state: () => ({
    userData: null,
    userType: null,
    userRole: null,
    caregiverLandingPage: null,
    cometChatUser: null,
    cometChatCurrentConversationsUsers: [],
    customerLandingPage: null,
    caregiverLead: null,
  }),
  getters: {
    getDataByKey: function () {
      return function (key) {
        return this[key.field];
      };
    },
  },
  actions: {
    async logout() {
      const LOGOUT = gql`
        mutation Logout {
          Logout
        }
      `;

      await apolloClient.mutate({
        mutation: LOGOUT,
      });

      window.location.href = "/login";
    },
    async fetchUserData() {
      const QUERY_GQL = gql`
        query User {
          User {
            ${USER_FIELDS}
          }
        }
      `;

      try {
        const result = await apolloClient.query({
          query: QUERY_GQL,
        });

        if (result.errors) {
          console.error("Błędy GraphQL:", result.errors);
          return;
        }
        const userData = result.data.User;
        if (userData.notification_types) {
          for (let i = 0; i < userData.notification_types.length; i++) {
            delete userData.notification_types[i].__typename;
          }
        }
        this.setUserData(userData);
      } catch (error) {}
    },
    async updateUserData({ data }) {
      const UPDATE_LOGGED_USER = gql`
        mutation UpdateLoggedUser (
          $salutation: String
          $first_name: String
          $last_name: String
          $title: String
          $locale: String
          $position: String
          $phone: String
          $file_tokens: [String]
          $phone_country: CountryInputType
          $notification_types: [UserNotificationTypeInputType]
        ) {
          UpdateLoggedUser(
            salutation: $salutation
            first_name: $first_name
            last_name: $last_name
            title: $title
            locale: $locale
            position: $position
            phone: $phone
            file_tokens: $file_tokens
            phone_country: $phone_country
            notification_types: $notification_types
          ) {
            ${USER_FIELDS}
          }
        }
      `;

      try {
        const result = await apolloClient.mutate({
          mutation: UPDATE_LOGGED_USER,
          variables: data,
        });
        const userData = result.data.UpdateLoggedUser;
        this.setUserData(userData);
        return { result: userData };
      } catch (error) {
        let { graphQLErrors } = error;
        return { error: graphQLErrors };
      }
    },
    async getUnreadMessagesCount({ UID }) {
      const CometChat = await loadCometChat();
      CometChat.getUnreadMessageCount().then(
        unreadMessageCount => {
          this.cometChatUser.unreadMessageCount = Object.entries(
            unreadMessageCount.users,
          ).length;
        },
        error => {
          console.log("Error fetching unread message count:", error);
        },
      );

      CometChat.addMessageListener(
        `listener-${UID}`,
        new CometChat.MessageListener({
          onTextMessageReceived: message => {
            this.cometChatUser.unreadMessageCount++;
          },
        }),
      );
    },
    async setUserData(data) {
      delete data.__typename;
      data.file_tokens = [];
      if (data.phone_country) {
        delete data.phone_country.__typename;
      }
      this.userType = data.current_roleable.roleable_type;
      this.userData = data;
      this.userRole = data.current_roleable.role.name;

      if (this.userType === "serviceAgency") {
      }
      setRecordUser(data);
      i18n.global.locale.value = data.locale ? data.locale : "en";

      const UID = data.cometchat_uuid;
      if (UID) {
        try {
          const UIKitSettingsBuilder = await loadUIKitSettingsBuilder();
          const UIKitSettings = new UIKitSettingsBuilder()
            .setAppId(import.meta.env.VITE_COMET_CHAT_APP_ID)
            .setRegion("eu")
            .setAuthKey(import.meta.env.VITE_COMET_CHAT_AUTH_KEY)
            .subscribePresenceForFriends()
            .build();

          const CometChatUIKit = await loadCometChatUIKit();
          await CometChatUIKit.init(UIKitSettings);
          let user = await CometChatUIKit.getLoggedinUser();

          if (!user) {
            user = await CometChatUIKit.login(UID);
          }

          this.cometChatUser = Object.assign({ unreadMessageCount: 0 }, user);

          await this.getUnreadMessagesCount({ UID });
        } catch (error) {
          console.log(error);
        }
      }
    },
    async storeUserBanner(name) {
      const QUERY = gql`
        mutation StoreUserBanner($name: String) {
          StoreUserBanner(name: $name) {
            id
            name
          }
        }
      `;

      try {
        const result = await apolloClient.mutate({
          mutation: QUERY,
          variables: {
            name,
          },
        });
        const banner = result.data.StoreUserBanner;
        this.userData.banners.push(banner);
      } catch (error) {
        let { graphQLErrors } = error;
        return { error: graphQLErrors };
      }
    },
    async storeUserAvatar(token) {
      const QUERY = gql`
        mutation UpdateLoggedUser(
          $file_tokens: [String]
          $first_name: String
          $last_name: String
          $salutation: String
        ) {
          UpdateLoggedUser(
            file_tokens: $file_tokens
            first_name: $first_name
            last_name: $last_name
            salutation: $salutation
          ) {
            id
          }
        }
      `;

      try {
        await apolloClient.mutate({
          mutation: QUERY,
          variables: {
            file_tokens: [token],
            first_name: this.userData.first_name || "Anonymous",
            last_name: this.userData.last_name,
            salutation: this.userData.salutation || "Mrs.",
          },
        });
      } catch (error) {
        let { graphQLErrors } = error;
        return { error: graphQLErrors };
      }
    },
    async verifyCaregiver({ code, uuid }) {
      const QUERY = gql`
        mutation CaregiverVerifyPasswordCode($code: Int!, $uuid: String!) {
          CaregiverVerifyPasswordCode(code: $code, uuid: $uuid) {
            token
            id
          }
        }
      `;

      try {
        const result = await authClient.mutate({
          mutation: QUERY,
          variables: {
            code,
            uuid,
          },
        });
        localStorage.setItem(
          "token",
          result.data.CaregiverVerifyPasswordCode.token,
        );
        return {
          result: result.data.CaregiverVerifyPasswordCode,
        };
      } catch (error) {
        let { graphQLErrors } = error;
        return { error: graphQLErrors };
      }
    },
    async caregiverPasswordSendCodeAgain(uuid) {
      const QUERY = gql`
        mutation CaregiverPasswordSendCodeAgain($uuid: String!) {
          CaregiverPasswordSendCodeAgain(uuid: $uuid)
        }
      `;

      try {
        const result = await authClient.mutate({
          mutation: QUERY,
          variables: {
            uuid,
          },
        });
        return {
          result: result.data.CaregiverPasswordSendCodeAgain,
        };
      } catch (error) {
        let { graphQLErrors } = error;
        return { error: graphQLErrors };
      }
    },
    async fetchCaregiverLead(uuid) {
      const QUERY_GQL = gql`
        query CaregiverLead($uuid: String!) {
          CaregiverLead(uuid: $uuid) {
            id
            content
          }
        }
      `;

      try {
        const result = await authClient.query({
          query: QUERY_GQL,
          variables: {
            uuid,
          },
        });

        result.data.CaregiverLead.content = JSON.parse(
          result.data.CaregiverLead.content,
        );

        this.caregiverLead = result.data.CaregiverLead;

        return { result: result.data.CaregiverLandingpage };
      } catch (error) {
        return { error };
      }
    },
    async fetchCaregiverLandingpage(uuid) {
      const QUERY_GQL = gql`
        query CaregiverLandingpage($uuid: String!) {
          CaregiverLandingpage(uuid: $uuid) {
            phone
            first_name
            available_from
            already_registered
            phone_country {
              ${COUNTRY_FIELDS}
            }
            caregiver_agency {
              id
              name
              phone
              avatar {
                aws_url
              }
              video_mamiamia_works {
                aws_url
              }
            }
            faq {
              answer
              question
              order
            }
            employee {
              id
              phone_country_id
              salutation
              name
              first_name
              last_name
              title
              position
              phone
            }
          }
        }
      `;

      try {
        const result = await authClient.query({
          query: QUERY_GQL,
          variables: {
            uuid,
          },
        });

        this.caregiverLandingPage = result.data.CaregiverLandingpage;

        return { result: result.data.CaregiverLandingpage };
      } catch (error) {
        return { error };
      }
    },

    async fetchCustomerLandingpage(uuid) {
      const QUERY_GQL = gql`
        query CustomerLandingpage($uuid: String!) {
          CustomerLandingpage(uuid: $uuid) {
            id
            last_name
            service_agency_id
            email
            service_agency {
              name
              avatar {
                aws_url
              }
            }
            employee {
              id
              first_name
              last_name
              email
              phone
            }
            customer_contract {
              last_name
            }
            customer_contacts {
              last_name
            }
          }
        }
      `;

      try {
        const result = await authClient.query({
          query: QUERY_GQL,
          variables: {
            uuid,
          },
        });

        this.customerLandingPage = result.data.CustomerLandingpage;

        return { result: result.data.CustomerLandingpage };
      } catch (error) {
        return { error };
      }
    },
    async storeCaregiverAndUser({ password, uuid }) {
      const QUERY = gql`
        mutation StoreCaregiverAndUser($uuid: String!, $password: String!) {
          StoreCaregiverAndUser(uuid: $uuid, password: $password) {
            token
          }
        }
      `;

      try {
        const result = await authClient.mutate({
          mutation: QUERY,
          variables: arguments[0],
        });
        return {
          result: result.data.StoreCaregiverAndUser,
        };
      } catch (error) {
        let { graphQLErrors } = error;
        return { error: graphQLErrors };
      }
    },
    async caregiverSetTempPassword({
      password,
      uuid,
      phone_country_id,
      phone,
      available_from,
    }) {
      const QUERY = gql`
        mutation CaregiverSetTempPassword(
          $uuid: String!
          $phone_country_id: Int!
          $phone: String!
          $available_from: String!
          $password: String!
        ) {
          CaregiverSetTempPassword(
            uuid: $uuid
            phone_country_id: $phone_country_id
            phone: $phone
            available_from: $available_from
            password: $password
          ) {
            token
          }
        }
      `;

      try {
        const result = await authClient.mutate({
          mutation: QUERY,
          variables: arguments[0],
        });
        return {
          result: result.data.CaregiverSetTempPassword,
        };
      } catch (error) {
        let { graphQLErrors } = error;
        return { error: graphQLErrors };
      }
    },
    async CustomerSetPassword({ password, uuid }) {
      const QUERY = gql`
        mutation CustomerSetPassword($uuid: String!, $password: String!) {
          CustomerSetPassword(uuid: $uuid, password: $password) {
            id
            token
          }
        }
      `;

      try {
        const result = await authClient.mutate({
          mutation: QUERY,
          variables: arguments[0],
        });
        return {
          result: result.data.CustomerSetPassword,
        };
      } catch (error) {
        let { graphQLErrors } = error;
        return { error: graphQLErrors };
      }
    },
  },
});
