import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { deletePost, addLike, removeLike } from '../../actions/postActions';
import { useDispatch, useSelector } from 'react-redux';

const PostItem = ({ post, showActions = true }) => {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  
  const onDeleteClick = id => {
    dispatch(deletePost(id));
  };

  const onLikeClick = id => {
    dispatch(addLike(id));
  };

  const onUnlikeClick = id => {
    dispatch(removeLike(id));
  };

  const findUserLike = likes => {
    return likes.some(like => like.user === auth.user.id);
  };

  return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-2">
          <a href="profile.html">
            <img
              className="rounded-circle d-none d-md-block"
              src={post.avatar}
              alt=""
            />
          </a>
          <br />
          <p className="text-center">{post.name}</p>
        </div>
        <div className="col-md-10">
          <p className="lead">{post.text}</p>
          {showActions && (
            <span>
              <button
                onClick={() => onLikeClick(post._id)}
                type="button"
                className="btn btn-light mr-1"
              >
                <i
                  className={classnames('fas fa-thumbs-up', {
                    'text-info': findUserLike(post.likes)
                  })}
                />
                <span className="badge badge-light">{post.likes.length}</span>
              </button>
              <button
                onClick={() => onUnlikeClick(post._id)}
                type="button"
                className="btn btn-light mr-1"
              >
                <i className="text-secondary fas fa-thumbs-down" />
              </button>
              <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                Comments
              </Link>
              {post.user === auth.user.user.id && (
                <button
                  onClick={() => onDeleteClick(post._id)}
                  type="button"
                  className="btn btn-danger mr-1"
                >
                  <i className="fas fa-times" />
                </button>
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostItem;
