const lyricsTitles = document.querySelectorAll("#home > div > div > div > div.card > div.card-content > p");
const artistNames = document.querySelectorAll("#home > div > div > div > div.card > div.card-image > span");
const input = document.getElementById("title");

input.addEventListener("keyup", e => {
    let title = e.target.value.toLowerCase();
    lyricsTitles.forEach(item => {
        let songTitle = item.innerHTML.toLowerCase();
        if (songTitle.indexOf(title) != -1) {
        item.parentElement.parentElement.parentElement.style.display = "block";
        } else {
        item.parentElement.parentElement.parentElement.style.display = "none";
        }
    });


  //   artistNames.forEach(item => {
  //     let artistNames = item.innerHTML.toLowerCase();
  //     if (artistNames.indexOf(title) != -1) {
  //     item.parentElement.parentElement.parentElement.style.display = "block";
  //     } else {
  //     item.parentElement.parentElement.parentElement.style.display = "none";
  //     }
  // });

});
