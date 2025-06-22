document.addEventListener("DOMContentLoaded", () => {
  let counter = document.getElementById("counter");
  let plusBtn = document.getElementById("plus");
  let minusBtn = document.getElementById("minus");
  let heartBtn = document.getElementById("heart");
  let pauseBtn = document.getElementById("pause");
  let commentForm = document.getElementById("comment-form");
  let likesList = document.querySelector(".likes");
  let commentsList = document.getElementById("list");

  let count = 0;
  let timer = setInterval(incrementCounter, 1000);
  let isPaused = false;
  let likes = {};

  function incrementCounter() {
    counter.innerText = ++count;
  }

  function decrementCounter() {
    counter.innerText = --count;
  }

  function updateLikes() {
    const currentNum = count;
    likes[currentNum] = (likes[currentNum] || 0) + 1;

    const existingLi = document.getElementById(`like-${currentNum}`);
    if (existingLi) {
      existingLi.innerText = `${currentNum} has been liked ${likes[currentNum]} times`;
    } else {
      const li = document.createElement("li");
      li.id = `like-${currentNum}`;
      li.innerText = `${currentNum} has been liked 1 time`;
      likesList.appendChild(li);
    }
  }

  function togglePause() {
    if (isPaused) {
      timer = setInterval(incrementCounter, 1000);
      pauseBtn.innerText = "pause";
      toggleButtons(true);
    } else {
      clearInterval(timer);
      pauseBtn.innerText = "resume";
      toggleButtons(false);
    }
    isPaused = !isPaused;
  }

  function toggleButtons(state) {
    plusBtn.disabled = !state;
    minusBtn.disabled = !state;
    heartBtn.disabled = !state;
  }

  function submitComment(e) {
    e.preventDefault();
    const input = document.getElementById("comment-input");
    const p = document.createElement("p");
    p.innerText = input.value;
    commentsList.appendChild(p);
    commentForm.reset();
  }

  // Event Listeners
  plusBtn.addEventListener("click", incrementCounter);
  minusBtn.addEventListener("click", decrementCounter);
  heartBtn.addEventListener("click", updateLikes);
  pauseBtn.addEventListener("click", togglePause);
  commentForm.addEventListener("submit", submitComment);
});
