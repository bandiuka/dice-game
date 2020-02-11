// Тоглогчийн ээлжийг хадгалах хувьсагч
var activePlayer = 0;
//Тоглогчийн цуглуулсан оноог хадгалах хувьсагч
var scores = [0, 0];
//Тоглогчийн ээлжиндээ цуглуулж байгаа оноог хадгалах хувьсагч
var roundScore = 0;
//Шооны аль талаараа буусныг хадгалах хувьсагч 1-6 оноо санамсаргүй бууна

//Програм эхлэхэд бэлдэх

document.getElementById("score-0").textContent = 0;
document.getElementById("score-1").textContent = 0;

document.getElementById("current-0").textContent = 0;
document.getElementById("current-1").textContent = 0;

var diceDom = document.querySelector(".dice");

diceDom.style.display = "none";
// Шоог шидэх эвент листенер
document.querySelector(".btn-roll").addEventListener("click", function() {
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
    document.getElementById("current-" + activePlayer).textContent = roundScore;
  } else {
    roundScore = 0;
    document.getElementById("current-" + activePlayer).textContent = 0;
    // 1 буусан тул тоглогчийн ээлжийг энэ хэсэгт сольж өгнө.
    activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
    //улаан цэгийг шилжүүлэх
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");
    //шоог түр алга болгоно
    diceDom.style.display = "none";
  }
});
