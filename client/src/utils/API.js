import axios from "axios";
//import statesAbbreviations from "./statesAbbreviations.json";
//import API_KEY from "dotenv";

// route to get logged in user's info (needs the token)
export const getMe = (token) => {
  return fetch("/api/users/me", {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};

export const createUser = (userData) => {
  return fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
};

export const loginUser = (userData) => {
  return fetch("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
};

// save park data for a logged in user
export const savePark = (parkData, token) => {
  return fetch("/api/users", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(parkData),
  });
};

// Remove saved park data for a logged in user
export const deletePark = (parkId, token) => {
  return fetch(`/api/users/parks/${parkId}`, {
    method: "DELETE",

    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

// export const getParks = (query) => {
//   return fetch(`https://developer.nps.gov/api/v1/parks?parkCode=&parkCode=&stateCode=${query}&limit=10&start=0&sort=fullName&sort=description&sort=image&sort=&api_key=LXmmufx515cy8BhfojY0Rd8jCFBuaBWDhaHIzb9J`);
// };   // ******This one worked*****

//const name = data.fullName;
export const getParks = (search) => {
  console.log(`This is it: ${search}`);
  if (search === "Alabama") {
    search = "&stateCode=AL";
  } else if (search === "Alaska") {
    search = "&stateCode=AK";
  } else if (search === "Arizona") {
    search = "&stateCode=AZ";
  } else if (search === "Arkansas") {
    search = "&stateCode=AR";
  } else if (search === "California") {
    search = "&stateCode=CA";
  } else if (search === "Colorado") {
    search = "&stateCode=CO";
  } else if (search === "Conneticut") {
    search = "&stateCode=CT";
  } else if (search === "Delaware") {
    search = "&stateCode=AK";
  } else if (search === "District of Columbia") {
    search = "&stateCode=DC";
  } else if (search === "Florida") {
    search = "&stateCode=FL";
  } else if (search === "Georgia") {
    search = "&stateCode=GA";
  } else if (search === "Hawaii") {
    search = "&stateCode=HI";
  } else if (search === "Idaho") {
    search = "&stateCode=ID";
  } else if (search === "Illinois") {
    search = "&stateCode=IL";
  } else if (search === "Indiana") {
    search = "&stateCode=IN";
  } else if (search === "Iowa") {
    search = "&stateCode=IA";
  } else if (search === "Kentucky") {
    search = "&stateCode=KY";
  } else if (search === "Louisiana") {
    search = "&stateCode=LA";
  } else if (search === "Maine") {
    search = "&stateCode=ME";
  } else if (search === "Maryland") {
    search = "&stateCode=MD";
  } else if (search === "Massachusetts") {
    search = "&stateCode=MA";
  } else if (search === "Michigan") {
    search = "&stateCode=MI";
  } else if (search === "Minnesota") {
    search = "&stateCode=MO";
  } else if (search === "Mississippi") {
    search = "&stateCode=MS";
  } else if (search === "Missouri") {
    search = "&stateCode=MO";
  } else if (search === "Montana") {
    search = "&stateCode=MT";
  } else if (search === "Nebraska") {
    search = "&stateCode=NE";
  } else if (search === "Nevada") {
    search = "&stateCode=NV";
  } else if (search === "New Hampshire") {
    search = "&stateCode=NH";
  } else if (search === "New Jersey") {
    search = "&stateCode=NJ";
  } else if (search === "New Mexico") {
    search = "&stateCode=NM";
  } else if (search === "New York") {
    search = "&stateCode=NY";
  } else if (search === "North Carolina") {
    search = "&stateCode=NC";
  } else if (search === "North Dakota") {
    search = "&stateCode=ND";
  } else if (search === "New Hampshire") {
    search = "&stateCode=NH";
  } else if (search === "Ohio") {
    search = "&stateCode=OH";
  } else if (search === "Oklahoma") {
    search = "&stateCode=OK";
  } else if (search === "Oregon") {
    search = "&stateCode=OR";
  } else if (search === "Pennsylvania") {
    search = "&stateCode=PA";
  } else if (search === "New Hampshire") {
    search = "&stateCode=NH";
  } else if (search === "Rhode Island") {
    search = "&stateCode=RI";
  } else if (search === "South Carolina") {
    search = "&stateCode=NH";
  } else if (search === "South Dakota") {
    search = "&stateCode=SD";
  } else if (search === "Tenessee") {
    search = "&stateCode=TN";
  } else if (search === "Texas") {
    search = "&stateCode=TX";
  } else if (search === "Utah") {
    search = "&stateCode=UT";
  } else if (search === "Vermont") {
    search = "&stateCode=VT";
  } else if (search === "Virginia") {
    search = "&stateCode=VA";
  } else if (search === "Washington") {
    search = "&stateCode=WA";
  } else if (search === "West Virginia") {
    search = "&stateCode=WV";
  } else if (search === "Wisconsin") {
    search = "&stateCode=WI";
  } else if (search === "Wyoming") {
    search = "&stateCode=WY";
  }

  // const name = data.fullName;

  return axios.get(
    `https://developer.nps.gov/api/v1/parks?parkCode=&parkCode=${search}&start=0&limit=50&sort=fullName&sort=description&sort=image&sort=&api_key=LXmmufx515cy8BhfojY0Rd8jCFBuaBWDhaHIzb9J`
  );
  // .then((data) => {
  //   console.log(data);
  //   //const name = data.fullName;
  // })
  // .catch((error) => {
  //   console.log(error);
  // });
};
//filter for json file
// for loop
