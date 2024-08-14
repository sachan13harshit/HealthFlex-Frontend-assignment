import React, { useState } from 'react';

function CommentForm({ addComment }) {
  const [name, setName] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && text.trim()) {
      addComment({ name, text });
      setName('');
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <h2>Comment</h2>
      <input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <textarea
        placeholder="Your comment"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      ></textarea>
      <button type="submit">Post Comment</button>
    </form>
  );
}

export default CommentForm;
