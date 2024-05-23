import React from "react";
import CommentItem from "./CommentItem";

const CommentFeed = ({ comments, postId }) => {
  return (
    <>
      {(comments && comments.length > 0) ? (
        comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} postId={postId} />
        ))
      ) : (
        <h4>No comments yet...</h4>
      )}
    </>
  );
};

export default CommentFeed;
