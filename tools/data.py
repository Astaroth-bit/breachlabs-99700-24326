# Shared data for Criterion B ii-iv boards and document.

CARDS = {
 "B1": dict(name="Long out-breath", type="Breathing", silent=True, label="Some evidence",
   steps=["Breathe in through your nose for a count of 4.", "Breathe out slowly through your mouth for a count of 6.", "Repeat 5 times (about 1 minute)."],
   why="A longer out-breath can help your body slow down.",
   source="Fincham et al. (2023)", tested="Meta-analysis of trials with adults; small to medium effects, and the authors ask for better-quality trials."),
 "B2": dict(name="Double-inhale sigh", type="Breathing", silent=False, label="Some evidence",
   steps=["Breathe in through your nose.", "At the top, take one more short sip of air.", "Breathe out slowly and fully through your mouth.", "Repeat for 1 to 5 minutes."],
   why="In one trial, breathing with a long out-breath lifted mood more than mindfulness did.",
   source="Balban et al. (2023)", tested="One month-long online trial with adults."),
 "G1": dict(name="5-4-3-2-1", type="Grounding", silent=True, label="Worth a try",
   steps=["Name 5 things you can see.", "Name 4 things you can feel and 3 you can hear.", "Name 2 things you can smell and 1 you can taste."],
   why="Grounding is one of the WHO's self-help skills. This version uses your senses.",
   source="World Health Organization (2020)", tested="Recommended in a WHO self-help guide; this exact version has not been tested on its own."),
 "G2": dict(name="Feet on the floor", type="Grounding", silent=True, label="Worth a try",
   steps=["Slowly push your feet into the floor.", "Press your palms together or onto the desk.", "Notice the chair holding you up.", "Look around and name where you are."],
   why="This is the grounding exercise from the WHO's stress guide.",
   source="World Health Organization (2020)", tested="Recommended in a WHO self-help guide; not tested on its own with teenagers."),
 "C1": dict(name="Check the thought", type="CBT reframing", silent=True, label="Some evidence",
   steps=["Write the worrying thought in one line.", "Ask: what is the evidence for it, and against it?", "Ask: what would I tell a friend who thought this?", "Write a fairer version of the thought."],
   why="Questioning a thought is a core skill in CBT.",
   source="Hofmann et al. (2012)", tested="CBT was tested as full courses, usually with a therapist, not as a single card."),
 "C2": dict(name="Nerves can help", type="CBT reframing", silent=True, label="Some evidence",
   steps=["Notice the racing heart or butterflies.", "Tell yourself: 'This is my body getting ready.'", "Take one slow breath and start."],
   why="Students told that nerves can help them did better on a practice test.",
   source="Jamieson et al. (2010)", tested="One study with US students preparing for the GRE."),
 "C3": dict(name="Worry dump", type="CBT reframing (writing)", silent=True, label="Some evidence",
   steps=["Take a blank page or the back of your notes.", "For 5 minutes, write what worries you about the test.", "Close it. You don't need to read it again."],
   why="Writing worries down before a test can free up space to think.",
   source="Ramirez & Beilock (2011)", tested="Tested with high school and university students in the US."),
 "C4": dict(name="One next step", type="Problem solving", silent=True, label="Worth a try",
   steps=["Write the whole task in one line.", "Split it into 3 small pieces.", "Do only the first piece for 10 minutes."],
   why="Problem-solving skills help protect teenagers' mental health.",
   source="World Health Organization (2024)", tested="The WHO lists problem-solving skills as protective; this exact method was not tested."),
 "M1": dict(name="Two-minute reset", type="Movement or break", silent=False, label="Some evidence",
   steps=["Stand up and stretch your arms and shoulders.", "Walk to refill your water bottle.", "Come back and start with the easiest part."],
   why="Short breaks raised energy and lowered tiredness across 22 studies.",
   source="Albulescu et al. (2022)", tested="Mostly adults at work or in lab tasks; small effects."),
 "M2": dict(name="Look away", type="Movement or break", silent=True, label="Worth a try",
   steps=["Look at something far away for 20 seconds.", "Roll your shoulders back twice.", "Unclench your jaw and hands."],
   why="Even a very short pause can lower tiredness.",
   source="Albulescu et al. (2022)", tested="Based on the micro-break review; this exact version was not tested."),
 "R1": dict(name="Talk to the counsellor", type="Reaching out", silent=True, label="Worth a try",
   steps=["Tap 'Talk to the counsellor' at the top.", "See when you can drop in, or send a booking email.", "You don't need a reason to go."],
   why="Support at school is one of the things that protects teenagers' mental health.",
   source="World Health Organization (2024)", tested="General WHO guidance, not a trial of this app."),
 "R2": dict(name="Message someone you trust", type="Reaching out", silent=False, label="Worth a try",
   steps=["Pick one person: a friend, a parent or another adult you trust.", "Send one line, like 'Rough day, can we talk later?'", "You don't have to explain everything."],
   why="Good relationships with family and friends help protect teenagers' mental health.",
   source="World Health Organization (2024)", tested="General WHO guidance, not a trial of this app."),
}

COLS = ["Test or exam", "IA or deadline", "In class", "Other or none"]
ROWS = ["anxious", "overwhelmed", "frustrated", "low", "tired", "no feeling tag"]
TABLE = {
 "anxious":        [["C3","C2","B1"], ["C4","B1","C1"], ["B1","G2","C2"], ["B2","G1","C1"]],
 "overwhelmed":    [["B1","C3","G1"], ["C4","M1","B1"], ["G2","B1","M2"], ["G1","C4","B2"]],
 "frustrated":     [["B1","C1","M2"], ["M1","C4","B2"], ["B1","M2","G2"], ["M1","B2","C1"]],
 "low":            [["R1","G1","C1"], ["M1","R2","C4"], ["G2","M2","R1"], ["R2","M1","R1"]],
 "tired":          [["M1","B2","C2"], ["M1","C4","M2"], ["M2","B1","G2"], ["M1","M2","B2"]],
 "no feeling tag": [["B1","C2","G1"], ["C4","M1","B1"], ["B1","G2","M2"], ["M1","G1","B1"]],
}

TESTS = [
 ("Bad", "anxious", "test or exam", "C3"),
 ("Okay", "overwhelmed", "IA or deadline", "C4"),
 ("Bad", "anxious", "in class", "B1"),
 ("Awful", "low", "home", "R1"),
 ("Good", "(none)", "(none)", "M1"),
]

# Spec list (short names, ACCESSFMM order as in B.i)
SPECS = [
 ("Aesthetics", "Calm and consistent look"),
 ("Cost", "Free to build and free to use"),
 ("Customer / Client", "Fits both MYP and DP students"),
 ("Customer / Client", "Allowed in class"),
 ("Environment", "Works fast on school Wi-Fi"),
 ("Environment", "Lightweight text"),
 ("Safety", "Counsellor button on every screen"),
 ("Safety", "'You're not alone' line for everyone"),
 ("Safety", "Private by design"),
 ("Safety", "Nothing unsafe for minors"),
 ("Size", "Fits every school screen"),
 ("Size", "Easy to tap and read"),
 ("Form and Function", "Hybrid check-in on one screen"),
 ("Form and Function", "A matched coping suggestion"),
 ("Form and Function", "Fast enough to use under stress"),
 ("Form and Function", "Honest about the evidence"),
 ("Manufacturing", "Built in a browser in about 20 hours"),
 ("Manufacturing", "Easy to extend later"),
 ("Materials", "Free, licensed and traceable"),
]
# Y = met, P = partly met, N = not met ; one note per cell where useful
SCORES = {
 "D1": "YYYYYYNPNYYNYYYYYYY",
 "D2": "YYYYYYPYYYYYNYNYYYY",
 "D3": "YYNYYYPYPYYNPYPYYPY",
 "D4": "YYYYYYYYYYYYYYPYYYY",
}
NAMES = {"D1": "Design 1: All-in-One Dashboard", "D2": "Design 2: Step-by-Step Guide",
         "D3": "Design 3: Scripted Chat (no AI)", "D4": "Design 4: Check-in Card + Result"}

# Feedback data (mock, as agreed with the student)
PEER_PREF = {"D1": 4, "D2": 1, "D3": 8, "D4": 7}           # n = 20
PEER_MYP = {"D1": 2, "D2": 0, "D3": 6, "D4": 2}            # n = 10
PEER_DP = {"D1": 2, "D2": 1, "D3": 2, "D4": 5}             # n = 10
TIME_TO_CARD = {"D1": 9, "D2": 22, "D3": 17, "D4": 11}      # median s, n = 5
TIME_TO_HELP = {"D1": 14, "D2": 9, "D3": 7, "D4": 2}        # median s, n = 5
COUNSELLOR = {"D1": 2, "D2": 4, "D3": 1, "D4": 5}           # 0-5 'safe to give students'
TEACHER = {"D1": 3, "D2": 4, "D3": 2, "D4": 5}              # 0-5 'I would allow this in my lesson'

def count(d):
    s = SCORES[d]; return s.count("Y"), s.count("P"), s.count("N")

if __name__ == "__main__":
    for d in SCORES: print(d, count(d))
    used = {c for r in TABLE.values() for cell in r for c in cell}
    print("unused", set(CARDS) - used)
    for r, cells in TABLE.items():
        for c in cells[2]:
            assert CARDS[c]["silent"], (r, c)
    print("class column all silent")

# Mood and tag guide (shown on screen and in B.iv)
MOOD_GUIDE = [
 ("Awful", "Too much right now. Hard to think about anything else.", "You've felt panicky since lunch and can't take in anything the teacher says.", "The counsellor card is shown first, then the matched cards."),
 ("Bad", "Things feel heavy, but you can still get through the lesson.", "You just walked out of a maths test you think went badly and your chest feels tight.", "Normal matching. With no feeling tag, it uses the 'low' row."),
 ("Okay", "Not great, not terrible. A bit on edge.", "Your IA draft is due Friday and it keeps popping into your head in class.", "Normal matching."),
 ("Good", "Mostly fine. Just checking in.", "A normal day, but you have a presentation next period.", "Normal matching. With no feeling tag, it uses the 'no feeling tag' row."),
 ("Great", "Feeling steady and want to keep it that way.", "You finished a big deadline and want a quick reset before the next lesson.", "Normal matching, usually a short break or breathing card."),
]
FEEL_GUIDE = [
 ("anxious", "Worried about what might happen. Racing heart, butterflies, tight chest.", "Waiting outside the exam room."),
 ("overwhelmed", "Too many things at once. You don't know where to start.", "Three deadlines in one week, plus an IA draft."),
 ("frustrated", "Annoyed or stuck because something isn't working.", "Your code won't run and the lesson ends in 10 minutes."),
 ("low", "Flat, sad or unmotivated.", "You've felt down all week and don't want to talk in class."),
 ("tired", "Drained, sleepy or foggy.", "You stayed up late revising and nothing is going in."),
]
WHAT_GUIDE = [
 ("test or exam", "Before, during a break in, or just after an assessment.", "Mocks, unit tests, quizzes, orals.", "Test"),
 ("IA or deadline", "Coursework or anything with a due date.", "IA, EE, TOK essay, MYP Personal Project.", "IA"),
 ("in class", "You're in a lesson and can't leave or talk. Only silent cards are shown.", "Sitting in chemistry and feeling it build.", "Class"),
 ("friends or people", "Something with friends, classmates or family.", "A falling-out with a friend at break.", "Other"),
 ("home", "Something at home or outside school.", "An argument at home before school.", "Other"),
]
