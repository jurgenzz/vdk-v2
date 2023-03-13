export const list = new Map<string, any>()

import { ping } from './lib/ping'
import { echo } from './lib/echo'
import { weather } from './lib/weather'
import { uptime } from './lib/uptime'
// import { coinbase } from "./lib/coinbase.ts";
import { vd } from './lib/vd/'
import { count } from './lib/count'
import { nowPlaying, nowPlayingHere } from './lib/nowPlaying/index'
import { remind } from './lib/remind/index'
// import { search } from "./lib/search.ts";
import { makeQuiz } from './lib/quiz/makeQuiz'
import { quiz } from './lib/quiz/quiz'
import { guess } from './lib/quiz/guess'
import { gibap } from './lib/quiz/gibap'
import { score } from './lib/quiz/score'
import { scoresTop } from './lib/quiz/scoresTop'
import { quizHelp } from './lib/quiz/quizHelp'
import { quizNew } from './lib/quiz/quizNew'
import { clearCache, updateCommands } from './lib/dynamicCommands/checkDynamicCommands'
import { fm } from './lib/fm'
import { setLastFm } from './lib/setLastFm'

list.set('!ping', ping)
list.set('!echo', echo)
list.set('!weather', weather)
list.set('!uptime', uptime)
// list.set("!coinbase", coinbase);
list.set('!vd', vd)
list.set('!count', count)
list.set('!np', fm)
list.set('!spotify', nowPlayingHere)
list.set('!nph', fm)
list.set('!remind', remind)
// list.set("!search", search);
list.set('!quiz.list', quiz)
list.set('!quiz.guess', guess)
list.set('!quiz.gibap', gibap)
list.set('!quiz.make', makeQuiz)
list.set('!quiz.score', score)
list.set('!quiz.top', scoresTop)
list.set('!quiz', quizHelp)
list.set('!quiz.new', quizNew)
list.set("!clear-cache", clearCache);
list.set("!update-cmd", updateCommands)
list.set("!fm", fm)
list.set("!set-lastfm", setLastFm)
