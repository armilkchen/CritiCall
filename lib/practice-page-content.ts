export const typingPage = {
  path: '/dispatcher-typing-test' as const,
  title: '911 Dispatcher Typing Test — Free CritiCall Typing Practice',
  description: 'Free 911 dispatcher typing test with real caller records. See your WPM and accuracy after every run, then again with interruptions. No sign-up.',
  h1: '911 Dispatcher Typing Test',
  eyebrow: 'Caller records · net WPM',
  breadcrumb: 'Typing test',
  lede: 'Type a generated caller record, then read your net words per minute and character accuracy on the same page. No account. The next run is a new record.',
  points: [
    { title: 'One record at a time', body: 'Name, address, callback, and plate in a single paragraph.' },
    { title: 'Net WPM', body: 'Correct characters divided by five, adjusted for accuracy.' },
    { title: 'No sign-up', body: 'The score stays in this browser with your other practice runs.' },
  ],
  sections: [
    {
      heading: 'How fast do you need to type for a 911 dispatcher job?',
      paragraphs: [
        'Hiring notices rarely print one national typing speed. A city may ask only for keyboard familiarity. A county may put a words-per-minute figure in that posting and nowhere else. If your packet states a number, that number is the one that applies to you. This page does not publish a passing speed, because no public source sets one figure for every agency.',
        'Use the practice score as arithmetic, not as a hiring cutoff. Net words per minute here equals characters you typed, divided by five, divided by the minutes you spent, then multiplied by accuracy. Type 250 characters in 60 seconds with every character correct and the result is 50. Miss 25 of those characters and accuracy is 90 percent, so the net figure falls to 45. The clock starts when you press Start typing and stops when you press Score this run.',
        'Run the drill three times and keep the middle result. If accuracy is under 95 percent, the next session is for fixing characters, not for chasing a higher words-per-minute number. A posting that names 35, 40, or some other speed is describing that employer. It is not a rule this site can confirm, and it is not the number printed after your run.',
      ],
    },
    {
      heading: 'What the typing section actually scores',
      paragraphs: [
        'This drill scores the characters in front of you, in order. It does not score whether the sentence sounds professional. A missing comma, a swapped digit in the callback, or an extra space changes the accuracy percentage. Net words per minute then drops because accuracy is part of the formula, not a separate courtesy grade.',
        'Count a run in pieces if the total feels vague. Suppose the passage is 180 characters and you type 180. If 171 of them match the passage in the same position, accuracy is 95 percent. Divide 180 by 5 and you have 36 words. If that took 60 seconds, gross speed is 36 words per minute and net speed is about 34. The nine mismatched characters are the practice target. They are usually a plate letter or a street number, not a common word.',
        'The passage is a caller record: name, street, callback, and plate, written as one block of text. That is closer to a keyboarding module than to a form with separate boxes. You still have to read the plate as characters. People who type ordinary sentences at a steady pace often lose the score on the plate and the phone, because those strings are not words they can predict.',
      ],
    },
    {
      heading: 'Typing test or data entry test? Which one you\'re actually facing',
      paragraphs: [
        'A typing section puts a passage on the screen and asks you to reproduce it. A data-entry section puts the same kinds of facts into labeled boxes: name in one field, phone in another, plate in a third. Speed on a paragraph does not tell you whether you will drop a character into the wrong box. They are related skills and they are not the same score.',
        'Look at the sample items in your own instructions. If you see a block of text and a typing area, you are in the keyboarding task this page practices. If you see a card and empty fields, you are in data entry, even when the card includes a full name and a street. Some processes include both. A candidate who prepares only one of them can post a clean words-per-minute number and still miss the form.',
        'Use a simple split for the week. Three runs on this page measure characters in a passage. Three runs on the data-entry page measure fields. If the passage accuracy is 98 percent and the plate field is wrong on two of three forms, the weak skill is field entry, not raw typing. Do not add a longer passage until the plate field is exact.',
      ],
    },
    {
      heading: 'A four-week plan that raises accuracy, not just speed',
      paragraphs: [
        'Week 1 is ten minutes a day, four days. Take one caller record, type it, and stop the session if you miss more than 2 characters per 100. Write down the net words per minute only after accuracy is at or above 98 percent. The goal for the week is a repeatable clean run, not a personal record.',
        'Week 2 keeps the same length of record and adds speed only while accuracy holds. If net words per minute rises by 5 and accuracy falls below 98 percent, return to the week-1 rule the next day. Week 3 stays on caller records, with extra attention on the plate and the callback. Say the plate aloud once before you type it. That single check removes most of the transposed characters.',
        'Week 4 adds one interrupted session, three days. Finish a clean passage here, then open the multitasking drill and enter a record while a classification card appears. Compare the calm accuracy with the interrupted accuracy. If the drop is more than 10 points, the next week goes back to short clean records plus one interruption, not to a faster passage. The plan is finished when you can state both numbers, not when a single run looks fast.',
      ],
    },
  ],
  faqHeading: 'FAQ',
  faq: [
    { question: 'Is there an official words-per-minute cutoff on this page?', answer: 'No. This drill reports net words per minute and character accuracy for the run you just finished. An agency may print a speed in its own posting. That posting is the source for any cutoff. This site does not turn its practice number into a hiring standard.' },
    { question: 'Does a high score here mean I will pass a typing module?', answer: 'It means you reproduced one generated caller record at the speed and accuracy shown. A hiring module can use a different passage length, a different timer, and a different error rule. Use the score to decide whether the next session should slow down or add an interruption.' },
    { question: 'Why did my words per minute fall when I typed quickly?', answer: 'Net words per minute multiplies speed by accuracy. Extra characters and mismatched characters both lower the percentage. A 60-second run with 90 percent accuracy scores lower than a slightly shorter run with every character in the right place.' },
    { question: 'Can I paste the passage?', answer: 'No. Pasting is turned off so the words-per-minute figure reflects typing. The record is generated for that run and is not a published answer key.' },
  ],
  keepTraining: [
    'After three clean passage runs, move the same facts into boxes. The data-entry practice test times names, addresses, phones, plates, and vehicle identification numbers as separate fields, and it marks the field when one character is wrong. That is the check this typing score cannot make.',
    'When field accuracy stays above 95 percent, add the interruption. The CritiCall multitasking practice inserts a classification card while you are still entering a record, then shows the gap between the calm record and the interrupted record. The 12-item CritiCall practice test is the short mix of entry, memory, audio, and decisions if you want one sitting instead of a single skill. Keep the middle score from each page, and train the page whose accuracy moved the most.',
  ],
  links: [
    { href: '/data-entry-practice-test', label: 'Data entry practice test' },
    { href: '/criticall-test', label: 'CritiCall practice test' },
    { href: '/criticall-multitasking-test', label: 'Multitasking practice' },
  ],
}

export const entryPage = {
  path: '/data-entry-practice-test' as const,
  title: 'Data Entry Practice Test — Free 911 Dispatcher Drill',
  description: 'Free data entry practice test for 911 dispatchers: names, addresses, phone numbers, VINs and plates. Timed, exact-match scoring, instant error report.',
  h1: 'Data Entry Practice Test for 911 Dispatchers',
  eyebrow: 'Exact fields · timed',
  breadcrumb: 'Data entry practice',
  lede: 'A generated card shows 4 to 8 fields. You copy them into matching boxes. One wrong character misses the field, and the report names the field.',
  points: [
    { title: '4 to 8 fields', body: 'Name, address, phone, ZIP, plate, VIN, or license, in a new mix each run.' },
    { title: 'Exact match', body: 'The field is wrong if any letter or digit does not match.' },
    { title: 'Error report', body: 'You see the expected text for every missed field before the next card.' },
  ],
  sections: [
    {
      heading: 'What the data entry section covers',
      paragraphs: [
        'The card on this page is a caller record split into fields. A run uses 4, 5, 6, 7, or 8 of them. The set can include a first name, a last name, a phone number, a street address, a city, a ZIP code, a 17-character vehicle identification number, a plate, and a driver license number. You do not get the same eight every time, because a hiring form also changes which boxes are on the screen.',
        'The phone numbers are fictional and start with 555. The vehicle identification number is 17 characters drawn from the letters and digits used on real plates of that length, excluding I, O, and Q, and it is not a check-digit from a manufacturer. The plate mixes letters and digits and includes at least one pair that is easy to swap, such as 0 and O or 1 and I. Those choices are for practice. They are not copies of an agency form.',
        'The clock starts when you press Start timed entry and stops when you score the run. There is no published time limit on this page and no passing time. The report gives you the seconds you used and the count of exact fields. If you need a words-per-minute figure instead of a field count, that measurement is on the typing page, where the same kinds of facts appear as a paragraph.',
      ],
    },
    {
      heading: 'Why one wrong character costs you the whole field',
      paragraphs: [
        'A field is correct only when every letter and digit matches the card. An empty box is wrong. A box with one extra character is wrong. The rest of a correct address does not earn partial credit inside that field. Phone dashes are optional, because 5550142281 and 555-014-2281 contain the same digits. Spaces and punctuation elsewhere are ignored. The characters that remain must still match.',
        'That rule matches the cost of the mistake. A plate entered as 7KLM241 when the card says 7KLM214 will not find the vehicle the caller described. A ZIP code that is off by one digit sends the next person to the wrong area. Partial credit would hide the miss inside a flattering total. This report will say 5 of 6 fields exact rather than 96 percent of characters, so the missed field stays visible.',
        'Read the error line before you start the next card. It prints the expected value, not a hint. If the same kind of field fails twice, that is the drill for the day. Two missed plates are more useful than a session of ten cards you do not review. Slow the next card until that field is exact, then bring the clock back.',
      ],
    },
    {
      heading: 'Alphanumeric and plate practice',
      paragraphs: [
        'Alphanumeric entry is the part candidates underestimate because the strings are short. A 17-character vehicle identification number has no word shape. A plate may be three letters and four digits, or a digit, three letters, and three digits. You cannot check it by asking whether it "looks right." You check it character by character, including the characters that look alike.',
        'On this drill, every plate includes at least one O or I and at least one 0 or 1. That is deliberate. If your error report says the expected plate was 1IUK599 and you typed 1LUK599, the miss is the second character, not the whole idea of a plate. The same trap shows up in license numbers. Treat the license line as another plate: read it once, type it, then touch each character with your eyes before you score.',
        'Do not split this work onto extra pages. Ten searches a month for a plate drill or a vehicle-identification drill are the same skill as the fields already on this card. A session of six cards, with the error report open, covers names, streets, phones, plates, and the long vehicle number. Add the audio page only when the visual card is exact and you want the same fields read aloud.',
      ],
    },
    {
      heading: 'How to read your error report',
      paragraphs: [
        'The report has two numbers and a list. The count, such as 6 of 8 fields exact, is the score. The seconds are the time from start to score. The list marks each field correct or prints the expected text. A run with 8 of 8 fields and 90 seconds is a clean slow run. A run with 6 of 8 fields and 40 seconds is a fast run that lost two fields. Train the second pattern only after the first pattern is repeatable.',
        'Group the misses. A wrong phone and a wrong ZIP are digit errors. A wrong plate and a wrong vehicle identification number are look-alike errors. A wrong street with the correct house number is usually a word you rewrote instead of copied. Digit errors get a slower reading. Look-alike errors get a second pass with your finger on the card. Rewritten words mean you stopped copying and started remembering.',
        'Keep three reports, not one. If the missed field changes every time, you are rushing the whole card. If the missed field is the plate on all three, the next ten minutes belong to plates only, even though the card still shows the other boxes. The report is finished when you can name the field you will protect on the next run.',
      ],
    },
  ],
  faqHeading: 'FAQ',
  faq: [
    { question: 'How many fields are on each card?', answer: 'Each run shows 4, 5, 6, 7, or 8 fields chosen from the nine-field record. The label above the clock tells you the count before you start typing. The next card draws a new count and a new record.' },
    { question: 'Do I get credit for a field that is almost right?', answer: 'No. The field scores only when the letters and digits match. One wrong character, or an empty box, misses that field. Dashes in the phone number do not count as a miss.' },
    { question: 'Is the timer a passing time?', answer: 'No. The timer shows how long the run took. It does not declare a pass or a fail. Use the seconds together with the field count. A faster time with a missed plate is not a better result than a slower exact card.' },
    { question: 'Are these official data-entry questions?', answer: 'No. The names, streets, numbers, plates, and vehicle identification numbers are generated for practice. They are not taken from a testing vendor\'s forms or from a candidate guide.' },
  ],
  keepTraining: [
    'If the error report is clean and the seconds are the problem, move to a paragraph. The dispatcher typing test turns a caller record into text and reports net words per minute plus character accuracy. Use it when fields are exact and you want a speed figure that is not a field count.',
    'If the card is exact only while you can see it, listen to the next one. Audio data entry practice reads the name, address, phone, and plate, and you fill the boxes without the card in front of you. The 12-item CritiCall practice test mixes a short visual entry set with memory, audio, and decisions when you want a single diagnostic instead of another card. Stay with the page that still produces a named miss.',
  ],
  links: [
    { href: '/dispatcher-typing-test', label: 'Dispatcher typing test' },
    { href: '/criticall-test', label: 'CritiCall practice test' },
    { href: '/audio-data-entry-practice', label: 'Audio data entry' },
  ],
}

export const memoryPage = {
  path: '/memory-recall-test' as const,
  title: 'Memory Recall Test — Free 911 Dispatcher Practice',
  description: 'A free memory recall test built for 911 dispatcher exams: a code flashes for 3.5 seconds, then you type it back. Interruptions get added as you improve.',
  h1: 'Memory Recall Test for 911 Dispatchers',
  eyebrow: '3.5 seconds · exact match',
  breadcrumb: 'Memory recall',
  lede: 'A 6-character code appears for 3.5 seconds. You type it back. Anything short of an exact match scores 0.',
  points: [
    { title: '3.5 seconds', body: 'The code is covered automatically. You cannot hold it on screen.' },
    { title: '6 characters', body: 'Letters and digits, with the look-alike characters left out of the set.' },
    { title: 'Exact match', body: 'Five correct characters and one miss is still a missed code.' },
  ],
  sections: [
    {
      heading: 'How the memory section works',
      paragraphs: [
        'Press Show the code. A 6-character string stays on the screen for 3.5 seconds, then it is covered. You type those six characters in order and press Score recall. The set of characters leaves out I, O, and Q, and it leaves out 0 and 1, so a miss is a memory miss rather than a trick of two shapes that look the same. The code is new each time.',
        'Scoring is exact. Six matching characters score 100. Five matching characters score 0. There is no partial line on this drill, because a code that is off by one character is a different code. The result also says what the code was, so you can see whether you dropped the last character, swapped the middle pair, or invented a character that was never there.',
        'This item is the calm version. Nothing else appears during the 3.5 seconds. Hiring processes sometimes ask you to hold a short string and then do another task before you write it down. That second step is not inside this timer. When the calm code is reliable, the multitasking page is where a second task shows up before you finish the original work. Add that page only after you can hit exact matches here without guessing.',
      ],
    },
    {
      heading: 'Short-term memory alone is not what fails people',
      paragraphs: [
        'Six characters for 3.5 seconds is a small amount of information. Most candidates can hold it when the room is quiet and the next action is simply to type. The misses show up when the next action is something else: a question, a second form, or a decision that has its own timer. The code was never the hard part. The gap between seeing it and writing it is the hard part.',
        'You can watch that gap in your own results. If you miss the calm code on this page, the problem is the 3.5-second look, and more interruptions will not fix it. If you match the calm code five times and then lose it on the multitasking page, the problem is the task you inserted, not the length of the code. Those two results ask for different practice. One more day of quiet codes will not repair a code you drop only after a decision card.',
        'Audio makes the same point with a different input. A plate you heard once is a memory item even though nobody called it a memory module. If visual codes are exact and heard plates are not, switch to the audio page instead of lengthening the code. The failure is the channel, not a general "bad memory" label.',
      ],
    },
    {
      heading: 'Three techniques that actually work',
      paragraphs: [
        'Chunk the six characters as two groups of three. Read K3P and then 8L5, not six separate symbols. Type the first group, then the second. Candidates who chant all six as one stream tend to keep the beginning and lose the end. Two groups give you a place to restart if the last characters fade.',
        'Say the groups once, quietly, while they are on the screen. Do not keep repeating them after the code is covered until you have typed the first group. Extra repetition after the cover often rewrites the last character. If you speak, speak the original groups, not a word you invented to make them easier. A nickname for the code is a new string, and the score will mark it wrong.',
        'Type immediately when the boxes appear. Waiting to "make sure" is how the last character changes. If you are unsure of character five, type your best six and look at the expected line. One reviewed miss teaches the position you drop. Five minutes of staring at a covered code does not. Use the same two-group reading on the next code before you change techniques.',
      ],
    },
    {
      heading: 'A two-week practice plan',
      paragraphs: [
        'Week 1 is the calm code only. Do 10 codes a day, four days. Stop for the day when you record three exact matches in a row. If you miss two in a row, the session is over even if you have not reached 10. Write the position you missed: first group, second group, or a swap inside a group. The note matters more than the streak.',
        'Week 2 keeps five calm codes as a warmup, then moves the hold into a second task. Open the multitasking drill and treat the record you are entering as the thing you must not drop, the way you refused to drop the second group of the code. On two of the days, replace that with the audio page and enter a plate you only heard. The week is successful if the calm codes stay exact and you can name which second task still knocks a character out.',
        'Do not lengthen the code to 8 characters in these two weeks. A longer string hides whether the 6-character hold is stable. Add length only after week 2, and only if both the calm score and the interrupted work are exact. Otherwise you will practice a harder code while the original failure is still the interruption.',
      ],
    },
  ],
  faqHeading: 'FAQ',
  faq: [
    { question: 'How long does the code stay visible?', answer: '3.5 seconds. The cover is automatic. Refreshing the page starts a new code rather than bringing the old one back.' },
    { question: 'Why is a five-character match a zero?', answer: 'The code is an identifier. One wrong character makes it a different identifier. Partial credit would hide the only mistake that matters on this item.' },
    { question: 'When should I add an interruption?', answer: 'After you can match three calm codes in a row on the same day. Then use the multitasking drill, where a second task arrives before you finish the original record. Adding the interruption earlier mostly measures a code you could not hold yet.' },
    { question: 'Is this an official memory-module question?', answer: 'No. The codes are generated for this practice. They are not items from a vendor bank, and a perfect streak here is not a hiring result.' },
  ],
  keepTraining: [
    'The calm code is the baseline. The CritiCall multitasking practice is the same kind of hold with a decision card in the way: you classify the incident, return to the record, and then see how many points the interruption cost. Use it in week 2, not instead of the 3.5-second codes.',
    'The 12-item CritiCall practice test includes one memory code inside a longer sitting, so you can see whether the code survives other item types. Audio data entry practice is the heard version of the same problem: a plate and a phone you do not get to keep looking at. Pick the page that matches the miss you wrote down, and leave the other two until that miss stops repeating.',
  ],
  links: [
    { href: '/criticall-multitasking-test', label: 'Multitasking practice' },
    { href: '/criticall-test', label: 'CritiCall practice test' },
    { href: '/audio-data-entry-practice', label: 'Audio data entry' },
  ],
}

export const multitaskPage = {
  path: '/criticall-multitasking-test' as const,
  title: 'CritiCall Multitasking Practice — Free 911 Drill',
  description: 'Practice CritiCall-style multitasking free: mid-entry an incident interrupts you, you classify it, then return and hold your accuracy. Instant report.',
  h1: 'CritiCall Multitasking Practice Test',
  eyebrow: 'Baseline versus interruption',
  breadcrumb: 'Multitasking practice',
  lede: 'Enter one record with no interruption. Enter a second record while a classification card appears. The report is the gap between those two accuracies.',
  points: [
    { title: 'Two records', body: 'The first is the baseline. The second is the interrupted run.' },
    { title: 'One classification', body: 'You answer from the rule printed on the card, then return to the form.' },
    { title: 'Pressure drop', body: 'Baseline accuracy minus interrupted accuracy, in points.' },
  ],
  sections: [
    {
      heading: 'Why this is the section candidates lose points on',
      paragraphs: [
        'Candidates rarely fail because they cannot type a name in a quiet room. They lose the points on the record they were already entering when a second task arrives. The name they had finished stays finished. The plate they had not finished changes. A total score then hides the loss inside an average, and the candidate practices "everything" instead of the moment the second task appeared.',
        'This drill separates that moment. The first record has no card in the way. Its accuracy is what you can do when the only job is copying. The second record throws a classification after a few seconds. You choose Police, Fire, EMS, or Utility from the rule on the card, and only then do the fields accept typing again. The interrupted accuracy is the copying you still had left, plus any field you changed while the card was up.',
        'The points candidates lose are usually one field, not the whole form. A 4-field record at 100 percent baseline and 75 percent under the interruption means one field died. That is a 25-point pressure drop. It is a more useful number than a blended score that gives you most of the credit for the classification and lets the damaged plate pass as a decent total. If you only remember one figure from a session, remember the drop.',
      ],
    },
    {
      heading: 'What the interruption drill measures',
      paragraphs: [
        'It measures whether the original characters survive a required detour. The detour is small on purpose. The card states the rule: threats and property damage go to Police, flames or smoke go to Fire, injury or a medical symptom goes to EMS, and a damaged public service goes to Utility. You are not being asked to recall a local protocol. You are being asked to follow the sentence on the card and then come back.',
        'Two results come out of the second record. The classification is either the service the card required, or it is not. The fields are an accuracy percentage, scored the same way as the baseline: a field counts only when the letters and digits match. A correct classification with a wrong plate is still a damaged record. A wrong classification with a perfect plate is a rule miss, and the pressure drop can be zero. The report prints both so you do not trade one for the other without noticing.',
        'The delay before the card appears is a few seconds, long enough to start the form and short enough that you are unlikely to finish every field first. If you race the card and finish early, you have practiced speed, not a return. Let the card arrive. The skill is the return, including the field you had not touched yet and the field you were in the middle of.',
      ],
    },
    {
      heading: 'Baseline vs. under-pressure accuracy: how to read the gap',
      paragraphs: [
        'Pressure drop is baseline accuracy minus interrupted accuracy, in percentage points. A baseline of 100 and an interrupted record of 75 is a drop of 25. A baseline of 75 and an interrupted record of 75 is a drop of 0, which means the interruption did not make you worse. It also means the calm record was already losing a field. Fix the calm record before you celebrate a flat line. A negative drop means the interrupted record was cleaner than the baseline. That happens. Treat it as noise until you see it on a second pair.',
        'Read the drop beside the classification, not instead of it. A 25-point drop with a correct classification means the detour itself cost a field. The next session is a shorter form and a deliberate stop: when the card appears, lift your hands, answer, then re-read the field you were in before you type again. A 0-point drop with a wrong classification means your copying held and the rule did not. The next session is the rule sentence, not the keyboard.',
        'Other practice sites will give you a single percentage for a mixed exercise. That number cannot tell you whether the interruption cost 0 points or 25. The gap is the reason to run the pair. Three pairs are enough for one day. If the drops are 0, 25, and 50, you do not have a stable return yet, and the average of those three would only blur the pattern. Write down the three drops. Train until two of the three are 0 and the classifications on those pairs are correct.',
      ],
    },
    {
      heading: 'How to train it',
      paragraphs: [
        'Start with the baseline you can already hit. If the first record on this page is under 100 percent, leave the interruption for another day and use the data-entry or typing page until a calm record is exact. Adding a card on top of a record you already miss teaches you to miss faster. The drop is only interpretable when the baseline is exact or one known field.',
        'When the baseline is exact, run three pairs. On each pair, do not type through the card. Answer from the printed rule, then put a finger on the field you were entering and finish that field before you look at the next one. After the report, say the drop out loud: 0, 25, 50, or whatever the fields produced. A 25-point drop on a 4-field form is one field. Name that field. The next pair is an attempt to protect it, not an attempt to click faster.',
        'Add the memory page or the 12-item mix only after two pairs in one day show a 0-point drop and a correct classification. The memory page checks a code with no detour. The 12-item test checks whether entry, memory, audio, and decisions can sit in one sequence. Neither of those replaces the drop. If a later session shows the drop back at 25 or more, return to three pairs here before you add anything else.',
      ],
    },
  ],
  faqHeading: 'FAQ',
  faq: [
    { question: 'What is pressure drop?', answer: 'It is your accuracy on the quiet record minus your accuracy on the record that was interrupted. A result of 25 means the interruption cost 25 percentage points, usually one field on a four-field card. It is a practice figure, not an official subscore.' },
    { question: 'Does a correct classification erase a missed plate?', answer: 'No. The report shows the classification and the field accuracy separately. You can classify the incident correctly and still post a pressure drop because a field changed. Both lines have to be clean.' },
    { question: 'What if I finish the form before the card appears?', answer: 'You measured typing speed, not a return. Start the next pair and let the card arrive before the last field is done. The useful trial is the one that stops you in the middle.' },
    { question: 'Is this an official multitasking module?', answer: 'No. The records and the incident prompts are original practice items. The rule you use is printed on the card for that drill. Agencies configure their own modules and their own rules.' },
  ],
  keepTraining: [
    'Use the 12-item CritiCall practice test when you want entry, memory, audio, and decisions in one short sitting. Use it as a check on whether the pressure drop stays small once other item types are in the same session. If the mix brings the drop back, the mix is not the next week of practice. This page is.',
    'The dispatcher typing test gives you net words per minute on a caller paragraph, which tells you whether speed is the constraint before you add a card. The memory recall test gives you a 3.5-second code with no detour, which tells you whether a short hold is stable before you blame the interruption. Run those only to explain a drop you already measured here. A drop of 25 with a correct classification is still a return problem, and another typing score will not name the field you lost.',
  ],
  links: [
    { href: '/criticall-test', label: 'CritiCall practice test' },
    { href: '/dispatcher-typing-test', label: 'Dispatcher typing test' },
    { href: '/memory-recall-test', label: 'Memory recall test' },
  ],
}

export const audioPage = {
  path: '/audio-data-entry-practice' as const,
  title: 'Audio Data Entry Practice — 911 Dispatcher (Free)',
  description: 'Free audio data entry practice for 911 dispatchers. A caller reads names, addresses and plates at exam speed — enter each field and get scored.',
  h1: 'Audio Data Entry Practice for 911 Dispatchers',
  eyebrow: 'Heard fields · exact match',
  breadcrumb: 'Audio data entry',
  lede: 'Play a generated caller. Enter the name, address, phone, and plate. Each field is exact-match, and a missed field shows the expected text.',
  points: [
    { title: 'Four heard fields', body: 'Name, street address, callback, and plate.' },
    { title: 'Replay on', body: 'This practice page lets you play the caller again before you score.' },
    { title: 'English voice', body: 'If the browser has no English voice, a labeled transcript appears instead.' },
  ],
  sections: [
    {
      heading: 'What the audio section tests',
      paragraphs: [
        'The caller is a generated record read aloud: name, location, callback number, and vehicle plate. Numbers are spoken digit by digit so you cannot lean on a familiar phone rhythm. The plate is spoken character by character. You type into four boxes and score the run. A field matches only when the letters and digits match. One wrong digit misses that field.',
        'This is data entry with the card removed. The facts are the same kind you copy on the visual data-entry page. The difference is that the source disappears when the audio stops. Replay is allowed here because this is practice, not a claim that a hiring module will repeat the caller. Use the first play as the attempt. Use the second play only to check the field you already suspect.',
        'If this browser has no English voice, the page shows a transcript and labels it as a fallback. Score that run as reading practice, not as a listening result. Switch to Chrome or another browser with an English voice before you treat the percentage as an audio score. The visual typing page and the visual data-entry page do not need a voice, so they remain available when speech is not.',
      ],
    },
    {
      heading: 'Headphones, quiet room, and why background noise is part of the test',
      paragraphs: [
        'Use headphones if you have them. Laptop speakers in a kitchen will cost you the plate, and you will record the miss as a memory problem. A quiet room is the fair version of this drill. Take three runs that way and keep the field you miss. That miss is yours. A miss in a noisy room is partly the room.',
        'Hiring sessions are not always quiet. Other candidates type. A proctor speaks. A speaker across the room plays a different item. You cannot reproduce that room exactly, and you should not start there. Add noise only after three quiet runs are at 4 of 4 fields. Then play the caller once with the room as it is, without raising the volume to drown it out. If the plate drops only in that condition, the next practice is one quiet run and one ordinary-room run, not a louder pair of headphones.',
        'Do not add music with lyrics. Lyrics compete with the name. A fan, a distant television with the volume low, or the ordinary sound of the room is enough for the second stage. Write down whether the missed field was a digit string or the street name. Digit strings usually fail first when the room gets busier, because they have no word shape to reconstruct.',
      ],
    },
    {
      heading: 'Difficulty: speech speed, corrections, and distractions',
      paragraphs: [
        'This page speaks at a steady practice rate, slower than a rushed caller and faster than a word-by-word drill. If 4 of 4 fields is reliable at that rate, the next constraint to add is not a faster voice. It is one play only. Cover the replay by deciding, before you press play, that you will not press it again. Score whatever you have. A hiring module may give you a single pass. Find out what your single pass is worth before you ask for a faster recording.',
        'Callers correct themselves. This generated caller does not, on purpose. The recording will not say "no, the plate is" and then change a character. When your quiet single-pass runs are exact, you can simulate a correction with a pencil: play once, write the plate, then change one character in your notes and type the corrected version. That is a later drill. Doing it now, while the first pass is still wrong, teaches you to edit a string you never heard correctly.',
        'A distraction belongs after the single pass is clean. The multitasking page puts a decision card on top of a form you can see. Audio plus a second task is harder than either one, and it is the wrong place to discover that you drop the last digit of a phone. Sequence the work: visual fields exact, heard fields exact with replay, heard fields exact on one play, then an interruption on a form you can see. Skip a step and the error report will not tell you which step failed.',
      ],
    },
  ],
  faqHeading: 'FAQ',
  faq: [
    { question: 'Can I replay the caller?', answer: 'Yes, on this practice page. Use the first play as the real attempt. A hiring module may allow one play only. When your replayed runs are exact, score a run in which you choose not to press play a second time.' },
    { question: 'What if I see a transcript?', answer: 'The browser did not provide an English voice. The transcript is labeled as a fallback. Treat that score as reading practice. An audio score requires the spoken caller.' },
    { question: 'Which characters are spoken one by one?', answer: 'Phone numbers, the street number, and the plate. The goal is to stop you from guessing a familiar pattern. Write what you hear, including a zero that might have been the letter O.' },
    { question: 'Is this an official listening test?', answer: 'No. The caller script is generated from an original record. It is not an official audio item, and the voice on your computer is not a testing vendor\'s recording.' },
  ],
  keepTraining: [
    'Go back to print when the heard plate is the only miss. The dispatcher typing test puts a caller paragraph on screen and scores characters. The data entry practice test puts the plate in a box you can see and marks the field when one character is wrong. If those visual runs are exact and the heard plate is not, stay on this page. If the visual plate is also wrong, the audio score is not the first problem.',
    'The 12-item CritiCall practice test includes a spoken record among the other item types, with a labeled transcript fallback when speech is unavailable. Use that sitting after you know your one-play score here. A mixed sitting will not identify a plate you have not yet heard correctly on its own. Finish four-field audio runs first, then see whether that field still fails when memory and decisions are in the same sequence.',
  ],
  links: [
    { href: '/dispatcher-typing-test', label: 'Dispatcher typing test' },
    { href: '/data-entry-practice-test', label: 'Data entry practice test' },
    { href: '/criticall-test', label: 'CritiCall practice test' },
  ],
}

export const pdfPage = {
  path: '/criticall-practice-test-pdf' as const,
  title: 'CritiCall Practice Test PDF — Free Printable Answer Sheet',
  description: 'Download a free CritiCall practice test PDF with answer sheet and scoring guide — plus the online version that scores you automatically.',
  h1: 'CritiCall Practice Test PDF (Free Printable)',
  eyebrow: 'Printable sheet · answer key included',
  breadcrumb: 'Practice test PDF',
  lede: 'Use the sheet to practice item types. Use the online version to practice under pressure.',
  points: [
    { title: '3 pages', body: 'Records to copy, codes to hold, decisions, then the answer key.' },
    { title: '22 points', body: '12 entry fields, 4 memory codes, and 6 decisions.' },
    { title: 'Not a hiring form', body: 'Original practice items. No official questions and no cutoff.' },
  ],
  sections: [
    {
      heading: 'What\'s in the PDF',
      paragraphs: [
        'The file is three pages. Page 1 has three original caller records. Each record has a name, a street address, a fictional 555 phone number, and a plate. Under each record are four blank lines, one per field. You copy the characters. You do not summarize them. Page 2 has four 6-character codes and six short incidents. The codes are for a look of about four seconds before you cover them and write. The incidents are answered from a rule printed on that page: threats and property damage to Police, flames or smoke to Fire, injury or a medical symptom to EMS, and a damaged public service to Utility.',
        'Page 3 is the answer key and the scoring guide. It lists every field, every code, and every service. It does not contain a second set of hidden questions. If you want more items, the online drills generate a new record instead of extending this file into a bank you could memorize. The names and numbers in the PDF are fixed so a printed sheet has a stable key. That is also the limit of a PDF. The same three records will still be the same three records next week.',
        'The sheet is free and does not require an account. It is practice DispatchReady wrote. It is not a form from CritiCall or from Biddle Consulting Group, and it is not the test an agency will hand you. Print it, write on it, and score it with the last page. Then stop using it as your only rehearsal. A fixed sheet cannot change when you have memorized it.',
      ],
    },
    {
      heading: 'How to score yourself',
      paragraphs: [
        'Give one point for each entry field that matches every letter and digit. A phone number with the same digits and different dashes still counts. A plate with one swapped character does not. There are four fields on each of three records, so entry is worth 12 points. Give one point for a memory code only when all six characters match, in order. Four codes are worth 4 points. Give one point for each incident whose service matches the key. Six incidents are worth 6 points. The total is 22.',
        'A clean practice sheet is 18 or higher, with no missed plate. That sentence is a study target for this file. It is not a hiring cutoff, and it is not a prediction. An agency does not grade this PDF. If you score 16 because two plates are wrong, the next action is those two plates, not another full sheet. If you score 20 and the two misses are decisions, reread the rule on page 2 and redo only the six incidents.',
        'Score in ink, once. Changing an answer after you peek at page 3 turns the sheet into a reading exercise. If you want a second attempt, leave the paper and use an online drill, which will not reuse these three records. Write the date and the point total on page 1. A single number without the date is how a lucky sheet becomes a story about being ready.',
      ],
    },
    {
      heading: 'PDF vs. online practice: what a printable sheet can\'t measure',
      paragraphs: [
        'A printed sheet can check whether you copy a visible record, hold a short code, and follow a rule you can reread. It cannot play a caller. It cannot hide the code after 3.5 seconds unless you look away honestly. It cannot put a decision on top of a form you have not finished, and it cannot compute the gap between a quiet record and an interrupted one. Those are the measurements that change how you practice next. A point total of 20 does not contain them.',
        'The online multitasking drill records that gap on purpose. You enter one record with nothing else on the screen, then a second record that stops you for a classification. The report subtracts the second accuracy from the first and calls the difference pressure drop. A sheet has no way to show a 25-point drop. If you rely on the PDF alone, you can be neat on paper and still lose a plate the moment a second task appears. That is the reason the sheet points you back to the live drill instead of offering more pages of similar blanks.',
        'Use the PDF for a table, a commute, or a day without a reliable browser. Use the online test when you are at a keyboard and can be timed. Download the file, score it once, and then take the 12-item practice test or the multitasking pair. If the paper score is high and the pressure drop is 25 or more, believe the drop. The paper could not have told you about it.',
      ],
    },
  ],
  faqHeading: 'FAQ',
  faq: [
    { question: 'Is this an official CritiCall PDF?', answer: 'No. It is an original practice sheet with its own records, codes, and rule. It is not published by CritiCall or Biddle Consulting Group, and it is not a leaked form.' },
    { question: 'What is a clean score on the sheet?', answer: '18 or more out of 22, with no missed plate, is the study target written on the answer page. It applies only to this file. It is not a passing score for any agency.' },
    { question: 'Why is the online drill still necessary?', answer: 'The sheet cannot time an interruption or score the accuracy you lose when you leave a form and come back. That gap is the pressure drop on the multitasking page. A perfect paper total does not include it.' },
    { question: 'Can I share the file?', answer: 'Yes. The PDF is free to download and pass along. If you link to it, link to this page so the answer key and the online drill stay with the file.' },
  ],
  keepTraining: [
    'Score the sheet once, then leave it. The 12-item CritiCall practice test generates a fresh set of entry, memory, audio, and decision items and scores them in the browser. You cannot peek at a printed key halfway through. That is the right second attempt after page 3 of the PDF has already shown you the answers.',
    'If the paper decisions were perfect and you still want the measurement a sheet cannot make, open the CritiCall multitasking practice. It reports baseline accuracy, interrupted accuracy, and the pressure drop between them. The data entry practice test is the third stop when the PDF plates were the misses: the fields are on screen, the match is exact, and the error line names the character you changed. A second printout of the same three records will not do either job.',
  ],
  links: [
    { href: '/criticall-test', label: 'CritiCall practice test' },
    { href: '/criticall-multitasking-test', label: 'Multitasking practice' },
    { href: '/data-entry-practice-test', label: 'Data entry practice test' },
  ],
}
