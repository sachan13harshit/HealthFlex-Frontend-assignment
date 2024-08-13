// CommentList.js
import React from 'react';
import CommentItem from './CommentItem';

function CommentList({ comments, setComments }) {
  const sortedComments = [...comments].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div>
      <h2>Comments</h2>
      <select onChange={(e) => {
        const sorted = [...comments].sort((a, b) => {
          return e.target.value === 'asc' 
            ? new Date(a.date) - new Date(b.date)
            : new Date(b.date) - new Date(a.date);
        });
        setComments(sorted);
      }}>
        <option value="desc">Sort by: Date and Time ↓</option>
        <option value="asc">Sort by: Date and Time ↑</option>
      </select>
      {sortedComments.map(comment => (
        <CommentItem 
          key={comment.id} 
          comment={comment} 
          setComments={setComments}
          comments={comments}
        />
      ))}
    </div>
  );
}

export default CommentList;