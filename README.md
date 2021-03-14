# 04 Web APIs: Code Quiz
Created by Hunter Barton

## My Work
First I created an array of objects to store my questions and answers. Within each question object there is an array of answer objects that contain the possible answers and a boolean to represent if that is the correct answer. I then made functions to access these objects and display them to the user. These are expandable so any number of questions can be added, and each question can have between 2 and 4 answer choices. When an answer is selected it is checked with the array of answer objects to determine if it is correct. If it is then the app moves on to the next question, if it isnt correct then time is subtracted. Once all questions are answered or time runs out the user is then prompted to input their initials. This input is verified to make sure there are at least two characters. The initials and the score are then added to the high score screen. This screen is displayed along with buttons to clear the high scores and to go back to the start and take the quiz again. All scores can be viewed at any time. 
I used primarily Jquery for the logic, and I used Bootstrap for the UI design. 

## User Story

```
AS A coding boot camp student
I WANT to take a timed quiz on JavaScript fundamentals that stores high scores
SO THAT I can gauge my progress compared to my peers
```

## Acceptance Criteria

```
GIVEN I am taking a code quiz
WHEN I click the start button
THEN a timer starts and I am presented with a question
WHEN I answer a question
THEN I am presented with another question
WHEN I answer a question incorrectly
THEN time is subtracted from the clock
WHEN all questions are answered or the timer reaches 0
THEN the game is over
WHEN the game is over
THEN I can save my initials and my score
```

## Mock-Up

The following animation demonstrates the application functionality:

![A user clicks through an interactive coding quiz, then enters initials to save the high score before resetting and starting over.](assets/images/04-web-apis-homework-demo.gif)

