import React from 'react';
import CommentItem from './CommentItem';

function CommentList({ comments, deleteComment, editComment, addReply }) {
  return (
    <ul className="comment-list">
      {comments.map(comment => (
        <CommentItem 
          key={comment.id} 
          comment={comment} 
          deleteComment={deleteComment} 
          editComment={editComment} 
          addReply={addReply} 
        />
      ))}
    </ul>
  );
}

export default CommentList;
