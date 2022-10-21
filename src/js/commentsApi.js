// Populate DOM with comments
const commPop = (arg, element, element2) => {
  const commentFigure = arg.length === undefined ? 0 : arg.length;
  element.innerHTML = '';
  element.innerHTML = `<p>Comments (${commentFigure})</p>`;
  for (let i = 0; i < arg.length; i += 1) {
    element.innerHTML += `<li class="eachComment">
                          <p class="indi-comment">${arg[i].creation_date}</p>
                          <p class="indi-comment">${arg[i].comment}</p>
                          <p class="indi-comment">${arg[i].username}</p>
                         </li>`;
  }
  element2.textContent = `Comments(${commentFigure})`;
};

// Post Comments to API
export const postComments = async (comment, name, ind) => {
  const url = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/NcJbTl5ebFgHPkkhVNm4/comments';
  const id = 'item' + ind; // eslint-disable-line
  if (name !== '' && comment !== '') {
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
    }).then((reply) => reply.text()).then((val) => val);
  } else {
    alert('Please fill in all fields');
  }
};

// Retrieve Comments from API
export const getComments = async (i, element1, ele) => {
  const url = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/NcJbTl5ebFgHPkkhVNm4/comments?item_id=item${i}`; // eslint-disable-line
  const recieve = await fetch(url).then((reply) => reply.json()).then((val) => val);
  const data = await recieve;
  commPop(data, element1, ele);
  return data;
};
