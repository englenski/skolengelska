/* School Talk – grammatik
   rule:     korta förklaringar på svenska (punktlista)
   examples: [engelska, svenska]
   quiz:     [mening med ___, rätt svar, [fel svar], svensk översättning]
*/
const GRAMMAR = [
  {
    id: "fragor", sv: "Frågor med do, does och did", en: "Questions", icon: "❓",
    rule: [
      "På svenska byter vi bara ordföljd: <em>Förstår du?</em> På engelska behövs oftast ett hjälpverb: <strong>Do</strong> you understand?",
      "<strong>do</strong> används med I, you, we, they. <strong>does</strong> med he, she, it. <strong>did</strong> i dåtid för alla.",
      "Efter do/does/did står huvudverbet i grundform: Does she <strong>need</strong> help? (inte <em>needs</em>)",
      "Med be, can, have got och will behövs inget do: <strong>Are</strong> you ready? <strong>Can</strong> I go?"
    ],
    examples: [
      ["Do you understand?", "Förstår du?"],
      ["Does everyone have a calculator?", "Har alla en miniräknare?"],
      ["Did you do your homework?", "Gjorde du din läxa?"],
      ["What do we need for the test?", "Vad behöver vi till provet?"],
      ["Where did you put your book?", "Var lade du din bok?"],
      ["Are you ready to start?", "Är ni redo att börja?"]
    ],
    quiz: [
      ["___ you understand the question?", "Do", ["Does", "Are"], "Förstår du frågan?"],
      ["___ she need more time?", "Does", ["Do", "Is"], "Behöver hon mer tid?"],
      ["___ you finish the task yesterday?", "Did", ["Do", "Have"], "Blev du klar med uppgiften i går?"],
      ["Does he ___ a ruler?", "need", ["needs", "needed"], "Behöver han en linjal?"],
      ["What ___ this word mean?", "does", ["do", "is"], "Vad betyder det här ordet?"],
      ["___ you ready?", "Are", ["Do", "Does"], "Är ni redo?"],
      ["Where ___ you find the answer?", "did", ["do", "have"], "Var hittade du svaret?"],
      ["How many sides ___ a hexagon have?", "does", ["do", "is"], "Hur många sidor har en hexagon?"],
      ["Did you ___ your book at home?", "leave", ["left", "leaves"], "Glömde du boken hemma?"],
      ["___ we use a calculator?", "Can", ["Do", "Does"], "Får vi använda miniräknare?"]
    ]
  },
  {
    id: "artig", sv: "Artig engelska", en: "Being polite", icon: "🎩",
    rule: [
      "Engelska låter ofta mjukare än svenska. <em>Stäng fönstret</em> blir gärna <strong>Could you close the window, please?</strong>",
      "<strong>Can I …?</strong> = Får jag …? (vardagligt). <strong>Could I …?</strong> och <strong>May I …?</strong> är artigare.",
      "<strong>Could you …?</strong> och <strong>Would you mind …ing?</strong> när du ber någon om något.",
      "<strong>Would you like …?</strong> = Vill du ha …? (artigare än <em>Do you want</em>). <strong>I'd like …</strong> = Jag skulle vilja …",
      "Lägg gärna till <strong>please</strong>, <strong>thank you</strong> och <strong>sorry</strong>. De används oftare än tack och förlåt på svenska."
    ],
    examples: [
      ["Could you help me, please?", "Kan du hjälpa mig, tack?"],
      ["Could I borrow your pen?", "Får jag låna din penna?"],
      ["Would you like a cup of tea?", "Vill du ha en kopp te?"],
      ["I'd like to talk about the test.", "Jag skulle vilja prata om provet."],
      ["Would you mind closing the door?", "Skulle du kunna stänga dörren?"],
      ["Sorry, could you say that again?", "Förlåt, kan du säga det igen?"]
    ],
    quiz: [
      ["___ you help me with this task, please?", "Could", ["Do", "Will to"], "Kan du hjälpa mig med den här uppgiften?"],
      ["___ you like a coffee?", "Would", ["Do", "Could"], "Vill du ha en kaffe?"],
      ["I'd ___ to book a meeting.", "like", ["want", "liking"], "Jag skulle vilja boka ett möte."],
      ["Would you mind ___ the window?", "opening", ["open", "to open"], "Skulle du kunna öppna fönstret?"],
      ["___ I borrow your rubber?", "Could", ["Would", "Do"], "Får jag låna ditt suddgummi?"],
      ["Sorry, could you speak more ___, please?", "slowly", ["slow", "slower"], "Förlåt, kan du prata långsammare, tack?"],
      ["Thank you ___ coming.", "for", ["to", "of"], "Tack för att ni kom."],
      ["___ I come in?", "May", ["Would", "Shall to"], "Får jag komma in?"]
    ]
  },
  {
    id: "uppmaningar", sv: "Uppmaningar och let's", en: "Instructions", icon: "👉",
    rule: [
      "En uppmaning börjar med verbet i grundform: <strong>Open</strong> your books. <strong>Listen</strong> carefully.",
      "Nekande: <strong>Don't</strong> + verb: <strong>Don't</strong> forget the units.",
      "<strong>Let's</strong> + verb när du själv är med: <strong>Let's</strong> start. (= Nu sätter vi igång.)",
      "Gör uppmaningen vänligare med <strong>please</strong> först eller sist: <strong>Please</strong> sit down."
    ],
    examples: [
      ["Open your books at page ten.", "Öppna böckerna på sidan tio."],
      ["Don't forget your homework.", "Glöm inte läxan."],
      ["Let's check the answers together.", "Vi rättar svaren tillsammans."],
      ["Please put your hand up.", "Räck upp handen, tack."],
      ["Don't write in the book.", "Skriv inte i boken."],
      ["Let's take a short break.", "Vi tar en kort paus."]
    ],
    quiz: [
      ["___ your books at page twenty.", "Open", ["Opens", "To open"], "Öppna böckerna på sidan tjugo."],
      ["___ forget to show your working.", "Don't", ["Not", "No"], "Glöm inte att visa era uträkningar."],
      ["___ start the lesson.", "Let's", ["Lets'", "We let"], "Nu börjar vi lektionen."],
      ["Please ___ quietly.", "work", ["working", "works"], "Arbeta tyst, tack."],
      ["Let's ___ the answers.", "check", ["to check", "checking"], "Vi kontrollerar svaren."],
      ["___ talk during the test.", "Don't", ["Doesn't", "No"], "Prata inte under provet."],
      ["___ carefully to the question.", "Listen", ["Hear", "Listening"], "Lyssna noga på frågan."],
      ["Let's not ___ about that now.", "worry", ["worrying", "to worry"], "Vi oroar oss inte för det nu."]
    ]
  },
  {
    id: "presens", sv: "Nutid: I work eller I'm working?", en: "Present tense", icon: "⏱️",
    rule: [
      "<strong>Enkel presens</strong> (I work) för vanor, fakta och schema: I <strong>teach</strong> maths. The lesson <strong>starts</strong> at nine.",
      "Kom ihåg <strong>-s</strong> på he, she, it: She <strong>works</strong> hard. It <strong>takes</strong> ten minutes.",
      "<strong>Pågående presens</strong> (am/is/are + -ing) för det som händer just nu: We <strong>are working</strong> on chapter four.",
      "Svenskan har bara en form, så fråga dig: händer det just nu eller brukar det hända?"
    ],
    examples: [
      ["I teach maths and science.", "Jag undervisar i matte och NO."],
      ["The lesson starts at nine.", "Lektionen börjar klockan nio."],
      ["She always asks good questions.", "Hon ställer alltid bra frågor."],
      ["We're working on fractions this week.", "Vi arbetar med bråk den här veckan."],
      ["What are you doing?", "Vad gör du?"],
      ["He's talking to the head teacher.", "Han pratar med rektorn."]
    ],
    quiz: [
      ["Look! It ___ outside.", "is snowing", ["snows", "snow"], "Titta! Det snöar ute."],
      ["The lesson ___ at half past eight.", "starts", ["is starting", "start"], "Lektionen börjar halv nio."],
      ["She ___ in Year 8.", "is", ["are", "be"], "Hon går i åttan."],
      ["We ___ on chapter four right now.", "are working", ["work", "works"], "Vi arbetar med kapitel fyra just nu."],
      ["He usually ___ his homework.", "does", ["do", "is doing"], "Han brukar göra sin läxa."],
      ["Quiet, please. Sara ___ her answer.", "is explaining", ["explains", "explain"], "Tyst, tack. Sara förklarar sitt svar."],
      ["It ___ about ten minutes.", "takes", ["take", "is take"], "Det tar ungefär tio minuter."],
      ["What ___ you doing?", "are", ["do", "does"], "Vad gör du?"]
    ]
  },
  {
    id: "datid", sv: "Dåtid och oregelbundna verb", en: "Past simple", icon: "⏪",
    rule: [
      "Regelbundna verb får <strong>-ed</strong>: work → work<strong>ed</strong>, finish → finish<strong>ed</strong>.",
      "Många vanliga verb är oregelbundna: go → <strong>went</strong>, do → <strong>did</strong>, have → <strong>had</strong>, forget → <strong>forgot</strong>, leave → <strong>left</strong>, write → <strong>wrote</strong>.",
      "I frågor och nekande används <strong>did</strong> + grundform: <strong>Did</strong> you <strong>go</strong>? I <strong>didn't</strong> <strong>understand</strong>.",
      "Dåtid används när tidpunkten är klar: yesterday, last week, on Monday, in 2020."
    ],
    examples: [
      ["I forgot my book yesterday.", "Jag glömde min bok i går."],
      ["We went to the museum last week.", "Vi åkte till museet förra veckan."],
      ["She wrote a very good answer.", "Hon skrev ett mycket bra svar."],
      ["I didn't understand the question.", "Jag förstod inte frågan."],
      ["Did you finish the test?", "Blev du klar med provet?"],
      ["The students worked really hard.", "Eleverna arbetade riktigt hårt."]
    ],
    quiz: [
      ["I ___ my calculator at home yesterday.", "left", ["leaved", "leave"], "Jag glömde miniräknaren hemma i går."],
      ["We ___ to Stockholm last weekend.", "went", ["goed", "go"], "Vi åkte till Stockholm i helgen som var."],
      ["She ___ the answer on the board.", "wrote", ["writed", "write"], "Hon skrev svaret på tavlan."],
      ["I didn't ___ the homework.", "understand", ["understood", "understands"], "Jag förstod inte läxan."],
      ["Did you ___ a nice weekend?", "have", ["had", "has"], "Hade du en trevlig helg?"],
      ["The test ___ really difficult.", "was", ["were", "is been"], "Provet var riktigt svårt."],
      ["They ___ the task in ten minutes.", "finished", ["finish", "finishing"], "De blev klara med uppgiften på tio minuter."],
      ["He ___ his homework on the bus.", "did", ["done", "doed"], "Han gjorde sin läxa på bussen."],
      ["I ___ you an email on Monday.", "sent", ["sended", "send"], "Jag skickade ett mejl till dig i måndags."]
    ]
  },
  {
    id: "framtid", sv: "Framtid: going to och will", en: "Future", icon: "⏩",
    rule: [
      "<strong>going to</strong> för planer: Today we're <strong>going to</strong> solve equations.",
      "<strong>will</strong> ('ll) för beslut du tar just nu och löften: I<strong>'ll</strong> send you an email.",
      "Nekande: <strong>won't</strong> (= will not): I <strong>won't</strong> be here on Friday.",
      "Schemalagda saker kan också stå i presens: The test <strong>is</strong> on Thursday."
    ],
    examples: [
      ["Today we're going to work in groups.", "Idag ska vi arbeta i grupper."],
      ["I'll help you in a minute.", "Jag hjälper dig om en minut."],
      ["The test is going to be on Thursday.", "Provet blir på torsdag."],
      ["I won't be here tomorrow.", "Jag är inte här i morgon."],
      ["Will you be at the meeting?", "Kommer du på mötet?"],
      ["I'll get back to you tomorrow.", "Jag återkommer till dig i morgon."]
    ],
    quiz: [
      ["Today we're ___ to learn about angles.", "going", ["go", "will"], "Idag ska vi lära oss om vinklar."],
      ["Wait, I___ help you.", "'ll", ["'m", "'d going"], "Vänta, jag hjälper dig."],
      ["I ___ be at school on Friday. I'm on a course.", "won't", ["don't", "willn't"], "Jag är inte i skolan på fredag. Jag är på kurs."],
      ["Next week we are going ___ a test.", "to have", ["have", "having"], "Nästa vecka ska vi ha prov."],
      ["Don't worry, I ___ tell anyone.", "won't", ["not will", "am not"], "Oroa dig inte, jag säger inget till någon."],
      ["___ you be at the parents' meeting?", "Will", ["Are", "Do"], "Kommer du på föräldramötet?"],
      ["Look at those clouds. It's ___ rain.", "going to", ["will to", "go to"], "Titta på de där molnen. Det kommer att regna."],
      ["I'll ___ you the plan tomorrow.", "send", ["sending", "to send"], "Jag skickar planeringen till dig i morgon."]
    ]
  },
  {
    id: "perfekt", sv: "I have finished: perfekt", en: "Present perfect", icon: "✅",
    rule: [
      "<strong>have/has + perfekt particip</strong>: I <strong>have finished</strong>. She <strong>has done</strong> it.",
      "Används när något har hänt men tidpunkten inte är viktig, eller fortfarande gäller: I<strong>'ve</strong> finished. (= jag är klar nu)",
      "Vanliga ord: <strong>already</strong>, <strong>yet</strong>, <strong>ever</strong>, <strong>never</strong>, <strong>just</strong>.",
      "Svensk fälla: med <em>yesterday</em> eller <em>last week</em> ska det vara dåtid. Säg <em>I finished yesterday</em>, inte <em>I have finished yesterday</em>.",
      "<strong>for</strong> + tidslängd (for two years), <strong>since</strong> + startpunkt (since 2020): I've worked here <strong>since</strong> 2020."
    ],
    examples: [
      ["I've finished. What should I do now?", "Jag är klar. Vad ska jag göra nu?"],
      ["Have you done your homework yet?", "Har du gjort läxan än?"],
      ["She has already handed in her test.", "Hon har redan lämnat in provet."],
      ["I've worked at this school for five years.", "Jag har jobbat på den här skolan i fem år."],
      ["We haven't started chapter five yet.", "Vi har inte börjat på kapitel fem än."],
      ["Have you ever been to London?", "Har du någonsin varit i London?"]
    ],
    quiz: [
      ["I've ___ the task. What's next?", "finished", ["finish", "finishing"], "Jag är klar med uppgiften. Vad är nästa?"],
      ["Have you done your homework ___?", "yet", ["already", "since"], "Har du gjort läxan än?"],
      ["She ___ already handed in her test.", "has", ["have", "is"], "Hon har redan lämnat in provet."],
      ["I ___ the email yesterday.", "sent", ["have sent", "has sent"], "Jag skickade mejlet i går."],
      ["I've worked here ___ 2019.", "since", ["for", "from"], "Jag har jobbat här sedan 2019."],
      ["We've known each other ___ ten years.", "for", ["since", "in"], "Vi har känt varandra i tio år."],
      ["Have you ___ been to Scotland?", "ever", ["yet", "since"], "Har du någonsin varit i Skottland?"],
      ["He has ___ his book at home again.", "left", ["leave", "leaved"], "Han har glömt boken hemma igen."]
    ]
  },
  {
    id: "prepositioner", sv: "Prepositioner: in, on, at", en: "Prepositions", icon: "📍",
    rule: [
      "<strong>Tid:</strong> <strong>at</strong> för klockslag (at nine), <strong>on</strong> för dagar och datum (on Monday, on the 5th of May), <strong>in</strong> för månader, år och delar av dagen (in May, in the morning).",
      "<strong>Plats:</strong> <strong>in</strong> = inuti (in the classroom), <strong>on</strong> = på en yta (on the board, on the desk), <strong>at</strong> = vid en punkt (at the door, at school).",
      "Fasta uttryck i skolan: <strong>on</strong> page ten, <strong>at</strong> the top, <strong>at</strong> the bottom, <strong>in</strong> pairs, <strong>in</strong> groups, <strong>at</strong> the end of the lesson.",
      "Svenska fällor: <em>på mötet</em> = <strong>at</strong> the meeting, <em>på engelska</em> = <strong>in</strong> English, <em>bra på</em> = good <strong>at</strong>."
    ],
    examples: [
      ["The lesson starts at nine o'clock.", "Lektionen börjar klockan nio."],
      ["The test is on Thursday.", "Provet är på torsdag."],
      ["We'll have the trip in May.", "Vi gör resan i maj."],
      ["Open your books on page twelve.", "Öppna böckerna på sidan tolv."],
      ["Write your name at the top.", "Skriv ditt namn längst upp."],
      ["She's really good at maths.", "Hon är riktigt bra på matte."]
    ],
    quiz: [
      ["The test is ___ Friday.", "on", ["in", "at"], "Provet är på fredag."],
      ["The meeting starts ___ three o'clock.", "at", ["on", "in"], "Mötet börjar klockan tre."],
      ["Look at the example ___ page fifteen.", "on", ["at", "in"], "Titta på exemplet på sidan femton."],
      ["We have a break ___ the morning.", "in", ["on", "at"], "Vi har rast på förmiddagen."],
      ["Write the answer ___ the board.", "on", ["in", "at"], "Skriv svaret på tavlan."],
      ["Work ___ pairs, please.", "in", ["on", "at"], "Arbeta i par, tack."],
      ["He is very good ___ geometry.", "at", ["on", "in"], "Han är väldigt bra på geometri."],
      ["How do you say this ___ English?", "in", ["on", "at"], "Hur säger man det här på engelska?"],
      ["See you ___ the staff meeting.", "at", ["on", "in"], "Vi ses på personalmötet."],
      ["Hand in your work ___ the end of the lesson.", "at", ["in", "on"], "Lämna in ert arbete i slutet av lektionen."]
    ]
  },
  {
    id: "tal", sv: "Säga tal, datum och klockan", en: "Numbers and dates", icon: "🔢",
    rule: [
      "Decimaler sägs med <strong>point</strong>: 3.5 = <strong>three point five</strong>. Engelskan skriver punkt, inte komma.",
      "Stora tal har komma som tusentalsavgränsare: 2,500 = <strong>two thousand five hundred</strong>. Brittisk engelska säger <strong>and</strong>: 120 = one hundred <strong>and</strong> twenty.",
      "Datum: <strong>the twelfth of May</strong> (skrivs 12 May). Ordningstal: first, second, third, fourth … twentieth.",
      "Klockan: <strong>half past</strong> eight = halv nio! <strong>quarter past</strong> = kvart över, <strong>quarter to</strong> = kvart i.",
      "Bråk: a half, a third, a quarter, three fifths. Procent: twenty <strong>per cent</strong>."
    ],
    examples: [
      ["The answer is three point seven five.", "Svaret är tre komma sju fem."],
      ["One hundred and twenty-five.", "Etthundratjugofem."],
      ["The trip is on the twelfth of May.", "Resan är den tolfte maj."],
      ["The lesson starts at half past eight.", "Lektionen börjar halv nio."],
      ["We meet at quarter to three.", "Vi ses kvart i tre."],
      ["Three quarters of the class passed.", "Tre fjärdedelar av klassen klarade det."]
    ],
    quiz: [
      ["2.5 is said two ___ five.", "point", ["comma", "dot"], "2,5 uttalas två komma fem."],
      ["08:30 is half past ___.", "eight", ["nine", "seven"], "08.30 är halv nio."],
      ["The meeting is on the ___ of May.", "third", ["three", "thirdth"], "Mötet är den tredje maj."],
      ["14:45 is quarter ___ three.", "to", ["past", "before"], "14.45 är kvart i tre."],
      ["150 is one hundred ___ fifty.", "and", ["with", "plus"], "150 är etthundrafemtio."],
      ["¼ is a ___.", "quarter", ["fourth part", "four"], "¼ är en fjärdedel."],
      ["Today is the twenty-___ of November.", "first", ["one", "oneth"], "Idag är det den tjugoförsta november."],
      ["Fifty ___ of the students chose maths.", "per cent", ["percents", "procent"], "Femtio procent av eleverna valde matte."]
    ]
  },
  {
    id: "fallor", sv: "Svenska fällor", en: "Common mistakes", icon: "⚠️",
    rule: [
      "<strong>learn</strong> = lära sig, <strong>teach</strong> = lära ut: I <strong>teach</strong> maths. (inte <em>I learn them maths</em>)",
      "<strong>borrow</strong> = låna av någon, <strong>lend</strong> = låna ut: Can I <strong>borrow</strong> your pen? Can you <strong>lend</strong> me a pen?",
      "<strong>homework</strong>, <strong>information</strong> och <strong>advice</strong> har ingen plural och inget a: some homework, a piece of advice.",
      "<strong>make</strong> eller <strong>do</strong>? do homework, do a test, do a task, men make a mistake, make a decision.",
      "Lömska ord: <strong>actually</strong> = faktiskt (inte aktuellt), <strong>eventually</strong> = till slut (inte eventuellt), <strong>become</strong> = bli (inte få)."
    ],
    examples: [
      ["I teach maths to Year 9.", "Jag undervisar matte i nian."],
      ["Can I borrow your ruler?", "Får jag låna din linjal?"],
      ["Could you lend me a pencil?", "Kan du låna mig en penna?"],
      ["We have a lot of homework today.", "Vi har mycket läxor idag."],
      ["Everyone makes mistakes.", "Alla gör fel."],
      ["Eventually, she found the answer.", "Till slut hittade hon svaret."]
    ],
    quiz: [
      ["I ___ maths at a secondary school.", "teach", ["learn", "lern"], "Jag undervisar i matte på en högstadieskola."],
      ["Can I ___ your calculator?", "borrow", ["lend", "loan me"], "Får jag låna din miniräknare?"],
      ["Could you ___ me a rubber?", "lend", ["borrow", "learn"], "Kan du låna mig ett suddgummi?"],
      ["We have a lot of ___ this week.", "homework", ["homeworks", "a homework"], "Vi har mycket läxor den här veckan."],
      ["It's okay to ___ mistakes.", "make", ["do", "doing"], "Det är okej att göra fel."],
      ["Please ___ exercises one to five.", "do", ["make", "making"], "Gör övning ett till fem, tack."],
      ["I need some ___ about the trip.", "information", ["informations", "an information"], "Jag behöver lite information om resan."],
      ["He wants to ___ a teacher.", "become", ["get", "bekomme"], "Han vill bli lärare."],
      ["___, I think your first answer was right.", "Actually", ["Eventually", "Actual"], "Faktiskt tror jag att ditt första svar var rätt."]
    ]
  }
];
