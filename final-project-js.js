//Create array of questions with answers and correct answers
var myQuestions = [
    {
        question: "Which one of these answers is the Tilde symbol?",
        answers: {
            a: '$',
            b: '~',
            c: '#',
            d: 'none of the above'
        },
        correctAnswer: 'b'
    },
    {
        question: "What does the Tilde symbol represent?",
        answers: {
            a: 'the current directory',
            b: 'the command line',
            c: 'the home directory',
            d: 'none of the above'
        },
        correctAnswer: 'c'
    },
    {
        question: "What does the $ symbol represent?",
        answers: {
            a: 'the cursor',
            b: 'the prompt symbol for the command line',
            c: 'the directory locator',
            d: 'none of the above'
        },
        correctAnswer: 'b'
    },
    {
        question: "What command stages file changes for the next commit?",
        answers: {
            a: 'git add',
            b: 'git push',
            c: 'git init',
            d: 'none of the above'
        },
        correctAnswer: 'a'
    }
];

var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var feedbackContainer = document.getElementById('feedback')
var submitButton = document.getElementById('submit');

generateQuiz(myQuestions, quizContainer, resultsContainer, feedbackContainer, submitButton);

function generateQuiz(questions, quizContainer, resultsContainer, feedbackContainer, submitButton){

    function showQuestions(questions, quizContainer){
        // create variables to store the output and answer choices
        var output = [];
        var answers;

        // for each question...
        for(var i=0; i<questions.length; i++){
            
            // first reset the list of answers
            answers = [];

            // for each available answer...
            for(letter in questions[i].answers){

                // ...add an html radio button
                answers.push(
                    '<label>'
                        + '<input type="radio" name="question'+i+'" value="'+letter+'">'
                        + letter + ': '
                        + questions[i].answers[letter]
                    + '</label>'
                );
            }

            // add this question and its answers to the output
            output.push(
                '<div class="question">' + questions[i].question + '</div>'
                + '<div class="answers">' + answers.join('') + '</div>' + '<br>'
            );
        }

        // combine output list into one string of html and put it on the page
        quizContainer.innerHTML = output.join('');
    }


    function showResults(questions, quizContainer, resultsContainer, feedbackContainer){
        
        // gather answer containers from quiz
        var answerContainers = quizContainer.querySelectorAll('.answers');
        
        // keep track of user's answers
        var userAnswer = '';
        var numCorrect = 0;
        var feedback = 0;
        
        // for each question...
        for(var i=0; i<questions.length; i++){

            // find selected answer
            userAnswer = (answerContainers[i].querySelector('input[name=question'+i+']:checked')||{}).value;
            
            // if answer is correct
            if(userAnswer===questions[i].correctAnswer){
                // add to the number of correct answers
                numCorrect++;
                feedback++;
                
                // color the answers green
                answerContainers[i].style.color = 'lightgreen';
            }
            // if answer is wrong or blank
            else{
                // color the answers red
                answerContainers[i].style.color = 'red';
            }
        }

        // show number of correct answers out of total
        resultsContainer.innerHTML = numCorrect + ' out of ' + questions.length;
        
        // good job or try again
        if(feedback===questions.length){
            feedbackContainer.innerHTML = 'Good Job!'
        }
        else{
            feedbackContainer.innerHTML = 'Try Again!'
        }
    }

    // show questions right away
    showQuestions(questions, quizContainer);
    
    // on submit, show results
    submitButton.onclick = function(){
        showResults(questions, quizContainer, resultsContainer, feedbackContainer);
    }

}