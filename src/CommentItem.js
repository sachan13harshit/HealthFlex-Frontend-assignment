import React, { useState } from 'react';

function CommentItem({ comment, deleteComment, editComment, addReply }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(comment.text);
  const [replyText, setReplyText] = useState('');
  const [replyName, setReplyName] = useState('');
  const [showReplyForm, setShowReplyForm] = useState(false);

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
          <button onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? 'Save' : 'Edit'}
          </button>
        </div>
      </div>
      {showReplyForm && (
        <div className="reply-form">
          <input
            type="text"
            placeholder="Your name"
            value={replyName}
            onChange={(e) => setReplyName(e.target.value)}
          />
          <textarea
            placeholder="Reply..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          ></textarea>
          <button onClick={handleReply}>Post Reply</button>
        </div>
      )}
      {comment.replies && comment.replies.length > 0 && (
        <ul className="replies">
          {comment.replies.map(reply => (
            <li key={reply.id} className="reply-item">
              <strong>{reply.name}</strong>
              <p>{reply.text}</p>
              <span className="date">{new Date(reply.id).toLocaleDateString()}</span>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export default CommentItem;
