const postComments = (comment, comments) => {
  comments.push(comment);
  return comments.length;
};

const getcomments = (comments) => comments.length;

module.exports = { postComments, getcomments };
