import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addComment } from '../../actions/postActions';

const CommentForm = ({ postId }) => {
  const auth = useSelector(state => state.auth);
  const errors = useSelector(state => state.errors);
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const [errorState, setErrorState] = useState({});

  useEffect(() => {
    if (errors) {
      setErrorState(errors);
    }
  }, [errors]);

  const onSubmit = (e) => {
    e.preventDefault();

    const { user } = auth;

    const newComment = {
      text,
      name: user.name,
      avatar: user.avatar
    };

    dispatch(addComment(postId, newComment));
    setText('');
  };

  const onChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div className="post-form mb-3">
      <div className="card card-info">
        <div className="card-header bg-info text-white">
          Make a comment...
        </div>
        <div className="card-body">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <TextAreaFieldGroup
                placeholder="Reply to post"
                name="text"
                value={text}
                onChange={onChange}
                error={errorState.text}
              />
            </div>
            <button type="submit" className="btn btn-dark">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CommentForm;
