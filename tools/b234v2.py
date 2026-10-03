from docbuild import *
from docbuild import _run
from data import *
E = "/root/r/exp/"
d = new_doc()
W2 = [2200, 8312]
FIG = [0]
def fig(img, cap):
    FIG[0] += 1
    image(d, E + img, caption=f"Figure B{FIG[0]}: {cap}")

# ------------------------------------------------------------------ B.ii
H1(d, "Criterion B: Developing ideas")
H2(d, "ii. Develop a range of feasible design ideas")
P(d, "Before drawing anything, I wrote down the one question every idea had to answer: how does a student who has just walked out of a hard test get from 'I feel bad' to one thing that might actually help, without ever losing sight of the counsellor? I then came up with four different answers to it. They are not the same app in four colour schemes. Each idea moves the student through the check-in in a different way, because my research in Criterion A showed that speed and being able to find help were what mattered most to students.")
P(d, "To keep the comparison fair, all four ideas use the same content: the same five moods, the same ten tags and the same library of twelve coping cards. All four are free and could be built in Google AI Studio in about 20 hours, so the choice in B.iii comes down to how well each one works for a stressed student, not to cost or effort. I drew every screen at real phone size (360 px wide), so the tap targets and text sizes on the boards are exactly what a student would see.")
P(d, "**How to read the boards.** Each numbered note points to one part of the screen. **Does** says what that part does for the student. **Why** explains the design choice behind it, whether that is a UX reason, a piece of research or something a student told me. The tag in the top corner of each note names the B.i specification it links to and says whether that part meets it, partly meets it or fails it. The strip along the bottom of each board gives the number of screens, the taps needed to reach a card, where the counsellor button is, and the colours.")

H3(d, "What the moods and tags mean")
P(d, "Every idea starts with the same check-in, so I defined each mood and tag before designing any screens. A word like 'Bad' means different things to different people, so each mood comes with one plain sentence that appears on screen when it is picked, plus an example from school life that I used when testing. The tags are short on purpose (three words or fewer, from B.i), and each one has a clear meaning so the matching table can rely on it.")
fig("b12.png", "Mood and tag guide (Canva).")
table(d, [[m, f"“{s}”", e, a] for m, s, e, a in MOOD_GUIDE],
      [1300, 3000, 3300, 2912], header=["Mood", "Sentence shown on screen", "Example", "What the app does"])
table(d, [[t, desc, ex] for t, desc, ex in FEEL_GUIDE] + [[t, desc + f" (Table column: {c})", ex] for t, desc, ex, c in WHAT_GUIDE],
      [1900, 5112, 3500], header=["Tag", "What it means", "Example"])
P(d, "The first 'How I feel' tag a student taps picks the row of the matching table, and the first 'What's happening' tag picks the column. Both groups are optional, so a student who can't name what they feel still gets a card.")

def design(img, title, story, rows):
    H3(d, title)
    for s in story: P(d, s)
    fig(img, f"{title}, annotated design board (Canva).")
    table(d, rows, W2)

design("b01.png", "Design 1: All-in-One Dashboard", [
 "Design 1 came from Daylio, one of the apps I analysed in Criterion A. The best thing about Daylio is that logging a mood takes seconds, because everything is on one screen. I wanted to see what would happen if Pause worked the same way, with no submit button at all. As soon as a student drags the slider and taps a tag, the suggestion card halfway down the page changes to match.",
 "To test it, I walked through a scenario. A DP1 student is waiting outside a chemistry test. They drag the slider towards 'Bad', tap 'anxious' and 'test or exam', and 'Nerves can help' appears straight away: two taps, the fastest of all four ideas. The problems only showed up once I drew it at real size. Fitting everything on one page pushed the counsellor link to the very bottom, about 1180 px down, so the student who needs help most has to scroll past their own history to find it. The tags also had to shrink to 36 px to fit, which is under the 44 px minimum in my Size specification.",
], [
 ["How it works", "1. Drag the slider from Awful to Great.\n2. Tap any of the 10 tags.\n3. The live card updates after every tap. There is nothing to submit.\n4. Recent check-ins and the counsellor link sit below the fold."],
 ["Taps to a card", "2 (slider, one tag)."],
 ["Layout and sizes", "1 screen, 360 px wide, scrolling to about 1180 px. The fold on a 360 x 800 phone is at about 740 px. 64 px header; 24 px slider thumb; 36 px tag chips; live card; history list; footer with the support line and counsellor link."],
 ["Colours and type", "Paper #F3EFE6, Sage #5E7F64, Gold #B08A4A, Ink #26312A. Device system font (0 KB download)."],
 ["Build", "A single React page. match() runs on every tap and redraws the card. History is read from localStorage onto the main page. Feasible in 20 h, but the live card needs extra testing."],
 ["What works", "The fastest idea (Form and Function: fast enough under stress), and nothing is hidden behind extra screens."],
 ["What doesn't", "The counsellor link is never visible without scrolling (Safety: counsellor button). The slider thumb and chips are below 44 px (Size: easy to tap and read). History on the main page is visible to anyone on a shared laptop (Safety: private by design)."],
])

design("b02.png", "Design 2: Step-by-Step Guide", [
 "Design 2 goes in the opposite direction. Instead of showing everything at once, it asks one question per screen, like a short quiz, with a progress bar along the top. I chose this structure because one large question on a calm, nearly empty screen is the easiest thing to read when you are stressed, and the full-width 56 px mood buttons are almost impossible to mis-tap.",
 "Walking through the same scenario showed what that calm costs: mood, Next, tag, Next, Skip, Next. That is five or six taps before the student sees anything useful, double my three-tap limit. Stress weakens the working memory needed to follow a sequence of steps (Arnsten, 2009), so the idea that looks the calmest is actually the hardest one to finish when you are anxious. Help is a round '?' button in the corner. It is always visible, but it never says who it connects you to.",
], [
 ["How it works", "1. Step 1: pick a mood, then Next.\n2. Step 2: pick tags, then Next.\n3. Step 3: write a note or tap Skip.\n4. Step 4: the card and the support line appear."],
 ["Taps to a card", "5 to 6."],
 ["Layout and sizes", "4 step screens plus Help, each 360 x 740 px with no scrolling. 4-segment progress bar; 5 mood buttons of 312 x 56 px; 44 px tag chips; a full note screen with Skip; 56 px floating '?' button on every step."],
 ["Colours and type", "Lilac #F1EFF8, Plum #5B4F8A, Blue #3F6E9E, Ink #24213A. Device system font."],
 ["Build", "Four React views with a step counter; match() runs once after Step 3. Feasible in 20 h."],
 ["What works", "The largest tap targets and the most readable card of all four ideas (Size: easy to tap and read; Form and Function: honest about the evidence)."],
 ["What doesn't", "Too many taps (Form and Function: fast enough under stress). The check-in is split over three screens (Form and Function: hybrid check-in on one screen). The '?' button doesn't say 'counsellor', so it only partly meets Safety: counsellor button."],
])

design("b03.png", "Design 3: Scripted Chat (no AI)", [
 "Design 3 was inspired by Wysa, whose chat style made it feel the most friendly of the apps I analysed. I kept the feeling of a conversation but took the AI out completely: every message is written in advance and the student answers by tapping reply chips, so nothing is generated and nothing reads what they type. I expected this to be the most popular idea with younger students, and in the peer vote it was.",
 "Drawing it at real size showed three problems. Only four reply chips fit across a phone, so 'IA or deadline' and 'home' had to go, which removes the situations DP students need most. The evidence label shrinks to a 12 px grey line under the bubble, which is the hardest part of the screen to read even though honesty about evidence is one of my specifications. Most importantly, the message box at the bottom makes it look as if someone is reading. A student might type something serious and wait for a reply that never comes. The only route to help is a small phone icon, which is easy to miss and suggests a call that a student can't make in class.",
], [
 ["How it works", "1. A scripted bubble asks how they feel, with 4 chips.\n2. The tapped chip becomes a blue answer bubble.\n3. A second question asks what's happening.\n4. The technique arrives as a message, then the support bubble and 'Try another' / 'Done' chips."],
 ["Taps to a card", "3 to 4."],
 ["Layout and sizes", "1 chat screen plus Help, 360 x 740 px, growing downwards. 44 px phone icon with no label; 4 chips per row; 12 px evidence line; a message box like a texting app."],
 ["Colours and type", "White #FFFFFF, Mist #EEF1F5, Blue #2D7FF9, Ink #111827. Device system font."],
 ["Build", "A scripted conversation tree stored as data. Every new card needs its own branch of messages, so the script grows with the library. Feasible, but the hardest of the four to build and extend."],
 ["What works", "Friendly and familiar, and it works without reading any free text."],
 ["What doesn't", "Drops two MYP/DP tags (Customer / Client: fits both MYP and DP). 12 px evidence text (Size: easy to tap and read). Looks like someone is listening (Safety: private by design). Icon-only help (Safety: counsellor button, partly)."],
])

design("b04.png", "Design 4: Check-in Card + Result", [
 "Design 4 tries to keep the speed of Design 1 and the calm of Design 2. Everything the student needs to tell the app fits on one check-in card: a mood (the only required part), two short groups of tags and an optional note. One tap on 'Show me something that might help' opens a second screen with a single coping card. The counsellor button sits in the top bar and says 'Talk to the counsellor' in words, in the same place on every screen, which is what Wysa does with its always-visible SOS button.",
 "In the same scenario, the student taps 'Bad', reads 'Things feel heavy, but you can still get through the lesson', taps 'anxious' and 'test or exam', then the button. They get 'Worry dump', a writing technique that was tested with high school students before exams (Ramirez & Beilock, 2011), with its evidence label and source on the card. That is three taps, and the counsellor was visible the whole time. The one weakness I found while drawing it is that on phones shorter than 800 px the submit button drops just below the fold, so the student has to scroll once.",
], [
 ["How it works", "1. Choose a mood (required). Its sentence appears below.\n2. Tap any tags, and write a note if you want to.\n3. Tap 'Show me something that might help'.\n4. One coping card appears with its evidence label and source, then the support line."],
 ["Taps to a card", "3 (mood, one tag, submit)."],
 ["Layout and sizes", "Check-in and Suggestion, plus Help and Privacy, at 360 x 800 px. 64 px top bar with a 44 px 'Talk to the counsellor' button; 5 mood buttons of 59 x 64 px; mood sentence box; 10 tag chips at 44 px in two labelled groups; 280-character note; 52 px submit button; coping card; two 48 px buttons; support box."],
 ["Colours and type", "Cream #F7F3EA, Pale teal #DCEBE7, Blue #3B6A8C, Ink #1E3236. Device system font."],
 ["Build", "Two React screens that read every word from one content.json file. A small match() function looks up the mood and first tags in a fixed table. Feasible in 20 h, with the fewest custom parts of the four."],
 ["What works", "Three taps with everything on one screen. Labelled counsellor button on every screen. It keeps Daylio's mood-then-tags speed but adds the response Daylio lacks."],
 ["What doesn't", "Submit button below the fold on short phones (Form and Function: fast enough under stress, partly). Fixed in B.iv with a sticky submit bar."],
])

H3(d, "Can the ideas be understood without me explaining them?")
P(d, "Strand 2 asks for ideas that others can interpret correctly, so I checked this directly. I gave the four boards to 4 peers who had not seen the project, pointed at a screen, and asked them to tell me what each numbered part does. All 4 correctly described every numbered part on Designs 2 and 4, and 3 of 4 did so for Design 1. On Design 3, 3 of the 4 thought the message box meant a real person would reply. That misunderstanding is exactly the safety risk the counsellor later raised, so it became one of the main reasons against Design 3 in B.iii (Appendix B3).")

# ------------------------------------------------------------------ B.iii
H2(d, "iii. Present the chosen design and justify its selection")
m4 = count("D4")
P(d, f"Out of the four ideas, I chose **Design 4: Check-in Card + Result**. It was not the most popular idea in the peer vote, so I want to be clear about why it won. It meets {m4[0]} of my 19 specifications and partly meets the other one, more than any other idea. It is the only idea that meets all four Safety specifications. Both of my clients, the school counsellor and the teacher, rated it 5 out of 5. In the paper test, students found the counsellor in a median of 2 seconds, compared with 7 to 14 seconds for the other ideas.")
fig("b05.png", "Chosen design board: final screens, specification scores, peer vote and client ratings (Canva).")

H3(d, "How I collected feedback")
P(d, "I used four kinds of evidence, so that no single opinion could decide the outcome. First, I scored every idea against all 19 specifications from B.i, using the measurements on the boards. 'Met' means the board shows the target is reached, 'Partly' means it is reached only in some cases, and 'Not met' means it fails.")
P(d, "Second, 20 students (5 each from MYP4, MYP5, DP1 and DP2) answered an anonymous Google Form. They saw the four boards in a random order and answered 'Which one would you actually use when you are stressed at school?' and 'Why?'. Third, 5 testers used printed paper prototypes with the scenario card 'You just walked out of a hard test and feel anxious. Use the app to find something that helps.' I timed how long it took them to reach a card, and then how long it took to find the counsellor. Finally, I showed all four boards to my two clients. The counsellor rated 'Is this safe to give to students?' and the teacher rated 'Would you allow this in your lesson?', both from 0 to 5. The scripts are in Appendix B4.")

H3(d, "Comparison against my specifications")
P(d, "The table below summarises how each idea did in each ACCESSFMM category. The full spec-by-spec scoring follows it.")
CAT = [
 ("Aesthetics", [0], ["Calm sage and paper; consistent.", "Soft lilac, very consistent.", "Clean, but looks like any messaging app.", "Calm cream and teal; one style on every screen."]),
 ("Cost", [1], ["Free to build and use.", "Free.", "Free.", "Free."]),
 ("Customer / Client", [2, 3], ["Fits MYP and DP; silent cards in class.", "Fits both groups.", "Drops 'IA or deadline' and 'home', so DP students lose their main tags.", "All 10 tags; 'in class' gives silent cards only."]),
 ("Environment", [4, 5], ["Text only; loads fast.", "Text only.", "Text only.", "Text only; matching runs on the phone."]),
 ("Safety", [6, 7, 8, 9], ["Counsellor link 1180 px down; history shown on the main page.", "'?' button never says who it connects to.", "Icon-only help; message box suggests someone is reading.", "Labelled counsellor button on every screen; history off by default."]),
 ("Size", [10, 11], ["24 px slider and 36 px chips are too small.", "Largest targets of all four.", "12 px evidence line.", "All targets 44 px or more; 16 px text minimum."]),
 ("Form and Function", [12, 13, 14, 15], ["2 taps, one screen, honest labels.", "5 to 6 taps over 3 screens.", "3 to 4 taps, but split into a chat.", "3 taps on one screen; submit below the fold on short phones."]),
 ("Manufacturing", [16, 17], ["One page; easy to add cards.", "Gets longer with every question.", "Every card needs a new branch of script.", "Every word in content.json; new cards need no new screens."]),
 ("Materials", [18], ["Free and traceable.", "Free and traceable.", "Free and traceable.", "Free and traceable."]),
]
names = ["D1", "D2", "D3", "D4"]
crow = []; cf = {}
for ri, (cat, idx, notes) in enumerate(CAT):
    r = [cat]
    for j, dn in enumerate(names):
        met = sum(1 for i in idx if SCORES[dn][i] == "Y"); part = sum(1 for i in idx if SCORES[dn][i] == "P")
        sc = f"**{met}/{len(idx)}**" + (f" (+{part} partly)" if part else "")
        r.append(f"{sc}\n{notes[j]}")
        cf[(ri, j + 1)] = "DCEBE7" if met == len(idx) else ("F5ECD6" if met + part >= len(idx) / 2 else "ECE6E4")
    crow.append(r)
crow.append(["Total"] + [f"**{count(x)[0]}/19** met, {count(x)[1]} partly" for x in names])
table(d, crow, [1700, 2203, 2203, 2203, 2203], header=["Category", "Design 1", "Design 2", "Design 3", "Design 4"], fills=cf)

lab = {"Y": "Met", "P": "Partly", "N": "Not met"}
fill = {"Y": "DCEBE7", "P": "F5ECD6", "N": "ECE6E4"}
rows = []; fills = {}
for i, (f, s) in enumerate(SPECS):
    r = [f"{f}: {s}"]
    for j, dn in enumerate(names):
        v = SCORES[dn][i]; r.append(lab[v]); fills[(i, j + 1)] = fill[v]
    rows.append(r)
table(d, rows, [3912, 1650, 1650, 1650, 1650], header=["Specification (B.i)", "Design 1", "Design 2", "Design 3", "Design 4"], fills=fills)
P(d, "The totals for Designs 1, 2 and 3 look fairly close, but where they lose marks matters more than how many. Their failures are in Safety and Size, which I treat as non-negotiable for an app used by minors during the school day. A design that hides the counsellor link below the fold is not safe enough, however fast it is. Design 4's only 'Partly' is about speed on short phones, which can be fixed without changing the idea.")

H3(d, "What students and clients said")
fb = []
for dn in names:
    fb.append([NAMES[dn].split(":")[0], f"{PEER_PREF[dn]*5}% ({PEER_PREF[dn]}/20)", f"{PEER_MYP[dn]} / {PEER_DP[dn]}", f"{COUNSELLOR[dn]}/5", f"{TEACHER[dn]}/5", f"{TIME_TO_CARD[dn]} s", f"{TIME_TO_HELP[dn]} s"])
table(d, fb, [1500, 1500, 1500, 1500, 1500, 1506, 1506], header=["Design", "Peer vote", "MYP / DP votes", "Counsellor: safe", "Teacher: allow", "Median time to card", "Median time to counsellor"])
P(d, "Design 3 won the peer vote with 40%, just ahead of Design 4 with 35%. Most of its votes came from MYP students (6 of 8), who said it felt 'like texting a friend'. The counsellor, however, rated it 1 out of 5: 'If it looks like someone is listening, a student might type something serious and wait for a reply that never comes.' I gave the counsellor's view more weight here. Criterion A names the counsellor as the person who receives any escalation and decides whether a tool is safe for students, and a design that invites disclosures that nobody reads goes against two of my Safety specifications.")
P(d, "The peer vote still mattered. DP students clearly preferred Design 4 (5 of 10 votes), which connects to my related concept of perspective: MYP and DP students want different things from the same app. Design 4 was the one option that both age groups and both clients could accept. The teacher put it simply: 'The one with everything on one card is the only one I could see a student finishing before I notice. No moving parts, please.'")

H3(d, "Why I didn't choose the other three")
P(d, "**Design 1** was the fastest (2 taps and a 9 s median to reach a card), but testers took 14 s to find the counsellor, the slowest of all four, because the link sits at the bottom of the page. Its small slider and chips fail my 44 px target, and showing history on the main page exposes entries on shared school laptops.")
P(d, "**Design 2** was my second choice. It had the clearest screens, scored 16 of 19, and the counsellor rated it 4/5. But it took 22 s to reach a card, the slowest of all four, which breaks the speed specification that came from my primary research on exam stress.")
P(d, "**Design 3** was the peer favourite but scored only 12 of 19. It drops two MYP/DP tags, shrinks the evidence label to 12 px and looks as if a person is reading, which is why the counsellor gave it 1/5.")

H3(d, "Which design is easiest to keep developing")
P(d, "I plan to keep working on Pause after this unit, so I also compared how much work it would take to add more cards or an Arabic version. Design 4 is the easiest. Its two screens read every word from one content.json file, so a new card is one new entry in a list and one code in the matching table. Arabic is a second set of text plus a right-to-left layout setting, with no new screens. Design 3 would need a new branch of scripted messages for every card, Design 2 would get longer with every new question, and Design 1's single page would grow even further below the fold.")

H3(d, "What I changed after feedback")
bullets(d, [
 "**Sticky submit bar.** 3 of the 5 testers were using shorter phones and had to scroll to find the submit button, so in B.iv the button sits in an 80 px bar fixed to the bottom of the check-in screen. This turns Design 4's one 'Partly' into a 'Met'.",
 "**Kept the words 'Talk to the counsellor'.** Testers found the labelled button in a median of 2 s, against 7 s for Design 3's phone icon, and the counsellor said: 'Students don't always know what an icon means.'",
 "**No animation at all.** The teacher said anything that moves would draw attention in a lesson, which matches Customer / Client: allowed in class.",
])
P(d, "**Limits of this decision.** All of this feedback was on wireframes and paper prototypes, not a working app, and the groups were small (20 students in the vote and 5 testers). In Criterion D I will repeat the timing and counsellor-finding tests on the real build to check that Design 4 still meets its specifications.")

# ------------------------------------------------------------------ B.iv
H2(d, "iv. Develop accurate and detailed planning drawings and outline the requirements for the creation of the chosen solution")
P(d, "This section is my plan for building Pause. I wrote it so that someone who has never spoken to me could build the same app from it. It includes a planning drawing of every screen with the exact sizes, colours and behaviour of each part, the user flow, the matching rules, how the parts connect, the build order and everything needed to make it. All sizes are CSS pixels at 100% on a 360 x 800 px phone. On wider screens (up to 1366 px), the content column stays at most 480 px wide and is centred.")

H3(d, "Design tokens (used on every screen)")
P(d, "These are the shared colours, fonts and spacing rules. Every screen uses them, which is how Pause keeps the calm, consistent look that my Aesthetics specification asks for.")
table(d, [
 ["Cream #F7F3EA", "Screen background. Warmer and softer than pure white on a bright phone screen. Ink text on it: contrast 12.1:1."],
 ["Pale teal #DCEBE7", "Top bar, tag pills, support box, danger box. Ink text on it: 10.9:1."],
 ["Blue #3B6A8C", "Buttons, selected chips and moods, links. White text on it: 5.8:1. Blue text on Cream: 5.2:1; on Pale teal: 4.7:1."],
 ["Ink #1E3236", "All body text and headings. A very dark teal rather than black, so the screen feels softer."],
 ["Border #C9D9D5", "1.5 px outlines on chips, mood buttons and boxes (a tint of Pale teal, not a fourth main colour)."],
 ["Type", "Device system font stack: -apple-system, 'Segoe UI', Roboto, sans-serif (0 KB download). 24 px bold for card and page titles, 22 px bold for the question, 20 px bold for the wordmark, 16 px for everything else (never smaller). Body line height about 1.4."],
 ["Spacing and shape", "16 px side gutters; 8 px gaps between tap targets; corner radius 12 to 14 px for boxes and mood buttons, 20 px for the coping card, 22 to 26 px for pill buttons and chips."],
 ["Tap targets", "Every tappable element is at least 44 x 44 px (W3C, 2024, SC 2.5.5)."],
], W2)
P(d, "Every contrast ratio above passes WCAG AA for normal text (4.5:1 or higher) (W3C, 2024, SC 1.4.3). I checked them with the WCAG contrast formula.", size=9.5)

COLS5 = [1650, 2000, 2000, 3100, 1762]
HDR5 = ["Element", "Size and position", "Colour and type", "What it does and why", "Specification"]

H3(d, "Planning drawing 1: Check-in screen")
P(d, "This is the final version of the check-in screen, with the sticky submit bar added after the B.iii feedback. The notes on the drawing explain the purpose of each part; the table gives the exact values needed to build it.")
fig("b06.png", "Planning drawing 1, check-in screen with dimensions (Canva).")
table(d, [
 ["Top bar", "360 x 64 px, sticky at the top", "Pale teal; 'Pause' wordmark 20 px bold Ink", "Holds the wordmark and the counsellor button. It never scrolls away, so help is always in the same place.", "Safety: counsellor button"],
 ["Counsellor button", "About 180 x 44 px, right-aligned, 16 px from the edge", "Blue fill, white 16 px semibold, 22 px radius, person icon", "Opens Help (Screen 3). Words instead of an icon, because testers found it far faster.", "Safety: counsellor button"],
 ["Question", "Full width, 14 px below the bar", "22 px bold Ink", "'How are you right now?' A plain question feels like being asked, not like a form.", "Aesthetics"],
 ["Mood buttons", "5 x (59 x 64 px), 8 px gaps", "White, 1.5 px border, 14 px radius; face icon above a 16 px word. Selected: Blue, white text", "Required, single choice; stores mood 1 to 5 and enables the submit button. A face plus a word is quicker to read than a number scale.", "Form and Function: hybrid check-in"],
 ["Mood sentence", "328 px wide box, 8 px below the moods", "White, 1.5 px border, 12 px radius, 16 px text", "Shows the chosen mood's sentence from content.json (see the mood guide), so every student reads 'Bad' the same way.", "Customer / Client"],
 ["Feeling chips", "44 px tall, 16 px side padding, wrap, 8 px gaps", "As mood buttons; selected chips also show a tick", "Optional, multi-select. The first one tapped picks the table row. The tick means colour is never the only signal.", "Customer / Client: fits MYP and DP"],
 ["Situation chips", "As feeling chips", "As above", "Optional, multi-select. The first one picks the table column; 'in class' limits results to silent cards.", "Customer / Client: allowed in class"],
 ["Note box", "328 x 70 px", "White, 14 px radius, lock icon, 0/280 counter", "Optional, up to 280 characters. Never read by match(), and saved only if history is switched on.", "Safety: private by design"],
 ["Privacy link", "Centred, 44 px tap area", "16 px underlined Ink, lock icon", "Opens Privacy (Screen 4), so students can check what is kept before writing anything.", "Safety: private by design"],
 ["Sticky submit bar", "360 x 80 px; button 328 x 52 px, 26 px radius", "Cream bar with a 1.5 px top line; Blue button, white 16 px semibold", "Faded to 50% until a mood is picked. Tap runs match() and opens Screen 2. Always visible, even on short phones.", "Form and Function: fast enough under stress"],
], COLS5, header=HDR5)

H3(d, "Planning drawing 2: Suggestion screen")
P(d, "The suggestion screen shows one coping card at a time. The example is the card the matching table gives for 'Bad', 'anxious' and 'test or exam'.")
fig("b07.png", "Planning drawing 2, suggestion screen (Canva).")
table(d, [
 ["Top bar", "Same as Screen 1", "Same as Screen 1", "A shared component, so the counsellor button is identical on every screen.", "Safety: counsellor button"],
 ["'New check-in' link", "44 px tap area", "16 px semibold Blue, left chevron", "Clears the form and goes back to Screen 1, with no confirm box to slow it down.", "Form and Function"],
 ["'Based on' line", "Full width", "16 px Ink; tags as 30 px Pale teal pills", "Repeats the mood and tags, e.g. 'Based on: Bad · anxious · test or exam', so the card never feels random.", "Form and Function: matched suggestion"],
 ["Coping card", "328 px wide, 16 px padding, 20 px radius", "White, 1.5 px border, soft shadow", "Holds one card's type, label, title, reason, steps and source. One card instead of a list avoids choice overload.", "Form and Function: matched suggestion"],
 ["Card type", "34 px icon tile + text", "Pale teal tile, 18 px line icon, 16 px semibold", "Names the kind of technique (Writing, Breathing...), so a student can tell if it works in a lesson.", "Customer / Client"],
 ["Evidence pill", "30 px tall, 15 px radius", "White, 1.5 px Blue border, 16 px semibold Blue", "'Strong evidence', 'Some evidence' or 'Worth a try'. The app never promises more than the research shows.", "Form and Function: honest about the evidence"],
 ["Title, reason, steps", "Title 24 px bold; steps with 24 px number circles", "Ink; Blue number circles", "Read from content.json for the chosen card. Numbered steps help a student keep their place.", "Size: easy to tap and read"],
 ["Source line", "Card width, 1.5 px Pale teal line above", "16 px; italic citation; info icon", "The citation and who it was tested with.", "Form and Function: honest about the evidence"],
 ["Two buttons", "2 x (160 x 48 px), 8 px gap, 24 px radius", "Outline Blue / filled Blue", "'Try a different one' shows the next card in the cell; 'Done' clears everything and returns to Screen 1.", "Form and Function"],
 ["Support box", "328 px wide, 16 px radius", "Pale teal, heart icon, 16 px text, underlined link", "The same line for everyone, approved by the counsellor. 'See how to reach the counsellor' opens Help.", "Safety: 'you're not alone' line"],
], COLS5, header=HDR5)

H3(d, "Planning drawing 3: Help and Privacy screens")
P(d, "Help is one tap away from every screen. Privacy lets a student see exactly what the app keeps and delete it. Text in [brackets] is filled in with the counsellor before launch.")
fig("b08.png", "Planning drawing 3, Help and Privacy screens (Canva).")
table(d, [
 ["Help: counsellor button", "Stays in the top bar on Help, with a 2 px Blue ring around a 3 px Pale teal gap, so the student can see where they are."],
 ["Help: counsellor details", "[Counsellor name], room, drop-in days and times, and a booking email (a mailto: link that opens the phone's mail app). 'You don't need a reason to go.' The counsellor fills in and approves every detail."],
 ["Help: danger box", "'If you are in danger right now: tell any teacher straight away, or call 9999 (emergency, Oman).' 9999 is a tel: link. Pale teal, not red, so it informs without alarming. The counsellor confirms the number and wording."],
 ["Help: outside school hours", "One helpline chosen and checked by the counsellor. The app never shows a number nobody has verified."],
 ["Support line wording", "'If things feel like too much right now, you don't have to handle it alone. The school counsellor is here for you.' Checked against Orygen's #chatsafe guidelines (Orygen, n.d.) and approved by the counsellor."],
 ["Privacy: promises", "Three plain bullets with ticks: check-ins stay on this device; Pause never asks for a name, email or student ID; nobody reads what you type, not the school and not a computer program."],
 ["Privacy: switch", "'Save my check-ins on this device', a 58 px row with a 52 x 32 px switch. Off by default because school laptops are shared."],
 ["Privacy: delete", "328 x 48 px outline button 'Delete my entries' (Blue, not red). Opens a confirm box: 'Delete all saved check-ins on this device? This can't be undone.' with Cancel and Delete. Delete clears pause.entries."],
], W2)

H3(d, "User flow")
image(d, E + "b09.png", caption="Figure B10: User flow showing every screen and path (Canva).")
P(d, "Every screen has the counsellor button, so Help is always one tap away. The only required input is the mood. No path asks for a login, a payment or a network request after the first load. Two links leave the app on purpose: the counsellor's email (opens the phone's mail app) and 9999 (opens the dialler).")

H3(d, "Matching logic")
image(d, E + "b10.png", caption="Figure B11: Matching logic, mapping table and the five test inputs (Canva).")
P(d, "The rules in Figure B11, written so they can be turned straight into code:")
code(d, "function match(mood, feeling, situation):\n"
        "  col = {'test or exam':'Test','IA or deadline':'IA','in class':'Class'}[situation] or 'Other'\n"
        "  row = feeling if feeling else ('low' if mood <= 2 else 'no feeling tag')\n"
        "  cards = TABLE[row][col]                      # 3 card IDs in order\n"
        "  if mood == 1 and cards[0] != 'R1': cards = ['R1'] + cards   # Awful: counsellor first\n"
        "  rest = [c for c in LIBRARY if c not in cards and (col != 'Class' or c.silent)]\n"
        "  return cards + rest                          # 'Try a different one' walks this list")

P(d, "**Full card library.** Every possible input leads to one of these 12 cards. The label follows three rules: Strong evidence = backed by systematic reviews or clinical guidelines for this kind of use; Some evidence = backed by trials, but small, mixed, or not tested with teenagers; Worth a try = low risk and widely recommended, with little direct research. No card earned 'Strong evidence'. The strong reviews tested full courses or regular habits, not one technique used for a minute in a school day, so I did not give that label to any card.")
lib = []
for k, c in CARDS.items():
    lib.append([f"{k}: {c['name']}", c["type"] + ("\nSilent: yes" if c["silent"] else "\nSilent: no"),
                "\n".join(f"{i+1}. {s}" for i, s in enumerate(c["steps"])), c["why"], f"**{c['label']}**\n{c['source']}\n{c['tested']}"])
table(d, lib, [1700, 1400, 3112, 2100, 2200], header=["Card", "Type", "Steps shown", "Reason shown", "Label, source and who it was tested with"])

H3(d, "How the parts connect")
image(d, E + "b11.png", caption="Figure B12: System diagram and step-by-step operation (Canva).")
table(d, [
 ["TopBar", "Wordmark + CounsellorButton. Used on all 4 screens."],
 ["CheckIn", "MoodPicker (5 buttons), TagGroup x 2 (feelings, situations), NoteBox, PrivacyLink, SubmitBar."],
 ["match()", "Pure function: (mood, firstFeeling, firstSituation) to a list of card IDs. No network, no AI."],
 ["Suggestion", "BasedOnLine, CopingCard (EvidencePill, title, reason, steps, source), ActionRow (Try a different one, Done), SupportMessage."],
 ["Help", "BackLink, support text, CounsellorCard, DangerBox, OutsideHoursBox."],
 ["Privacy", "BackLink, PrivacyList, HistoryToggle, DeleteButton, ConfirmDialog."],
 ["storage.js", "load(), save(entry), clear(). Uses localStorage keys pause.settings and pause.entries only."],
], W2, header=["Component", "Contains and does"])
P(d, "**Data stored on the device.** Nothing is sent anywhere. With history off (the default), nothing is kept after 'Done'.")
code(d, "pause.settings = { \"historyOn\": false, \"lang\": \"en\" }\n"
        "pause.entries  = [ { \"time\": \"2026-11-02T10:41\", \"mood\": 2, \"feelings\": [\"anxious\"],\n"
        "                     \"situations\": [\"test or exam\"], \"note\": \"\", \"cardShown\": \"C3\" } ]   // only if historyOn")
P(d, "**content.json structure.** All words live here, so new cards or an Arabic version need no new screens (Manufacturing: easy to extend later).")
code(d, "{ \"en\": { \"moods\": [\"Awful\",\"Bad\",\"Okay\",\"Good\",\"Great\"],\n"
        "          \"feelings\": [\"anxious\",\"overwhelmed\",\"frustrated\",\"low\",\"tired\"],\n"
        "          \"situations\": [\"test or exam\",\"IA or deadline\",\"in class\",\"friends or people\",\"home\"],\n"
        "          \"support\": \"If things feel like too much right now, ...\",\n"
        "          \"help\": { \"name\": \"[Counsellor name]\", \"room\": \"[room]\", \"email\": \"[school email]\" },\n"
        "          \"cards\": { \"C3\": { \"name\": \"Worry dump\", \"label\": \"Some evidence\", \"steps\": [...],\n"
        "                    \"why\": \"...\", \"source\": \"Ramirez & Beilock (2011)\", \"silent\": true } } },\n"
        "  \"ar\": { ... same keys, Arabic text ... },\n"
        "  \"table\": { \"anxious\": { \"Test\": [\"C3\",\"C2\",\"B1\"], \"IA\": [...], \"Class\": [...], \"Other\": [...] } } }")

H3(d, "How I will build it, step by step")
table(d, [
 ["1. Plan screens (2 h)", "In Google Stitch, recreate the 4 screens from Planning drawings 1 to 3 using the design tokens above. Export to AI Studio."],
 ["2. Generate the app (4 h)", "In Google AI Studio (Build), create a React app with the 4 screens and the TopBar shared between them. Check every size and colour against the drawings with the browser's inspect tool."],
 ["3. Add content (3 h)", "Write content.json from the card library table and the mapping table. Make every screen read its words from it."],
 ["4. Add match() (2 h)", "Write match() from the pseudocode. Test it with the 5 test inputs in Figure B11; each must return the listed first card."],
 ["5. Add storage and Privacy (2 h)", "Write storage.js, the history switch (off by default) and Delete with its confirm box."],
 ["6. Counsellor sign-off (1 h)", "Show the counsellor the Help screen, support line and all 12 cards. Make their changes in content.json."],
 ["7. Publish (1 h)", "Push the code to a GitHub repository and turn on GitHub Pages to get a free HTTPS link."],
 ["8. Test against B.i (5 h)", "Run every B.i test: 3 school devices, 320/375/768/1366 px widths, contrast checks, font size check (0 KB), timing with 5 peers, privacy test with the word TESTPRIVACY."],
], W2)
P(d, "Total: 20 hours, which matches Manufacturing: built in a browser in about 20 hours.")

H3(d, "Requirements for creating the solution")
table(d, [
 ["Software", "Google Stitch and Google AI Studio (free, in the browser); a code editor if needed (VS Code, free); Chrome, Safari and Edge for testing."],
 ["Hardware", "A laptop for building; 3 school devices (a Windows laptop, a Chromebook or Mac, and one phone) for testing."],
 ["Internet and connectivity", "Internet to build and publish. Students only need school Wi-Fi for the first load; after that, the check-in and matching run on the device."],
 ["Accounts and platforms", "A Google account (Stitch and AI Studio) and a GitHub account (repository and Pages). Students need no account at all."],
 ["Tools", "Browser inspect tool and Network tab; the WebAIM Contrast Checker; a stopwatch; the B.i test sheets."],
 ["Equipment", "Printed paper prototypes and scenario cards for testing; nothing physical is part of the product."],
 ["Materials and resources", "content.json written from my sources; free-to-use face icons drawn as simple SVG; an asset register recording the source and licence of everything."],
 ["Skills and knowledge", "Basic React and JSON editing; reading and checking AI-generated code; using inspect tools; writing safe-messaging wording; APA referencing for the card sources."],
 ["Technical requirements", "Runs in any modern browser on iOS, Android, Windows, macOS and ChromeOS; 320 to 1366 px wide; loads in 10 s or less on school Wi-Fi; no sounds, notifications or animation; WCAG AA contrast and 44 px targets."],
 ["Research and resources", "My B.i specifications; the card sources in the reference list; Orygen's #chatsafe guidelines for the support wording; WCAG 2.2."],
 ["Special conditions", "The counsellor must approve the Help details, the support line and all 12 cards before launch. The school must allow the link on school Wi-Fi and agree that students can open it in lessons. Pause is a signpost to people, not a replacement for the counsellor, and it never contains supplement or medication content."],
], W2)

H3(d, "Final check: could someone else build Pause from these plans?")
table(d, [
 ["Every screen drawn with sizes", "Yes: Planning drawings 1 to 3 and their element tables."],
 ["Every colour, font and size", "Yes: Design tokens table."],
 ["Every path between screens", "Yes: User flow (Figure B10)."],
 ["What every mood and tag means", "Yes: Mood and tag guide (Figure B1) and its two tables."],
 ["How inputs become a suggestion", "Yes: Matching logic, pseudocode and the full card library."],
 ["Where data is stored", "Yes: storage keys and the content.json structure."],
 ["Tools, accounts and build order", "Yes: build steps and requirements tables."],
 ["Who must approve what", "Yes: Special conditions (counsellor sign-off, school permission)."],
], W2)

# ------------------------------------------------------------------ Appendix
page_break(d)
H2(d, "Appendix B3: Feedback on the design ideas")
table(d, [
 ["Peer vote (n = 20)", f"Design 3: 8 (6 MYP, 2 DP). Design 4: 7 (2 MYP, 5 DP). Design 1: 4 (2 MYP, 2 DP). Design 2: 1 (0 MYP, 1 DP).\nMost common reasons: Design 3 'feels like texting a friend' (6); Design 4 'quick and nothing extra' (5); Design 1 'everything on one page' (3)."],
 ["Paper-prototype test (n = 5)", "Median time to reach a card: D1 9 s, D2 22 s, D3 17 s, D4 11 s.\nMedian time to find how to contact the counsellor: D1 14 s, D2 9 s, D3 7 s, D4 2 s.\n3 of 5 testers on shorter phones had to scroll to find Design 4's submit button."],
 ["Counsellor", "Ratings for 'Is this safe to give to students?': D1 2, D2 4, D3 1, D4 5.\n'The chat one worries me. If it looks like someone is listening, a student might type something serious and wait for a reply that never comes.'\n'I like that the button says counsellor. Students don't always know what an icon means.'"],
 ["Clarity check (n = 4)", "Peers who had not seen the project explained each numbered part of each board. Correct for every part: Design 1, 3 of 4; Design 2, 4 of 4; Design 3, 1 of 4 (3 thought the message box meant a real person would reply); Design 4, 4 of 4."],
 ["Teacher", "Ratings for 'Would you allow this in your lesson?': D1 3, D2 4, D3 2, D4 5.\n'The one with everything on one card is the only one I could see a student finishing before I notice. No moving parts, please.'"],
], W2)
H2(d, "Appendix B4: Scripts I used")
table(d, [
 ["Peer survey (Google Form)", "1. Which year are you in? (MYP4 / MYP5 / DP1 / DP2)\n2. Look at the four designs. Which one would you actually use when you are stressed at school? (Design 1 / 2 / 3 / 4)\n3. Why? (short answer)\n4. Which design would you not use, and why? (short answer)"],
 ["Paper-prototype test", "Read aloud: 'This is a paper version of an app. Please think out loud.' Hand over the scenario card: 'You just walked out of a hard test and feel anxious. Use the app to find something that helps.' Start the stopwatch on the first touch and stop when a card is reached. Then say: 'Now find how to contact the counsellor.' Time it. Record taps, time, and anything the tester says. Repeat for all four designs in a different order for each tester."],
 ["Counsellor interview", "1. Is each of these designs safe to give to students? Rate each from 0 to 5.\n2. What worries you about any of them?\n3. Is the support line wording right? What would you change?\n4. Which details should the Help screen show, and which outside-hours number should we list?\n5. Are you comfortable with all 12 coping cards and their labels?"],
 ["Teacher question", "'Would you allow a student to open each of these during your lesson? Rate each from 0 to 5. What would make you say no?'"],
], W2)

# ------------------------------------------------------------------ References
H2(d, "References")
refs = [
 "Albulescu, P., Macsinga, I., Rusu, A., Sulea, C., Bodnaru, A., & Tulbure, B. T. (2022). \"Give me a break!\" A systematic review and meta-analysis on the efficacy of micro-breaks for increasing well-being and performance. PLOS ONE, 17(8), Article e0272460. https://doi.org/10.1371/journal.pone.0272460",
 "Arnsten, A. F. T. (2009). Stress signalling pathways that impair prefrontal cortex structure and function. Nature Reviews Neuroscience, 10(6), 410–422. https://doi.org/10.1038/nrn2648",
 "Balban, M. Y., Neri, E., Kogon, M. M., Weed, L., Nouriani, B., Jo, B., Holl, G., Zeitzer, J. M., Spiegel, D., & Huberman, A. D. (2023). Brief structured respiration practices enhance mood and reduce physiological arousal. Cell Reports Medicine, 4(1), Article 100895. https://doi.org/10.1016/j.xcrm.2022.100895",
 "Daylio. (n.d.). Daylio – Journal, diary and mood tracker. Google Play. Retrieved September 21, 2026, from https://play.google.com/store/apps/details?id=net.daylio",
 "Fincham, G. W., Strauss, C., Montero-Marin, J., & Cavanagh, K. (2023). Effect of breathwork on stress and mental health: A meta-analysis of randomised-controlled trials. Scientific Reports, 13, Article 432. https://doi.org/10.1038/s41598-022-27247-y",
 "Hofmann, S. G., Asnaani, A., Vonk, I. J. J., Sawyer, A. T., & Fang, A. (2012). The efficacy of cognitive behavioral therapy: A review of meta-analyses. Cognitive Therapy and Research, 36(5), 427–440. https://doi.org/10.1007/s10608-012-9476-1",
 "Jamieson, J. P., Mendes, W. B., Blackstock, E., & Schmader, T. (2010). Turning the knots in your stomach into bows: Reappraising arousal improves performance on the GRE. Journal of Experimental Social Psychology, 46(1), 208–212. https://doi.org/10.1016/j.jesp.2009.08.015",
 "Orygen. (n.d.). #chatsafe: A young person’s guide for communicating safely online about self-harm and suicide (2nd ed.). Retrieved October 3, 2026, from https://orygen.org.au/Training/Resources/Self-harm-and-suicide-prevention/Guidelines/chatsafe-A-young-person-s-guide-for-communicatin",
 "Ramirez, G., & Beilock, S. L. (2011). Writing about testing worries boosts exam performance in the classroom. Science, 331(6014), 211–213. https://doi.org/10.1126/science.1199427",
 "World Health Organization. (2020). Doing what matters in times of stress: An illustrated guide. https://www.who.int/publications/i/item/9789240003927",
 "World Health Organization. (2024). Mental health of adolescents. https://www.who.int/news-room/fact-sheets/detail/adolescent-mental-health",
 "World Wide Web Consortium. (2024). Web content accessibility guidelines (WCAG) 2.2 (A. Campbell, C. Adams, R. Bradley Montgomery, M. Cooper, & A. Kirkpatrick, Eds.). https://www.w3.org/TR/WCAG22/",
 "Wysa. (n.d.). Wysa: Mental wellbeing AI. Google Play. Retrieved September 21, 2026, from https://play.google.com/store/apps/details?id=bot.touchkin",
]
for r in refs:
    p = d.add_paragraph(); p.paragraph_format.left_indent = Inches(0.4); p.paragraph_format.first_line_indent = Inches(-0.4)
    p.paragraph_format.space_after = Pt(5); _run(p, r, 10)

d.save("/root/r/b/Criterion_B_ii-iv_Pause.docx")
print("saved")
