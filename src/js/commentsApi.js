// Populate DOM with comments
const commPop = (arg) => {
  const list = document.querySelector('.comm');
  const showCommentNumber = document.querySelector('comment_qty')
  const commentNumber = arg.length;
  for (let i = 0; i < arg.length; i += 1) {
    list.innerHTML += `<li className="eachComment">
                        <p class="indi-comment">${arg[i].creation_date}</p>
                        <p class="indi-comment">${arg[i].comment}</p>
                        <p class="indi-comment">${arg[i].username}</p>
                       </li`;
  }
  showCommentNumber.textContent = `Comments(${commentNumber})`
};

// Post Comments to API
export const postComments = async (comment, name, ind) => {
  const url = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/sZdlIyu4dVy3uNIhS8YY/comments';
  const id = 'item' + ind // eslint-disable-line
  fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      item_id: id,
      username: name,
      comment: comment,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }).then((reply) => reply.json()).then((val) => val);
};

// Retrieve Comments from API
export const getComments = async (ind) => {
  const url = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/sZdlIyu4dVy3uNIhS8YY/comments?item_id=item' + ind; // eslint-disable-line
  const recieve = await fetch(url);
  const data = await recieve.json();
  commPop(data);
};
