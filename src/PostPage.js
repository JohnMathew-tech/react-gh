import { useParams, Link } from 'react-router-dom';
import {  useNavigate } from 'react-router-dom';
import { useStoreActions, useStoreState } from 'easy-peasy';


const PostPage = () => {
  //const posts = useStoreState((state)=> state.posts);
  //const setPosts = useStoreActions((actions)=> actions.setPosts);
  const deletePost = useStoreActions((actions) => actions.deletePost);
  const { id } = useParams();
  const getPostById = useStoreState((state) => state.getPostById);
  const post = getPostById(id);
  const navigate = useNavigate();


  const handleDelete =  (id) => {
    deletePost(id);
    navigate('/');
  }
  
  
  return (
    <main className='PostPage'>
      <article className='post'>
        {post &&  
          <> 
            <h2>{post.title} </h2>
            <p className='postDate'>{post.datetime}</p> 
            <p className = 'postBody'>{post.body}</p>
            <Link to={`/edit/${post.id}`}><button className="editButton">Edit Post</button></Link>
            <button className="deleteButton" onClick={() => handleDelete(post.id)}>
              Delete Post
            </button>
          </> 
        }
        {!post &&
          <>
            <h2>Post Not Found</h2>
            <p>Well, that is disappointing</p>
            <p>
              <Link to = "/">Visit our Home Page </Link>
            </p>
          </>
        }
      </article>
    </main>
  );
}

export default PostPage;
