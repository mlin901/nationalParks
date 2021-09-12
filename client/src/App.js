// import Navbar from "./components/Navbar"; // ************ alt
// import Home from "./pages/Home";  // ********** alt
// import Login from "./pages/Login";  // **********
// import SearchParks from "./pages/SearchParks"; // ****** alt
// import Signup from "./pages/Signup"; // ********** alt
// import Wishlist from "./pages/Wishlist"; // ********** alt
import "./App.css";
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
// import SearchParks from './pages/SearchParks';
import ProjectContainer from "./components/ProjectContainer";  // *********
import {
  ApolloClient,
  InMemoryCache,  
  // ApolloProvider,    
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
  // ******** ORIGINAL
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <ProjectContainer />
        </>
      </Router>
    </ApolloProvider>
  );
  // *********** alt
  // return (
  //   <ApolloProvider  client ={client}>
  //        <Router>
  //       <>
  //         <Navbar />
  //         <Switch>
  //           <Route exact path='/' component={Home} />
  //           <Route exact path='/Search' component={SearchParks} />
  //           <Route exact path='/Login' component={Login} />
  //           <Route exact path='/Signup' component={Signup} />
  //           {/* <Route exact path='/Wishlist' component={Wishlist} /> */}
  //           {/* <Route exact path='/saved' component={SavedParks} /> */}
  //           <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
  //         </Switch>
  //       </>
  //     </Router>
  //   </ApolloProvider> 
  // );
}

export default App;



