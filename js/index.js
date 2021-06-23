/* ***************************
  JWD JavaScript Assessment

  This code is unfinished. You will need to study it to figure out what it does. Then you will need to use this and
  your own code, to finish the app. 
  
  The tasks you need to do are below.

    TASKS TODO:
      1. Calculate the score as the total of the number of correct answers

      2. Add an Event listener for the submit button, which will display the score and highlight 
         the correct answers when the button is clicked. Use the code from lines 67 to 86 to help you.

      3. Add 2 more questions to the app (each question must have 4 options).

      4. Reload the page when the reset button is clicked (hint: search window.location)

      5. Add a countdown timer - when the time is up, end the quiz, display the score and highlight the correct answers
*************************** */

window.addEventListener("DOMContentLoaded", () => {
  const start = document.querySelector("#start");
  start.addEventListener("click", function (e) {
    document.querySelector("#quizBlock").style.display = "block";
    start.style.display = "none";
    timeCounter();
  });
  // quizArray QUESTIONS & ANSWERS
  // q = QUESTION, o = OPTIONS, a = CORRECT ANSWER
  // Basic ideas from https://code-boxx.com/simple-javascript-quiz/
  const quizArray = [
    {
      q: "Which is the third planet from the sun?",
      o: ["Saturn", "Earth", "Pluto", "Mars"],
      a: 1, // array index 1 - so Earth is the correct answer here
    },
    {
      q: "Which is the largest ocean on Earth?",
      o: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
      a: 3,
    },
    {
      q: "What is the capital of Australia?",
      o: ["Sydney", "Canberra", "Melbourne", "Perth"],
      a: 1,
    },
    // {
    //   q: 'What is the capital of India?',
    //   o: ['Delhi', 'Hyderabad', 'Chennai', 'Mumbai'],
    //   a: 0,
    // },
    // {
    //   q: 'When did our JWD cohort-5 started',
    //   o: ['December', 'May', 'April', 'August'],
    //   a: 2,
    // },
  ];

  // function to Display the quiz questions and answers from the object
  const displayQuiz = () => {
    const quizWrap = document.querySelector("#quizWrap");
    let quizDisplay = "";
    quizArray.map((quizItem, index) => {
      quizDisplay += `<ul class="list-group">
                   Q - ${quizItem.q}
                    <li class="list-group-item list-group-item-action mt-2" id="li_${index}_0"><input type="radio" name="radio${index}" id="radio_${index}_0"> <label for="radio_${index}_0">  ${quizItem.o[0]} </label></li>
                    <li class="list-group-item list-group-item-action " id="li_${index}_1"><input type="radio" name="radio${index}" id="radio_${index}_1"><label for="radio_${index}_1"> ${quizItem.o[1]} </label></li>
                    <li class="list-group-item list-group-item-action"  id="li_${index}_2"><input type="radio" name="radio${index}" id="radio_${index}_2"><label for="radio_${index}_2"> ${quizItem.o[2]} </label></li>
                    <li class="list-group-item list-group-item-action"  id="li_${index}_3"><input type="radio" name="radio${index}" id="radio_${index}_3"><label for="radio_${index}_3"> ${quizItem.o[3]} </label></li>
                    </ul>
                    <div>&nbsp;</div>`;
      quizWrap.innerHTML = quizDisplay;
    });
  };

  // Calculate the score
  const calculateScore = () => {
    let score = 0;
    quizArray.map((quizItem, index) => {
      for (let i = 0; i < 4; i++) {
        //highlight the li if it is the correct answer
        let li = `li_${index}_${i}`;
        let r = `radio_${index}_${i}`;
        liElement = document.querySelector("#" + li);
        radioElement = document.querySelector("#" + r);
        //disabling the list items after submit
        liElement.className="list-group-item disabled";
        if (quizItem.a == i) {
          //change background color of li element here
          document.getElementById(li).style.backgroundColor = " rgba(152, 243, 174, 0.4)";
        }

        if (radioElement.checked && quizItem.a == i) {
          // code for task 1 goes here
          score++;
        }
      }
    });
    document.getElementById("score").innerHTML = `Your Score is: ${score}`;
    document.getElementById("time").innerHTML = "0";
  };

  // call the displayQuiz function
  displayQuiz();
  //declare submit button
  const submit = document.getElementById("btnSubmit");
  //add event to calcuate score on click
  submit.addEventListener("click", calculateScore);

  const reset = document.getElementById("btnReset");

  reset.addEventListener("click", function (e) {
    // console.log("windolocat:"+window.location.href);
    window.location.assign(window.location.href);
//another way of reset button 

    // document.querySelector("#quizBlock").style.display = "none";
    // start.style.display = "block";
    // document.getElementById("score").innerHTML = "";
    // quizArray.map((quizItem, index) => {
    //   for (let i = 0; i < 4; i++) {
    //     //highlight the li if it is the correct answer
    //     let li = `li_${index}_${i}`;
    //     liElement = document.querySelector("#" + li);
    //     if (quizItem.a == i) {
    //       //change background color of li element here
    //       document.getElementById(li).style.backgroundColor = "";
    //     }
    //   }
    //   document.getElementById("time").innerHTML = "30sec";

    // });
  });
  //end form
});
const timeCounter = () => {
  var countDownDate1 = new Date();
  countDownDate1.setSeconds(countDownDate1.getSeconds() + 15);
  var countDownDate = countDownDate1.getTime();

  


  // Update the count down every 1 second
  var x = setInterval(function () {
    let time = document.getElementById("time").innerHTML;
    // Get today's date and time
    var now = new Date().getTime();
    // Find the distance between now and the count down date
    var distance = countDownDate - now;
    // Time calculations for seconds
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    // Output the result in an element with id="time"
    if(time == "0"){
      clearInterval(x);
    } else{
    document.getElementById("time").innerHTML = seconds + "s ";
    }
    // If the count down is over, write some text
    if (distance < 0 ) {
        clearInterval(x);
        $("#btnSubmit").trigger("click");
        document.getElementById("time").innerHTML = "EXPIRED";
      
     
    }
  }, 1000);
};
