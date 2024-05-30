import Header from "./Header";
import Footer from "./Footer";
import Nav from "./Nav";
import Home from "./Home";
import Missing from "./Missing";
import About from "./About";
import NewPost from "./NewPost";
import EditPost from "./EditPost";
import PostPage from "./PostPage";
import { Route, Routes } from 'react-router-dom';
import { DataProvider } from "./context/DataContext";
import { useEffect } from "react";
import useAxiosFetch from "./hooks/useAxiosFetch";
import { action, useStoreActions } from "easy-peasy";


function App() {
  
  const setPosts = useStoreActions((actions)=>actions.setPosts);
  const url = 'http://localhost:3500/posts';
  const { data, fetchError, isLoading } = useAxiosFetch(url);

  useEffect(() => {
    setPosts(data);
  },[data,setPosts]);

  return (
    <div className="App">
      
        <Header title = "React JS Blogs"/>
        
          <Nav/>
          <Routes>
            <Route path ="/" exact element ={<Home isLoading={isLoading} fetchError={fetchError}/>}/>
            <Route path ="/post" exact element={<NewPost/>}/>
            <Route path ="/edit/:id" exact element={<EditPost/>}/>
            <Route  path ="/post/:id" exact element={<PostPage/>}/>
            <Route path ="/about" exact element={<About/>}/>
            <Route path ="*" exact element={<Missing/>}/>
          </Routes>
        
        <Footer/>
      
    </div>
  );
}

export default App;
