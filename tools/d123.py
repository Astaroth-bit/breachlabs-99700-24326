from b2 import *
# ---------- Design 1
L=[ann(1,"Header bar","App name and a greeting in a 64 px sage bar.","Friendly, but there is no counsellor button up here because everything was pushed into one page.","Safety|no","q.hd","L"),
 ann(2,"Mood slider","Drag a thumb from Awful to Great.","Quick with a steady hand, but the 24 px thumb is under the 44 px target and hard to drag when anxious.","Size|no","q.slider","L"),
 ann(3,"Compact tag grid","All 10 tags squeezed to 36 px so they fit above the fold.","Fitting everything in costs tap size, so mis-taps are more likely.","Size|no","q.tags","L"),
 ann(4,"Note box","Optional free text on the same page as the tags.","Keeps the whole check-in in one place, which my brief asks for.","Function","q.note","L")]
R=[ann(5,"Live suggestion card","Changes after every tap. There is no submit button.","The fastest idea (2 taps), but the card keeps changing under the thumb, which can feel unsettling.","Speed","q.card","R"),
 ann(6,"Fold line (740 px)","Marks what a phone shows without scrolling.","Everything below it, including help and history, is invisible until the student scrolls.","Safety|part","q.fold","R"),
 ann(7,"Recent check-ins","A diary-style list of past entries on the main page.","Useful for reflection, but anyone who picks up a shared school laptop can read it.","Privacy|no","q.hist","R"),
 ann(8,"Counsellor link in the footer","The only route to the counsellor, about 1180 px down.","A stressed student has to scroll to the very bottom to find help.","Safety|no","q.clink","R")]
body=(dev(dash1(),832,170,0.665,"q")+col(18,180,560,L)+col(1342,180,560,R))
render("n1",page(frame(body,["<b>Screens</b> 1 (scrolls to 1180 px)","<b>Taps to a card</b> 2","<b>Counsellor</b> bottom of page","<b>Colours</b> Paper #F3EFE6 · Sage #5E7F64 · Gold #B08A4A · Ink #26312A","<b>Type</b> system font (Inter shown)"]),CSS1))
# ---------- Design 2
L=[ann(1,"Progress bar","Four segments fill as the student moves on.","Like a checkout, it shows how far away help is, which lowers uncertainty.","Function","q1.pg1","L"),
 ann(2,"Large mood buttons","Full-width 312 x 56 px buttons with a face and a word.","The easiest targets of all four ideas: almost impossible to mis-tap.","Size","q1.mb2","L"),
 ann(3,"Floating '?' button","A round 56 px help button on every step.","Always visible, but a question mark doesn't say 'counsellor', so students may not know it means help.","Safety|part","q1.fab1","L"),
 ann(4,"Next on every step","Each screen ends with Next.","About 6 taps before any help, double my limit. Stress weakens the working memory a sequence needs (Arnsten, 2009).","Speed|no","q1.next1","L")]
R=[ann(7,"Suggestion card","Label, steps and source with plenty of space.","Nothing competes for attention, so the evidence label is easy to read.","Honesty","q4.card2","R"),
 ann(8,"Support line","The same line for everyone under the card.","Shown every time and never triggered by words, so nobody is missed.","Safety","q4.sup2","R")]
B1=ann(5,"Tags on their own screen","The same 10 tags at 44 px with room to breathe.","Calm screens, but the check-in is split across three screens.","Function|no","q2.tags2","B")
B2=ann(6,"Note screen with Skip","A whole screen just for the optional note.","Most students will press Skip, so this screen mainly adds a tap.","Speed|no","q3.skip","B")
xs=[484,728,972,1216]; s=0.57
body="".join(dev(step2(i+1),x,222,s,f"q{i+1}") for i,x in enumerate(xs))
body+="".join(cap(f"Step {i+1} · "+["Mood","Tags","Note","Suggestion"][i],x-20,172,380*s+40) for i,x in enumerate(xs))
body+=col(18,180,450,L)+col(1452,300,450,R)+box(560,790,400,B1)+box(980,790,400,B2)
render("n2",page(frame(body,["<b>Screens</b> 4 steps + Help","<b>Taps to a card</b> 5 to 6","<b>Counsellor</b> '?' button","<b>Colours</b> Lilac #F1EFF8 · Plum #5B4F8A · Blue #3F6E9E · Ink #24213A","<b>Type</b> system font (Inter shown)"]),CSS2))
# ---------- Design 3
L=[ann(1,"Scripted prompts","Grey bubbles written in advance, always in the same order.","Feels like chatting with a friend, and nothing is generated, so no AI reads the answers.","Safety","c1.prompt","L"),
 ann(2,"Reply chips","Only 4 chips fit across a 360 px phone.","The 10 tags are cut to 4 short ones, so 'IA or deadline' and 'home' disappear.","Customer|no","c1.chips","L"),
 ann(3,"Answer bubbles","Each tap turns into a blue bubble, like texting.","Familiar and friendly, but it uses up the screen quickly.","Aesthetics","c1.answer","L"),
 ann(4,"Message box","Looks exactly like a messaging app.","Students may think a real person reads what they type, and share something nobody sees.","Privacy|no","c1.inp1","L")]
R=[ann(5,"Phone icon for help","The only route to help: a 44 px phone icon with no words.","Icons are easy to miss, and a phone suggests calling, which students can't do in class.","Safety|part","c2.phone2","R"),
 ann(6,"Suggestion as a message","The technique arrives as a chat bubble.","It reads like advice from a friend rather than a checked card from the school.","Function|part","c2.sugg","R"),
 ann(7,"Evidence line","The label and source shrink to 12 px under the bubble.","Below my 16 px minimum, so the honesty label is the hardest thing to read.","Size|no","c2.ev","R"),
 ann(8,"Support bubble","The fixed support line, sent as its own bubble.","Everyone sees it, but it scrolls away as the chat grows.","Safety","c2.sup3","R"),
 ann(9,"Try another / Done","Two chips to carry on or end the chat.","Simple, but ending a 'conversation' can feel abrupt.","Function","c2.again","R")]
body=(dev(chat3(1),598,172,0.9,"c1")+dev(chat3(2),978,172,0.9,"c2")+cap("Chat: check-in",560,948,420)+cap("Chat: suggestion",940,948,420)
      +col(18,172,540,L)+col(1362,172,540,R))
render("n3",page(frame(body,["<b>Screens</b> 1 chat + Help","<b>Taps to a card</b> 3 to 4","<b>Counsellor</b> icon only","<b>Colours</b> White #FFFFFF · Mist #EEF1F5 · Blue #2D7FF9 · Ink #111827","<b>Type</b> system font (Inter shown)"]),CSS3))
print("ok")
