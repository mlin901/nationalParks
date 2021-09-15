import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import { Redirect, useParams } from 'react-router-dom';

import { getMe, deletePark } from '../utils/API';
import Auth from '../utils/auth';
import { removeParkId } from '../utils/localStorage';
import {useMutation, useQuery} from '@apollo/react-hooks';
import { QUERY_ME } from '../utils/queries';
import { REMOVE_PARK } from '../utils/mutations';


const SavedParks = () => {


  const { loading, data } = useQuery(QUERY_ME);
  const [removePark] = useMutation(REMOVE_PARK);

  const userData = data?.me || [];

  if(!userData?.name) {
    return (
      <h1>Not logged in</h1>
    );
  }

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

  if (!userData.savedParks) {
    return <h2>No Saved Parks</h2>;
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  };

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Saved Parks</h1>
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
                    Delete this park
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

// ********8888888888
// import React, { useState, useEffect } from 'react';
// import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

// import { getMe, deletePark } from '../utils/API';
// import Auth from '../utils/auth';
// import { removeParkId } from '../utils/localStorage';
// import { useMutation, useQuery } from '@apollo/react-hooks';
// import { QUERY_ME } from '../utils/queries';
// import { REMOVE_PARK } from '../utils/mutations';

// const SavedParks = () => {
//   const [userData, setUserData] = useState({});

//   // use this to determine if `useEffect()` hook needs to run again
//   const userDataLength = Object.keys(userData).length;

//   useEffect(() => {
//     const getUserData = async () => {
//       try {
//         const token = Auth.loggedIn() ? Auth.getToken() : null;

//         if (!token) {
//           return false;
//         }

//         const response = await getMe(token);
//         console.log('8888888888888888888888888 1');
//         console.log(response);

//         if (!response.ok) {
//           throw new Error('something went wrong!');
//         }

//         const user = await response.json();
//         setUserData(user);
//         console.log('8888888888888888888888888 2');
//         console.log(user);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     getUserData();
//   }, [userDataLength]);
//   console.log('8888888888888888888888888 3');
//   console.log(userDataLength);

//   // create function that accepts the park's mongo _id value as param and deletes the park from the database
//   const handleDeletePark = async (parkId) => {
//     const token = Auth.loggedIn() ? Auth.getToken() : null;

//     if (!token) {
//       return false;
//     }

//     try {
//       const response = await deletePark(parkId, token);

//       if (!response.ok) {
//         throw new Error('something went wrong!');
//       }

//       const updatedUser = await response.json();
//       setUserData(updatedUser);
//       // upon success, remove park's id from localStorage
//       removeParkId(parkId);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // if data isn't here yet, say so
//   if (!userDataLength) {
//     return <h2>LOADING...</h2>;
//   }

//   return (
//     <>
//       <Jumbotron fluid className='text-light bg-dark'>
//         <Container>
//           <h1>Saved Parks</h1>
//         </Container>
//       </Jumbotron>
//       <Container>
//         <h2>
//           {userData.savedParks.length
//             ? `Viewing ${userData.savedParks.length} saved ${userData.savedParks.length === 1 ? 'park' : 'parks'}:`
//             : 'You have no saved parks'}
//         </h2>
//         <CardColumns>
//           {userData.savedParks.map((park) => {
//             return (
//               <Card key={park.parkId} border='dark'>
//                 {park.image ? <Card.Img src={park.image} variant='top' /> : null}
//                 <Card.Body>
//                   <Card.Title>{park.parkName}</Card.Title>
//                   <Card.Text>{park.description}</Card.Text>
//                   <Button className='btn-block btn-danger' onClick={() => handleDeletePark(park.parkId)}>
//                     Delete this Park!
//                   </Button>
//                 </Card.Body>
//               </Card>
//             );
//           })}
//         </CardColumns>
//       </Container>
//     </>
//   );
// };

// export default SavedParks;
