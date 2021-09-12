import React, { useState, useEffect } from "react";
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from "react-bootstrap";

import Auth from "../utils/auth";

import { savePark, getParks } from "../utils/API"; //re-add this file

// import { savePark, searchNatParks } from "../utils/API";
import { searchNatParks } from "../utils/API";

import { saveParkIds, getSavedParkIds } from "../utils/localStorage";
import { useMutation } from '@apollo/react-hooks';  // *******
import { SAVE_PARK } from '../utils/mutations';  // **********
import { QUERY_ME } from '../utils/queries';  // **********

const SearchParks = () => {
  // State for holding returned api data
  const [searchedParks, setSearchedParks] = useState([]);
  // State for holding search field data
  const [searchInput, setSearchInput] = useState('');
  // State to hold saved parkId values
  const [savedParkIds, setSavedParkIds] = useState(getSavedParkIds());

  const [savePark, {error}] = useMutation(SAVE_PARK); // ***************

  // set up useEffect hook to save `savedParkIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    return () => saveParkIds(savedParkIds);
  });

  // Method to search for parks and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {

      const response = await getParks(searchInput);
      console.log(response.data.data);
      // console.log(' ====1 ====== ===== ===== ==== ====');   // **********
      // console.log(searchInput);
      // console.log(' ====2 ====== ===== ===== ==== ====');   // **********
      // console.log(response.data.data);


      // if (!response.ok) {   // *******This IF doesn't work with axios method
      //   throw new Error('something went wrong!');
      // }
      // const { items } = await response.data.data.json(); / *******Doesn't work with axios method
      const items = await response.data.data;

      const parkData = items.map((park) => ({
        parkId: park.id,
        parkName: park.name,
        description: park.description,

        image: park.images[0].url || "",

      }));

      setSearchedParks(parkData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  // Function to handle saving a park to our database
  const handleSavePark = async (parkId) => {

    const parkToSave = searchedParks.find((park) => park.parkId === parkId);
    console.log('++++ +++++ +++++++')  // *********
    console.log(parkToSave);  // *********

    const token = Auth.loggedIn() ? Auth.getToken() : null;
    console.log(token);

    if (!token) {
      return false;
    }

       // ********* NEWER(3) 
       try {
        // $$$$$$$$$
        const { data } = await savePark({
          variables: {
            userId: Auth.getUser().data.id,
            input: parkToSave
          },
        });


        setSavedParkIds([...savedParkIds, parkToSave.parkId]);
      } catch (err) {
        console.error(err);
      }

  };

  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1 className="searchPark">Search for Parks!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  size="md"
                  placeholder="Search a State to see Parks!"
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type="submit" variant="success" size="md">
                  Submit Search
                </Button>
              </Col>
              <h2 id="results">
                {searchedParks.length ? `${searchedParks.length} results:` : ""}
              </h2>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>
      <Container>
        {/* <h2>
          {searchedParks.length
            ? `Viewing ${searchedParks.length} results:`
            : 'Search for a park to begin'}
        </h2> */}
        <CardColumns>
          {searchedParks.map((park) => {
            // console.log('&&&&&&&&&&&');
            // console.log(park);
            return (
              <Card key={park.parkId} border="dark">
                {park.image ? (
                  <Card.Img
                    src={park.image}
                    alt={`The cover for ${park.title}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{park.parkName}</Card.Title>
                  <Card.Text>{park.description}</Card.Text>
                  {Auth.loggedIn() && (
                    <Button
                      id="saveParkButton"
                      disabled={savedParkIds?.some(
                        (savedParkId) => savedParkId === park.parkId
                      )}
                      className="btn-block btn-info"
                      onClick={() => handleSavePark(park.parkId)}
                    >
                      {savedParkIds?.some(
                        (savedParkId) => savedParkId === park.parkId
                      )
                        ? "This park has already been saved!"
                        : "Save this Park!"}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SearchParks;
