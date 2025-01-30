import Echo from "laravel-echo";
import Pusher from "pusher-js";
import axios from "axios";

window.Pusher = Pusher;
window.Echo = new Echo({
  broadcaster: "pusher",
  key: import.meta.env.VITE_PUSHER_APP_KEY,
  cluster: "eu",
  authorizer: channel => {
    return {
      authorize: (socketId, callback) => {
        axios
          .post(`${import.meta.env.VITE_API_URL}/broadcasting/auth`, {
            socket_id: socketId,
            channel_name: channel.name,
          })
          .then(response => {
            callback(false, response.data);
          })
          .catch(error => {
            console.log("ECHO", error.response);
            callback(true, error);
          });
      },
    };
  },
});
