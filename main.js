$(document).ready(function() {
  var i = 0,
    count = 1,
    gameSeq = [],
    playerSeq = [];
  $("#power, #strict, #start").css("background-color", "#3333ff");
  $("#congratulation1, #congratulation2").hide();
  $("#strict").addClass("nonstrict").removeClass("strict");
  $("#power").addClass("off").removeClass("on");

  $("#power").click(function() {
    if ($("#power").hasClass("off")) {
      $("#power").css("background-color", "#00e600");
      $("#power").addClass("on").removeClass("off");
    } else if ($("#power").hasClass("on")) {
      $("#power, #start, #strict").css("background-color", " #3333ff");
      $("#count").css("opacity", "0.6");
      gameSeq = [];
      i = 0;
      playerSeq = [];
      count = 1;
      $("#count").val("");
      $("#start > span").removeClass("fa-refresh").addClass("fa-play");
      $("#power").addClass("off").removeClass("on");
      $("#strict").addClass("nonstrict").removeClass("strict");
    }
  });

  $("#start").click(function() {
    if ($("#power").hasClass("on")) {
      if ($("#start > span").hasClass("fa-play")) {
        $("#start").css("background-color", "#00e600");
        $("#count").css("opacity", "1");
        startGame();
        $("#start > span").addClass("fa-refresh").removeClass("fa-play");
      } else if ($("#start > span").hasClass("fa-refresh")) {
        $("#count").val("");
        count = 1;
        gameSeq = [];
        playerSeq = [];
        startGame();
      }
    }
  });

  $("#strict").click(function() {
    if ($("#power").hasClass("on")) {
      if ($("#strict").hasClass("nonstrict")) {
        $("#strict").css("background-color", "#00e600");
        $("#strict").addClass("strict").removeClass("nonstrict");
      } else {
        $("#strict").css("background-color", "#3333ff");
        $("#strict").addClass("nonstrict").removeClass("strict");
      }
    }
  });

  $(".pad").click(function() {
    if ($("#power").hasClass("on")) {
      $(this).animate({
        opacity: 1
      }, 50).animate({
        opacity: 0.5
      }, 200);
      var arr1 = $(this).attr("id").split("");
      var num = parseInt(arr1[4]);
      playerSeq.push(num);
      playSound(num);
      var res = isSeqCorrect();
      if (res === "correct") {
        if (count < 20) {
          count += 1;
          $("#count").val(count);
          startGame();
        } else {
          playSound(6);
          $("#congratulation1, #congratulation2").fadeIn(500).fadeOut(3000);
          count = 1;
          i = 0;
          playerSeq = [];
          gameSeq = [];
          setTimeout(startGame, 4000);
        }
      } else if (res === "wrong") {
        if ($("#strict").hasClass("nonstrict")) {
          i = 0;
          playerSeq = [];
          changeSpeed();
        } else if ($("#strict").hasClass("strict")) {
          count = 1;
          i = 0;
          gameSeq = [];
          playerSeq = [];
          setTimeout(startGame, 1800);
        }
      }
    }
  });

  function startGame() {
    $("#count").val(count);
    playerSeq = [];
    gameSeq.push(Math.floor(1 + Math.random() * 4));
    i = 0;
    changeSpeed();
  }

  function changeSpeed() {
    if (gameSeq.length < 5) {
      makeFlash(1000);
    } else if (gameSeq.length >= 5 && gameSeq.length < 9) {
      makeFlash(900);
    } else if (gameSeq.length >= 9 && gameSeq.length < 13) {
      makeFlash(700);
    } else if (gameSeq.length >= 13) {
      makeFlash(500);
    }
  }
  function isSeqCorrect() {
    var seq = "";
    for (var m = 0; m < playerSeq.length; m++) {
      if (playerSeq[m] !== gameSeq[m]) {
        seq = "wrong";
        playSound(5);
        $("#count").animate({
          "background-color": "red"
        }, 500).delay(1000).animate({
          "background-color": " #b3b3b3"
        }, 1000);
      } else if (playerSeq[m] === gameSeq[m] && playerSeq.length !== gameSeq.length) {
        seq = "unknown";
      } else if (playerSeq[m] === gameSeq[m] && playerSeq.length === gameSeq.length) {
        seq = "correct";
      }
    }
    return seq;
  }

  function makeFlash(speed) {
    setTimeout(function() {
      $("#part" + gameSeq[i]).animate({
        opacity: 1
      }, 50).animate({
        opacity: 0.5
      }, 200);
      playSound(gameSeq[i]);
      i++;
      if (i < gameSeq.length) {
        makeFlash(speed);
      }
    }, speed);
  }

  function playSound(n) {
    var sound = $("#sound" + n)[0];
    sound.play();
  }

  function makeRandom(count) {
    var num = Math.floor(1 + Math.random() * 4);
    gameSeq.push(num);
    return gameSeq;
  }
});
