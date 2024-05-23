import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostForm from './PostForm';
import PostFeed from './PostFeed';
import Spinner from '../common/Spinner';
import { getPosts } from '../../actions/postActions';

const Posts = () => {
  const { posts, loading } = useSelector(state => state.post);
  const dispatch = useDispatch();

  console.log(posts)

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch, getPosts]);

  return (
    <div className="feed">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <PostForm />
            {(posts === null || loading) ? <Spinner /> : <PostFeed posts={posts} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
