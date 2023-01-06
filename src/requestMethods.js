import Axios from "axios";
const BASE_URL = "https://node-js-backend-beryl.vercel.app/api";

let tokens;

if (localStorage.getItem("persist:rootReducer") !== undefined) {
  if (
    JSON.parse(localStorage?.getItem("persist:rootReducer"))?.user !== undefined
  ) {
    tokens = JSON.parse(
      JSON.parse(localStorage?.getItem("persist:rootReducer"))?.user
    )?.currentUser?.accessToken;
  }
}
// const tokens = JSON.parse(
//   JSON.parse(localStorage?.getItem("persist:rootReducer"))?.user
// )?.currentUser?.accessToken;
console.log(tokens);
export const publicRequest = Axios.create({
  baseURL: BASE_URL,
});
export const userRequest = Axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${tokens}` },
});
