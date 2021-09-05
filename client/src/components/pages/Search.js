import axios from "axios";
//import API_KEY from "dotenv";

const getParks = () => {
  //let apiKey = API_KEY;
  return axios
    .get(
      "https://developer.nps.gov/api/v1/parks?parkCode=&parkCode=&stateCode=CA&stateCode=NV&limit=10&start=0&sort=fullName&sort=description&sort=image&sort=&api_key=LXmmufx515cy8BhfojY0Rd8jCFBuaBWDhaHIzb9J"
    )
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

export default getParks;
