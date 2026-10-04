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

CATS = [("Aesthetics", [0]), ("Cost", [1]), ("Customer / Client", [2, 3]), ("Environment", [4, 5]),
        ("Safety", [6, 7, 8, 9]), ("Size", [10, 11]), ("Form and Function", [12, 13, 14, 15]),
        ("Manufacturing", [16, 17]), ("Materials", [18])]

def score(dn, idx):
    met = sum(1 for i in idx if SCORES[dn][i] == "Y")
    part = sum(1 for i in idx if SCORES[dn][i] == "P")
    return f"{met}/{len(idx)}" + (f"\n({part} partly)" if part else "")

def spec_table(dn, notes):
    rows = [[c, notes[i], score(dn, idx)] for i, (c, idx) in enumerate(CATS)]
    m, p, n = count(dn)
    rows.append(["Total", f"{m} of 19 specifications met, {p} partly met, {n} not met.", f"{m}/19"])
    table(d, rows, [1900, 7412, 1200], header=["ACCESSFMM", "How this design meets my B.i specifications", "Score"])

# ------------------------------------------------------------------ B.ii
H1(d, "Criterion B: Developing ideas")
H2(d, "ii. Develop a range of feasible design ideas")
P(d, "Before drawing anything, I wrote down the one question every idea had to answer: how does a student who has just walked out of a hard test get from 'I feel bad' to one thing that might actually help, without ever losing sight of the counsellor? I came up with four different answers. They are not the same app in four colour schemes. Each idea moves the student through the check-in in a different way, because my research in Criterion A showed that speed and being able to find help were what mattered most to students.")
P(d, "To keep the comparison fair, all four ideas use the same five moods, the same ten tags and the same library of twelve coping cards, and all four could be built for free in Google AI Studio in about 20 hours. I drew every screen at real phone size (360 px wide). The fully annotated boards are in my Canva design; under each board here I evaluate the idea against my B.i specifications. A specification only counts as met if the board shows it, and the score for each category is the number of its specifications that are met.")

H3(d, "What the moods and tags mean")
P(d, "Every idea starts from the same check-in, so I defined each mood and tag before designing any screens. 'Bad' means different things to different people, which would make the matching unreliable, so each mood has one plain sentence that appears when it is picked. Each tag has a meaning and a school example, which I used when testing the ideas.")
fig("b12.png", "Mood and tag guide (Canva).")

def design(img, title, story, dn, notes):
    H3(d, title)
    for s in story: P(d, s)
    fig(img, f"{title} (Canva).")
    spec_table(dn, notes)

design("b01.png", "Design 1: All-in-One Dashboard", [
 "Design 1 came from Daylio, one of the apps I analysed in Criterion A. The best thing about Daylio is that logging a mood takes seconds, because everything is on one screen. I wanted to see what would happen if Pause worked the same way, with no submit button at all: the suggestion card halfway down the page changes as soon as a tag is tapped.",
 "I tested it with a scenario. A DP1 student is waiting outside a chemistry test. They drag the slider towards 'Bad', tap 'anxious' and 'test or exam', and 'Nerves can help' appears straight away. Two taps makes it the fastest of the four. The problems only showed up once I drew it at real size: fitting everything on one page pushed the counsellor link about 1180 px down, past the student's own history.",
], "D1", [
 "Muted sage and paper colours used the same way throughout, so it looks calm.",
 "Uses only free tools; free for students.",
 "All ten tags are there, so it fits MYP and DP. The live card only offers silent techniques when 'in class' is tapped.",
 "Text only, so it loads quickly on school Wi-Fi with no downloaded fonts.",
 "Fails the counsellor specification because the only link is at the very bottom. The support line is there, but below the fold, so only partly. Fails privacy because past check-ins appear on the main page of a shared laptop.",
 "Reflows to 320 px, but the 24 px slider thumb and 36 px chips are under my 44 px tap target.",
 "Mood, tags and note share one screen. Two taps to a card is the fastest of all four. Each card shows its evidence label.",
 "One React page, buildable in 20 h. New cards only need entries in content.json.",
 "Free system font and my own SVG icons, all recorded in the asset register.",
])

design("b02.png", "Design 2: Step-by-Step Guide", [
 "Design 2 goes the other way. Instead of showing everything at once, it asks one question per screen, like a short quiz, with a progress bar along the top. I chose this structure because one large question on a calm, nearly empty screen is the easiest thing to read when you are stressed, and its 56 px mood buttons are almost impossible to mis-tap.",
 "The same scenario showed what that calm costs: mood, Next, tag, Next, Skip, Next. That is five or six taps before the student sees anything useful. Stress weakens the working memory needed to follow a sequence of steps (Arnsten, 2009), so the idea that looks calmest is actually the hardest to finish when you are anxious.",
], "D2", [
 "Lilac and plum used consistently on every step; the most visually calm of the four.",
 "Free to build and use.",
 "All ten tags fit on their own screen. Nothing on it would be a problem in class.",
 "Text only; each step is a small screen.",
 "Help is a '?' button that is always visible but never says who it connects to, so the counsellor specification is only partly met. The support line, privacy and content specifications are all met.",
 "Largest tap targets of the four, and nothing under 16 px.",
 "Fails 'hybrid check-in on one screen' because mood, tags and note are split over three screens. Fails speed with 5 to 6 taps. Matching and evidence labels work as planned.",
 "Four simple views, buildable in 20 h. Each new question means a new screen, but cards are still just data.",
 "Free and traceable, as for all designs.",
])

design("b03.png", "Design 3: Scripted Chat (no AI)", [
 "Design 3 was inspired by Wysa, whose chat style felt the most friendly of the apps I analysed. I kept the feeling of a conversation but took the AI out completely: every message is written in advance and the student answers by tapping reply chips, so nothing is generated and nothing reads what they type. I expected this to be the most popular idea with younger students, and in the peer vote it was.",
 "Drawing it at real size showed the problems. Only four chips fit across a phone, so 'IA or deadline' and 'home' had to go. The evidence label shrinks to a 12 px grey line. Worst of all, the message box makes it look as if someone is reading, so a student might type something serious and wait for a reply that never comes.",
], "D3", [
 "Clean and consistent, though it looks like any messaging app rather than something designed for calm.",
 "Free to build and use.",
 "Fails 'fits MYP and DP' because two of the situation tags DP students use most are missing. Chips can be tapped silently, so it is still allowed in class.",
 "Text only.",
 "The phone icon has no label, so the counsellor specification is only partly met. The message box looks like someone is reading, which only partly meets privacy. The support bubble and the content itself are fine.",
 "Fits every screen, but the 12 px evidence line fails 'easy to read'.",
 "The check-in is spread through a chat, so only partly one screen. 3 to 4 taps is close to the limit but over it, so only partly fast enough. Matching and labels are met.",
 "Buildable in 20 h, but every new card needs its own branch of scripted messages, so only partly easy to extend.",
 "Free and traceable.",
])

design("b04.png", "Design 4: Check-in Card + Result", [
 "Design 4 tries to keep the speed of Design 1 and the calm of Design 2. Everything the student tells the app fits on one check-in card: a mood (the only required part), two short groups of tags and an optional note. One tap on 'Show me something that might help' opens a second screen with a single coping card. The counsellor button sits in the top bar and says 'Talk to the counsellor' in words, in the same place on every screen, like Wysa's always-visible SOS button.",
 "In the same scenario, the student taps 'Bad', reads 'Things feel heavy, but you can still get through the lesson', taps 'anxious' and 'test or exam', then the button. They get 'Worry dump', a writing technique tested with high school students before exams (Ramirez & Beilock, 2011). That is three taps, with the counsellor visible the whole time. The one weakness I found is that on phones shorter than 800 px the submit button drops just below the fold.",
], "D4", [
 "Cream, pale teal and one blue used the same way on every screen.",
 "Free to build and use.",
 "All ten tags in two labelled groups, so it fits MYP and DP. 'in class' limits results to silent cards, which the teacher needed.",
 "Text only, and matching runs on the phone, so only the first load uses the Wi-Fi.",
 "The only design to meet all four. The labelled counsellor button is on every screen, the support line is shown to everyone, history is off by default, and every card is checked by the counsellor.",
 "Every tap target is at least 44 px and no text is under 16 px.",
 "Everything is on one check-in screen and the card is matched. Three taps meets the limit, but on short phones the student has to scroll once, so speed is only partly met. Evidence labels on every card.",
 "Two screens that read every word from content.json, so new cards or Arabic need no new screens.",
 "Free and traceable.",
])

H3(d, "Can the ideas be understood without me explaining them?")
P(d, "I checked this directly. I gave the four boards to 4 peers who had not seen the project, pointed at a screen, and asked them what each numbered part does. All 4 described every part correctly on Designs 2 and 4, and 3 of 4 did on Design 1. On Design 3, 3 of the 4 thought the message box meant a real person would reply. That misunderstanding is the same safety risk the counsellor later raised (Appendix B3).")

# ------------------------------------------------------------------ B.iii
H2(d, "iii. Present the chosen design and justify its selection")
m4 = count("D4")
P(d, f"Out of the four ideas, I chose **Design 4: Check-in Card + Result**. It was not the most popular idea in the peer vote, so I want to be clear about why it won. It meets {m4[0]} of my 19 specifications and partly meets the other one, more than any other idea, and it is the only idea that meets all four Safety specifications. Both of my clients, the school counsellor and the teacher, rated it 5 out of 5. In the paper test, students found the counsellor in a median of 2 seconds, against 7 to 14 seconds for the other ideas.")
fig("b05.png", "Chosen design: final screens, scores and feedback (Canva).")

H3(d, "How I collected feedback")
P(d, "I used four kinds of evidence, so that no single opinion could decide the outcome. First, the specification scores from B.ii. Second, an anonymous Google Form answered by 20 students (5 each from MYP4, MYP5, DP1 and DP2), who saw the four boards in a random order and chose the one they would actually use when stressed at school. Third, a paper-prototype test with 5 testers: I gave them a scenario card ('You just walked out of a hard test and feel anxious') and timed how long it took to reach a card and then to find the counsellor. Finally, my two clients scored the boards from 0 to 5: the counsellor on whether each was safe to give to students, and the teacher on whether they would allow it in a lesson. The raw results are in Appendix B3.")

H3(d, "Comparing the four designs")
names = ["D1", "D2", "D3", "D4"]
crow = [[c] + [score(dn, idx).replace("\n", " ") for dn in names] for c, idx in CATS]
crow.append(["Total met"] + [f"{count(x)[0]}/19" for x in names])
table(d, crow, [2512, 2000, 2000, 2000, 2000], header=["ACCESSFMM", "Design 1", "Design 2", "Design 3", "Design 4"])
P(d, "The totals for Designs 1, 2 and 3 look fairly close, but where they lose marks matters more than how many. Their failures are in Safety and Size, which I treat as non-negotiable for an app used by minors during the school day. A design that hides the counsellor link below the fold is not safe enough, however fast it is. Design 4's only 'partly' is speed on short phones, which can be fixed without changing the idea.")

table(d, [
 ["Design 4 (chosen)", "Three taps on one screen; labelled counsellor button on every screen; history off by default; easiest to extend.", "N/A", f"18/19 met. Counsellor {COUNSELLOR['D4']}/5, teacher {TEACHER['D4']}/5. Counsellor found in {TIME_TO_HELP['D4']} s."],
 ["Design 1", "Fastest to a card (2 taps, 9 s).", "Counsellor link hidden 1180 px down; tap targets too small; history visible on shared laptops.", f"15/19 met. Counsellor {COUNSELLOR['D1']}/5. Counsellor found in {TIME_TO_HELP['D1']} s, the slowest."],
 ["Design 2", "Clearest screens and largest targets; my second choice.", "5 to 6 taps over three screens; 22 s to reach a card, the slowest.", f"16/19 met. Counsellor {COUNSELLOR['D2']}/5, teacher {TEACHER['D2']}/5."],
 ["Design 3", "Friendly and familiar; the peer favourite (40%).", "Looks like someone is reading; drops two MYP/DP tags; 12 px evidence label.", f"12/19 met. Counsellor {COUNSELLOR['D3']}/5."],
], [1800, 3000, 3000, 2712], header=["Design", "Features and justification", "Reason for rejection", "Evidence"])

H3(d, "Why the counsellor's view outweighed the peer vote")
P(d, "Design 3 won the peer vote with 40%, just ahead of Design 4 with 35%. Most of its votes came from MYP students (6 of 8), who said it felt 'like texting a friend'. The counsellor rated it 1 out of 5: 'If it looks like someone is listening, a student might type something serious and wait for a reply that never comes.' I gave the counsellor's view more weight. Criterion A names the counsellor as the person who receives any escalation and decides whether a tool is safe for students, and a design that invites disclosures nobody reads goes against two of my Safety specifications.")
P(d, "The peer vote still mattered. DP students clearly preferred Design 4 (5 of 10 votes), which connects to my related concept of perspective: MYP and DP students want different things from the same app. Design 4 was the one option both age groups and both clients could accept. The teacher put it simply: 'The one with everything on one card is the only one I could see a student finishing before I notice. No moving parts, please.'")

H3(d, "Which design is easiest to keep developing")
P(d, "I plan to keep working on Pause after this unit, so I also compared how much work it would take to add more cards or an Arabic version. Design 4 is the easiest: a new card is one entry in content.json and one code in the matching table, and Arabic is a second set of text plus a right-to-left setting, with no new screens. Design 3 would need a new branch of scripted messages for every card, Design 2 gets longer with every new question, and Design 1's page would grow even further below the fold.")

H3(d, "What I changed after feedback")
bullets(d, [
 "**Sticky submit bar.** 3 of the 5 testers were using shorter phones and had to scroll to find the submit button, so in B.iv the button sits in a bar fixed to the bottom of the check-in screen. This turns Design 4's one 'partly' into 'met'.",
 "**Kept the words 'Talk to the counsellor'.** Testers found the labelled button in 2 s, against 7 s for Design 3's icon, and the counsellor said: 'Students don't always know what an icon means.'",
 "**No animation at all.** The teacher said anything that moves would draw attention in a lesson.",
])
P(d, "**Limits of this decision.** All of this feedback was on wireframes and paper prototypes, not a working app, and the groups were small (20 students and 5 testers). In Criterion D I will repeat the timing and counsellor-finding tests on the real build.")

# ------------------------------------------------------------------ B.iv
H2(d, "iv. Develop accurate and detailed planning drawings and outline the requirements for the creation of the chosen solution")
P(d, "This section is my plan for building Pause, written so that someone who has never spoken to me could build the same app. The annotated planning drawings in Canva explain the purpose of each part; the tables here add the behaviour and states that a drawing can't show. All sizes are CSS pixels at 100% on a 360 x 800 px phone. On wider screens (up to 1366 px), the content column stays at most 480 px wide and is centred.")

H3(d, "Design tokens (used on every screen)")
table(d, [
 ["Cream #F7F3EA", "Screen background. Ink text on it: contrast 12.1:1."],
 ["Pale teal #DCEBE7", "Top bar, tag pills, support box, danger box. Ink text on it: 10.9:1."],
 ["Blue #3B6A8C", "Buttons, selected chips and moods, links. White text on it: 5.8:1. Blue text on Cream: 5.2:1; on Pale teal: 4.7:1."],
 ["Ink #1E3236", "All body text and headings."],
 ["Border #C9D9D5", "1.5 px outlines on chips, mood buttons and boxes."],
 ["Type", "Device system font stack: -apple-system, 'Segoe UI', Roboto, sans-serif (0 KB download). 24 px bold for titles, 22 px bold for the question, 20 px bold for the wordmark, 16 px for everything else (never smaller)."],
 ["Spacing and shape", "16 px side gutters; 8 px gaps between tap targets; radius 12 to 14 px for boxes and mood buttons, 20 px for the coping card, 22 to 26 px for pill buttons and chips."],
 ["Tap targets", "Every tappable element is at least 44 x 44 px (W3C, 2024, SC 2.5.5)."],
], W2)
P(d, "Every contrast ratio above passes WCAG AA for normal text (4.5:1 or higher) (W3C, 2024, SC 1.4.3).", size=9.5)

COLS = [1800, 2300, 2300, 4112]
HDR = ["Element", "Size and position", "Colour and type", "Behaviour and states"]

H3(d, "Planning drawing 1: Check-in screen")
fig("b06.png", "Planning drawing 1, check-in screen (Canva).")
table(d, [
 ["Top bar", "360 x 64 px, sticky at the top", "Pale teal; wordmark 20 px bold Ink", "Shared component on all four screens; never scrolls away."],
 ["Counsellor button", "About 180 x 44 px, 16 px from the right edge", "Blue, white 16 px semibold, 22 px radius", "Tap opens Help. On the Help screen it shows a 'you are here' ring."],
 ["Question", "Full width, 14 px below the bar", "22 px bold Ink", "Static text from content.json."],
 ["Mood buttons", "5 x (59 x 64 px), 8 px gaps", "White, 1.5 px border, 14 px radius. Selected: Blue, white text", "Single choice. Stores 1 to 5. Tapping another mood replaces it. The first choice enables the submit button."],
 ["Mood sentence", "328 px wide, 8 px below the moods", "White box, 12 px radius, 16 px text", "Hidden until a mood is picked; shows moods[i].desc from content.json."],
 ["Feeling chips", "44 px tall, 16 px side padding, wrap", "As mood buttons, plus a tick when selected", "Multi-select toggle. The first one selected becomes the matching row."],
 ["Situation chips", "As feeling chips", "As above", "Multi-select. The first one selected becomes the column; 'in class' limits results to silent cards."],
 ["Note box", "328 x 70 px", "White, 14 px radius, 0/280 counter", "Typing stops at 280 characters. Never passed to match(). Saved only if history is on."],
 ["Privacy link", "Centred, 44 px tap area", "16 px underlined Ink, lock icon", "Tap opens Privacy."],
 ["Sticky submit bar", "360 x 80 px; button 328 x 52 px", "Cream bar, 1.5 px top line; Blue button", "50% opacity and disabled until a mood is picked. Tap runs match() and opens Screen 2."],
], COLS, header=HDR)

H3(d, "Planning drawing 2: Suggestion screen")
fig("b07.png", "Planning drawing 2, suggestion screen (Canva).")
table(d, [
 ["'New check-in' link", "44 px tap area", "16 px semibold Blue, chevron", "Clears all inputs and returns to Screen 1 with no confirm box."],
 ["'Based on' line", "Full width", "16 px Ink; 30 px Pale teal pills", "Shows the mood and the first tag from each group."],
 ["Coping card", "328 px wide, 16 px padding, 20 px radius", "White, 1.5 px border, soft shadow", "Filled from content.json using the first card ID that match() returns."],
 ["Card type", "34 px tile + label", "Pale teal tile, 18 px icon, 16 px semibold", "Icon and label come from the card's type."],
 ["Evidence pill", "30 px tall", "White, 1.5 px Blue border, 16 px Blue", "One of three fixed values; not tappable."],
 ["Steps", "24 px number circles, 8 px apart", "16 px Ink; Blue circles", "2 to 4 steps from the card's step list."],
 ["Source line", "Card width, line above", "16 px; italic citation", "Citation plus who it was tested with."],
 ["Two buttons", "2 x (160 x 48 px), 8 px gap", "Outline Blue / filled Blue", "'Try a different one' moves to the next ID in the list (silent cards only in class). 'Done' clears everything and returns to Screen 1."],
 ["Support box", "328 px wide, 16 px radius", "Pale teal, heart icon, 16 px", "Same text for everyone. The link opens Help."],
], COLS, header=HDR)

H3(d, "Planning drawing 3: Help and Privacy screens")
fig("b08.png", "Planning drawing 3, Help and Privacy screens (Canva).")
table(d, [
 ["Help: counsellor details", "[Counsellor name], room, drop-in times and a booking email as a mailto: link. Filled in and approved by the counsellor before launch."],
 ["Help: danger box", "Tell any teacher straight away, or call 9999 (emergency, Oman). 9999 is a tel: link. The counsellor confirms the number and wording."],
 ["Help: outside school hours", "One helpline chosen and checked by the counsellor; nothing unverified is listed."],
 ["Support line wording", "'If things feel like too much right now, you don't have to handle it alone. The school counsellor is here for you.' Checked against Orygen's #chatsafe guidelines (Orygen, n.d.)."],
 ["Privacy: switch", "Off by default. On: each check-in is saved to pause.entries in this browser only."],
 ["Privacy: delete", "Opens a confirm box ('Delete all saved check-ins on this device? This can't be undone.') with Cancel and Delete. Delete clears pause.entries."],
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
 ["What every mood and tag means", "Yes: Mood and tag guide (Figure B1) and content.json."],
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
