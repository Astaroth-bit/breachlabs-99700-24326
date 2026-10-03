from b2 import *
L=[ann(1,"Mood faces","Five faces from Awful to Great. Picking one is the only required step.","A face plus a word reads faster than a number scale, and colour is never the only signal.","Size","pA.mood1","L"),
 ann(2,"Mood description","Explains the chosen mood in one plain sentence, e.g. 'Bad: things feel heavy'.","'Bad' means different things to different people. The sentence helps everyone choose the same way.","Customer","pA.mcap","L"),
 ann(3,"'How I feel' tags","Five feeling words. Tap any, or none.","Naming the feeling comes first in most CBT skills, and tapping is easier than typing with shaky hands.","Function","pA.feel","L"),
 ann(4,"'What's happening' tags","Five MYP and DP situations. 'in class' gives silent techniques only.","The same feeling needs a different technique in a lesson than at home. This makes the card fit.","Customer","pA.what","L"),
 ann(5,"Optional note","Up to 280 characters for anything the tags miss.","12 of 20 peers wanted to write. Nothing reads it, so it can't be misused.","Safety","pA.note","L"),
 ann(6,"Submit button","The third tap. Matching runs on the phone, so the card appears at once.","The label says exactly what happens next. On phones shorter than 800 px it drops below the fold (fixed in B.iii).","Speed|part","pA.submit","L")]
R=[ann(7,"Counsellor button","Opens Help: the counsellor's room, drop-in times and email.","Words, not an icon, in the same spot on every screen, so help never has to be searched for.","Safety","pB.cbtn","R"),
 ann(8,"Evidence label","Shows 'Strong evidence', 'Some evidence' or 'Worth a try'.","Students can judge how far to trust a tip, so the app never promises more than research shows.","Function","pB.pill","R"),
 ann(9,"One coping card","One technique with an icon, numbered steps and the source.","One card instead of a list avoids choice overload when stress lowers working memory.","Function","pB.card","R",dy=60),
 ann(10,"Try a different one / Done","Next card in the same cell, or back to a blank check-in.","Gives control without restarting. 'Done' clears the screen so nobody else sees it.","Safety","pB.done","R"),
 ann(11,"Support line","The same safe-messaging line for everyone, linking to Help.","Shown every time, not triggered by words, so it can't miss anyone the way AI detection can.","Safety","pB.support","R")]
body=(dev(checkin4(sticky=False),598,172,0.9,"pA")+dev(suggestion4(),978,172,0.9,"pB")
 +cap("Screen 1 · Check-in",560,948,420)+cap("Screen 2 · Suggestion",940,948,420)
 +col(18,172,540,L)+col(1362,172,540,R))
d=render("n4",page(frame(body,["<b>Screens</b> 2 + Help + Privacy","<b>Taps to a card</b> 3","<b>Counsellor</b> top bar, every screen","<b>Colours</b> Cream #F7F3EA · Pale teal #DCEBE7 · Blue #3B6A8C · Ink #1E3236","<b>Type</b> system font (Inter shown)"]),CSS4))
