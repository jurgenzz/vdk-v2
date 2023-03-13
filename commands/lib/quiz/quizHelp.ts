import { Message } from "discord.js";
import { sendMessage } from "../../..";

export const quizHelp = (msg: Message) => {
  const { channel } = msg;

  const reply = "Commands: `!quiz.list`, `!quiz.make word:definition`, `!quiz.guess word`, `!quiz.gibap word`, `!quiz.score`, `!quiz.top`"
  sendMessage(channel.id, reply);
};
