import {Routes,Route, useNavigate} from "react-router-dom";
import Header from "./Header";
import Nav from "./Nav";
import Home from "./Home";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import About from "./About";
import Missing from "./Missing";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import { format } from "date-fns";

function App() {
  const [posts,setPosts] = useState([
    {
      id:1,
      title:"First Post",
      datetime : "sept 30, 2023 02:35:40 PM",
      body : "This is the first Post"
    },
    {
      id:2,
      title:"Second Post",
      datetime : "Feb 04, 2023 12:20:30 AM",
      body : "This is the second Post"
    },
    {
      id:3,
      title:"Third Post",
      datetime : "Aug 22, 2023 06:00:10 PM",
      body : "This is the third Post"
    },
    {
      id:4,
      title:"Fourth Post",
      datetime : "May 06, 2023 10:10:40 AM",
      body : "This is the fourth Post"
    }
  ])
  const [search,setSearch] = useState('');
  const [searchResults,setSearchResults] = useState([]);
  const [postTitle,setPostTitle] = useState('');
  const [postBody,setPostBody] = useState('');
  const navigate = useNavigate()

  useEffect(()=>{
    const filteredResults = posts.filter((post)=>
    ((post.body).toLowerCase()).includes(search.toLowerCase())
     || ((post.title).toLowerCase()).includes(search.toLowerCase()))
     setSearchResults(filteredResults.reverse())
  },[posts,search])

  const handleSubmit = (e)=>{
    e.preventDefault();
    const id = posts.length ? posts[posts.length-1].id+1 :1;
    const datetime  = format(new Date(), 'MMMM dd, yyyy pp')
    const newPost = {id,title:postTitle,datetime,body:postBody}
    const allPosts = [...posts, newPost]
    setPosts(allPosts);
    setPostTitle('')
    setPostBody('')
    navigate('/')

  }
  const handleDelete=(id)=>{
    const postsList = posts.filter(post=>post.id !==id);
    setPosts(postsList)
    navigate('/')
  }

  return (
    <div className="App">
      <Header title = "Social Media App"/>
      <Nav 
      search={search}
      setSearch={setSearch}
      />
      <Routes>
        <Route path="/" element={<Home 
        posts={searchResults}/>} />
        <Route path="post">
        <Route index element={<NewPost
        handleSubmit={handleSubmit}
        postTitle={postTitle}
        setPostTitle={setPostTitle}
        postBody={postBody}
        setPostBody={setPostBody} />} />
        <Route path=":id" element={<PostPage posts={posts}
        handleDelete = {handleDelete}/>}/>
      </Route>
      {/* <PostPage /> */}
      <Route path="about"element={<About />}/>
      <Route path="*" element={<Missing />}/>
      </Routes>
      <Footer />
      
    </div>
  );
}

export default App;
