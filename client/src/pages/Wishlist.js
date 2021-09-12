import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

import { getMe, deletePark } from '../utils/API';
import Auth from '../utils/auth';
import { removeParkId } from '../utils/localStorage';
import {useMutation, useQuery} from '@apollo/react-hooks';
import { QUERY_ME } from '../utils/queries';
import { REMOVE_PARK } from '../utils/mutations';


const SavedParks = () => {

  const { loading, data} = useQuery(QUERY_ME);
  const [removePark, {error}] = useMutation(REMOVE_PARK);

  const userData = data?.me || [];

  const handleDeletePark = async (parkId) => {

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const {data} = await removePark({
        variables: { parkId }
      });

      removeParkId(parkId);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>National Park Wishlist</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedParks.length
            ? `Viewing ${userData.savedParks.length} saved ${userData.savedParks.length === 1 ? 'park' : 'parks'}:`
            : 'You have no saved parks'}
        </h2>
        <CardColumns>
          {userData.savedParks.map((park) => {
            return (
              <Card key={park.parkId} border='dark'>
                {park.image ? <Card.Img src={park.image} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{park.parkName}</Card.Title>
                  <Card.Text>{park.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeletePark(park.parkId)}>
                    Delete this Park!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedParks;