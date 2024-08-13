// App.js
import React, { useState, useEffect } from 'react';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import './App.css';


function App() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const storedComments = JSON.parse(localStorage.getItem('comments') || '[]');
    setComments(storedComments);
  }, []);

  useEffect(() => {
    localStorage.setItem('comments', JSON.stringify(comments));
  }, [comments]);

  const addComment = (newComment) => {
    setComments([...comments, { ...newComment, id: Date.now(), replies: [] }]);
  };

  return (
    <div className="App">
      <h1>Comments Section</h1>
      <CommentForm addComment={addComment} />
      <CommentList comments={comments} setComments={setComments} />
    </div>
  );
}

export default App;