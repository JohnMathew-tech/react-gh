import { createContext, useState, useEffect } from "react";
import useAxiosFetch from "../hooks/useAxiosFetch";


const DataContext = createContext({});



export const DataProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const url = 'http://localhost:3500/posts';

  const { data, fetchError, isLoading } = useAxiosFetch(url);

  useEffect(() => {
    setPosts(data);
  },[data]);
  

  useEffect (() => {
    const filteredPosts = posts.filter ((post) =>
        ((post.title)?.toLowerCase()).includes(search?.toLowerCase()) ||
        ((post.body)?.toLowerCase()).includes(search?.toLowerCase()));
    setSearchResults(filteredPosts.reverse());
  },[posts,search]);
  
  return (
    <DataContext.Provider
        value = {{
            searchResults, fetchError, isLoading,
            posts,setPosts,
            search, setSearch
        }}
    >
        {children}
    </DataContext.Provider>
 )
}   

export default DataContext;