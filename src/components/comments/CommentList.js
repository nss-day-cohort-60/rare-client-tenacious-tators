import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { Comment } from "./comments";
import { getCommentsByPostId } from "../../managers/comments";
import { Comment } from "./Comment";
import "./comments.css";

export const CommentList = () => {
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  const {postId} = useParams()


  useEffect(() => {
    getCommentsByPostId(postId).then((postData) => setComments(postData));
  }, []);

  return (
    <>
      <div className="comment">
        
          <tbody>
            {comments.map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))}
          </tbody>
        
      </div>
    </>
  );
};

