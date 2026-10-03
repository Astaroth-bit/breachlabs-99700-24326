# Polished screen components for Pause design boards (v2).
FONT = "Inter, -apple-system, 'Segoe UI', Roboto, sans-serif"

def icon(name, col, size=20, sw=1.8):
    p = {
     "person": '<circle cx="12" cy="8" r="3.6"/><path d="M5 20c1.2-3.6 4-5.4 7-5.4s5.8 1.8 7 5.4"/>',
     "lock": '<rect x="5" y="10.5" width="14" height="9.5" rx="2.5"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/>',
     "arrow": '<path d="M5 12h13M13 6l6 6-6 6"/>',
     "back": '<path d="M15 5l-7 7 7 7"/>',
     "check": '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
     "pen": '<path d="M4 20l4.2-1 10.3-10.3a2.1 2.1 0 0 0-3-3L5.2 16 4 20z"/>',
     "heart": '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
     "info": '<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5M12 8v.01"/>',
     "phone": '<path d="M6.5 4h3l1.5 4-2 1.3a10 10 0 0 0 5.7 5.7L16 13l4 1.5v3A2 2 0 0 1 18 19.5 15.5 15.5 0 0 1 4.5 6 2 2 0 0 1 6.5 4z"/>',
     "send": '<path d="M4 12l16-7-6 16-3-6-7-3z"/>',
     "q": '<circle cx="12" cy="12" r="8.5"/><path d="M9.6 9.5a2.5 2.5 0 1 1 3.4 2.3c-.6.3-1 .8-1 1.5v.4M12 16.5v.01"/>',
     "wind": '<path d="M3 9h11a3 3 0 1 0-3-3M3 15h15a3 3 0 1 1-3 3"/>',
     "clock": '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
     "history": '<path d="M4 12a8 8 0 1 0 2.4-5.7M4 4v4h4"/>',
    }[name]
    return (f'<svg width="{size}" height="{size}" viewBox="0 0 24 24" fill="none" stroke="{col}" stroke-width="{sw}" '
            f'stroke-linecap="round" stroke-linejoin="round" style="flex:none">{p}</svg>')

def face(kind, stroke, fill):
    m = {1: "M8.3 16.6 C10 14.4 14 14.4 15.7 16.6", 2: "M8.6 16 C10.4 14.9 13.6 14.9 15.4 16", 3: "M8.8 15.3 H15.2",
         4: "M8.6 14.4 C10.4 15.9 13.6 15.9 15.4 14.4", 5: "M8 13.8 C9.8 17.2 14.2 17.2 16 13.8"}[kind]
    brow = '<path d="M7.6 8.4l2.4 1M16.4 8.4l-2.4 1" stroke-width="1.5"/>' if kind == 1 else ""
    return (f'<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="{stroke}" stroke-width="1.6" stroke-linecap="round">'
            f'<circle cx="12" cy="12" r="10" fill="{fill}" stroke="none"/>{brow}<circle cx="9" cy="10.6" r="1.1" fill="{stroke}" stroke="none"/>'
            f'<circle cx="15" cy="10.6" r="1.1" fill="{stroke}" stroke="none"/><path d="{m}"/></svg>')

STATUS = ('<div class="sb"><span>9:41</span><span class="isl"></span><span class="sbi">'
          '<svg width="17" height="11" viewBox="0 0 17 11"><rect x="0" y="7" width="3" height="4" rx="1" fill="currentColor"/><rect x="4.5" y="5" width="3" height="6" rx="1" fill="currentColor"/><rect x="9" y="2.5" width="3" height="8.5" rx="1" fill="currentColor"/><rect x="13.5" y="0" width="3" height="11" rx="1" fill="currentColor"/></svg>'
          '<svg width="25" height="12" viewBox="0 0 25 12"><rect x=".5" y=".5" width="21" height="11" rx="3" fill="none" stroke="currentColor" opacity=".5"/><rect x="2" y="2" width="16" height="8" rx="1.8" fill="currentColor"/><rect x="22.5" y="4" width="1.8" height="4" rx=".9" fill="currentColor" opacity=".5"/></svg>'
          '</span></div>')

BASE = f"""
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=block" rel="stylesheet">
<style>
*{{box-sizing:border-box;margin:0;padding:0}}
body{{width:1920px;height:1080px;background:#fff;font-family:{FONT};position:relative;overflow:hidden;-webkit-font-smoothing:antialiased}}
.dev{{position:absolute;width:380px;border-radius:54px;background:#15191A;padding:10px;box-shadow:0 30px 60px -20px rgba(20,40,45,.35),0 0 0 1.5px #2a3133 inset;transform-origin:top left}}
.scr{{width:360px;border-radius:44px;overflow:hidden;position:relative}}
.sb{{height:36px;display:flex;align-items:center;justify-content:space-between;padding:0 26px 0 30px;font-size:15px;font-weight:600;position:relative}}
.isl{{position:absolute;left:50%;top:9px;transform:translateX(-50%);width:96px;height:27px;border-radius:14px;background:#000}}
.sbi{{display:flex;gap:6px;align-items:center}}
.cap{{position:absolute;font:600 19px {FONT};color:#1E2B2F;text-align:center}}
.cap small{{display:block;font-weight:400;font-size:15px;color:#56666C;margin-top:2px}}
</style>"""

def device(inner, left, top, scale=1.0, cap=None, sub=None, pid="p"):
    c = ""
    if cap:
        c = (f'<div class="cap" style="left:{left - 40}px;top:{top + 0}px;width:{380 * scale + 80}px;transform:translateY({{}}px)">{cap}'
             + (f"<small>{sub}</small>" if sub else "") + '</div>')
    return f'<div class="dev" data-a="{pid}" style="left:{left}px;top:{top}px;transform:scale({scale})">{inner}</div>', c

# ---------------------------------------------------------------- Design 4 (Pause)
P4 = dict(cream="#F7F3EA", teal="#DCEBE7", blue="#3B6A8C", ink="#1E3236", line="#C9D9D5")
MOODS = [("Awful", "Too much right now. Hard to think about anything else."),
         ("Bad", "Things feel heavy, but you can still get through the lesson."),
         ("Okay", "Not great, not terrible. A bit on edge."),
         ("Good", "Mostly fine. Just checking in."),
         ("Great", "Feeling steady and want to keep it that way.")]

CSS4 = f"""<style>
.p4{{background:{P4['cream']};color:{P4['ink']};height:836px;position:relative}}
.p4 .sb{{background:{P4['teal']}}}
.p4 .top{{height:64px;background:{P4['teal']};display:flex;align-items:center;justify-content:space-between;padding:0 16px}}
.p4 .brand{{display:flex;align-items:center;gap:9px;font-size:20px;font-weight:700;letter-spacing:-.2px}}
.p4 .logo{{width:28px;height:28px;border-radius:9px;background:{P4['blue']};display:flex;align-items:center;justify-content:center;gap:4px}}
.p4 .logo i{{width:4px;height:12px;border-radius:2px;background:#fff;display:block}}
.p4 .cb{{height:44px;padding:0 14px 0 11px;border-radius:22px;background:{P4['blue']};color:#fff;font-size:16px;font-weight:600;display:flex;align-items:center;gap:7px;white-space:nowrap}}
.p4 .cb.on{{box-shadow:0 0 0 3px {P4['teal']},0 0 0 5px {P4['blue']}}}
.p4 .bd{{padding:0 16px}}
.p4 h2{{font-size:22px;font-weight:700;line-height:28px;margin-top:14px;letter-spacing:-.3px}}
.p4 .sub{{font-size:16px;line-height:22px;margin-top:2px;color:{P4['ink']}}}
.p4 .moods{{display:flex;gap:8px;margin-top:12px}}
.p4 .md{{flex:1;height:64px;border-radius:14px;background:#fff;border:1.5px solid {P4['line']};display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;font-size:16px;font-weight:500}}
.p4 .md.sel{{background:{P4['blue']};border-color:{P4['blue']};color:#fff;box-shadow:0 6px 14px -6px rgba(59,106,140,.6)}}
.p4 .mcap{{margin-top:8px;background:#fff;border-radius:12px;padding:7px 12px;font-size:16px;line-height:22px;border:1.5px solid {P4['line']}}}
.p4 h3{{font-size:16px;font-weight:700;line-height:22px;margin-top:13px;display:flex;justify-content:space-between}}
.p4 h3 span{{font-weight:400}}
.p4 .chips{{display:flex;flex-wrap:wrap;gap:8px;margin-top:8px}}
.p4 .ch{{height:44px;padding:0 16px;border-radius:22px;background:#fff;border:1.5px solid {P4['line']};display:flex;align-items:center;gap:6px;font-size:16px;font-weight:500;white-space:nowrap}}
.p4 .ch.sel{{background:{P4['blue']};border-color:{P4['blue']};color:#fff;padding-left:12px}}
.p4 .note{{margin-top:8px;height:70px;border-radius:14px;background:#fff;border:1.5px solid {P4['line']};padding:11px 12px;font-size:16px;position:relative;display:flex;gap:8px;color:#4E5F62}}
.p4 .note .cnt{{position:absolute;right:12px;bottom:9px}}
.p4 .priv{{margin:6px 0 0;height:44px;display:flex;align-items:center;justify-content:center;gap:6px;font-size:16px;text-decoration:underline;text-underline-offset:3px}}
.p4 .stick{{position:absolute;left:0;right:0;bottom:0;padding:12px 16px 18px;background:{P4['cream']};border-top:1.5px solid {P4['line']}}}
.p4 .go{{height:52px;border-radius:26px;background:{P4['blue']};color:#fff;font-size:16px;font-weight:600;display:flex;align-items:center;justify-content:center;gap:8px;box-shadow:0 8px 18px -8px rgba(59,106,140,.7)}}
.p4 .back{{height:44px;display:flex;align-items:center;gap:4px;font-size:16px;font-weight:600;color:{P4['blue']};margin-top:4px}}
.p4 .based{{display:flex;flex-wrap:wrap;gap:6px;align-items:center;font-size:16px}}
.p4 .tg{{height:30px;padding:0 10px;border-radius:15px;background:{P4['teal']};display:flex;align-items:center;font-size:16px;font-weight:500}}
.p4 .card{{margin-top:12px;background:#fff;border-radius:20px;padding:16px;box-shadow:0 10px 26px -14px rgba(30,50,54,.35);border:1.5px solid {P4['line']}}}
.p4 .chd{{display:flex;justify-content:space-between;align-items:center}}
.p4 .ty{{display:flex;align-items:center;gap:8px;font-size:16px;font-weight:600}}
.p4 .tic{{width:34px;height:34px;border-radius:11px;background:{P4['teal']};display:flex;align-items:center;justify-content:center}}
.p4 .pill{{height:30px;padding:0 11px;border-radius:15px;border:1.5px solid {P4['blue']};color:{P4['blue']};font-size:16px;font-weight:600;display:flex;align-items:center}}
.p4 .ct{{font-size:24px;font-weight:700;line-height:30px;margin-top:12px;letter-spacing:-.4px}}
.p4 .why{{font-size:16px;line-height:23px;margin-top:4px}}
.p4 .steps{{margin-top:10px;display:flex;flex-direction:column;gap:8px}}
.p4 .st{{display:flex;gap:10px;font-size:16px;line-height:22px}}
.p4 .st b{{flex:none;width:24px;height:24px;border-radius:12px;background:{P4['blue']};color:#fff;font-size:14px;display:flex;align-items:center;justify-content:center;margin-top:-1px}}
.p4 .src{{margin-top:12px;padding-top:10px;border-top:1.5px solid {P4['teal']};font-size:16px;line-height:22px;display:flex;gap:8px}}
.p4 .row{{display:flex;gap:8px;margin-top:12px}}
.p4 .b2{{flex:1;height:48px;border-radius:24px;display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:600}}
.p4 .b2.o{{border:1.5px solid {P4['blue']};color:{P4['blue']};background:#fff}}
.p4 .b2.f{{background:{P4['blue']};color:#fff}}
.p4 .sup{{margin-top:12px;background:{P4['teal']};border-radius:16px;padding:13px 14px;font-size:16px;line-height:23px;display:flex;gap:10px}}
.p4 .sup u{{color:{P4['blue']};font-weight:600;text-underline-offset:3px}}
.p4 .box{{margin-top:12px;background:#fff;border-radius:16px;padding:13px 14px;font-size:16px;line-height:23px;border:1.5px solid {P4['line']}}}
.p4 .box b{{display:block}}
.p4 .dg{{margin-top:12px;background:{P4['teal']};border-radius:16px;padding:13px 14px;font-size:16px;line-height:23px}}
.p4 .dg b.h{{display:block}}
.p4 .tog{{margin-top:12px;min-height:58px;background:#fff;border:1.5px solid {P4['line']};border-radius:16px;padding:0 14px;display:flex;align-items:center;justify-content:space-between;font-size:16px;font-weight:500}}
.p4 .sw{{width:52px;height:32px;border-radius:16px;background:{P4['line']};position:relative;flex:none}}
.p4 .sw:after{{content:'';position:absolute;left:4px;top:4px;width:24px;height:24px;border-radius:12px;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.2)}}
.p4 .del{{margin-top:12px;height:48px;border-radius:24px;border:1.5px solid {P4['blue']};color:{P4['blue']};background:#fff;display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:600}}
.p4 ul{{margin-top:10px;display:flex;flex-direction:column;gap:8px;list-style:none}}
.p4 li{{display:flex;gap:10px;font-size:16px;line-height:22px}}
.p4 .sm{{font-size:16px;line-height:22px;margin-top:8px}}
</style>"""

def top4(on=False):
    return (f'<div class="top" data-a="topbar"><span class="brand" data-a="brand"><span class="logo"><i></i><i></i></span>Pause</span>'
            f'<span class="cb{" on" if on else ""}" data-a="cbtn">{icon("person", "#fff", 18, 2)}Talk to the counsellor</span></div>')

def checkin4(mood=2, feel=("anxious",), what=("test or exam",), sticky=True):
    md = "".join(
        f'<div class="md{" sel" if i + 1 == mood else ""}" data-a="mood{i + 1}">'
        f'{face(i + 1, "#fff" if i + 1 == mood else P4["ink"], "rgba(255,255,255,.18)" if i + 1 == mood else P4["teal"])}{w}</div>'
        for i, (w, _) in enumerate(MOODS))
    fe = ["anxious", "overwhelmed", "frustrated", "low", "tired"]
    wh = ["test or exam", "IA or deadline", "in class", "friends or people", "home"]
    ck = icon("check", "#fff", 16, 2.4)
    c1 = "".join(f'<span class="ch{" sel" if t in feel else ""}" data-a="f_{t}">{ck if t in feel else ""}{t}</span>' for t in fe)
    c2 = "".join(f'<span class="ch{" sel" if t in what else ""}" data-a="w_{t}">{ck if t in what else ""}{t}</span>' for t in wh)
    go = f'<div class="go" data-a="submit">Show me something that might help {icon("arrow", "#fff", 18, 2.2)}</div>'
    return (f'<div class="scr p4" data-a="scr">{STATUS}{top4()}<div class="bd">'
            f'<h2 data-a="h_mood">How are you right now?</h2>'
            f'<div class="moods" data-a="moods">{md}</div>'
            f'<div class="mcap" data-a="mcap"><b>{MOODS[mood - 1][0]}:</b> {MOODS[mood - 1][1]}</div>'
            f'<h3 data-a="h_feel">How I feel <span>pick any</span></h3><div class="chips" data-a="feel">{c1}</div>'
            f'<h3 data-a="h_what">What\'s happening <span>pick any</span></h3><div class="chips" data-a="what">{c2}</div>'
            f'<h3 data-a="h_note">Anything else? <span>optional</span></h3>'
            f'<div class="note" data-a="note">{icon("lock", "#4E5F62", 18)}Only you will see this.<span class="cnt">0/280</span></div>'
            f'<div class="priv" data-a="priv">{icon("lock", P4["ink"], 16)}Saved only on this device</div>'
            + ("" if sticky else go) + '</div>'
            + (f'<div class="stick" data-a="sticky">{go}</div>' if sticky else "") + '</div>')

def suggestion4():
    steps = ["Take a blank page or the back of your notes.", "For 5 minutes, write what worries you about the test.", "Close it. You don't need to read it again."]
    st = "".join(f'<div class="st"><b>{i + 1}</b><span>{s}</span></div>' for i, s in enumerate(steps))
    return (f'<div class="scr p4" data-a="scr2">{STATUS}{top4()}<div class="bd">'
            f'<div class="back" data-a="back">{icon("back", P4["blue"], 18, 2.2)}New check-in</div>'
            f'<div class="based" data-a="based"><span>Based on</span><span class="tg">Bad</span><span class="tg">anxious</span><span class="tg">test or exam</span></div>'
            f'<div class="card" data-a="card"><div class="chd"><span class="ty" data-a="type"><span class="tic">{icon("pen", P4["blue"], 18)}</span>Writing</span>'
            f'<span class="pill" data-a="pill">Some evidence</span></div>'
            f'<div class="ct" data-a="ctitle">Worry dump</div>'
            f'<div class="why" data-a="why">Writing worries down before a test can free up space to think.</div>'
            f'<div class="steps" data-a="steps">{st}</div>'
            f'<div class="src" data-a="src">{icon("info", P4["ink"], 18)}<span><i>Ramirez &amp; Beilock (2011).</i> Tested with high school students in the US.</span></div></div>'
            f'<div class="row" data-a="btns"><span class="b2 o" data-a="another">Try a different one</span><span class="b2 f" data-a="done">Done</span></div>'
            f'<div class="sup" data-a="support">{icon("heart", P4["blue"], 20)}<span>If things feel like too much right now, you don\'t have to handle it alone. '
            f'<u>See how to reach the counsellor</u></span></div></div></div>')

def help4():
    return (f'<div class="scr p4" data-a="scr3">{STATUS}{top4(on=True)}<div class="bd">'
            f'<div class="back" data-a="back3">{icon("back", P4["blue"], 18, 2.2)}Back</div>'
            f'<h2 style="margin-top:2px;font-size:24px;line-height:30px" data-a="h_help">You\'re not alone</h2>'
            f'<div class="sm" data-a="support3">If things feel like too much right now, you don\'t have to handle it alone. The school counsellor is here for you.</div>'
            f'<div class="box" data-a="ccard"><b>[Counsellor name]</b>School counsellor · Room [room]<br>Drop in: [days and times]<br>Book: <u>[school email]</u><br>You don\'t need a reason to go.</div>'
            f'<div class="dg" data-a="danger"><b class="h">If you are in danger right now</b>Tell any teacher straight away, or call <b>9999</b> (emergency, Oman).</div>'
            f'<div class="box" data-a="outside"><b>Outside school hours</b>[Helpline approved by the counsellor]</div></div></div>')

def privacy4():
    ck = icon("check", P4["blue"], 20, 2.2)
    return (f'<div class="scr p4" data-a="scr4">{STATUS}{top4()}<div class="bd">'
            f'<div class="back" data-a="back4">{icon("back", P4["blue"], 18, 2.2)}Back</div>'
            f'<h2 style="margin-top:2px;font-size:24px;line-height:30px" data-a="h_priv">Your privacy</h2>'
            f'<ul data-a="plist"><li>{ck}Your check-ins stay on this device. Nothing is sent to the school.</li>'
            f'<li>{ck}Pause never asks for your name, email or student ID.</li><li>{ck}Nobody reads what you type: not the school, not a computer program.</li></ul>'
            f'<div class="tog" data-a="toggle"><span>Save my check-ins<br>on this device</span><span class="sw"></span></div>'
            f'<div class="sm" data-a="tnote">Off by default, because school laptops are shared.</div>'
            f'<div class="del" data-a="delete">Delete my entries</div>'
            f'<div class="sm" data-a="dnote">Clears everything saved on this device. You\'ll be asked to confirm first.</div></div></div>')

# ---------------------------------------------------------------- Design 1 (dashboard)
P1 = dict(paper="#F3EFE6", sage="#5E7F64", gold="#B08A4A", ink="#26312A", line="#DCD6C8")
CSS1 = f"""<style>
.p1{{background:{P1['paper']};color:{P1['ink']};position:relative}}
.p1 .sb{{background:{P1['sage']};color:#fff}}
.p1 .hd{{height:64px;background:{P1['sage']};color:#fff;display:flex;align-items:center;justify-content:space-between;padding:0 16px}}
.p1 .hd b{{font-size:20px}} .p1 .hd span{{font-size:15px;opacity:.9}}
.p1 .bd{{padding:0 16px}}
.p1 h2{{font-size:20px;font-weight:700;margin-top:16px}}
.p1 .sl{{margin-top:14px;height:6px;border-radius:3px;background:linear-gradient(90deg,{P1['sage']} 0 30%,{P1['line']} 30%);position:relative}}
.p1 .th{{position:absolute;left:30%;top:50%;width:24px;height:24px;border-radius:12px;background:#fff;border:2px solid {P1['sage']};transform:translate(-50%,-50%);box-shadow:0 2px 6px rgba(0,0,0,.2)}}
.p1 .sll{{display:flex;justify-content:space-between;font-size:14px;margin-top:10px}}
.p1 h3{{font-size:15px;font-weight:700;margin-top:14px}}
.p1 .chips{{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}}
.p1 .ch{{height:36px;padding:0 12px;border-radius:18px;background:#fff;border:1.5px solid {P1['line']};display:flex;align-items:center;font-size:14px;font-weight:500}}
.p1 .ch.sel{{background:{P1['sage']};color:#fff;border-color:{P1['sage']}}}
.p1 .note{{margin-top:10px;height:60px;border-radius:12px;background:#fff;border:1.5px solid {P1['line']};padding:10px 12px;font-size:14px;color:#6b6a62}}
.p1 .live{{margin-top:14px;display:flex;justify-content:space-between;font-size:14px;font-weight:700}} .p1 .live span{{font-weight:400;color:{P1['gold']}}}
.p1 .card{{margin-top:8px;background:#fff;border-radius:16px;padding:14px;border:2px solid {P1['gold']}}}
.p1 .card b{{font-size:18px}} .p1 .pill{{display:inline-block;margin-top:6px;padding:3px 10px;border-radius:12px;background:#F4EBD9;color:#7A5F2E;font-size:13px;font-weight:600}}
.p1 .card p{{font-size:14px;line-height:20px;margin-top:8px}}
.p1 .fold{{margin:16px -16px 0;border-top:2px dashed {P1['gold']};position:relative}}
.p1 .fold span{{position:absolute;right:16px;top:-22px;font-size:13px;font-weight:600;color:{P1['gold']}}}
.p1 .hist{{margin-top:14px}} .p1 .hr{{display:flex;justify-content:space-between;background:#fff;border-radius:12px;padding:12px;margin-top:8px;font-size:14px}}
.p1 .ft{{margin:18px -16px 0;background:#E6E1D3;padding:16px}}
.p1 .ft p{{font-size:14px;line-height:20px}}
.p1 .cl{{margin-top:10px;height:40px;border-radius:20px;background:{P1['sage']};color:#fff;font-size:14px;font-weight:600;display:flex;align-items:center;justify-content:center;gap:6px}}
</style>"""

def dash1():
    t = ["anxious", "overwhelmed", "frustrated", "low", "tired", "test or exam", "IA or deadline", "in class", "friends or people", "home"]
    ch = "".join(f'<span class="ch{" sel" if x in ("anxious", "test or exam") else ""}">{x}</span>' for x in t)
    return (f'<div class="scr p1" data-a="scr" style="height:1110px">{STATUS}<div class="hd" data-a="hd"><b>Pause</b><span>Hi! Check in below</span></div><div class="bd">'
            f'<h2>How are you?</h2><div class="sl" data-a="slider"><span class="th"></span></div><div class="sll"><span>Awful</span><span>Great</span></div>'
            f'<h3>Tags</h3><div class="chips" data-a="tags">{ch}</div>'
            f'<div class="note" data-a="note">Write anything (optional)</div>'
            f'<div class="live" data-a="livehd">Live suggestion <span>updates as you tap</span></div>'
            f'<div class="card" data-a="card"><b>Nerves can help</b><br><span class="pill">Some evidence</span>'
            f'<p>Before a test, tell yourself: "This feeling is my body getting ready."</p><p style="opacity:.75">Source: Jamieson et al. (2010)</p></div>'
            f'<div class="fold" data-a="fold"><span>fold · 740 px</span></div>'
            f'<div class="hist" data-a="hist"><h3>Recent check-ins</h3><div class="hr"><b>Today 10:40</b><span>Bad · test or exam</span></div>'
            f'<div class="hr"><b>Mon 13:15</b><span>Okay · IA or deadline</span></div><div class="hr"><b>Sun 21:02</b><span>Bad · home</span></div></div>'
            f'<div class="ft" data-a="foot"><p>You don\'t have to handle it alone. The school counsellor is here.</p>'
            f'<div class="cl" data-a="clink">{icon("person", "#fff", 16, 2)}Counsellor: Room [ ] · Email</div></div></div></div>')

# ---------------------------------------------------------------- Design 2 (steps)
P2 = dict(lilac="#F1EFF8", plum="#5B4F8A", blue="#3F6E9E", ink="#24213A", line="#D9D4EA")
CSS2 = f"""<style>
.p2{{background:{P2['lilac']};color:{P2['ink']};height:836px;position:relative}}
.p2 .bd{{padding:0 20px}}
.p2 .pg{{display:flex;gap:6px;margin-top:14px}} .p2 .pg i{{flex:1;height:6px;border-radius:3px;background:{P2['line']}}} .p2 .pg i.on{{background:{P2['plum']}}}
.p2 .sp{{font-size:15px;font-weight:600;color:{P2['plum']};margin-top:16px}}
.p2 h2{{font-size:24px;font-weight:700;line-height:30px;margin-top:4px;letter-spacing:-.3px}}
.p2 .mb{{height:56px;border-radius:16px;background:#fff;margin-top:10px;display:flex;align-items:center;gap:12px;padding:0 16px;font-size:17px;font-weight:500;border:1.5px solid {P2['line']}}}
.p2 .mb.sel{{background:{P2['plum']};color:#fff;border-color:{P2['plum']}}}
.p2 .chips{{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}}
.p2 .ch{{height:44px;padding:0 16px;border-radius:22px;background:#fff;border:1.5px solid {P2['line']};display:flex;align-items:center;font-size:16px;font-weight:500}}
.p2 .ch.sel{{background:{P2['plum']};color:#fff;border-color:{P2['plum']}}}
.p2 h3{{font-size:15px;font-weight:700;margin-top:16px}}
.p2 .note{{margin-top:14px;height:220px;border-radius:16px;background:#fff;border:1.5px solid {P2['line']};padding:14px;font-size:16px;color:#77738c}}
.p2 .nav{{position:absolute;left:20px;right:20px;bottom:26px;display:flex;gap:10px}}
.p2 .nx{{flex:1;height:52px;border-radius:26px;background:{P2['plum']};color:#fff;font-size:17px;font-weight:600;display:flex;align-items:center;justify-content:center}}
.p2 .sk{{flex:1;height:52px;border-radius:26px;background:#fff;color:{P2['plum']};font-size:17px;font-weight:600;display:flex;align-items:center;justify-content:center;border:1.5px solid {P2['line']}}}
.p2 .fab{{position:absolute;right:18px;bottom:96px;width:56px;height:56px;border-radius:28px;background:{P2['blue']};display:flex;align-items:center;justify-content:center;box-shadow:0 8px 18px -6px rgba(63,110,158,.7)}}
.p2 .card{{margin-top:14px;background:#fff;border-radius:20px;padding:16px;border:1.5px solid {P2['line']}}}
.p2 .pill{{display:inline-block;padding:4px 11px;border-radius:14px;border:1.5px solid {P2['blue']};color:{P2['blue']};font-size:15px;font-weight:600}}
.p2 .card b{{display:block;font-size:22px;margin-top:10px}} .p2 .card p{{font-size:15px;line-height:22px;margin-top:6px}}
.p2 .sup{{margin-top:12px;background:#E6E2F3;border-radius:16px;padding:12px 14px;font-size:15px;line-height:22px}}
</style>"""

def step2(n):
    pg = "".join(f'<i class="{"on" if i < n else ""}"></i>' for i in range(4))
    hd = f'{STATUS}<div class="bd"><div class="pg" data-a="pg{n}">{pg}</div><div class="sp">Step {n} of 4</div>'
    fab = f'<div class="fab" data-a="fab{n}">{icon("q", "#fff", 28, 2)}</div>'
    if n == 1:
        m = "".join(f'<div class="mb{" sel" if i == 1 else ""}" data-a="mb{i}">{face(i + 1, "#fff" if i == 1 else P2["ink"], "rgba(255,255,255,.2)" if i == 1 else "#E6E2F3")}{w}</div>' for i, (w, _) in enumerate(MOODS))
        body = f'<h2>How are you right now?</h2><div data-a="moods2">{m}</div>'
        nav = f'<div class="nav"><div class="nx" data-a="next1">Next</div></div>'
    elif n == 2:
        f_ = "".join(f'<span class="ch{" sel" if x == "anxious" else ""}">{x}</span>' for x in ["anxious", "overwhelmed", "frustrated", "low", "tired"])
        w_ = "".join(f'<span class="ch{" sel" if x == "test or exam" else ""}">{x}</span>' for x in ["test or exam", "IA or deadline", "in class", "friends or people", "home"])
        body = f'<h2>What\'s going on?</h2><h3>How I feel</h3><div class="chips" data-a="tags2">{f_}</div><h3>What\'s happening</h3><div class="chips">{w_}</div>'
        nav = f'<div class="nav"><div class="sk">Back</div><div class="nx" data-a="next2">Next</div></div>'
    elif n == 3:
        body = f'<h2>Want to add anything?</h2><div class="note" data-a="note2">Type here (optional)</div>'
        nav = f'<div class="nav"><div class="sk" data-a="skip">Skip</div><div class="nx">Next</div></div>'
    else:
        body = (f'<h2>Try this</h2><div class="card" data-a="card2"><span class="pill">Some evidence</span><b>Worry dump</b>'
                f'<p>1. Take a blank page.<br>2. Write your worries for 5 minutes.<br>3. Close it.</p><p style="opacity:.75">Ramirez &amp; Beilock (2011)</p></div>'
                f'<div class="sup" data-a="sup2">You don\'t have to handle it alone. The school counsellor is here for you.</div>')
        nav = f'<div class="nav"><div class="nx" data-a="again">Start again</div></div>'
    return f'<div class="scr p2" data-a="s{n}">{hd}{body}</div>{fab}{nav}</div>'

# ---------------------------------------------------------------- Design 3 (chat)
P3 = dict(white="#FFFFFF", mist="#EEF1F5", blue="#2D7FF9", ink="#111827")
CSS3 = f"""<style>
.p3{{background:#fff;color:{P3['ink']};height:836px;position:relative}}
.p3 .hd{{height:60px;display:flex;align-items:center;justify-content:space-between;padding:0 16px;border-bottom:1px solid {P3['mist']}}}
.p3 .av{{display:flex;align-items:center;gap:10px;font-weight:700;font-size:17px}}
.p3 .av i{{width:34px;height:34px;border-radius:17px;background:{P3['mist']};display:flex;align-items:center;justify-content:center;font-style:normal;font-size:18px}}
.p3 .av small{{display:block;font-weight:400;font-size:13px;color:#6B7280}}
.p3 .ph{{width:44px;height:44px;border-radius:22px;display:flex;align-items:center;justify-content:center}}
.p3 .bd{{padding:12px 14px;display:flex;flex-direction:column;gap:8px}}
.p3 .bot{{align-self:flex-start;max-width:78%;background:{P3['mist']};border-radius:18px 18px 18px 6px;padding:10px 13px;font-size:15px;line-height:21px}}
.p3 .me{{align-self:flex-end;max-width:70%;background:{P3['blue']};color:#fff;border-radius:18px 18px 6px 18px;padding:10px 13px;font-size:15px}}
.p3 .chips{{display:flex;gap:6px}} .p3 .ch{{height:36px;padding:0 12px;border-radius:18px;border:1.5px solid {P3['blue']};color:{P3['blue']};display:flex;align-items:center;font-size:14px;font-weight:600}}
.p3 .ev{{font-size:12px;color:#6B7280;margin:-4px 0 0 4px}}
.p3 .inp{{position:absolute;left:12px;right:12px;bottom:22px;height:46px;border-radius:23px;background:{P3['mist']};display:flex;align-items:center;justify-content:space-between;padding:0 6px 0 16px;font-size:15px;color:#6B7280}}
.p3 .sd{{width:36px;height:36px;border-radius:18px;background:{P3['blue']};display:flex;align-items:center;justify-content:center}}
</style>"""

def chat3(n):
    hd = (f'{STATUS}<div class="hd"><div class="av"><i>🌿</i><span>Pause chat<small>Scripted replies</small></span></div>'
          f'<div class="ph" data-a="phone{n}">{icon("phone", P3["blue"], 22, 2)}</div></div>')
    if n == 1:
        b = ('<div class="bot" data-a="prompt">Hi! How are you feeling right now?</div>'
             '<div class="chips" data-a="chips"><span class="ch">Awful</span><span class="ch">Low</span><span class="ch">Okay</span><span class="ch">Good</span></div>'
             '<div class="me" data-a="answer">Low</div><div class="bot">What\'s making it hard?</div>'
             '<div class="chips"><span class="ch">A test</span><span class="ch">Deadline</span><span class="ch">Class</span><span class="ch">People</span></div>'
             '<div class="me">A test</div><div class="bot">Want to tell me more? You can type, or tap Skip.</div>')
    else:
        b = ('<div class="me">Skip</div><div class="bot" data-a="sugg">Let\'s try slow breathing: breathe in for 4, out for 6, and repeat 5 times.</div>'
             '<div class="ev" data-a="ev">Some evidence · Fincham et al. (2023)</div>'
             '<div class="bot" data-a="sup3">You don\'t have to handle it alone. The school counsellor is here for you.</div>'
             '<div class="chips" data-a="again"><span class="ch">Try another</span><span class="ch">Done</span></div>')
    return f'<div class="scr p3" data-a="c{n}">{hd}<div class="bd">{b}</div><div class="inp" data-a="inp{n}">Type a message…<span class="sd">{icon("send", "#fff", 18, 2)}</span></div></div>'
