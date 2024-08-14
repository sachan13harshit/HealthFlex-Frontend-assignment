import React, { useState, useEffect } from 'react';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import './App.css';

function App() {
  const [comments, setComments] = useState([]);
  const [sortOrder, setSortOrder] = useState('desc');
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    try {
      const storedComments = JSON.parse(localStorage.getItem('comments') || '[]');
      console.log('Loading comments:', storedComments);
      setComments(storedComments);
    } catch (error) {
      console.error('Error loading comments from localStorage:', error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        console.log('Saving comments:', comments);
        localStorage.setItem('comments', JSON.stringify(comments));
      } catch (error) {
        console.error('Error saving comments to localStorage:', error);
      }
    }
  }, [comments, isLoaded]);

  const addComment = (newComment) => {
    setComments(prevComments => [...prevComments, { ...newComment, id: Date.now(), replies: [] }]);
  };

  const deleteComment = (id) => {
    setComments(prevComments => prevComments.filter(comment => comment.id !== id));
  };

  const editComment = (id, text) => {
    setComments(prevComments => prevComments.map(comment => comment.id === id ? { ...comment, text } : comment));
  };

  const addReply = (id, reply) => {
    setComments(prevComments => prevComments.map(comment => comment.id === id
      ? { ...comment, replies: [...comment.replies, { ...reply, id: Date.now() }] }
      : comment
    ));
  };

  const sortedComments = [...comments].sort((a, b) => {
    return sortOrder === 'asc' ? a.id - b.id : b.id - a.id;
  });

  console.log('Rendered comments:', sortedComments);

  return (
    <div className="App">
      <h1>Comments Section</h1>
      <CommentForm addComment={addComment} />
      <button className="sort" onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
    Sort By: Date and Time {sortOrder === 'asc' ? '↓' : '↑'}
</button>
      {sortedComments.length > 0 ? (
        <CommentList
          comments={sortedComments}
          deleteComment={deleteComment}
          editComment={editComment}
          addReply={addReply}
        />
      ) : (
        <p></p>
      )}
    
    </div>
  );
}

export default App;