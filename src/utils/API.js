import axios from "axios";
const BASEURL = "https://randomuser.me/api/";
const APIRESULTS = "?results=20";


export default {
  search: function(query) {
    // https://randomuser.me/api/?results=20
    return axios.get(BASEURL + APIRESULTS);
  }
};
