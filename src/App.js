import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const postsContainerRef = useRef(null);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/posts");
      setPosts(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (posts.length > 0) {
      document.title = `React Client | ${posts.length} Posts`;
      postsContainerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [posts]);

  return (
    <>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Button variant="contained" color="primary" onClick={fetchPosts}>
          List Posts
        </Button>
        {isLoading && <CircularProgress />}
      </header>
      <Container maxWidth="sm">
        <div ref={postsContainerRef}>
          {posts.map((post) => (
            <Card key={post.id} sx={{ marginBottom: 2 }}>
              <CardContent>
                <Typography variant="h6" component="div">
                  {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {post.body}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </>
  );
}

export default App;
