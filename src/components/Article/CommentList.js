import React from 'react';
import CommentComp from './CommentComp';

const CommentList = props => {
  return (
    <div>
      {
        props.comments.map(comment => {
          return (
            <CommentComp 
              comment={comment}
              currentUser={props.currentUser}
              slug={props.slug}
              key={comment.id}
            />
          )
        })
      }
    </div>
  );
};

export default CommentList;