// CommentForm.js
import React, { useState } from 'react';

function CommentForm({ addComment, parentId = null }) {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) {
      alert('Please enter both name and comment');
      return;
    }
    addComment({ name, comment, date: new Date().toISOString(), parentId });
    setName('');
    setComment('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <textarea
        placeholder="Comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
      ></textarea>
      <button type="submit">POST</button>
    </form>
  );
}

export default CommentForm;