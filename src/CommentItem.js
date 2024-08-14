import React, { useState, useEffect } from 'react';

function CommentItem({ comment, deleteComment, editComment, addReply }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(comment.text);
  const [replyText, setReplyText] = useState('');
  const [replyName, setReplyName] = useState('');
  const [showReplyForm, setShowReplyForm] = useState(false);
  useEffect(() => {
    setEditedText(comment.text);
  }, [comment.text]);

  const handleEdit = () => {
    if (editedText.trim()) {
      editComment(comment.id, editedText);
      setIsEditing(false);
    }
  };

  const handleReply = () => {
    if (replyText.trim() && replyName.trim()) {
      addReply(comment.id, { name: replyName, text: replyText });
      setReplyText('');
      setReplyName('');
      setShowReplyForm(false);
    }
  };

  return (
    <li className="comment-item">
      <div className="content">
        <strong>{comment.name}</strong>
        {isEditing ? (
          <textarea
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          ></textarea>
        ) : (
          <p>{comment.text}</p>
        )}
        <span className="date">{new Date(comment.id).toLocaleDateString()}</span>
        <div className="actions">
          <button onClick={() => setShowReplyForm(!showReplyForm)}>Reply</button>
          <button onClick={() => deleteComment(comment.id)}>Delete</button>
          <button onClick={() => {
            if (isEditing) {
              handleEdit();
            } else {
              setIsEditing(true);
            }
          }}>
            {isEditing ? 'Save' : 'Edit'}
          </button>
        </div>
      </div>
      {/* Rest of the component remains the same */}
    </li>
  );
}

export default CommentItem;