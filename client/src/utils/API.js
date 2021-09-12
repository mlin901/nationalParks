import axios from "axios";
//import API_KEY from "dotenv";

// route to get logged in user's info (needs the token)
export const getMe = (token) => {
  return fetch('/api/users/me', {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
};

export const createUser = (userData) => {
  return fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};

export const loginUser = (userData) => {
  return fetch('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};

// save park data for a logged in user    
export const savePark = (parkData, token) => {
  
  return fetch('/api/users', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(parkData),
  });
};

// Remove saved park data for a logged in user
export const deletePark = (parkId, token) => {
  return fetch(`/api/users/parks/${parkId}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

// export const getParks = (query) => {
//   return fetch(`https://developer.nps.gov/api/v1/parks?parkCode=&parkCode=&stateCode=${query}&limit=10&start=0&sort=fullName&sort=description&sort=image&sort=&api_key=LXmmufx515cy8BhfojY0Rd8jCFBuaBWDhaHIzb9J`);
// };   // ******This one worked*****

export const searchNatParks = (search) => {
  console.log(`This is the search: ${search}`);
  if (search === 'all') {
    search = '';
  } else {
    search = `&stateCode=${search}`;
  }

  return axios
    .get(
      `https://developer.nps.gov/api/v1/parks?parkCode=&parkCode=${search}&start=0&sort=fullName&sort=description&sort=image&sort=&api_key=LXmmufx515cy8BhfojY0Rd8jCFBuaBWDhaHIzb9J`
    )
    // .then((response) => {
    //   console.log(response.data);
    // })
    .catch((error) => {
      console.log(error);
    });
};
