import { postComments, getComments } from "./commentsApi";
// ------------EVENT LISTENER FOR COMMENTS BUTTON
const commentPopup = (data) => {
  const commentBtns = document.querySelectorAll('.commentBtn');
  const commentSection = document.querySelector('.comment-section');
  const commentBtnArr = Array.from(commentBtns);
  commentBtnArr.forEach(button => {
    const ind = commentBtnArr.indexOf(button)
    button.addEventListener('click', () => {
      commentSection.innerHTML = `<div class="c-popup">
                                <p class="close">&#10006</p>
                                <img src="${data.image}" alt="" class="poster">
                                <p className="mov-name">${data.name}</p>
                                <div class="bio"></div>
                                <h2 class="comm-1">Comments</h2>
                                <div class="comm"></div>
                                <h2 class="add-com">Add Comments</h2>
                                <input type="text" name="name" class="un" placeholder="Enter Your Name">
                                <input type="text" name="comments" class="uc" placeholder="Write Comments">
                                <button class="submit">Comment</button>
                                </div>`
    })
    const submit = document.querySelector('.submit');
    const closeBtn = document.querySelector('.close');
    const nameInput = document.querySelector('.un');
    const commentInput = document.querySelector('.uc');
    sendComments(submit, commentInput, nameInput);
    closePopup(closeBtn, commentSection);
    getComments(ind);
  })
}

// ------------------EVENT LISTENER FOR ADD COMMENTS BUTTON
const sendComments = (element1, element2, element3) => {
  element1.addEventListener('click', () => {
    postComments(element2.value, element3.value, index);
    getComments(index)
  })
}

// -------------- EVENT LISTENER TO CLOSE POPUP
const closePopup = (element1, element2) => {
  element1.addEventListener('click', () => {
    element2.innerHTML = '';
    element2.classList.remove('show');
  })

// ----------------- SHOW COMMENTS WHEN COMMRNT BUTTON IS CLICKED
const showComments = () => {
  
}
