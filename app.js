var isNewGame;
// Тоглогчийн ээлжийг хадгалах хувьсагч
var activePlayer;
//Тоглогчийн цуглуулсан оноог хадгалах хувьсагч
var scores;
//Тоглогчийн ээлжиндээ цуглуулж байгаа оноог хадгалах хувьсагч
var roundScore;
//Шооны аль талаараа буусныг хадгалах хувьсагч 1-6 оноо санамсаргүй бууна
var diceDom = document.querySelector(".dice");
// тоглоомыг эхлэхэд бэлтгэнэ
function initGame() {
  // шинэ тоглоом эхлэх төлөв
  isNewGame = true;
  activePlayer = 0;
  //Тоглогчийн цуглуулсан оноог хадгалах хувьсагч
  scores = [0, 0];
  //Тоглогчийн ээлжиндээ цуглуулж байгаа оноог хадгалах хувьсагч
  roundScore = 0;

  document.getElementById("score-0").textContent = 0;
  document.getElementById("score-1").textContent = 0;

  document.getElementById("current-0").textContent = 0;
  document.getElementById("current-1").textContent = 0;
  // тоглогчийн нэрийг буцаан гаргах
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";

  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");

  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}

initGame();

// Шоог шидэх эвент листенер
document.querySelector(".btn-roll").addEventListener("click", function() {
  if (isNewGame) {
    // 1-6 доторх санамсаргүй нэг тоог үүсгэх
    var diceNumber = Math.floor(Math.random() * 6) + 1;
    //Шооны зургийг вэб дээр гаргаж ирнэ
    diceDom.style.display = "block";
    //буусан санамсаргүй тоонд харгалзах шооны зургийг вэб дээр гаргаж ирнэ.
    diceDom.src = "dice-" + diceNumber + ".png";
    //буусан тоо 1-ээс ялгаатай бол идэвхитэй тоглогчийн ээлжийн оноог нэмэгдүүлнэ
    if (diceNumber !== 1) {
      //1- ээс ялгаатай тоо буулаа
      roundScore = roundScore + diceNumber;
      document.getElementById(
        "current-" + activePlayer
      ).textContent = roundScore;
    } else {
      // 1 буусан тул тоглогчийн ээлжийг энэ хэсэгт сольж өгнө.
      switchToNextPlayer();
    }
  } else {
    alert("Тоглоом дууссан байна. NEW GAME товчийг дарж шинээр эхлэнэ үү");
  }
});

//hold товчны эвент листенер
document.querySelector(".btn-hold").addEventListener("click", function() {
  if (isNewGame) {
    // уг тоглогчийн цуглуулсан оноог глобал оноон дээр нэмж өгнө
    scores[activePlayer] = scores[activePlayer] + roundScore;
    // дэлгэц дээр оноог харуулах
    document.getElementById("score-" + activePlayer).textContent =
      scores[activePlayer];
    //уг тоглогчийг хонжсон эсэхийг шалгах
    if (scores[activePlayer] >= 100) {
      // Тоглоомыг дууссан төлөвт оруулна
      isNewGame = false;

      // ялагч гэсэн тектийг гаргана
      document.getElementById("name-" + activePlayer).textContent = "Winner!!!";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
    } else {
      // тоглогчийн ээлжийг солино
      switchToNextPlayer();
    }
  } else {
    alert("Тоглоом дууссан байна. NEW GAME товчийг дарж шинээр эхлэнэ үү");
  }
});
//Програм эхлэхэд бэлдэх

// шинэ тоглоом эхлүүлэх товчний эвинт листенер
document.querySelector(".btn-new").addEventListener("click", initGame);
//Энэ функц нь тоглох ээлжийг дараачийн тоглогчруу шилжүүлдэг
function switchToNextPlayer() {
  //Тоглогчийн ээлжийг солино
  roundScore = 0;
  document.getElementById("current-" + activePlayer).textContent = 0;

  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  //улаан цэгийг шилжүүлэх
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  //шоог түр алга болгоно
  diceDom.style.display = "none";
}
