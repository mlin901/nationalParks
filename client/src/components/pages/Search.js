import axios from "axios";
import { useState } from "react";
import API_KEY from "dotenv";

const API_KEY = process.env.REACT_APP_API_KEY;

const Search = () => {
  const [parkObj, setParkObj] = useState({});
  const [search, setSearch] = useState("");

  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    searchPark(search);
    setSearch("");
  };

  const searchPark = (fullName) => {
    const API_KEY = process.env.REACT_APP_API_KEY;
    axios
      .get(
        `https://developer.nps.gov/api/v1/parks?parkCode=&parkCode=cali&stateCode=CA&stateCode=NV&limit=10&start=0&sort=fullName&sort=description&sort=image&sort=&api_key=${API_KEY}&${fullName}`
      )
      .then((response) => {
        console.log(response.data);
        setParkObj(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <label>Search</label>
        <input
          type="text"
          name="search"
          value={search}
          onChange={handleInputChange}
        />
        <button type="submit">Submit</button>
      </form>
      <h1>
        ParkName: <span>{parkObj.fullName}</span>
      </h1>
      <h1>
        Description: <span>{parkObj.description}</span>
      </h1>
    </div>
  );
};

export default Search;
