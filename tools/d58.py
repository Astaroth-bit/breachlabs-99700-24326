from b2 import *
from data import *

PCSS = """<style>
.pn{position:absolute;background:#fff;border:1px solid #D9E2E4;border-radius:14px;padding:16px 20px;box-shadow:0 8px 20px -14px rgba(31,78,95,.4);font-family:Inter,sans-serif;color:#1E2B2F}
.pn h4{font-size:17px;font-weight:700;color:#1F4E5F;margin-bottom:12px;display:flex;justify-content:space-between;align-items:baseline}
.pn h4 small{font-size:13px;font-weight:500;color:#56666C}
.pn p,.pn li{font-size:14.5px;line-height:1.45}
.pn ol{padding-left:0;list-style:none;display:flex;flex-direction:column;gap:9px}
.pn ol li{display:flex;gap:10px}
.pn ol li b.k{flex:none;width:22px;height:22px;border-radius:11px;background:#1F4E5F;color:#fff;font-size:12px;display:flex;align-items:center;justify-content:center;margin-top:1px}
.br{display:flex;align-items:center;gap:12px;margin:7px 0;font-size:14.5px}
.br .l{width:200px;font-weight:600}
.br .bar{display:flex;height:20px;border-radius:10px;overflow:hidden;width:380px;background:#EEF2F3}
.br .bar i{display:block;height:100%}
.br .v{font-size:14px;color:#33444b}
.lg{display:flex;gap:16px;font-size:12.5px;color:#56666C;margin-top:8px}
.lg i{display:inline-block;width:11px;height:11px;border-radius:3px;margin-right:5px;vertical-align:-1px}
table.t{border-collapse:separate;border-spacing:0;width:100%;font-size:14px}
table.t th{background:#1F4E5F;color:#fff;font-weight:600;text-align:left;padding:7px 9px;font-size:12.5px}
table.t th:first-child{border-radius:8px 0 0 0}table.t th:last-child{border-radius:0 8px 0 0}
table.t td{padding:7px 9px;border-bottom:1px solid #E1E7E8}
table.t tr.win td{background:#E8F1EF;font-weight:600}
.mg{position:absolute;background:#fff;border:1px solid #D9E2E4;border-radius:16px;padding:16px 18px;box-shadow:0 8px 20px -14px rgba(31,78,95,.4);font-family:Inter,sans-serif;color:#1E2B2F}
.mg .hd{display:flex;align-items:center;gap:10px;font-size:20px;font-weight:700}
.mg .fc{width:44px;height:44px;border-radius:14px;background:#DCEBE7;display:flex;align-items:center;justify-content:center}
.mg .q{font-size:15px;line-height:1.42;margin-top:10px;background:#F7F3EA;border-radius:10px;padding:8px 10px}
.mg .e{font-size:14px;line-height:1.42;margin-top:9px;color:#33444b}
.mg .e b,.gt td b{color:#1F4E5F;font-size:11.5px;letter-spacing:.6px;text-transform:uppercase;margin-right:4px}
.mg .a{font-size:13.5px;line-height:1.4;margin-top:8px;color:#1F4E5F;border-top:1px solid #E1E7E8;padding-top:8px}
.gt{border-collapse:separate;border-spacing:0;width:100%;font-size:14px}
.gt td{padding:8px 10px;border-bottom:1px solid #E1E7E8;vertical-align:top;line-height:1.4}
.gt td.c{width:150px}
.chip{display:inline-flex;align-items:center;height:30px;padding:0 12px;border-radius:15px;background:#3B6A8C;color:#fff;font-size:14px;font-weight:600;white-space:nowrap}
.col4{display:inline-block;font-size:12px;font-weight:600;color:#1F4E5F;background:#E8F1EF;border-radius:9px;padding:2px 8px;margin-top:4px}
</style>"""
X4 = CSS4 + PCSS
FT = ["<b>Colours</b> Cream #F7F3EA · Pale teal #DCEBE7 · Blue #3B6A8C · Ink #1E3236 · Border #C9D9D5", "<b>Type</b> device system font, 16 px minimum (Inter shown)", "<b>Phone</b> 360 x 800 px CSS"]
SH = {"D1": "Design 1 · Dashboard", "D2": "Design 2 · Step-by-step", "D3": "Design 3 · Scripted chat", "D4": "Design 4 · Card + Result"}

# ---------------------------------------------------------------- n5: chosen design and evidence
def n5():
    s = 0.6
    ph = dev(checkin4(sticky=True), 70, 182, s, "pA") + dev(suggestion4(), 330, 182, s, "pB")
    ph += cap("Check-in", 50, 700, 268) + cap("Suggestion", 310, 700, 268)
    chg = ('<div class="pn" style="left:40px;top:748px;width:560px"><h4>What changed after feedback</h4><ol>'
           '<li><b class="k">1</b><span><b>Sticky submit bar.</b> 3 of 5 testers on shorter phones scrolled to find the button, so it now stays at the bottom of the screen.</span></li>'
           '<li><b class="k">2</b><span><b>Kept the words \'Talk to the counsellor\'.</b> Testers found it in 2 s, against 7 s for Design 3\'s icon, and the counsellor preferred words.</span></li>'
           '<li><b class="k">3</b><span><b>No animation.</b> The teacher asked for nothing that moves, so a class isn\'t distracted.</span></li></ol></div>')
    A = '<div class="pn" style="left:640px;top:182px;width:620px"><h4>Specifications met <small>19 in total, from B.i</small></h4>'
    for d in ["D4", "D2", "D1", "D3"]:
        m, p, n = count(d)
        A += (f'<div class="br"><span class="l">{SH[d]}</span><span class="bar" style="width:260px"><i style="width:{m/19*100}%;background:#1F4E5F"></i>'
              f'<i style="width:{p/19*100}%;background:#9DBDC6"></i><i style="width:{n/19*100}%;background:#E4C9BE"></i></span><span class="v"><b>{m}</b>/19 met</span></div>')
    A += ('<div class="lg" style="margin-left:212px"><span><i style="background:#1F4E5F"></i>met</span><span><i style="background:#9DBDC6"></i>partly</span>'
          '<span><i style="background:#E4C9BE"></i>not met</span></div>'
          + '</div>')
    B = '<div class="pn" style="left:1290px;top:182px;width:590px"><h4>Peer vote <small>"Which would you actually use?" n = 20</small></h4>'
    for d in ["D3", "D4", "D1", "D2"]:
        my, dp = PEER_MYP[d], PEER_DP[d]
        B += (f'<div class="br"><span class="l" style="width:190px">{SH[d]}</span><span class="bar" style="width:200px"><i style="width:{my/10*100}%;background:#6E9BB0"></i>'
              f'<i style="width:{dp/10*100}%;background:#1F4E5F"></i></span><span class="v"><b>{PEER_PREF[d]*5}%</b> ({my} MYP, {dp} DP)</span></div>')
    B += '<div class="lg" style="margin-left:202px"><span><i style="background:#6E9BB0"></i>MYP4 to MYP5</span><span><i style="background:#1F4E5F"></i>DP1 to DP2</span></div></div>'
    rows = "".join(f'<tr class="{"win" if d=="D4" else ""}"><td>{SH[d]}</td><td>{COUNSELLOR[d]}/5</td><td>{TEACHER[d]}/5</td><td>{TIME_TO_CARD[d]} s</td><td>{TIME_TO_HELP[d]} s</td></tr>' for d in ["D1", "D2", "D3", "D4"])
    C = ('<div class="pn" style="left:640px;top:410px;width:1240px"><h4>Client ratings and paper-prototype timings <small>counsellor and teacher scored 0 to 5; timings are medians of 5 testers</small></h4>'
         '<table class="t"><tr><th>Design</th><th>Counsellor: safe to give students</th><th>Teacher: I\'d allow it in my lesson</th><th>Time to a card</th><th>Time to find the counsellor</th></tr>'
         + rows + '</table></div>')
    D = ('<div class="pn" style="left:640px;top:656px;width:1240px"><h4>Why I chose Design 4</h4><div style="display:grid;grid-template-columns:1fr 1fr;gap:10px 30px">'
         '<p><b>It meets the most specifications.</b> 18 of 19 met and 1 partly met. It is the only idea that passes every Safety specification.</p>'
         '<p><b>Both clients rated it highest.</b> 5/5 from the counsellor and 5/5 from the teacher, mainly for the labelled counsellor button.</p>'
         '<p><b>Help is the fastest to find.</b> Testers found the counsellor in 2 s, because it is a labelled button in the same place on every screen.</p>'
         '<p><b>The vote did not decide it.</b> Design 3 won the peer vote (40% to 35%), but the counsellor ruled it out because it looks like a real chat.</p></div></div>')
    render("n5", page(frame(ph + chg + A + B + C + D, ["<b>Peer survey</b> anonymous Google Form, 20 students (5 per year group)", "<b>Timings</b> paper prototypes, 5 testers, scenario: 'You just walked out of a hard test and feel anxious.'", "<b>Full data</b> Appendix B3"]), X4))

# ---------------------------------------------------------------- n6: planning drawing 1, check-in
def n6(dims=""):
    L = [ann(1, "Top bar", "Holds the Pause name and the counsellor button. It stays put when the page scrolls.", "Help sits in the same spot on every screen, so a stressed student never has to look for it.", "Safety", "pA.brand", "L", build="360 x 64 px, Pale teal. CSS position: sticky. Wordmark 20 px bold Ink."),
         ann(2, "Question heading", "Asks one plain question in the student's own words.", "A question feels like being asked, not like filling in a form.", "Aesthetics", "pA.h_mood", "L", build="22 px bold Ink, 28 px line height, 14 px gap above."),
         ann(3, "Mood buttons (required)", "Five faces from Awful to Great. The chosen one turns Blue.", "A face plus a word is quicker to read than a 1 to 10 scale, and colour is never the only cue.", "Size", "pA.mood1", "L", build="5 x (59 x 64 px), 8 px gaps, 14 px radius, 1.5 px border. Stores 1 to 5."),
         ann(4, "Mood description", "Swaps in one sentence for the chosen mood, e.g. 'Bad: things feel heavy'.", "Testers read 'Bad' differently. The sentence keeps everyone choosing the same way.", "Customer", "pA.mcap", "L", build="White box, 12 px radius, 16 px text from content.json (moods[i].desc)."),
         ann(5, "Screen and spacing", "Cream background with the same 16 px margin on both sides.", "Off-white is softer than pure white on a bright screen, and even spacing makes it feel calm.", "Aesthetics", "pA.h_what", "L", dy=40, build="Cream #F7F3EA. Content 328 px wide. Reflows to 320 px with no sideways scroll.")]
    R = [ann(6, "Counsellor button", "Opens the Help screen from anywhere.", "Words, not an icon: testers found it in 2 s, against 7 s for Design 3's phone icon.", "Safety", "pA.cbtn", "R", build="44 px tall, about 180 px wide, 22 px radius, Blue, white 16 px medium."),
         ann(7, "Tag chips (optional)", "Two labelled groups of five. Tap any, or none.", "Tapping is easier than typing with shaky hands. A tick shows a selected chip without relying on colour.", "Function", "pA.feel", "R", build="44 px tall, 16 px side padding, 22 px radius, 8 px gaps. First tag per group goes to match()."),
         ann(8, "Note box (optional)", "A private space to write. Nothing reads it.", "Some students want to put it into words. The matcher ignores it, so no AI is ever needed.", "Safety", "pA.note", "R", build="328 x 70 px, 14 px radius, 280-character limit with a live counter."),
         ann(9, "Privacy link", "Opens the Privacy screen.", "Builds trust before the student writes anything.", "Safety", "pA.priv", "R", build="44 px tap area, 16 px underlined, lock icon."),
         ann(10, "Sticky submit bar", "Always visible. Faded until a mood is picked.", "Testers on shorter phones had to scroll to find it. Now it never leaves the screen.", "Function", "pA.sticky", "R", build="80 px bar; button 328 x 52 px, 26 px radius; 50% opacity until a mood is chosen.")]
    body = dev(checkin4(sticky=True), 790, 172, 0.9, "pA") + col(20, 172, 600, L) + col(1300, 172, 600, R) + dims
    return page(frame(body, ["<b>Screen 1</b> Check-in, drawn at 90%"] + FT), X4)

def n6_build():
    d = render("n6", n6())
    sc, md, ch, go = d["pA.scr"], d["pA.mood1"], d["pA.f_anxious"], d["pA.submit"]
    dims = dim_h(sc[0], sc[0] + sc[2], sc[1] + sc[3] + 24, "360 px")
    dims += dim_v(sc[0] - 30, md[1], md[1] + md[3], "64 px") + dim_v(sc[0] - 30, ch[1], ch[1] + ch[3], "44 px") + dim_v(sc[0] - 30, go[1], go[1] + go[3], "52 px")
    render("n6", n6(dims))

# ---------------------------------------------------------------- n7: planning drawing 2, suggestion
def n7(dims=""):
    L = [ann(1, "'New check-in' link", "Clears the form and goes back to Screen 1.", "An easy way out, with no confirm box to slow it down.", "Function", "pB.back", "L", build="44 px tap area, 16 px semibold Blue, left chevron."),
         ann(2, "'Based on' line", "Repeats the mood and tags the student picked.", "Shows why this card appeared, so the result doesn't feel random.", "Function", "pB.based", "L", build="16 px Ink; tags as 30 px Pale teal pills."),
         ann(3, "Card type and icon", "Names the kind of technique, e.g. Writing or Breathing.", "Students can tell at a glance if it's something they can do in a lesson.", "Customer", "pB.type", "L", build="34 px Pale teal tile, 18 px line icon, 16 px semibold."),
         ann(4, "Card title and reason", "A short name and one line on why it can help.", "One reason is enough to make it worth trying, without a wall of text.", "Function", "pB.ctitle", "L", build="Title 24 px bold, 30 px line height. Reason 16 px. Both from content.json."),
         ann(5, "Numbered steps", "Two to four short steps, each starting with a verb.", "Numbers make it easy to keep your place when you can't concentrate.", "Size", "pB.steps", "L", build="16 px, 22 px line height; 24 px Blue number circles.")]
    R = [ann(6, "Evidence label", "'Strong evidence', 'Some evidence' or 'Worth a try'.", "The app never promises more than the research shows.", "Function", "pB.pill", "R", build="30 px tall pill, 1.5 px Blue border, 16 px semibold. Not tappable."),
         ann(7, "One coping card", "Shows one technique from the library of 12.", "One card instead of a list avoids choice overload when stress lowers working memory.", "Function", "pB.card", "R", dy=-60, build="328 px wide, 16 px padding, 20 px radius, white with a soft shadow."),
         ann(8, "Source line", "The citation and who it was tested with.", "Being open about evidence is a spec, and lets older students check it themselves.", "Materials", "pB.src", "R", build="16 px; italic citation; info icon; 1.5 px Pale teal line above."),
         ann(9, "Try a different one / Done", "Next card in the same table cell, or a blank check-in.", "Gives control without starting again. 'Done' clears the screen so a friend can't see it.", "Safety", "pB.done", "R", build="Two 160 x 48 px buttons, 8 px gap, 24 px radius. Outline left, filled right."),
         ann(10, "Support line", "The same line for everyone, linking to Help.", "Shown every time instead of being triggered by words, so nobody slips through.", "Safety", "pB.support", "R", build="Pale teal box, 16 px radius, heart icon, wording approved by the counsellor.")]
    body = dev(suggestion4(), 790, 172, 0.9, "pB") + col(20, 172, 600, L) + col(1300, 172, 600, R) + dims
    return page(frame(body, ["<b>Screen 2</b> Suggestion, drawn at 90%", "<b>Example</b> Bad + anxious + test or exam gives C3 'Worry dump'"] + FT[:2]), X4)

def n7_build():
    d = render("n7", n7())
    sc, cd, bt, pl = d["pB.scr2"], d["pB.card"], d["pB.another"], d["pB.pill"]
    dims = dim_h(sc[0], sc[0] + sc[2], sc[1] + sc[3] + 24, "360 px")
    dims += dim_v(sc[0] - 30, bt[1], bt[1] + bt[3], "48 px") + dim_v(sc[0] - 30, pl[1], pl[1] + pl[3], "30 px")
    render("n7", n7(dims))

# ---------------------------------------------------------------- n8: planning drawing 3, help and privacy
def n8():
    s = 0.82
    L = [ann(1, "Counsellor button, 'you are here'", "Stays in the top bar, with a ring around it.", "The student can see where they are, and help is never hidden.", "Safety", "pC.cbtn", "L", build="Same 44 px button; 3 px Pale teal gap and 2 px Blue ring."),
         ann(2, "Heading and support line", "'You're not alone', then the same support line.", "Starts with reassurance before any practical details.", "Safety", "pC.h_help", "L", build="24 px bold heading; 16 px body."),
         ann(3, "Counsellor card", "Name, room, drop-in times and a booking email.", "Everything needed to actually go, without leaving the app to search.", "Customer", "pC.ccard", "L", build="White box, 16 px radius. Email is a mailto: link. [Brackets] filled in with the counsellor."),
         ann(4, "'If you are in danger right now'", "Tell any teacher straight away, or call 9999.", "Calm colours and clear words. No red, so it informs without alarming.", "Safety", "pC.danger", "L", build="Pale teal box. 9999 is a tel: link (Oman emergency)."),
         ann(5, "Outside school hours", "One helpline checked by the counsellor.", "The app never lists a number nobody has verified.", "Safety", "pC.outside", "L", build="White box; filled in and approved before launch.")]
    R = [ann(6, "What stays private", "Three short promises with ticks.", "Plain words, not a privacy policy, so a 15-year-old actually reads it.", "Safety", "pD.plist", "R", build="16 px, 22 px line height, 20 px Blue tick icons."),
         ann(7, "History switch", "Saves check-ins on this device only. Off by default.", "School laptops are shared, so nothing is kept unless the student chooses it.", "Safety", "pD.toggle", "R", build="58 px row, 52 x 32 px switch. On: localStorage only."),
         ann(8, "'Delete my entries'", "Clears everything saved, after a confirm box.", "Students stay in control of their data. Blue, not red, so it doesn't feel like a warning.", "Safety", "pD.delete", "R", build="328 x 48 px outline button; confirm: [Cancel] [Delete]."),
         ann(9, "Back links", "Return to the screen the student came from.", "No dead ends, so nobody gets stuck on a screen.", "Function", "pD.back4", "R", build="44 px tap area, 16 px semibold Blue.")]
    body = (dev(help4(), 640, 182, s, "pC") + dev(privacy4(), 980, 182, s, "pD")
            + cap("Screen 3 · Help", 610, 900, 372) + cap("Screen 4 · Privacy", 950, 900, 372)
            + col(20, 172, 590, L) + col(1310, 172, 590, R))
    render("n8", page(frame(body, ["<b>Screens 3 and 4</b> drawn at 82%", "<b>[Brackets]</b> filled in and checked by the counsellor before launch", "<b>No red</b> anywhere, even the emergency box"] + FT[:1]), X4))

# ---------------------------------------------------------------- n12: mood and tag guide
def n12():
    h = ""
    w, g, x0 = 352, 14, 40
    for i, (mw, desc, ex, eff) in enumerate(MOOD_GUIDE):
        h += (f'<div class="mg" style="left:{x0+i*(w+g)}px;top:176px;width:{w}px;height:272px"><div class="hd"><span class="fc">{face(i+1, P4["ink"], "#fff")}</span>{mw}<span style="margin-left:auto;font-size:13px;color:#56666C;font-weight:500">value {i+1}</span></div>'
              f'<div class="q">"{desc}"</div><div class="e"><b>Example</b>{ex}</div><div class="a"><b style="font-size:11.5px;letter-spacing:.6px">WHAT THE APP DOES</b><br>{eff}</div></div>')
    f = "".join(f'<tr><td class="c"><span class="chip">{t}</span></td><td>{d}<br><span style="color:#56666C"><b>e.g.</b>{e}</span></td></tr>' for t, d, e in FEEL_GUIDE)
    s = "".join(f'<tr><td class="c"><span class="chip">{t}</span><br><span class="col4">column: {c}</span></td><td>{d}<br><span style="color:#56666C"><b>e.g.</b>{e}</span></td></tr>' for t, d, e, c in WHAT_GUIDE)
    h += f'<div class="pn" style="left:40px;top:470px;width:900px"><h4>"How I feel" tags <small>pick any; the first one picks the table row</small></h4><table class="gt">{f}</table></div>'
    h += f'<div class="pn" style="left:980px;top:470px;width:900px"><h4>"What\'s happening" tags <small>pick any; the first one picks the table column</small></h4><table class="gt">{s}</table></div>'
    render("n12", page(frame(h, ["<b>Moods</b> one required, shown with its sentence on the check-in screen", "<b>Tags</b> optional, so a student who can't name the feeling still gets a card", "<b>All words</b> stored in content.json"]), X4))

if __name__ == "__main__":
    n5(); n6_build(); n7_build(); n8(); n12(); print("done")
