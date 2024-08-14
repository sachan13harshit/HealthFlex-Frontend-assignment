import React, { useState, useEffect } from 'react';

function CommentItem({ comment, deleteComment, editComment, addReply }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(comment.text);
  const [replyText, setReplyText] = useState('');
  const [replyName, setReplyName] = useState('');
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyError, setReplyError] = useState('');

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
    if (!replyName.trim() && !replyText.trim()) {
      setReplyError('Please enter your name and a reply.');
    } else if (!replyName.trim()) {
      setReplyError('Please enter your name.');
    } else if (!replyText.trim()) {
      setReplyError('Please enter a reply.');
    } else {
      addReply(comment.id, { name: replyName, text: replyText });
      setReplyText('');
      setReplyName('');
      setShowReplyForm(false);
      setReplyError('');
    }
  };

  const DeleteButton = ({ onDelete }) => (
    <button 
      onClick={onDelete}
      style={{
        position: 'absolute',
        top: '50%',
        right: '-12px',
        transform: 'translateY(-50%)',
        background: '#f44336',
        color: 'white',
        border: 'none',
        borderRadius: '50%',
        width: '24px',
        height: '24px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        fontSize: '14px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
      }}
      title="Delete"
    >
      🗑️
    </button>
  );

  return (
    <li className="comment-item" style={{ 
      position: 'relative', 
      border: '1px solid #ccc', 
      borderRadius: '4px',
      padding: '10px', 
      marginBottom: '10px',
      paddingRight: '30px'
    }}>
      <DeleteButton onDelete={() => deleteComment(comment.id)} />
      <div className="content">
        <strong>{comment.name}</strong>
        {isEditing ? (
          <textarea
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            style={{ padding: '8px', width: '100%', borderRadius: '4px', border: '1px solid #ccc' }}
          ></textarea>
        ) : (
          <p>{comment.text}</p>
        )}
        <span className="date">{new Date(comment.id).toLocaleDateString()}</span>
        <div className="actions">
          <button onClick={() => {
            setShowReplyForm(!showReplyForm);
            setReplyError('');
          }}>
            {showReplyForm ? 'Cancel Reply' : 'Reply'}
          </button>
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
      {showReplyForm && (
        <div className="reply-form" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input
            type="text"
            placeholder="Your name"
            value={replyName}
            onChange={(e) => setReplyName(e.target.value)}
            style={{ padding: '8px', width: '100%', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <textarea
            placeholder="Reply..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            style={{ padding: '8px', width: '100%', borderRadius: '4px', border: '1px solid #ccc' }}
          ></textarea>
          {replyError && <p style={{ color: 'red' }}>{replyError}</p>}
          <button onClick={handleReply} style={{ alignSelf: 'flex-end', padding: '8px 12px', backgroundColor: '#007bff', color: '#fff', borderRadius: '4px', border: 'none' }}>
            Post Reply
          </button>
        </div>
      )}
      {comment.replies && comment.replies.length > 0 && (
        <ul className="replies">
          {comment.replies.map(reply => (
            <li key={reply.id} className="reply-item" style={{ position: 'relative', paddingRight: '30px' }}>
              <DeleteButton onDelete={() => deleteComment(comment.id, reply.id)} />
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
