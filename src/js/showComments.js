import { postComments, getComments } from './commentsApi.js';

// ------------------EVENT LISTENER FOR ADD COMMENTS BUTTON
const sendComments = (element1, element2, element3, element4, index) => {
  element1.addEventListener('click', () => {
    postComments(element2.value, element3.value, index);
    getComments(index, element4);
  });
};

// -------------- EVENT LISTENER TO CLOSE POPUP
const closePopup = (element1, element2) => {
  element1.addEventListener('click', () => {
    element2.innerHTML = '';
    element2.classList.remove('show');
  });
};

// ------------EVENT LISTENER FOR COMMENTS BUTTON
export const commentPopup = (data, buttons) => {
  const commentSection = document.querySelector('.comment-section');
  console.log(data)
  const commentBtnArr = Array.from(buttons);
  commentBtnArr.forEach((button) => {
    const ind = commentBtnArr.indexOf(button);
    button.addEventListener('click', () => {
      //getComments(ind);
      commentSection.innerHTML = `<div class="popComment">
                                    <div class="comment">
                                      <div class="comment_close"><img src="" alt="close"></div>
                                      <div class="comment__top">
                                        <div class="comment__name">${data[ind].title}</div>
                                      </div>
                                      <div class="comment__content">
                                        <div class="comment__data">
                                          <div class="data_desc">
                                            <div class="comment__img"><img src="#" alt=""></div>
                                            <ul class="comment_list">
                                              <li class="comment_li"><span class="comment_type">genre:</span>${data[ind].genre}</li>
                                              <li class="comment_li"><span class="comment_type">platform:</span>${data[ind].platform}</li>
                                              <li class="comment_li"><span class="comment_type">publisher:</span>${data[ind].publisher}</li>
                                              <li class="comment_li"><span class="comment_type">release_date:</span>${data[ind].release_date}</li>
                                            </ul>
                                            </div>
                                            <p class="comment__p">${data[ind].short_description}</p>
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
                                              <div class="comment__div"></div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>`;
      console.log('clicking');
      const commentSec = document.querySelector('.comment-section');
      console.log(commentSec)
      const submit = document.querySelector('.form__btn');
      const list = document.querySelector('.comment__div');
      const closeBtn = document.querySelector('.comment_close');
      const nameInput = document.querySelector('form__input__name');
      const commentInput = document.querySelector('.form__input__comment');
      sendComments(submit, commentInput, nameInput, list, ind);
      closePopup(closeBtn, commentSec);
      getComments(ind, list);
    });
  });


};

export default commentPopup;

