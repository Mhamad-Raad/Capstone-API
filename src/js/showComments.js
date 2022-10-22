import { postComments, getComments } from './commentsApi.js';

// ------------------EVENT LISTENER FOR ADD COMMENTS BUTTON
const sendComments = (element1, element2, element3, element4, element5, index) => {
  const today = new Date();
  const date = `${today.getFullYear()} - ${today.getMonth() + 1} - ${today.getDate()}`;
  element1.addEventListener('click', async () => {
    const data = await getComments(index, element4, element5);
    postComments(element2.value, element3.value, index, element5,  data.length);
    const commentsRow = document.querySelector('.commes');
    commentsRow.innerHTML += `<li class="eachComment">
    <p class="indi-comment">${date}</p>
    <p class="indi-comment">${element2.value}</p>
    <p class="indi-comment">${element3.value}</p>
   </li>`;
   
    const nameInput = document.querySelector('.form__input__name');
    const commentInput = document.querySelector('.form__input__comment');
    nameInput.value = '';
    commentInput.value = '';
    
  });
  getComments(index, element4, element5);
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
  const commentBtnArr = Array.from(buttons);
  commentBtnArr.forEach((button) => {
    const ind = commentBtnArr.indexOf(button);
    button.addEventListener('click', () => {
      commentSection.innerHTML = `<div class="popComment">
                                    <div class="comment1">
                                      <div class="comment_close1">&#10006;</div>
                                      <div class="comment__top">
                                        <div class="comment__name">${data[ind].title}</div>
                                      </div>
                                      <div class="comment__content">
                                        <div class="comment__data">
                                          <div class="data_desc">
                                            <div class="comment__img"><img src="${data[ind].thumbnail}" alt=""></div>
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
                                          <div class="commes">
                                            <div class="comment__qty">Comments(#)</div>
                                              <div class="comment__div"></div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>`;
      const commentSec = document.querySelector('.comment-section');
      const submit = document.querySelector('.form__btn');
      const list = document.querySelector('.comment__div');
      const closeBtn = document.querySelector('.comment_close1');
      const nameInput = document.querySelector('.form__input__name');
      const commentInput = document.querySelector('.form__input__comment');
      const commentNumber = document.querySelector('.comment__qty');
      console.log(commentNumber);
      sendComments(submit, commentInput, nameInput, list, commentNumber, ind);
      closePopup(closeBtn, commentSec);
      window.addEventListener('click', (e) => {
        if (e.target === document.querySelector('.popComment')) {
          commentSection.innerHTML = '';
          commentSection.classList.remove('show');
        }
      });
    });
  });
};
export default commentPopup;