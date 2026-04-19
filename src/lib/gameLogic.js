import { input,select } from "@inquirer/prompts"

let timeLeft = 30

//This function handles the timing for each question.
// It starts a timer that counts down from 30 seconds and if the time runs out, it clears the timer and exits the game by calling exitGame().

export function handleTiming(){
    const timer = setInterval(() => {
        timeLeft -= 1
        if (timeLeft <= 0) {
            clearInterval(timer)
            console.log("\nTime's up!")
            exitGame()
        
        }
    }, 1000) 
    return timer   

}

//This function handles the display of each question and the user's input. 
// It takes a question object as an argument, displays the question and options to the user, and prompts them for their answer. 
// It also shows the time left for answering the question.

export async function handleQuestion(question) {
    const answer = await input({
        message: `Question: ${question.question}\nOptions:\n${question.options.join("\n")}\nTime left: ${timeLeft}\nYour answer:`,
    })
    return answer
}

//This function is used to restart the quiz or exit the game after the quiz is complete. 
// It prompts the user to select either "Restart" or "Quit". 
// If the user selects "Restart", it calls the startQuiz function again with the same questions. 
// If the user selects "Quit", it calls the exitGame function.
export async function redoQuiz(questions){
    const action = await select({ message: "Please select Restart to play again or Quit to exit", 
        choices: [{ name: "Restart", value: "back" }, { name: "Quit", value: "quit" }] 
    });
    
    if (action === "back") {
        startQuiz(questions)
    } else {
        exitGame()
    }
}
// This function is used to exit the game. It displays a goodbye message and then exits the process.
export function exitGame(){
    console.log("Thanks for playing, bye!!!")
    process.exit(0)
}

// This function is the main function that starts the quiz. 
// It takes an array of questions as an argument and iterates through each question, calling the handleTiming and handleQuestion functions for each one.
// An if statement checks if the user's answer is correct and displays a message accordingly.
// After all questions have been answered, it displays a completion message and resets the timeLeft variable before calling the redoQuiz function to prompt the user to restart or quit the game.
export async function startQuiz(questions) {
    for (const question of questions) {
        const timer = handleTiming()
        const userAnswer = await handleQuestion(question)
        clearInterval(timer)
        if (userAnswer.toUpperCase() === question.answer) {
            console.log("Correct!")
        } else {
            console.log(`You're wrong, this is the correct answer: ${question.answer}`)
        }
    }
    console.log("Quiz complete!")
    timeLeft = 30
    redoQuiz(questions)
}
