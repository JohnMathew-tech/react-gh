import React from 'react';
import Feed from './Feed';

import { useStoreState } from 'easy-peasy';

const Home = ({isLoading, fetchError}) => {
  const searchResults = useStoreState((state)=>state.searchResults);
  
  return (
    <main className='Home'>
      {isLoading && <p>Loading Posts</p> }
      {!isLoading && fetchError && <p style ={{color:"red"}}>{fetchError}</p>  }
      {!isLoading && !fetchError && searchResults.length ? (
          <Feed posts ={searchResults} />
        ):(
          <p style = {{ marginTop: "2rem" }}>
            No Posts
          </p>
        )
      }
    </main>
  );
}

export default Home;
