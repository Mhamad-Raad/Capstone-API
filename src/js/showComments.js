import { postComments, getComments } from './commentsApi.js';

// ----------------- SHOW COMMENTS WHEN COMMRNT BUTTON IS CLICKED
const showComments = (i) => {
  getComments(i);
};

// ------------------EVENT LISTENER FOR ADD COMMENTS BUTTON
const sendComments = (element1, element2, element3, index) => {
  element1.addEventListener('click', () => {
    postComments(element2.value, element3.value, index);
    getComments(index);
  });
};

// -------------- EVENT LISTENER TO CLOSE POPUP
const closePopup = (element1, element2, ind) => {
  element1.addEventListener('click', () => {
    element2.innerHTML = '';
    element2.classList.remove('show');
    showComments(ind);
  });
};

// ------------EVENT LISTENER FOR COMMENTS BUTTON
const commentPopup = (data) => {
  const commentBtns = document.querySelectorAll('.commentBtn');
  const commentSection = document.querySelector('.comment-section');
  const commentBtnArr = Array.from(commentBtns);
  commentBtnArr.forEach((button) => {
    const ind = commentBtnArr.indexOf(button);
    button.addEventListener('click', () => {
      commentSection.innerHTML = `<div class="popComment">
                                    <div class="comment">
                                      <div class="comment_close"><img src="" alt="close"></div>
                                      <div class="comment__top">
                                        <div class="comment__name">${data[ind].thumbanil}</div>
                                      </div>
                                      <div class="comment__content">
                                        <div class="comment__data">
                                          <div class="data_desc">
                                            <div class="comment__img"><img src="#" alt=""></div>
                                            <ul class="comment_list">
                                              <li class="comment_li"><span class="comment_type">genre:</span>${data.title}</li>
                                              <li class="comment_li"><span class="comment_type">platform:</span>${data.platform}</li>
                                              <li class="comment_li"><span class="comment_type">publisher:</span>${data.publisher}</li>
                                              <li class="comment_li"><span class="comment_type">release_date:</span>${data.release_date}</li>
                                            </ul>
                                            </div>
                                            <p class="comment__p"></p>
                                          </div>
                                        <div class="comment_form">
                                          <div class="form__tittle"></div>
                                          <form>
                                            <input type="text" class="form__input__name" placeholder="Your name">
                                            <input type="text" class="form__input__comment" placeholder="Your insight">
                                            <button type="button" class="form__btn">Comment</button>
                                          </form>
                                          <div class="comment_list">
                                            <div class="comment__qty">Comments(#)</div>
                                            <ul class="comments"></ul>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>`;
    });
    const submit = document.querySelector('.form__btn');
    const closeBtn = document.querySelector('.comment_close');
    const nameInput = document.querySelector('form__input__name');
    const commentInput = document.querySelector('.form__input__comment');
    sendComments(submit, commentInput, nameInput);
    closePopup(closeBtn, commentSection, ind);
    getComments(ind);
  });
};

export default commentPopup;
