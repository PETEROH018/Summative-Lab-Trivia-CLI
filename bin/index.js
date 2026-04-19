#!/usr/bin/env node

import { program } from "commander";
import { startQuiz } from "../src/lib/gameLogic.js";  
import triviaQuestions from "../src/lib/triviaQuestions.js"

startQuiz(triviaQuestions)
program.parse(process.argv);