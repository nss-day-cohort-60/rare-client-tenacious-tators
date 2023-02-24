export const Comment = ({ comment }) => (
  <section className="comments__card">
    <h3>"{comment?.content}"</h3>
    <div className="comment__author">-{comment?.author?.full_name}</div>
  </section>
);
