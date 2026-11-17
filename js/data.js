/* School Talk – innehåll
   Dialograder: [rollnyckel, engelska, svenska]
   Fraser:      [engelska, svenska]
*/
const THEMES = [
  {
    id: "klassrummet", sv: "Klassrummet", en: "In the classroom", icon: "🏫",
    dialogues: [
      {
        title: "Lektionen börjar", en: "The lesson starts",
        roles: { T: "Lärare", E: "Elev" },
        lines: [
          ["T", "Good morning, everyone. Please take your seats.", "God morgon allihop. Sätt er på era platser."],
          ["E", "Good morning. Sorry I'm late.", "God morgon. Förlåt att jag är sen."],
          ["T", "That's all right. Please sit down quickly.", "Det är okej. Sätt dig snabbt."],
          ["E", "Where should I sit?", "Var ska jag sitta?"],
          ["T", "There's a free seat next to Sara.", "Det finns en ledig plats bredvid Sara."],
          ["T", "Today we're going to work on chapter four.", "Idag ska vi arbeta med kapitel fyra."],
          ["E", "Do we need our exercise books?", "Behöver vi våra skrivhäften?"],
          ["T", "Yes, and a pencil and a rubber, please.", "Ja, och en blyertspenna och ett suddgummi, tack."]
        ]
      },
      {
        title: "Lugn i klassrummet", en: "A calm classroom",
        roles: { T: "Lärare", E: "Elev" },
        lines: [
          ["T", "Can I have everyone's attention, please?", "Kan jag få allas uppmärksamhet, tack?"],
          ["T", "It's a bit noisy in here.", "Det är lite högljutt här inne."],
          ["E", "Sorry, we were talking about the homework.", "Förlåt, vi pratade om läxan."],
          ["T", "That's good, but please put your phones away.", "Det är bra, men lägg undan era mobiler, tack."],
          ["E", "Can I keep my phone on the desk?", "Får jag ha mobilen på bänken?"],
          ["T", "No, it goes in your bag until the break.", "Nej, den ska ligga i väskan till rasten."],
          ["E", "Okay. When is the break?", "Okej. När är rasten?"],
          ["T", "In twenty minutes. Let's get started.", "Om tjugo minuter. Nu sätter vi igång."]
        ]
      }
    ],
    phrases: [
      ["Please take your seats.", "Sätt er på era platser."],
      ["Open your books at page twenty.", "Öppna böckerna på sidan tjugo."],
      ["Can everyone see the board?", "Kan alla se tavlan?"],
      ["Put your hand up, please.", "Räck upp handen, tack."],
      ["Please put your phones away.", "Lägg undan mobilerna, tack."],
      ["Who is absent today?", "Vem är frånvarande idag?"],
      ["Let's get started.", "Nu sätter vi igång."],
      ["Please work quietly.", "Arbeta tyst, tack."],
      ["Can you close the window, please?", "Kan du stänga fönstret, tack?"],
      ["We'll take a five-minute break.", "Vi tar fem minuters paus."],
      ["Pack up your things.", "Packa ihop era saker."],
      ["See you tomorrow.", "Vi ses i morgon."]
    ]
  },
  {
    id: "hjalp", sv: "Be om hjälp", en: "Asking for help", icon: "🙋",
    dialogues: [
      {
        title: "Eleven behöver hjälp", en: "A pupil needs help",
        roles: { E: "Elev", T: "Lärare" },
        lines: [
          ["E", "Excuse me, could you help me?", "Ursäkta, kan du hjälpa mig?"],
          ["T", "Of course. What's the problem?", "Självklart. Vad är problemet?"],
          ["E", "I don't understand this question.", "Jag förstår inte den här frågan."],
          ["T", "Let's read it together.", "Vi läser den tillsammans."],
          ["E", "What does this word mean?", "Vad betyder det här ordet?"],
          ["T", "It means about the same. Does that help?", "Det betyder ungefär samma. Hjälper det?"],
          ["E", "Yes, I think I get it now.", "Ja, jag tror att jag fattar nu."],
          ["T", "Great. Ask me again if you get stuck.", "Bra. Fråga mig igen om du kör fast."]
        ]
      },
      {
        title: "Läraren ber eleven upprepa", en: "Could you say that again?",
        roles: { T: "Lärare", E: "Elev" },
        lines: [
          ["T", "Sorry, could you say that again?", "Förlåt, kan du säga det igen?"],
          ["E", "Of course. I said I left my book at home.", "Visst. Jag sa att jag glömde boken hemma."],
          ["T", "Could you speak a little more slowly, please?", "Kan du prata lite långsammare, tack?"],
          ["E", "I left my book at home.", "Jag glömde boken hemma."],
          ["T", "Thank you. You can share with your neighbour today.", "Tack. Du kan dela med din bänkgranne idag."],
          ["E", "How do you say läxa in English?", "Hur säger man läxa på engelska?"],
          ["T", "Homework. Good question!", "Homework. Bra fråga!"]
        ]
      }
    ],
    phrases: [
      ["Could you help me, please?", "Kan du hjälpa mig, tack?"],
      ["I don't understand.", "Jag förstår inte."],
      ["Could you say that again?", "Kan du säga det igen?"],
      ["Could you speak more slowly, please?", "Kan du prata långsammare, tack?"],
      ["What does this word mean?", "Vad betyder det här ordet?"],
      ["How do you say this in English?", "Hur säger man det här på engelska?"],
      ["I'm stuck on question three.", "Jag har kört fast på fråga tre."],
      ["Can you show me an example?", "Kan du visa ett exempel?"],
      ["Is this right?", "Är det här rätt?"],
      ["I need more time.", "Jag behöver mer tid."],
      ["Do you mean this one?", "Menar du den här?"],
      ["Thank you, that helps a lot.", "Tack, det hjälper mycket."]
    ]
  },
  {
    id: "instruktioner", sv: "Instruktioner", en: "Giving instructions", icon: "📋",
    dialogues: [
      {
        title: "Starta en uppgift", en: "Starting a task",
        roles: { T: "Lärare", E: "Elev" },
        lines: [
          ["T", "Listen carefully, please.", "Lyssna noga, tack."],
          ["T", "First, read the text on page twelve.", "Först läser ni texten på sidan tolv."],
          ["T", "Then answer questions one to five.", "Sedan svarar ni på fråga ett till fem."],
          ["E", "Should we work alone or in pairs?", "Ska vi jobba själva eller i par?"],
          ["T", "Work alone for ten minutes.", "Jobba själva i tio minuter."],
          ["T", "After that, compare your answers with a partner.", "Efter det jämför ni era svar med en kamrat."],
          ["E", "Do we write in the book?", "Skriver vi i boken?"],
          ["T", "No, write in your exercise book, please.", "Nej, skriv i skrivhäftet, tack."]
        ]
      },
      {
        title: "När man är klar", en: "When you have finished",
        roles: { E: "Elev", T: "Lärare" },
        lines: [
          ["E", "I've finished. What should I do now?", "Jag är klar. Vad ska jag göra nu?"],
          ["T", "Well done. Check your answers first.", "Bra jobbat. Kontrollera dina svar först."],
          ["E", "I've already checked them.", "Jag har redan kontrollerat dem."],
          ["T", "Then try the challenge task on the next page.", "Försök då med utmaningsuppgiften på nästa sida."],
          ["E", "Is it difficult?", "Är den svår?"],
          ["T", "A little, but you can do it.", "Lite, men du klarar det."],
          ["T", "Remember to show how you worked it out.", "Kom ihåg att visa hur du kom fram till det."]
        ]
      }
    ],
    phrases: [
      ["Listen carefully.", "Lyssna noga."],
      ["Read the text first.", "Läs texten först."],
      ["Answer the questions in full sentences.", "Svara på frågorna med hela meningar."],
      ["Work in pairs.", "Arbeta i par."],
      ["You have ten minutes.", "Ni har tio minuter."],
      ["Write the date at the top.", "Skriv datumet längst upp."],
      ["Underline the key words.", "Stryk under nyckelorden."],
      ["Compare your answers with a partner.", "Jämför era svar med en kamrat."],
      ["Hand in your work at the end of the lesson.", "Lämna in ert arbete i slutet av lektionen."],
      ["Don't forget to show your working.", "Glöm inte att visa era uträkningar."],
      ["When you have finished, check your answers.", "När ni är klara, kontrollera era svar."],
      ["Stop writing and look at me, please.", "Sluta skriva och titta på mig, tack."]
    ]
  },
  {
    id: "matte", sv: "Mattelektionen", en: "The maths lesson", icon: "📐",
    dialogues: [
      {
        title: "Lösa en ekvation", en: "Solving an equation",
        roles: { T: "Lärare", E: "Elev" },
        lines: [
          ["T", "Today we're going to solve equations.", "Idag ska vi lösa ekvationer."],
          ["T", "Look at the board. Three x plus four equals nineteen.", "Titta på tavlan. Tre x plus fyra är lika med nitton."],
          ["E", "Do we subtract four from both sides?", "Subtraherar vi fyra från båda leden?"],
          ["T", "Exactly. What do we get?", "Precis. Vad får vi?"],
          ["E", "Three x equals fifteen.", "Tre x är lika med femton."],
          ["T", "Good. And what's the next step?", "Bra. Och vad är nästa steg?"],
          ["E", "We divide by three, so x equals five.", "Vi dividerar med tre, så x är lika med fem."],
          ["T", "Well done. Now check your answer.", "Bra jobbat. Kontrollera nu ditt svar."]
        ]
      },
      {
        title: "Procent och miniräknare", en: "Percentages and calculators",
        roles: { E: "Elev", T: "Lärare" },
        lines: [
          ["E", "Can we use a calculator for this task?", "Får vi använda miniräknare på den här uppgiften?"],
          ["T", "Not for the first part, but you can for the second part.", "Inte på första delen, men på andra delen får ni."],
          ["E", "How do I work out twenty per cent of eighty?", "Hur räknar jag ut tjugo procent av åttio?"],
          ["T", "Twenty per cent is the same as one fifth.", "Tjugo procent är samma sak som en femtedel."],
          ["E", "So I divide eighty by five?", "Så jag delar åttio med fem?"],
          ["T", "Yes. What's the answer?", "Ja. Vad blir svaret?"],
          ["E", "Sixteen.", "Sexton."],
          ["T", "Correct! Can you explain your method to the class?", "Rätt! Kan du förklara din metod för klassen?"]
        ]
      },
      {
        title: "Area och omkrets", en: "Area and perimeter",
        roles: { T: "Lärare", E: "Elev" },
        lines: [
          ["T", "This rectangle is eight centimetres long and five centimetres wide.", "Den här rektangeln är åtta centimeter lång och fem centimeter bred."],
          ["T", "What is the area?", "Vad är arean?"],
          ["E", "Forty square centimetres.", "Fyrtio kvadratcentimeter."],
          ["T", "Good. And what is the perimeter?", "Bra. Och vad är omkretsen?"],
          ["E", "Is it thirteen centimetres?", "Är det tretton centimeter?"],
          ["T", "Not quite. Remember to add all four sides.", "Inte riktigt. Kom ihåg att lägga ihop alla fyra sidorna."],
          ["E", "Oh, then it's twenty-six centimetres.", "Jaha, då är det tjugosex centimeter."],
          ["T", "That's right. Don't forget the units.", "Det stämmer. Glöm inte enheterna."]
        ]
      }
    ],
    phrases: [
      ["Get out your calculators.", "Ta fram era miniräknare."],
      ["Show your working.", "Visa era uträkningar."],
      ["Round your answer to one decimal place.", "Avrunda svaret till en decimal."],
      ["What is the area of the rectangle?", "Vad är rektangelns area?"],
      ["Draw a diagram to help you.", "Rita en figur som hjälp."],
      ["Solve the equation.", "Lös ekvationen."],
      ["Estimate first, then calculate.", "Gör ett överslag först, räkna sedan."],
      ["Don't forget the units.", "Glöm inte enheterna."],
      ["Can you explain your method?", "Kan du förklara din metod?"],
      ["Is there another way to solve it?", "Finns det ett annat sätt att lösa den?"],
      ["Check your answer by putting it back into the equation.", "Kontrollera svaret genom att sätta in det i ekvationen."],
      ["Plot the points on the graph.", "Pricka in punkterna i koordinatsystemet."],
      ["Simplify the expression.", "Förenkla uttrycket."],
      ["What is the probability of getting a six?", "Hur stor är sannolikheten att få en sexa?"]
    ]
  },
  {
    id: "grupparbete", sv: "Grupparbete", en: "Group work", icon: "👥",
    dialogues: [
      {
        title: "Roller i gruppen", en: "Roles in the group",
        roles: { T: "Lärare", E: "Elev" },
        lines: [
          ["T", "You're going to work in groups of four.", "Ni ska arbeta i grupper om fyra."],
          ["T", "Each person has a role.", "Varje person har en roll."],
          ["E", "What are the roles?", "Vilka är rollerna?"],
          ["T", "A leader, a writer, a timekeeper and a presenter.", "En ledare, en sekreterare, en tidhållare och en som presenterar."],
          ["E", "Can I be the timekeeper?", "Får jag vara tidhållare?"],
          ["T", "Sure. Make sure your group finishes on time.", "Visst. Se till att din grupp blir klar i tid."],
          ["E", "How long do we have?", "Hur lång tid har vi?"],
          ["T", "Twenty-five minutes. Then each group presents.", "Tjugofem minuter. Sedan presenterar varje grupp."]
        ]
      },
      {
        title: "Mitt i arbetet", en: "Working together",
        roles: { A: "Elev A", B: "Elev B" },
        lines: [
          ["A", "Okay, let's get started. Who wants to write?", "Okej, vi sätter igång. Vem vill skriva?"],
          ["B", "I can write. What's our first idea?", "Jag kan skriva. Vad är vår första idé?"],
          ["A", "I think we should start with a diagram.", "Jag tycker att vi ska börja med en figur."],
          ["B", "Good idea, but I'm not sure about the numbers.", "Bra idé, men jag är inte säker på siffrorna."],
          ["A", "Let's check them together.", "Vi kontrollerar dem tillsammans."],
          ["B", "You're right, it adds up.", "Du har rätt, det stämmer."],
          ["A", "We have five minutes left.", "Vi har fem minuter kvar."],
          ["B", "Let's write the conclusion now.", "Vi skriver slutsatsen nu."]
        ]
      }
    ],
    phrases: [
      ["Let's work together.", "Låt oss jobba tillsammans."],
      ["Whose turn is it?", "Vems tur är det?"],
      ["What do you think?", "Vad tycker du?"],
      ["I agree with you.", "Jag håller med dig."],
      ["I'm not sure I agree.", "Jag är inte säker på att jag håller med."],
      ["Can you explain that again?", "Kan du förklara det igen?"],
      ["Let's listen to each other.", "Låt oss lyssna på varandra."],
      ["Who is going to present?", "Vem ska presentera?"],
      ["We have five minutes left.", "Vi har fem minuter kvar."],
      ["Everyone should say something.", "Alla ska säga något."],
      ["That's a good idea.", "Det är en bra idé."],
      ["Let's write down our ideas.", "Vi skriver ner våra idéer."]
    ]
  },
  {
    id: "prov", sv: "Prov", en: "Tests", icon: "📝",
    dialogues: [
      {
        title: "Inför provet", en: "Before the test",
        roles: { E: "Elev", T: "Lärare" },
        lines: [
          ["E", "When is the test?", "När är provet?"],
          ["T", "The test is next Thursday.", "Provet är nästa torsdag."],
          ["E", "What do we need to revise?", "Vad behöver vi plugga på?"],
          ["T", "Chapters three and four, especially fractions.", "Kapitel tre och fyra, särskilt bråk."],
          ["E", "Can we use a calculator?", "Får vi använda miniräknare?"],
          ["T", "Only in part B.", "Bara i del B."],
          ["E", "How long is the test?", "Hur lång tid är provet?"],
          ["T", "Sixty minutes. Bring a pencil, a rubber and a ruler.", "Sextio minuter. Ta med blyertspenna, suddgummi och linjal."]
        ]
      },
      {
        title: "Under provet", en: "During the test",
        roles: { T: "Lärare", E: "Elev" },
        lines: [
          ["T", "Please put your bags at the back of the room.", "Ställ era väskor längst bak i rummet."],
          ["T", "Write your name on every page.", "Skriv ditt namn på varje sida."],
          ["T", "You may start now.", "Ni får börja nu."],
          ["E", "Excuse me, I don't understand question six.", "Ursäkta, jag förstår inte fråga sex."],
          ["T", "I can't help you with the maths, but I can explain the words.", "Jag kan inte hjälpa dig med matten, men jag kan förklara orden."],
          ["T", "You have ten minutes left.", "Ni har tio minuter kvar."],
          ["E", "Can I hand in my test now?", "Får jag lämna in provet nu?"],
          ["T", "Yes, but please check your answers first.", "Ja, men kontrollera dina svar först."]
        ]
      }
    ],
    phrases: [
      ["The test is next week.", "Provet är nästa vecka."],
      ["Revise chapters three and four.", "Plugga på kapitel tre och fyra."],
      ["Write your name on the paper.", "Skriv ditt namn på pappret."],
      ["You may start now.", "Ni får börja nu."],
      ["No talking during the test.", "Ingen pratar under provet."],
      ["You have ten minutes left.", "Ni har tio minuter kvar."],
      ["Read each question carefully.", "Läs varje fråga noga."],
      ["Put your pens down, please.", "Lägg ner pennorna, tack."],
      ["Hand in your papers.", "Lämna in era papper."],
      ["You will get your results next week.", "Ni får era resultat nästa vecka."],
      ["You can do a resit.", "Du kan göra ett omprov."],
      ["Well done, you passed.", "Bra jobbat, du klarade det."]
    ]
  },
  {
    id: "foraldrar", sv: "Föräldrakontakt", en: "Contact with parents", icon: "📞",
    dialogues: [
      {
        title: "Läraren ringer hem", en: "Calling home",
        roles: { T: "Lärare", F: "Förälder" },
        lines: [
          ["T", "Hello, this is Emma's maths teacher. Is this a good time?", "Hej, det är Emmas mattelärare. Passar det bra nu?"],
          ["F", "Yes, of course. Is everything okay?", "Ja, självklart. Är allt okej?"],
          ["T", "Yes, don't worry. I just wanted to give you an update.", "Ja, oroa dig inte. Jag ville bara ge en uppdatering."],
          ["T", "Emma is working hard, but she has missed some homework.", "Emma arbetar hårt, men hon har missat några läxor."],
          ["F", "Oh, I didn't know that. Thank you for telling me.", "Oj, det visste jag inte. Tack för att du berättar."],
          ["T", "Could you help her plan her homework at home?", "Skulle du kunna hjälpa henne att planera läxorna hemma?"],
          ["F", "Yes, we'll talk about it tonight.", "Ja, vi pratar om det i kväll."],
          ["T", "Thank you. Please contact me if you have any questions.", "Tack. Hör av dig om du har några frågor."]
        ]
      },
      {
        title: "En förälder sjukanmäler", en: "A parent calls in sick",
        roles: { F: "Förälder", T: "Lärare" },
        lines: [
          ["F", "Hello, I'm calling because my son is ill today.", "Hej, jag ringer för att min son är sjuk idag."],
          ["T", "I'm sorry to hear that. Thank you for letting me know.", "Vad tråkigt att höra. Tack för att du meddelar."],
          ["F", "Can he get the homework?", "Kan han få läxan?"],
          ["T", "Yes, I'll put it on the school platform.", "Ja, jag lägger ut den på skolplattformen."],
          ["F", "He's worried about the test on Friday.", "Han är orolig för provet på fredag."],
          ["T", "If he's still ill, he can take it next week.", "Om han fortfarande är sjuk kan han skriva det nästa vecka."],
          ["F", "That's great. Thank you so much.", "Vad bra. Tack så mycket."],
          ["T", "You're welcome. I hope he feels better soon.", "Varsågod. Jag hoppas att han mår bättre snart."]
        ]
      }
    ],
    phrases: [
      ["Thank you for getting in touch.", "Tack för att du hör av dig."],
      ["Is this a good time to talk?", "Passar det att prata nu?"],
      ["I'm calling about your daughter.", "Jag ringer angående din dotter."],
      ["She is doing really well.", "Det går riktigt bra för henne."],
      ["He has missed a few lessons.", "Han har missat några lektioner."],
      ["Could we book a meeting?", "Kan vi boka ett möte?"],
      ["I'll send you an email.", "Jag skickar ett mejl till dig."],
      ["Please check the school platform.", "Titta gärna på skolplattformen."],
      ["Do you have any questions?", "Har du några frågor?"],
      ["We can work on this together.", "Vi kan arbeta med det här tillsammans."],
      ["I'll get back to you tomorrow.", "Jag återkommer till dig i morgon."],
      ["Thank you for your support.", "Tack för ditt stöd."]
    ]
  },
  {
    id: "utvecklingssamtal", sv: "Utvecklingssamtal", en: "Progress meetings", icon: "🌱",
    dialogues: [
      {
        title: "Samtal med föräldern", en: "Talking with a parent",
        roles: { T: "Lärare", F: "Förälder" },
        lines: [
          ["T", "Welcome. Thank you for coming.", "Välkommen. Tack för att du kom."],
          ["T", "Let's start with what is going well.", "Vi börjar med det som går bra."],
          ["T", "Your son is very active in class and asks good questions.", "Din son är väldigt aktiv på lektionerna och ställer bra frågor."],
          ["F", "That's nice to hear. What can he improve?", "Vad roligt att höra. Vad kan han förbättra?"],
          ["T", "He needs to explain his solutions more clearly.", "Han behöver förklara sina lösningar tydligare."],
          ["F", "How can we help him at home?", "Hur kan vi hjälpa honom hemma?"],
          ["T", "Ask him to explain his homework to you.", "Be honom förklara läxan för er."],
          ["F", "That's a good idea. We'll try that.", "Det är en bra idé. Vi ska prova det."]
        ]
      },
      {
        title: "Mål med eleven", en: "Setting a goal",
        roles: { T: "Lärare", E: "Elev" },
        lines: [
          ["T", "How do you feel about maths this term?", "Hur känns matten den här terminen?"],
          ["E", "It's okay, but I find equations difficult.", "Det går okej, men jag tycker att ekvationer är svåra."],
          ["T", "Thank you for being honest. What would help you?", "Tack för att du är ärlig. Vad skulle hjälpa dig?"],
          ["E", "Maybe more examples on the board.", "Kanske fler exempel på tavlan."],
          ["T", "Good. Let's set a goal for the next few weeks.", "Bra. Vi sätter ett mål för de närmaste veckorna."],
          ["E", "I want to solve equations without help.", "Jag vill kunna lösa ekvationer utan hjälp."],
          ["T", "Great goal. We'll follow up after Christmas.", "Bra mål. Vi följer upp efter jul."]
        ]
      }
    ],
    phrases: [
      ["Thank you for coming.", "Tack för att ni kom."],
      ["Let's start with what is going well.", "Vi börjar med det som går bra."],
      ["She has made great progress.", "Hon har gjort stora framsteg."],
      ["He is on track for a pass.", "Han är på väg mot godkänt."],
      ["One thing to work on is homework.", "En sak att arbeta med är läxorna."],
      ["What do you think about school?", "Vad tycker du om skolan?"],
      ["How can we support him at home?", "Hur kan vi stötta honom hemma?"],
      ["Let's set a goal together.", "Vi sätter ett mål tillsammans."],
      ["We will follow up in six weeks.", "Vi följer upp om sex veckor."],
      ["Does that sound okay?", "Låter det bra?"],
      ["Is there anything else you want to talk about?", "Finns det något mer du vill prata om?"],
      ["Thank you, it was a good meeting.", "Tack, det var ett bra samtal."]
    ]
  },
  {
    id: "kollegor", sv: "Kollegor och möten", en: "Colleagues and meetings", icon: "☕",
    dialogues: [
      {
        title: "Be en kollega om hjälp", en: "Asking a colleague",
        roles: { A: "Kollega A", B: "Kollega B" },
        lines: [
          ["A", "Have you got a minute?", "Har du en minut?"],
          ["B", "Sure, what's up?", "Visst, vad gäller det?"],
          ["A", "Could you cover my class on Friday? I'm on a course.", "Kan du ta min klass på fredag? Jag är på kurs."],
          ["B", "Which lesson is it?", "Vilken lektion är det?"],
          ["A", "Maths with Year 8, third lesson.", "Matte med åttan, tredje lektionen."],
          ["B", "Yes, I'm free then. Will you leave a plan?", "Ja, jag är ledig då. Lämnar du en planering?"],
          ["A", "Of course. I'll email it to you tomorrow.", "Självklart. Jag mejlar den till dig i morgon."],
          ["B", "Perfect. No problem.", "Perfekt. Inga problem."]
        ]
      },
      {
        title: "Arbetslagsmöte", en: "A team meeting",
        roles: { M: "Mötesledare", T: "Lärare" },
        lines: [
          ["M", "Let's begin. Is everyone here?", "Vi börjar. Är alla här?"],
          ["M", "First on the agenda is the school trip.", "Första punkten på dagordningen är skolresan."],
          ["T", "Could I add something to the agenda?", "Kan jag lägga till något på dagordningen?"],
          ["M", "Of course. What is it?", "Självklart. Vad gäller det?"],
          ["T", "I'd like to talk about the dates for the maths tests.", "Jag skulle vilja prata om datumen för matteproven."],
          ["M", "Good point. We'll take that after the trip.", "Bra poäng. Vi tar det efter resan."],
          ["T", "Sorry, could you repeat the date of the trip?", "Förlåt, kan du upprepa datumet för resan?"],
          ["M", "It's the twelfth of May. Let's sum up at the end.", "Det är den tolfte maj. Vi sammanfattar i slutet."]
        ]
      }
    ],
    phrases: [
      ["Have you got a minute?", "Har du en minut?"],
      ["Could you cover my lesson?", "Kan du ta min lektion?"],
      ["Shall we start the meeting?", "Ska vi börja mötet?"],
      ["What's on the agenda today?", "Vad står på dagordningen idag?"],
      ["I'd like to add something.", "Jag skulle vilja lägga till något."],
      ["Could you repeat that, please?", "Kan du upprepa det, tack?"],
      ["I agree with that.", "Det håller jag med om."],
      ["I see it a bit differently.", "Jag ser det lite annorlunda."],
      ["Who is responsible for this?", "Vem är ansvarig för det här?"],
      ["Let's sum up.", "Vi sammanfattar."],
      ["I'll send the notes after the meeting.", "Jag skickar anteckningarna efter mötet."],
      ["Can we talk about this later?", "Kan vi prata om det här senare?"],
      ["Thanks for your help.", "Tack för hjälpen."]
    ]
  },
  {
    id: "smaprat", sv: "Småprat", en: "Small talk", icon: "💬",
    dialogues: [
      {
        title: "Måndag morgon", en: "Monday morning",
        roles: { A: "Kollega A", B: "Kollega B" },
        lines: [
          ["A", "Good morning! How was your weekend?", "God morgon! Hur var din helg?"],
          ["B", "Really nice, thanks. We went to the countryside.", "Riktigt trevlig, tack. Vi åkte ut på landet."],
          ["A", "Lovely. Was the weather good?", "Härligt. Var vädret bra?"],
          ["B", "It was cold but sunny. How about you?", "Det var kallt men soligt. Och du?"],
          ["A", "Quite relaxing. I mostly read and went for walks.", "Ganska avkopplande. Jag läste mest och tog promenader."],
          ["B", "Sounds great. Do you want a coffee?", "Låter toppen. Vill du ha en kaffe?"],
          ["A", "Yes, please. I need one before my first lesson!", "Ja, tack. Jag behöver en innan min första lektion!"]
        ]
      },
      {
        title: "I korridoren", en: "In the corridor",
        roles: { T: "Lärare", E: "Elev" },
        lines: [
          ["T", "Hi! Did you have a good holiday?", "Hej! Hade du ett bra lov?"],
          ["E", "Yes, I went skiing with my family.", "Ja, jag åkte skidor med min familj."],
          ["T", "That sounds fun. Where did you go?", "Det låter kul. Vart åkte ni?"],
          ["E", "To the mountains in the north. It was amazing.", "Till fjällen i norr. Det var fantastiskt."],
          ["T", "Lucky you! I stayed at home and relaxed.", "Vad härligt! Jag stannade hemma och vilade."],
          ["E", "Are we having a test this week?", "Har vi prov den här veckan?"],
          ["T", "Not this week. Have a nice day!", "Inte den här veckan. Ha en bra dag!"]
        ]
      }
    ],
    phrases: [
      ["How are you today?", "Hur mår du idag?"],
      ["How was your weekend?", "Hur var din helg?"],
      ["Did you have a good holiday?", "Hade du ett bra lov?"],
      ["What are you doing this weekend?", "Vad ska du göra i helgen?"],
      ["It's really cold today, isn't it?", "Det är riktigt kallt idag, eller hur?"],
      ["Lovely weather today.", "Härligt väder idag."],
      ["Have a nice weekend!", "Trevlig helg!"],
      ["Would you like a cup of coffee?", "Vill du ha en kopp kaffe?"],
      ["That sounds great.", "Det låter toppen."],
      ["Same to you!", "Detsamma!"],
      ["I'm a bit tired today.", "Jag är lite trött idag."],
      ["See you later!", "Vi ses senare!"]
    ]
  }
];

/* Ordlistor: [engelska, svenska, (valfritt) symbol/exempel som visas] */
const WORDS = {
  skolord: {
    sv: "Skolord", en: "School words", icon: "🎒",
    groups: [
      { title: "Saker i klassrummet", items: [
        ["whiteboard", "whiteboardtavla"], ["desk", "bänk"], ["chair", "stol"],
        ["exercise book", "skrivhäfte"], ["textbook", "lärobok"], ["pencil", "blyertspenna"],
        ["rubber", "suddgummi"], ["ruler", "linjal"], ["pencil case", "pennfodral"],
        ["sharpener", "pennvässare"], ["calculator", "miniräknare"], ["scissors", "sax"],
        ["glue stick", "limstift"], ["projector", "projektor"], ["laptop", "bärbar dator"],
        ["worksheet", "arbetsblad"], ["compasses", "passare"], ["protractor", "gradskiva"]
      ]},
      { title: "Skoldagen", items: [
        ["lesson", "lektion"], ["break", "rast"], ["lunch break", "lunchrast"],
        ["timetable", "schema"], ["homework", "läxa"], ["subject", "ämne"],
        ["term", "termin"], ["school year", "läsår"], ["holiday", "lov"],
        ["test", "prov"], ["grade", "betyg"], ["absent", "frånvarande"],
        ["late", "sen"], ["register", "närvarolista"], ["school trip", "skolresa"]
      ]},
      { title: "Personer och platser", items: [
        ["teacher", "lärare"], ["pupil", "elev"], ["classmate", "klasskamrat"],
        ["head teacher", "rektor"], ["school nurse", "skolsköterska"], ["counsellor", "kurator"],
        ["teaching assistant", "elevassistent"], ["form tutor", "mentor"], ["parent", "förälder"],
        ["guardian", "vårdnadshavare"], ["staff room", "personalrum"], ["canteen", "matsal"],
        ["corridor", "korridor"], ["library", "bibliotek"], ["sports hall", "idrottshall"]
      ]},
      { title: "Lärarjobbet", items: [
        ["lesson plan", "lektionsplanering"], ["staff meeting", "personalmöte"], ["team meeting", "arbetslagsmöte"],
        ["supply teacher", "vikarie"], ["cover lesson", "vikarielektion"], ["feedback", "återkoppling"],
        ["assessment", "bedömning"], ["learning objective", "lärandemål"], ["success criteria", "framgångskriterier"],
        ["progress meeting", "utvecklingssamtal"], ["extra support", "extra anpassningar"], ["special needs teacher", "speciallärare"],
        ["school platform", "skolplattform"], ["resit", "omprov"], ["report", "omdöme"]
      ]}
    ]
  },
  matteord: {
    sv: "Matteord", en: "Maths words", icon: "➗",
    groups: [
      { title: "Räknesätt", items: [
        ["addition", "addition"], ["subtraction", "subtraktion"], ["multiplication", "multiplikation"],
        ["division", "division"], ["sum", "summa"], ["difference", "differens"],
        ["product", "produkt"], ["quotient", "kvot"], ["add", "addera"],
        ["subtract", "subtrahera"], ["multiply", "multiplicera"], ["divide", "dividera"],
        ["equals", "är lika med"], ["calculate", "räkna ut, beräkna"], ["estimate", "uppskatta, göra överslag"]
      ]},
      { title: "Tal och bråk", items: [
        ["integer", "heltal"], ["negative number", "negativt tal"], ["decimal number", "decimaltal"],
        ["decimal point", "decimaltecken"], ["fraction", "bråk"], ["numerator", "täljare"],
        ["denominator", "nämnare"], ["per cent", "procent"], ["percentage", "procentsats, andel"],
        ["prime number", "primtal"], ["square root", "kvadratrot"], ["power", "potens"],
        ["exponent", "exponent"], ["round", "avrunda"], ["ratio", "förhållande"],
        ["proportional", "proportionell"], ["scale", "skala"], ["place value", "positionssystem"]
      ]},
      { title: "Algebra", items: [
        ["equation", "ekvation"], ["expression", "uttryck"], ["variable", "variabel"],
        ["term", "term"], ["coefficient", "koefficient"], ["simplify", "förenkla"],
        ["solve", "lösa"], ["brackets", "parenteser"], ["expand the brackets", "multiplicera in i parentesen"],
        ["factorise", "faktorisera"], ["formula", "formel"], ["pattern", "mönster"],
        ["both sides", "båda leden"], ["substitute", "sätta in (ett värde)"]
      ]},
      { title: "Geometri", items: [
        ["angle", "vinkel"], ["right angle", "rät vinkel"], ["acute angle", "spetsig vinkel"],
        ["obtuse angle", "trubbig vinkel"], ["degree", "grad"], ["triangle", "triangel"],
        ["rectangle", "rektangel"], ["square", "kvadrat"], ["parallelogram", "parallellogram"],
        ["trapezium", "parallelltrapets"], ["circle", "cirkel"], ["radius", "radie"],
        ["diameter", "diameter"], ["circumference", "omkrets (cirkel)"], ["perimeter", "omkrets"],
        ["area", "area"], ["volume", "volym"], ["cube", "kub"],
        ["cuboid", "rätblock"], ["cylinder", "cylinder"], ["cone", "kon"],
        ["sphere", "klot"], ["pyramid", "pyramid"], ["parallel", "parallell"],
        ["perpendicular", "vinkelrät"], ["Pythagoras' theorem", "Pythagoras sats"], ["hypotenuse", "hypotenusa"],
        ["similar", "likformig"], ["symmetry", "symmetri"]
      ]},
      { title: "Mätning och enheter", items: [
        ["length", "längd"], ["width", "bredd"], ["height", "höjd"],
        ["millimetre", "millimeter", "mm"], ["centimetre", "centimeter", "cm"], ["metre", "meter", "m"],
        ["kilometre", "kilometer", "km"], ["square metre", "kvadratmeter", "m²"], ["cubic centimetre", "kubikcentimeter", "cm³"],
        ["litre", "liter", "l"], ["gram", "gram", "g"], ["kilogram", "kilogram", "kg"],
        ["unit", "enhet"], ["speed", "hastighet"], ["time", "tid"]
      ]},
      { title: "Statistik och sannolikhet", items: [
        ["mean", "medelvärde"], ["median", "median"], ["mode", "typvärde"],
        ["range", "variationsbredd"], ["bar chart", "stapeldiagram"], ["pie chart", "cirkeldiagram"],
        ["line graph", "linjediagram"], ["table", "tabell"], ["frequency", "frekvens"],
        ["probability", "sannolikhet"], ["outcome", "utfall"], ["dice", "tärning(ar)"]
      ]},
      { title: "Samband och funktioner", items: [
        ["coordinates", "koordinater"], ["x-axis", "x-axel"], ["y-axis", "y-axel"],
        ["origin", "origo"], ["graph", "graf"], ["function", "funktion"],
        ["straight line", "rät linje"], ["gradient", "lutning, k-värde"], ["y-intercept", "m-värde"],
        ["linear", "linjär"], ["table of values", "värdetabell"], ["plot", "pricka in"]
      ]},
      { title: "Säga matte högt", items: [
        ["x squared", "x i kvadrat", "x²"], ["x cubed", "x upphöjt till tre", "x³"],
        ["two to the power of five", "två upphöjt till fem", "2⁵"], ["the square root of nine", "kvadratroten ur nio", "√9"],
        ["three point five", "tre komma fem", "3.5"], ["a half", "en halv", "½"],
        ["three quarters", "tre fjärdedelar", "¾"], ["two thirds", "två tredjedelar", "⅔"],
        ["minus five", "minus fem", "−5"], ["is less than", "är mindre än", "<"],
        ["is greater than", "är större än", ">"], ["twenty-five per cent", "tjugofem procent", "25 %"],
        ["two x plus three equals eleven", "två x plus tre är lika med elva", "2x + 3 = 11"],
        ["a times b", "a gånger b", "a · b"]
      ]}
    ]
  }
};
