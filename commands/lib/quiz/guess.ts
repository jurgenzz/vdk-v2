import { Message } from "discord.js";
import { sendMessage } from "../../..";
import { words, scores, updateScore, deleteWord } from "./quizDb";


export const guess = (msg: Message) => {
    const {content, author, channel} = msg;

    const guess = content.replace(/!quiz.guess /, '');

    const isRight = words.get(guess)

    if (isRight) {
        let currentScore = scores.get(author.username) || 0;
        currentScore++;
        
        sendMessage(channel.id, `<@${author.id}> (score: ${currentScore}) guessed: "${guess}" - ${isRight}`)
        updateScore(author.username, currentScore)
        deleteWord(guess, author.username);

    } else {
        sendMessage(channel.id, 'Whoops, no active quiz has this word as an answer');
    }
}