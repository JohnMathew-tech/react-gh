import {useEffect} from 'react';
import {  useParams, Link } from 'react-router-dom';
import {  useNavigate } from 'react-router-dom';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { format } from 'date-fns';

const EditPost = () => {

    //const posts = useStoreState((state)=> state.posts);
  //const setPosts = useStoreActions((actions)=> actions.setPosts);
    const editTitle = useStoreState((state)=> state.editTitle);
    const setEditTitle = useStoreActions((actions)=> actions.setEditTitle);
    const editBody = useStoreState((state)=> state.editBody);
    const setEditBody = useStoreActions((actions)=> actions.setEditBody);
    const editPost  = useStoreActions((actions)=> actions.editPost);
    const navigate = useNavigate();
    
    const handleUpdate =  (id) => {
        const datetime = format(new Date(), "MMMM dd, yyyy pp");
        const updatedPost = {id, title: editTitle, datetime, body: editBody };
        editPost(updatedPost);
        navigate('/');
    }
    const {id} = useParams();
    const getPostById = useStoreState((state) => state.getPostById);
    const post = getPostById(id);
    useEffect(() => {
        if (post) {
            setEditTitle(post.title);
            setEditBody(post.body);
        }
    }, [post, setEditTitle, setEditBody]);

  return (
    <main className='NewPost'>
        {editTitle && 
            <>
                <h2>Edit Post</h2>
                <form className='newPostForm' onSubmit ={(e)=>e.preventDefault()}>
                    <label htmlFor="newPostTitle">Title:</label>
                    <input 
                        type="text"
                        name="newPostTitle" 
                        required
                        value={editTitle}
                        onChange={(e) => {setEditTitle(e.target.value)} }
                    />
                    <label htmlFor="newPostBody">Body:</label>
                    <textarea
                        name="newPostBody" 
                        required
                        value={editBody}
                        onChange={(e) => {setEditBody(e.target.value)} }
                    />
                    <button onClick={() => handleUpdate(post.id)}>Update</button>
            
                </form>
            </>
        }
        {!editTitle && 
            <>
                <h2>Post Not Found</h2>
                <p>Well, that is disappointing</p>
                <p>
                    <Link to = "/">Visit our Home Page </Link>
                </p>
            </>

        }        
      
    </main>
  );
}

export default EditPost;
