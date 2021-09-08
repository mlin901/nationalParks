import "./App.css";
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchParks from './pages/SearchParks';
// import SavedParks from './pages/SavedParks';   // *******????
// import Navbar from './components/Navbar';
import ProjectContainer from "./components/ProjectContainer";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <ProjectContainer />
        </>
      </Router>
    </ApolloProvider>
  );
}


// function App() {
//   return (
//     <ApolloProvider client={client}>
//       <Router>
//         <>
//           <Navbar />
//           <Switch>
//             <Route exact path='/' component={SearchParks} />
//             {/* <Route exact path='/saved' component={SavedBooks} /> */}
//             <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
//           </Switch>
//         </>
//       </Router>
//     </ApolloProvider>
//   );
// }

export default App;





// ********* original version below *******
// import ProjectContainer from "./components/ProjectContainer";
// import "./App.css";

// function App() {
//   return <ProjectContainer />;
// }

// export default App;
