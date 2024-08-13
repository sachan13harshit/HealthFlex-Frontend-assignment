// CommentItem.js
import React, { useState } from 'react';
import CommentForm from './CommentForm';

function CommentItem({ comment, setComments, comments }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.comment);
  const [showReplyForm, setShowReplyForm] = useState(false);

  const handleEdit = () => {
    if (editedComment.trim()) {
      setComments(comments.map(c => 
        c.id === comment.id ? { ...c, comment: editedComment } : c
      ));
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    setComments(comments.filter(c => c.id !== comment.id));
  };

  const addReply = (reply) => {
    setComments(comments.map(c => 
      c.id === comment.id 
        ? { ...c, replies: [...c.replies, { ...reply, id: Date.now() }] }
        : c
    ));
    setShowReplyForm(false);
  };

  return (
    <div className="comment-item">
      <h3>{comment.name}</h3>
      <p>{new Date(comment.date).toLocaleString()}</p>
      {isEditing ? (
        <textarea
          value={editedComment}
          onChange={(e) => setEditedComment(e.target.value)}
        ></textarea>
      ) : (
        <p>{comment.comment}</p>
      )}
      <button onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? 'Save' : 'Edit'}
      </button>
      {isEditing && <button onClick={handleEdit}>Save</button>}
      <button onClick={handleDelete}>Delete</button>
      <button onClick={() => setShowReplyForm(!showReplyForm)}>Reply</button>
      {showReplyForm && <CommentForm addComment={addReply} parentId={comment.id} />}
      {comment.replies && comment.replies.map(reply => (
        <CommentItem 
          key={reply.id} 
          comment={reply} 
          setComments={setComments}
          comments={comments}
        />
      ))}
    </div>
  );
}

export default CommentItem;