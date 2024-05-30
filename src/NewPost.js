
import {  useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { useStoreState, useStoreActions } from 'easy-peasy';

const NewPost = () => {
 
  const posts = useStoreState((state)=> state.posts);
  //const setPosts = useStoreActions((actions)=> actions.setPosts);
  const postTitle = useStoreState((state)=> state.postTitle);
  const setPostTitle = useStoreActions((actions)=> actions.setPostTitle);
  const postBody = useStoreState((state)=> state.postBody);
  const setPostBody = useStoreActions((actions)=> actions.setPostBody);
  const savePost  = useStoreActions((actions)=> actions.savePost);
  const navigate = useNavigate();
  const handleSubmit =  (e) => {
    e.preventDefault();
    const id = Number(posts.length ? Number(posts[posts.length - 1].id) + 1 : 1) ;
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const newid = id.toString();
    const newPost = {id:newid, title: postTitle, datetime, body: postBody };
    savePost(newPost);
    navigate('/');
  }
  return (
    <main className='NewPost'>
      <h2>New Post</h2>
      <form className='newPostForm' onSubmit ={handleSubmit}>
        <label htmlFor="newPostTitle">Title:</label>
        <input 
          type="text"
          name="newPostTitle" 
          required
          value={postTitle}
          onChange={(e) => {setPostTitle(e.target.value)} }
        />
        <label htmlFor="newPostBody">Body:</label>
        <textarea
          name="newPostBody" 
          required
          value={postBody}
          onChange={(e) => {setPostBody(e.target.value)} }
        />
        <button type='submit'>Submit</button>

      </form>
    </main>
  );
}

export default NewPost;

