import React, { useState, useEffect, useMemo, useRef, useCallback, useContext, createContext } from "react";

/* ================= QUESTION BANK (bilingual) =================
   P(ar,en) = bilingual text. A plain string is shown as-is in every language mode
   (used for Qur'an / Hadith wording that must be memorised in Arabic).
   l: 1,2,3 = lesson; 0 = command-term practice. */
const P = (ar, en) => ({ ar, en });
const H = {
  c1: "عَنْ أَبِي هُرَيْرَةَ رَضِيَ اللهُ عَنْهُ أَنَّ رَسُولَ اللهِ ﷺ قَالَ:",
  c2: "«إِنَّ مَثَلِي وَمَثَلَ الأَنْبِيَاءِ مِنْ قَبْلِي كَمَثَلِ رَجُلٍ بَنَى بَيْتًا",
  c3: "فَأَحْسَنَهُ وَأَجْمَلَهُ إِلَّا مَوْضِعَ لَبِنَةٍ مِنْ زَاوِيَةٍ،",
  c4: "فَجَعَلَ النَّاسُ يَطُوفُونَ بِهِ وَيَعْجَبُونَ لَهُ وَيَقُولُونَ: هَلَّا وُضِعَتْ هَذِهِ اللَّبِنَةُ؟",
  c5: "قَالَ: فَأَنَا اللَّبِنَةُ وَأَنَا خَاتَمُ النَّبِيِّينَ».",
};
const QS = [
/* ---------- LESSON 1 : خاتم النبيين ---------- */
{id:"L1-01",l:1,t:"mcq",q:P("تتفق الرسالات السماوية في:","The heavenly messages agree in:"),
 o:[P("توحيد الله ومكارم الأخلاق","Tawhid (Oneness of Allah) and noble morals"),P("الشريعة والمنهاج","The Shari‘ah and the method"),P("مواقيت العبادات فقط","Prayer times only"),P("أحكام التجارة","Trade rulings")],a:0,
 w:P("الأصل واحد: الله ربّ الجميع، وأخلاق الفطرة ثابتة.","The root is one: one Lord, and the moral nature is constant.")},
{id:"L1-02",l:1,t:"mcq",q:P("تختلف الرسالات السماوية في:","The heavenly messages differ in:"),
 o:[P("التوحيد","Tawhid"),P("الشريعة والمنهاج","The Shari‘ah and the method (manhaj)"),P("مكارم الأخلاق","Noble morals"),P("المصدر","The source")],a:1,
 w:P("﴿لِكُلٍّ جَعَلْنَا مِنكُمْ شِرْعَةً وَمِنْهَاجًا﴾: الأحكام تناسب كل مرحلة.","“For each We made a law and a way”: rulings suit each stage.")},
{id:"L1-03",l:1,t:"fill",q:P("أكمل: تتفق الرسالات في توحيد … ومكارم الأخلاق.","Complete: the messages agree in the Oneness of … and noble morals."),
 ans:["الله","allah","god"],bank:[P("الله","Allah"),P("الناس","People"),P("الأنبياء","Prophets")],
 w:P("توحيد الله هو الهدف المشترك لكل الرسل.","The Oneness of Allah is the shared goal of every messenger.")},
{id:"L1-04",l:1,t:"multi",q:P("الإيمان بالرسل عليهم السلام يقتضي (اختر ٣):","Belief in the messengers requires (choose 3):"),
 o:[P("الإيمان بهم جميعًا","Believing in all of them"),P("دراسة سيرتهم والاقتداء بهم","Studying their lives and following them"),P("الدفاع عنهم ورد ما ينسب إليهم من الباطل","Defending them and refuting falsehood about them"),P("الإيمان ببعضهم دون بعض","Believing in some and not others"),P("التفريق بينهم","Making distinctions among them")],a:[0,1,2],
 w:P("﴿لَا نُفَرِّقُ بَيْنَ أَحَدٍ مِّن رُّسُلِهِ﴾.","“We make no distinction between any of His messengers.”")},
{id:"L1-05",l:1,t:"tf",q:P("راوي حديث «مثلي ومثل الأنبياء من قبلي» هو أبو هريرة رضي الله عنه.","The narrator of the Hadith “My likeness and that of the prophets before me” is Abu Hurayrah (may Allah be pleased with him)."),a:true,tag:"hadith",
 w:P("رواه البخاري عن أبي هريرة.","Reported by al-Bukhari from Abu Hurayrah.")},
{id:"L1-06",l:1,t:"tf",q:P("اللبنة في الحديث ترمز إلى نبي الله موسى عليه السلام.","The brick in the Hadith stands for the Prophet Musa (Moses), peace be upon him."),a:false,tag:"hadith",
 w:P("اللبنة هي النبي محمد ﷺ: «فأنا اللبنة وأنا خاتم النبيين».","The brick is the Prophet Muhammad ﷺ: “So I am the brick and the Seal of the Prophets.”")},
{id:"L1-07",l:1,t:"mcq",q:P("ماذا يمثل «البيت» في الحديث؟","What does the “house” stand for in the Hadith?"),
 o:[P("بناء الدين برسالات الأنبياء","The building of the religion through the prophets’ messages"),P("بيت أبي هريرة","Abu Hurayrah’s home"),P("الكعبة فقط","The Ka‘bah only"),P("مدينة بعينها","A particular city")],a:0,tag:"hadith",
 w:P("كل نبي أسهم بلبنة في بناء الإسلام.","Each prophet contributed a brick to the building of Islam.")},
{id:"L1-08",l:1,t:"order",q:P("رتّب أجزاء الحديث الشريف:","Put the parts of the Hadith in order:"),tag:"hadith",
 items:[H.c1,H.c2,H.c3,H.c4,H.c5],
 w:P("الراوي ← التشبيه ← البيت الحسن ← الناس ← الخاتمة.","Narrator → comparison → the fine house → the people → the ending.")},
{id:"L1-09",l:1,t:"fill",q:P("أكمل الحديث: «فَأَنَا … وَأَنَا خَاتَمُ النَّبِيِّينَ»","Complete: “So I am the … and I am the Seal of the Prophets.”"),tag:"hadith",
 ans:["اللبنة","اللبنه","lubnah","labinah","brick","the brick"],bank:["اللَّبِنَةُ","الْبَيْتُ","الرَّجُلُ"],
 w:P("جملة الحديث المركزية.","The central line of the Hadith.")},
{id:"L1-10",l:1,t:"fill",q:P("أكمل الحديث: «كَمَثَلِ رَجُلٍ بَنَى …»","Complete: “…like a man who built a …”"),tag:"hadith",
 ans:["بيتا","بيتًا","house","a house"],bank:["بَيْتًا","قَصْرًا","مَسْجِدًا"],
 w:P("النص: «بَنَى بَيْتًا فَأَحْسَنَهُ وَأَجْمَلَهُ».","The text: “built a house, made it excellent and beautiful.”")},
{id:"L1-11",l:1,t:"fill",q:P("أكمل الحديث: «إِلَّا مَوْضِعَ … مِنْ زَاوِيَةٍ»","Complete: “…except the place of one … in a corner.”"),tag:"hadith",
 ans:["لبنة","لبنه","brick","a brick","one brick"],bank:["لَبِنَةٍ","حَجَرٍ","بَابٍ"],
 w:P("موضع لبنة من زاوية.","The place of a brick from a corner.")},
{id:"L1-12",l:1,t:"mcq",q:P("معنى «يَطُوفُونَ بِهِ» في الحديث:","The meaning of “yatufuna bihi” in the Hadith:"),tag:"hadith",
 o:[P("يدورون حوله وينظرون إليه","They walk around it looking at it"),P("يهدمونه","They tear it down"),P("يبيعونه","They sell it"),P("يسكنونه","They live in it")],a:0,
 w:P("الطواف: الدوران حول الشيء.","Tawaf: moving around a thing.")},
{id:"L1-13",l:1,t:"mcq",q:P("أين ورد هذا الحديث؟","Where is this Hadith recorded?"),tag:"hadith",
 o:[P("البخاري، كتاب المناقب، باب خاتم النبيين، رقم ٣٣٤٢","Al-Bukhari, Book of Virtues, ‘Seal of the Prophets’, no. 3342"),P("مسلم، كتاب الحج","Muslim, Book of Hajj"),P("الموطأ، كتاب الطلاق","Al-Muwatta’, Book of Divorce"),P("سنن أبي داود، كتاب الصلاة","Abu Dawud, Book of Prayer")],a:0,
 w:P("كما في كتاب الطالب.","As given in the textbook.")},
{id:"L1-14",l:1,t:"match",q:P("طابق الأمر المشترك بين دعوة الرسل بتفصيله:","Match each shared element of the messengers’ call with its detail:"),
 pairs:[[P("المصدر","Source"),P("كلها من عند الله","All from Allah")],[P("الهدف والغاية","Goal"),P("عبادة الله وحده لا شريك له","Worship of Allah alone")],[P("القيم والأخلاق","Values"),P("مكارم الأخلاق","Noble morals")]],
 w:P("ثلاثة أشياء: المصدر، والهدف، والقيم.","Three things: source, goal, values.")},
{id:"L1-15",l:1,t:"mcq",q:P("أي آية تدل على أن كل الرسل دعوا إلى عبادة الله؟","Which verse shows all messengers called to worship Allah?"),
 o:[P("النحل ٣٦","An-Nahl 36"),P("الأحزاب ٤٠","Al-Ahzab 40"),P("المائدة ٣","Al-Ma’idah 3"),P("الحجر ٩","Al-Hijr 9")],a:0,
 w:P("﴿وَلَقَدْ بَعَثْنَا فِي كُلِّ أُمَّةٍ رَّسُولًا أَنِ ٱعْبُدُوا۟ ٱللَّهَ﴾.","“We sent into every nation a messenger: worship Allah.”")},
{id:"L1-16",l:1,t:"mcq",q:P("ما الحكمة من تعدد الرسالات السماوية؟","What is the wisdom of multiple heavenly messages?"),
 o:[P("جاءت في مراحل نمو البشرية بما يناسب كل مرحلة، متكاملة متوافقة","They came in stages of humanity’s growth to suit each stage, complementary and harmonious"),P("لأن كل رسالة ألغت ما قبلها","Because each cancelled the one before"),P("لأن الله لم يعلم حاجات الناس","Because Allah did not know people’s needs"),P("للتنافس بين الأمم","For competition between nations")],a:0,
 w:P("التعدد دليل أخوة الإيمان بالله التي تجمع البشرية.","The plurality shows the brotherhood of faith in Allah that unites humanity.")},
{id:"L1-17",l:1,t:"multi",q:P("من مميزات رسالة محمد ﷺ (اختر ٣):","Features of Muhammad’s ﷺ message (choose 3):"),
 o:[P("عامة لجميع البشر","Universal for all people"),P("خالدة لا رسالة بعدها","Eternal; no message after it"),P("شريعتها صالحة لكل زمان ومكان","Its law suits every time and place"),P("خاصة بالعرب","For the Arabs only")],a:[0,1,2],
 w:P("هي الرسالة الخاتمة.","It is the final message.")},
{id:"L1-18",l:1,t:"tf",q:P("رسالة محمد ﷺ خاصة بالعرب وحدهم.","Muhammad’s ﷺ message is for the Arabs only."),a:false,
 w:P("هي عامة لجميع البشر.","It is universal for all people.")},
{id:"L1-19",l:1,t:"mcq",q:P("ماذا تثبت الآية ﴿وَخَاتَمَ ٱلنَّبِيِّـۧنَ﴾ (الأحزاب ٤٠)؟","What does “…and the Seal of the Prophets” (33:40) establish?"),
 o:[P("لا نبي بعد محمد ﷺ","No prophet after Muhammad ﷺ"),P("أن الأنبياء كثيرون","That prophets are many"),P("أن الإسلام جديد","That Islam is new"),P("أن لكل أمة نبيًا اليوم","That every nation has a prophet today")],a:0,
 w:P("الخاتم: من يُختم به.","Seal = the one with whom it is ended.")},
{id:"L1-20",l:1,t:"mcq",q:P("﴿ٱلْيَوْمَ أَكْمَلْتُ لَكُمْ دِينَكُمْ﴾ (المائدة ٣) تدل على:","“Today I have perfected for you your religion” (5:3) indicates:"),
 o:[P("اكتمال الدين برسالة محمد ﷺ","The religion was completed by Muhammad’s ﷺ message"),P("نقص الدين","The religion is lacking"),P("نسخ التوحيد","Tawhid was abrogated"),P("انتظار نبي آخر","Waiting for another prophet")],a:0,
 w:P("تدعم معنى الحديث: اكتمال البناء.","It supports the Hadith’s meaning: the building is complete.")},
{id:"L1-21",l:1,t:"cat",q:P("صنّف: هل تتفق فيه الرسالات أم تختلف؟","Sort: do the messages agree or differ in this?"),
 cats:[P("تتفق","Agree"),P("تختلف","Differ")],
 items:[{p:P("توحيد الله","Tawhid"),c:0},{p:P("مكارم الأخلاق","Noble morals"),c:0},{p:P("الشريعة","The Shari‘ah"),c:1},{p:P("المنهاج","The manhaj"),c:1}],
 w:P("تتفق في الأصول وتختلف في الفروع.","Agree in the roots, differ in the branches.")},
{id:"L1-22",l:1,t:"short",q:P("وضِّح ما يدل عليه الحديث النبوي الشريف.","Explain what the noble Hadith indicates."),
 ans:P("يدل الحديث على تشبيه رسالات الأنبياء السابقين ببناء يتكامل بكل رسالة، ثم جاءت الرسالة الخاتمة رسالة نبينا محمد ﷺ لتكمل هذا البناء وتكمل الدين إلى يوم القيامة.","The Hadith likens earlier prophets’ messages to a building that grows complete with each message; then the final message, our Prophet Muhammad’s ﷺ, came to complete it and complete the religion until the Day of Judgement.")},
{id:"L1-23",l:1,t:"short",q:P("كيف ترد على من يزعم أن الإسلام مناف للشرائع السابقة؟ (إجابة مقترحة)","How do you answer someone who says Islam contradicts earlier laws? (suggested answer)"),
 ans:P("الإسلام مصدّق لما قبله (آل عمران ٥٠)، والرسالات تتفق في التوحيد ومكارم الأخلاق، والإيمان بجميع الرسل جزء من عقيدتنا، والاختلاف في بعض الأحكام لا يعني التناقض. وحقيقة الدين الاستسلام لله في كل الرسالات.","Islam confirms what came before (3:50); the messages agree in Tawhid and noble morals; belief in all messengers is part of our creed; differences in some rulings are not contradiction; and the essence of religion is submission to Allah in every message.")},
{id:"L1-24",l:1,t:"mcq",q:P("لماذا قال الناس: «هلّا وُضعت هذه اللبنة؟»","Why did the people say, “If only this brick were put in place”?"),tag:"hadith",
 o:[P("رأوا جمال البناء وشعروا بنقص موضع واحد","They saw the building’s beauty yet felt one place was missing"),P("لأنهم كرهوا البيت","Because they disliked the house"),P("لأنهم أرادوا هدمه","Because they wanted it demolished"),P("لأن البيت كان صغيرًا جدًا","Because the house was too small")],a:0,
 w:P("الإعجاب مع الشعور بالحاجة إلى مكمّل.","Admiration mixed with the sense of a need for a completer.")},
{id:"L1-25",l:1,t:"tf",q:P("تصديق كل نبي بمن سبقه يقتضي الابتعاد عن النزاع بين أتباع الأنبياء.","Each prophet confirming those before him requires staying away from dispute."),a:true,
 w:P("الإخلال بذلك إخلال بالميثاق الذي أخذه الله على النبيين.","Breaking this breaks the covenant Allah took from the prophets.")},
{id:"L1-26",l:1,t:"mcq",q:P("ما الذي جمعه النبي ﷺ في أسلوب «المثل» بحسب الكتاب؟","According to the textbook, what does the Prophet’s ﷺ parable style combine?"),
 o:[P("إيجاز اللفظ وإصابة المعنى وحسن التشبيه","Brevity of words, accuracy of meaning, beauty of comparison"),P("الطول والتفصيل","Length and detail"),P("الغموض","Obscurity"),P("الشعر والقافية","Poetry and rhyme")],a:0,
 w:P("إضاءة تربوية في الدرس.","The lesson’s “Educational Light” box.")},
{id:"L1-27",l:1,t:"diagram",q:P("المس الجزء الذي يمثل رسالة محمد ﷺ الخاتمة:","Tap the part that stands for Muhammad’s ﷺ final message:"),target:"gap",
 w:P("موضع اللبنة الناقصة = الرسالة الخاتمة.","The missing brick’s place = the final message.")},
{id:"L1-28",l:1,t:"diagram",q:P("المس الجزء الذي يمثل رسالات الأنبياء السابقين:","Tap the part that stands for the earlier prophets’ messages:"),target:"wall",
 w:P("البيت الحسن الجميل = الرسالات السابقة.","The fine, beautiful house = the earlier messages.")},
{id:"L1-29",l:1,t:"tf",q:P("الرسالات السماوية متناقضة في أصل العقيدة.","The heavenly messages contradict one another in the root of belief."),a:false,
 w:P("تتفق في التوحيد.","They agree in Tawhid.")},

/* ---------- LESSON 2 : قيم رسخها الأنبياء ---------- */
{id:"L2-01",l:2,t:"mcq",q:P("ما أثر الإيمان بالله تعالى على سلوك الإنسان؟","What is the effect of faith in Allah on a person’s behaviour?"),
 o:[P("يستشعر أن الله يراه في كل أحواله فيدفعه لفعل الخير وطاعة الله","He feels Allah sees him always, driving him to good and obedience"),P("لا أثر له","It has no effect"),P("يجعله يتكبر","It makes him arrogant"),P("يمنعه من العمل","It stops him working")],a:0,
 w:P("المراقبة في السر والعلن تقوّم السلوك.","Awareness of Allah in private and public straightens conduct.")},
{id:"L2-02",l:2,t:"multi",q:P("من مظاهر طاعة يوسف ﷺ لله (اختر ٤ صحيحة):","Signs of Yusuf’s ﷺ obedience to Allah (choose the 4 correct):"),
 o:[P("طاعة الوالدين","Obeying his parents"),P("الخوف من الله وترك الفاحشة","Fear of Allah and leaving immorality"),P("الصبر والرضا","Patience and contentment"),P("الانتقام من إخوته","Taking revenge on his brothers"),P("العفو عن المسيء","Forgiving the wrongdoer"),P("الكبر على الناس","Arrogance towards people")],a:[0,1,2,4],
 w:P("ملزمتك تعدّ ستة؛ هنا أربعة منها.","Your notes list six; four of them appear here.")},
{id:"L2-03",l:2,t:"match",q:P("طابق مظهر الطاعة بدليله من سورة يوسف:","Match each sign of obedience with its proof in Surah Yusuf:"),
 pairs:[[P("طاعة الوالدين","Obeying parents"),P("يوسف ٥","12:5")],[P("ترك الفاحشة","Leaving immorality"),P("يوسف ٢٣","12:23")],[P("الصبر","Patience"),P("يوسف ٩٠","12:90")],[P("العفو","Forgiveness"),P("يوسف ٩٢","12:92")]],
 w:P("احفظ المظهر مع رقم الآية.","Learn the sign with its verse number.")},
{id:"L2-04",l:2,t:"mcq",q:P("﴿لَا تَثْرِيبَ عَلَيْكُمُ ٱلْيَوْمَ يَغْفِرُ ٱللَّهُ لَكُمْ﴾ تدل على:","“No blame upon you today; may Allah forgive you” shows:"),
 o:[P("العفو عن المسيء","Forgiving the wrongdoer"),P("الصبر على السجن","Patience in prison"),P("طاعة الوالدين","Obeying parents"),P("المبادرة إلى الخير","Initiative towards good")],a:0,
 w:P("عفا عن إخوته ودعا لهم.","He forgave his brothers and prayed for them.")},
{id:"L2-05",l:2,t:"mcq",q:P("﴿ٱجْعَلْنِى عَلَىٰ خَزَآئِنِ ٱلْأَرْضِ إِنِّى حَفِيظٌ عَلِيمٌ﴾ تدل على:","“Appoint me over the storehouses of the land; I am a knowing guardian” shows:"),
 o:[P("المبادرة إلى الخير","Initiative towards good"),P("الخوف من الفاحشة","Fear of immorality"),P("العفو","Forgiveness"),P("الصبر على البئر","Patience in the well")],a:0,
 w:P("عرض كفاءته لخدمة الوطن.","He offered his competence to serve the land.")},
{id:"L2-06",l:2,t:"fill",q:P("يوسف بن يعقوب بن … بن إبراهيم عليهم السلام.","Yusuf son of Ya‘qub son of … son of Ibrahim."),
 ans:["اسحاق","إسحاق","ishaq","isaac"],bank:[P("إسحاق","Ishaq"),P("إسماعيل","Isma‘il"),P("نوح","Nuh")],
 w:P("ذُكر في الآية: ﴿أَبَوَيْكَ مِن قَبْلُ إِبْرَٰهِيمَ وَإِسْحَـٰقَ﴾.","The verse says: “your fathers before, Ibrahim and Ishaq.”")},
{id:"L2-07",l:2,t:"mcq",q:P("كم موقفًا لحفظ الله ليوسف تذكر ملزمتك؟","How many situations of Allah’s protection of Yusuf does your teacher’s list give?"),
 o:[P("٢","2"),P("٣","3"),P("٤","4"),P("٦","6")],a:2,
 w:P("كيد الإخوة، الخطيئة، البراءة، المكانة.","Brothers’ plot, sin, innocence, standing.")},
{id:"L2-08",l:2,t:"multi",q:P("من مواقف حفظ الله ليوسف (اختر ٤):","Situations of Allah’s protection of Yusuf (choose 4):"),
 o:[P("نجاه من كيد إخوته","Saved from his brothers’ plot"),P("حفظه من الخطيئة","Kept him from sin"),P("أظهر براءته","Showed his innocence"),P("جعله صاحب مكانة في مصر","Gave him standing in Egypt"),P("جعله يهرب من السجن","Made him escape prison"),P("أعطاه الملك دون عمل","Gave him kingship without effort")],a:[0,1,2,3],
 w:P("هذه الأربعة في ملزمتك.","These four are in your notes.")},
{id:"L2-09",l:2,t:"tf",q:P("نجّى الله يوسف من البئر فالتقطه بعض السيارة.","Allah saved Yusuf from the well and some travellers picked him up."),a:true,
 w:P("يوسف ١٠.","12:10.")},
{id:"L2-10",l:2,t:"tf",q:P("ظهرت براءة يوسف عندما اعترفت النسوة وامرأة العزيز.","Yusuf’s innocence appeared when the women and the Aziz’s wife confessed."),a:true,
 w:P("﴿ٱلْـَٔـٰنَ حَصْحَصَ ٱلْحَقُّ﴾ (يوسف ٥١).","“Now the truth has become clear” (12:51).")},
{id:"L2-11",l:2,t:"mcq",q:P("ماذا قال يوسف حين راودته امرأة العزيز؟","What did Yusuf say when the Aziz’s wife tempted him?"),
 o:[P("﴿مَعَاذَ ٱللَّهِ﴾","“Allah forbid!”"),P("سأفكر في الأمر","I will think about it"),P("اتركوني","Leave me"),P("لا شيء","Nothing")],a:0,
 w:P("يوسف ٢٣.","12:23.")},
{id:"L2-12",l:2,t:"mcq",q:P("﴿فَصَبْرٌ جَمِيلٌ﴾ (يوسف ١٨) تعبّر عن:","“So beautiful patience” (12:18) expresses:"),
 o:[P("الصبر","Patience"),P("التوكل","Reliance on Allah"),P("الأمل","Hope"),P("العفو","Forgiveness")],a:0,
 w:P("قالها يعقوب ﷺ.","Ya‘qub ﷺ said it.")},
{id:"L2-13",l:2,t:"match",q:P("طابق آيات يعقوب ﷺ بالقيم (استنتاج من الكتاب):","Match Ya‘qub’s ﷺ verses with values (deduced from the textbook):"),
 pairs:[[P("﴿فَٱللَّهُ خَيْرٌ حَـٰفِظًا﴾","“Allah is the best guardian”"),P("الثقة بحفظ الله","Trust in Allah’s protection")],[P("﴿عَلَيْهِ تَوَكَّلْتُ﴾","“In Him I trust”"),P("التوكل","Reliance on Allah")],[P("﴿وَلَا تَا۟يْـَٔسُوا۟ مِن رَّوْحِ ٱللَّهِ﴾","“Do not despair of Allah’s mercy”"),P("الأمل","Hope")]],
 w:P("نشاط الكتاب؛ الأجوبة ليست من ملزمة المعلم.","Textbook activity; answers are not from your teacher’s notes.")},
{id:"L2-14",l:2,t:"cat",q:P("صنّف: مظهر طاعة من يوسف أم حفظ من الله؟","Sort: a sign of Yusuf’s obedience, or Allah’s protection of him?"),
 cats:[P("طاعة يوسف","Yusuf’s obedience"),P("حفظ الله له","Allah’s protection")],
 items:[{p:P("عفا عن إخوته","He forgave his brothers"),c:0},{p:P("نجاه من البئر","Saved from the well"),c:1},{p:P("صبر في السجن","Patient in prison"),c:0},{p:P("ظهرت براءته","His innocence appeared"),c:1},{p:P("عرض إدارة الخزائن","He offered to run the storehouses"),c:0},{p:P("مكانة في مصر","Standing in Egypt"),c:1}],
 w:P("الطاعة فعل العبد، والحفظ فعل الله.","Obedience is the servant’s act; protection is Allah’s act.")},
{id:"L2-15",l:2,t:"short",q:P("اذكر بعض مظاهر طاعة الله من قصة يوسف ﷺ (٦).","List signs of obedience to Allah from Yusuf’s story (6)."),
 ans:P("١ـ الالتزام بطاعة الوالدين ٢ـ الخوف من الله وترك الفاحشة ٣ـ الصبر والرضا ٤ـ المبادرة إلى الخير ٥ـ استغلال الفرص للدعوة إلى الله ٦ـ العفو عن المسيء","1) Obeying parents 2) Fear of Allah and leaving immorality 3) Patience and contentment 4) Initiative towards good 5) Using opportunities to call to Allah 6) Forgiving the wrongdoer")},
{id:"L2-16",l:2,t:"short",q:P("يظهر حفظ الله ليوسف في مواقف عديدة، اذكرها (٤).","Allah’s protection of Yusuf appears in many situations. List them (4)."),
 ans:P("١ـ نجاه من كيد إخوته ٢ـ حفظه من الخطيئة ٣ـ أظهر براءته من التهمة ٤ـ جعله صاحب مكانة وشرف في مصر","1) Saved him from his brothers’ plot 2) Kept him from sin 3) Showed his innocence 4) Made him a man of standing and honour in Egypt")},
{id:"L2-17",l:2,t:"short",q:P("ما الدليل على المبادرة إلى الخير في قصة يوسف ﷺ؟","What shows taking the initiative towards good in Yusuf’s story?"),
 ans:P("عندما عُرض على الملك أن يكون مسؤولًا عن شؤون المال والزراعة في البلاد لما يعلم من حسن تدبيره لها.","He was made responsible for the country’s finance and agriculture, because he knew his own good management of them.")},
{id:"L2-18",l:2,t:"tf",q:P("جعل الله حياة الأنبياء والرسل أنموذجًا عمليًا للمسلمين.","Allah made the prophets’ lives a practical model for Muslims."),a:true,
 w:P("للاقتداء بهم في الأخلاق والعبادة.","To follow them in morals and worship.")},
{id:"L2-19",l:2,t:"mcq",q:P("«يتمثل الأنبياء ببعض القيم المعبّرة عن كمالات الإنسانية»: التصويب هو:","“The prophets embody some values expressing human perfection.” The correction is:"),
 o:[P("«ببعض» ← «بأسمى القيم/بجميعها»","“some” → “the highest / all values”"),P("«الأنبياء» ← «التجار»","“prophets” → “merchants”"),P("لا خطأ فيها","There is no error"),P("«الإنسانية» ← «الحيوانية»","“human” → “animal”")],a:0,
 w:P("نشاط الكتاب؛ الجواب استنتاج.","Textbook activity; the answer is deduced.")},
{id:"L2-20",l:2,t:"mcq",q:P("حديث «عجبًا لأمر المؤمن…» (مسلم) يعلّم:","The Hadith “How wonderful is the believer’s affair…” (Muslim) teaches:"),
 o:[P("الشكر في السراء والصبر في الضراء","Gratitude in ease and patience in hardship"),P("الشكوى في الضراء","Complaining in hardship"),P("ترك العمل","Leaving work"),P("الفرح بما أصاب الناس","Rejoicing in others’ misfortune")],a:0,
 w:P("كلاهما خير للمؤمن.","Both are good for the believer.")},
{id:"L2-21",l:2,t:"mcq",q:P("أين استغل يوسف ﷺ الفرصة للدعوة إلى الله؟","Where did Yusuf ﷺ use the opportunity to call to Allah?"),
 o:[P("في السجن (يوسف ٣٩)","In prison (12:39)"),P("في البئر","In the well"),P("في بيت أبيه","In his father’s house"),P("في الطريق إلى مصر","On the road to Egypt")],a:0,
 w:P("﴿يَـٰصَـٰحِبَىِ ٱلسِّجْنِ…﴾.","“O my two companions of prison…”")},
{id:"L2-22",l:2,t:"fill",q:P("أكمل: ﴿إِنَّهُۥ مِنْ عِبَادِنَا ٱل…﴾","Complete: “Indeed he was of Our …(sincere) servants”"),
 ans:["المخلصين","المخلصين","mukhlasin","sincere"],bank:["الْمُخْلَصِينَ","الْمُتَّقِينَ","الْغَافِلِينَ"],
 w:P("يوسف ٢٤.","12:24.")},
{id:"L2-23",l:2,t:"mcq",q:P("ربط الكتاب «كلكم راعٍ وكلكم مسؤول عن رعيته» بـ:","The textbook links “Each of you is a shepherd…” to:"),
 o:[P("تولي يوسف خزائن الأرض مسؤولية","Yusuf’s taking charge of the storehouses as a responsibility"),P("خروجه من البئر","His coming out of the well"),P("رؤياه","His dream"),P("صبر يعقوب","Ya‘qub’s patience")],a:0,
 w:P("البخاري ٨٩٣.","Bukhari 893.")},
{id:"L2-24",l:2,t:"tf",q:P("عفا يوسف ﷺ عن إخوته بعد أن عاقبهم.","Yusuf ﷺ forgave his brothers after punishing them."),a:false,
 w:P("عفا عنهم ودعا لهم بالمغفرة ولم يعاقبهم.","He forgave them and prayed for them; he did not punish them.")},
{id:"L2-25",l:2,t:"mcq",q:P("من التي راودت يوسف ﷺ عن نفسه؟","Who tempted Yusuf ﷺ?"),
 o:[P("امرأة العزيز","The Aziz’s wife"),P("إخوته","His brothers"),P("الملك","The king"),P("السيارة","The travellers")],a:0,
 w:P("يوسف ٢٣.","12:23.")},

/* ---------- LESSON 3 : الرسالة الخاتمة ---------- */
{id:"L3-01",l:3,t:"mcq",q:P("علاقة القرآن بالكتب السماوية السابقة:","The Qur’an’s relation to earlier heavenly books:"),
 o:[P("مصدّق لها ومهيمن عليها","Confirming and dominant over them"),P("ناسخ لأصل التوحيد","Cancelling the root of Tawhid"),P("لا علاقة","No relation"),P("نقل عنها","Copied from them")],a:0,
 w:P("﴿مُصَدِّقًا … وَمُهَيْمِنًا عَلَيْهِ﴾.","“…confirming… and a guardian over it.”")},
{id:"L3-02",l:3,t:"mcq",q:P("معنى «مُهَيْمِنًا»:","The meaning of “muhayminan”:"),
 o:[P("حافظًا وشاهدًا وحاكمًا","Guardian, witness and judge"),P("ناقدًا لها","Criticising them"),P("بعيدًا عنها","Far from them"),P("ناسيًا لها","Forgetting them")],a:0,
 w:P("«ناقدًا لها» ليس من معاني الكلمة في الكتاب: حافظ لها، شاهد عليها.","“Critic” is not among the textbook’s meanings: a guardian of them, a witness over them.")},
{id:"L3-03",l:3,t:"mcq",q:P("معنى «شِرْعَةً»:","The meaning of “shir‘ah”:"),
 o:[P("شريعة وأحكام","A law and rulings"),P("طريق فقط","A road only"),P("بيت","A house"),P("نهر","A river")],a:0,
 w:P("ما شرعه الله لعباده من الدين.","What Allah legislated for His servants of the religion.")},
{id:"L3-04",l:3,t:"mcq",q:P("معنى «مِنْهَاجًا»:","The meaning of “minhaj”:"),
 o:[P("طريق واضح مستمر","A clear continuous way"),P("حكم","A ruling"),P("كتاب","A book"),P("أمة","A nation")],a:0,
 w:P("يسير عليه الناس في الدين.","People walk it in their religion.")},
{id:"L3-05",l:3,t:"mcq",q:P("معنى «يَفْتِنُوكَ»:","The meaning of “yaftinuka”:"),
 o:[P("يصرفوك عن الحق","Divert you from the truth"),P("يكرموك","Honour you"),P("يتبعوك","Follow you"),P("يعلموك","Teach you")],a:0,
 w:P("أو يميلوا بك من الحق إلى الباطل.","Or turn you from truth to falsehood.")},
{id:"L3-06",l:3,t:"mcq",q:P("معنى «يَبْغُونَ»:","The meaning of “yabghun”:"),
 o:[P("يطلبون","They seek"),P("يهربون","They flee"),P("ينسون","They forget"),P("يبنون","They build")],a:0,
 w:P("كما في الكتاب.","As in the textbook.")},
{id:"L3-07",l:3,t:"multi",q:P("من معاني الآيات (٤٨–٥٠) (اختر ٣):","Meanings of verses 48–50 (choose 3):"),
 o:[P("القرآن يجب الإيمان به واتباعه وهو مهيمن على الكتب السابقة","The Qur’an must be believed and followed; it is dominant over earlier books"),P("الشرائع في الكتب المنزلة متعددة","The laws in the revealed books are many"),P("التحذير من الفتنة بمخالفة القرآن واتباع الهوى","Warning against temptation by opposing the Qur’an and following desire"),P("الشرائع كلها واحدة","All laws are identical"),P("القرآن مثل غيره دون تميز","The Qur’an is like the rest, no distinction")],a:[0,1,2],
 w:P("هذه الثلاثة في ملزمتك.","These three are in your notes.")},
{id:"L3-08",l:3,t:"multi",q:P("بماذا تميز القرآن عن الكتب قبله؟ (اختر ٢):","How did the Qur’an stand out from earlier books? (choose 2):"),
 o:[P("هو أعظم الكتب وأشملها وأحكمها","The greatest, most complete and most judicious"),P("باقٍ ومعتمد لا يغيَّر إلى يوم القيامة","Preserved and authoritative, unchanged until Judgement Day"),P("سيُستبدل بكتاب بعده","It will be replaced by a later book"),P("خاص بقوم دون قوم","For one people only")],a:[0,1],
 w:P("ميزتان في ملزمتك.","Two features in your notes.")},
{id:"L3-09",l:3,t:"tf",q:P("سيُغيَّر القرآن الكريم قبل يوم القيامة.","The Qur’an will be altered before the Day of Judgement."),a:false,
 w:P("﴿إِنَّا نَحْنُ نَزَّلْنَا ٱلذِّكْرَ وَإِنَّا لَهُۥ لَحَـٰفِظُونَ﴾.","“We sent down the Reminder and We will guard it.”")},
{id:"L3-10",l:3,t:"mcq",q:P("أي آية تدل على حفظ الله للقرآن؟","Which verse shows Allah’s preservation of the Qur’an?"),
 o:[P("الحجر ٩","Al-Hijr 9"),P("الأحزاب ٤٠","Al-Ahzab 40"),P("النحل ٣٦","An-Nahl 36"),P("يوسف ٥","Yusuf 5")],a:0,
 w:P("نشاط الكتاب.","Textbook activity.")},
{id:"L3-11",l:3,t:"mcq",q:P("لماذا لم يجعل الله الناس أمة واحدة بحسب الآية؟","According to the verse, why did Allah not make people one nation?"),
 o:[P("ليبلوكم فيما آتاكم","To test you in what He gave you"),P("لأنه عجز","Because He was unable"),P("لأن الناس كرهوا ذلك","Because people disliked it"),P("لا سبب","No reason")],a:0,
 w:P("﴿وَلَـٰكِن لِّيَبْلُوَكُمْ فِى مَآ ءَاتَىٰكُمْ﴾.","“…but He tests you in what He has given you.”")},
{id:"L3-12",l:3,t:"mcq",q:P("إلى من مرجع الناس جميعًا بحسب الآية؟","To whom is everyone’s return, according to the verse?"),
 o:[P("إلى الله","To Allah"),P("إلى الملوك","To kings"),P("إلى العلماء","To scholars"),P("إلى الآباء","To the fathers")],a:0,
 w:P("﴿إِلَى ٱللَّهِ مَرْجِعُكُمْ جَمِيعًا﴾.","“To Allah is your return all together.”")},
{id:"L3-13",l:3,t:"mcq",q:P("﴿فَٱسْتَبِقُوا۟ ٱلْخَيْرَٰتِ﴾ أمر بـ:","“So race to good deeds” is a command to:"),
 o:[P("المسارعة إلى فعل الخيرات","Hasten to do good deeds"),P("ترك العمل","Leave work"),P("اتباع الهوى","Follow desire"),P("التأجيل","Postpone")],a:0,
 w:P("منها: طاعة الله، واتباع شريعته، والإيمان برسوله، والتصديق بالقرآن.","Including obeying Allah, following His law, believing in His Messenger and confirming the Qur’an.")},
{id:"L3-14",l:3,t:"mcq",q:P("ما دلالة الأمر بالاستباق إلى الخيرات والنهي عن اتباع الهوى؟","What does the command to race to good and the ban on following desire indicate?"),
 o:[P("أن العمل الصالح والاستقامة على الطاعة يجعل المؤمن متبعًا ومعتصمًا بالقرآن","Good deeds and steadfast obedience make the believer a follower of, and holder to, the Qur’an"),P("أن الهوى مباح","That desire is allowed"),P("أن الخير للمبتدئين فقط","That good is for beginners only"),P("لا دلالة","No indication")],a:0,
 w:P("جواب ملزمتك.","Your notes’ answer.")},
{id:"L3-15",l:3,t:"cat",q:P("صنّف: استباق إلى الخيرات أم اتباع للهوى؟","Sort: racing to good deeds or following desire?"),
 cats:[P("استباق للخيرات","Racing to good"),P("اتباع للهوى","Following desire")],
 items:[{p:P("طاعة الله","Obeying Allah"),c:0},{p:P("ترك العبادة بعد معرفتها","Leaving worship after knowing it"),c:1},{p:P("الإيمان برسوله ﷺ","Believing in His Messenger ﷺ"),c:0},{p:P("التذبذب في العقيدة","Wavering in belief"),c:1},{p:P("التصديق بالقرآن","Confirming the Qur’an"),c:0},{p:P("ترك الأخلاق الفاضلة","Dropping virtuous morals"),c:1}],
 w:P("من الدرس: صور الاستباق وصور اتباع الهوى.","From the lesson: forms of racing and forms of following desire.")},
{id:"L3-16",l:3,t:"fill",q:P("أكمل: ﴿وَلَا تَتَّبِعْ … ﴾","Complete: “…and do not follow their …”"),
 ans:["اهواءهم","أهواءهم","ahwa'ahum","desires"],bank:["أَهْوَاءَهُمْ","أَمْوَالَهُمْ","أَقْوَالَهُمْ"],
 w:P("﴿وَلَا تَتَّبِعْ أَهْوَاءَهُمْ﴾.","“…do not follow their desires.”")},
{id:"L3-17",l:3,t:"mcq",q:P("مثال على اختلاف الأحكام بين الشرائع (آل عمران ٥٠):","An example of differing rulings between laws (3:50):"),
 o:[P("الشحوم كانت محرمة ثم أُحلّت","Fats were forbidden, then made lawful"),P("التوحيد تغيّر","Tawhid changed"),P("الصدق صار محرمًا","Truthfulness became forbidden"),P("لا مثال","No example")],a:0,
 w:P("على لسان عيسى ﷺ: ﴿وَلِأُحِلَّ لَكُم بَعْضَ ٱلَّذِى حُرِّمَ عَلَيْكُمْ﴾.","On Isa’s ﷺ tongue: “…to make lawful some of what was forbidden to you.”")},
{id:"L3-18",l:3,t:"tf",q:P("تختلف الكتب السماوية في أصل التوحيد.","The heavenly books differ in the root of Tawhid."),a:false,
 w:P("تختلف في الأحكام (الأوامر والنواهي) لا في الأصل.","They differ in rulings (commands/prohibitions), not in the root.")},
{id:"L3-19",l:3,t:"match",q:P("طابق وصف القرآن بمعناه:","Match each Qur’an description with its meaning:"),
 pairs:[[P("مصدِّق","Confirming"),P("يصدّق التوراة والإنجيل","Confirms the Tawrah and Injil")],[P("مهيمن","Muhaymin"),P("حافظ وشاهد وحاكم","Guardian, witness, judge")],[P("خاتم الكتب","Final of the books"),P("آخر ما أنزل الله","Allah’s last revelation")]],
 w:P("من حوار الأسرة في الدرس.","From the family’s conversation in the lesson.")},
{id:"L3-20",l:3,t:"order",q:P("رتّب المحطات الأربع للأسرة في الدرس:","Put the family’s four stops in order:"),
 items:[P("بيان معاني الآيات","Explaining the meanings of the verses"),P("علاقة القرآن بالكتب السابقة","The Qur’an’s relation to earlier books"),P("مكمن الاختلاف بين الكتب","Where the books differ"),P("قيم دعت إليها الآيات","Values the verses called to")],
 w:P("الأولى إلى الرابعة كما ذُكرت.","First to fourth as stated.")},
{id:"L3-21",l:3,t:"short",q:P("اذكر بعض المعاني من الآيات (٤٨–٥٠) من سورة المائدة.","List some meanings from Al-Ma’idah 48–50."),
 ans:P("١ـ القرآن هو الكتاب الذي يجب الإيمان به واتباعه فهو مهيمن وحاكم على الكتب السابقة ٢ـ الشرائع في الكتب المنزلة متعددة ٣ـ تحذر الآيات من الفتنة بمخالفة القرآن واتباع الهوى","1) The Qur’an must be believed and followed; it is dominant and a judge over earlier books 2) The laws in the revealed books are many 3) The verses warn against temptation by opposing the Qur’an and following desire")},
{id:"L3-22",l:3,t:"short",q:P("بماذا تميز القرآن الكريم عن الكتب المنزلة قبله؟","How did the Qur’an stand out from the books revealed before it?"),
 ans:P("١ـ هو أعظم الكتب وأشملها وأحكمها ٢ـ كتاب باقٍ ومعتمد لا يغيّر إلى يوم القيامة","1) The greatest, most comprehensive and most judicious of books 2) A preserved, authoritative book that will not change until the Day of Judgement")},
{id:"L3-23",l:3,t:"short",q:P("ما دلالة الأمر بالاستباق إلى الخيرات والنهي عن اتباع الهوى؟","What does the command to race to good deeds and the ban on following desire indicate?"),
 ans:P("يدل على أن فعل الأعمال الصالحة والاستقامة على طاعة الله هو الذي يجعل المؤمن متبعًا ومعتصمًا بكتاب الله تعالى وهو القرآن الكريم.","It indicates that doing good deeds and being steadfast in obedience to Allah is what makes the believer a follower of, and holder to, Allah’s Book, the Noble Qur’an.")},
{id:"L3-24",l:3,t:"tf",q:P("اختلاف الشرائع ابتلاء من الله يعقبه الرجوع إليه.","The difference of laws is a test from Allah, followed by return to Him."),a:true,
 w:P("﴿لِّيَبْلُوَكُمْ﴾ ثم ﴿إِلَى ٱللَّهِ مَرْجِعُكُمْ﴾.","“…to test you” then “To Allah is your return.”")},
{id:"L3-25",l:3,t:"multi",q:P("من صور اتباع الهوى (اختر ٣):","Forms of following desire (choose 3):"),
 o:[P("ترك العبادة","Leaving worship"),P("التذبذب في العقيدة بعد رسوخها","Wavering in belief after it was firm"),P("التخلي عن الأخلاق الفاضلة بعد معرفتها","Dropping virtuous morals once known"),P("الصدقة","Giving charity")],a:[0,1,2],
 w:P("من شرح الكتاب لاتباع الهوى.","From the textbook’s explanation of following desire.")},
{id:"L3-26",l:3,t:"mcq",q:P("«الهوى» في الآيات يعني:","“Hawa” in the verses means:"),
 o:[P("الميل عن الحق","Inclining away from the truth"),P("الطقس","The weather"),P("الاجتهاد","Hard work"),P("الصبر","Patience")],a:0,
 w:P("حاشية الكتاب.","The textbook footnote.")},

/* ---------- COMMAND TERMS ---------- */
{id:"C-01",l:0,t:"cmd",q:P("«اذكر بعض مميزات رسالة نبينا ﷺ» — ماذا يطلب المصطلح؟","“List some features of our Prophet’s ﷺ message” — what does the term demand?"),
 o:[P("نقاط مرقمة قصيرة","Short numbered points"),P("قصة طويلة","A long story"),P("رأي شخصي","A personal opinion"),P("رسم","A drawing")],a:0,
 w:P("«اذكر» = عدّد النقاط بإيجاز.","“State/list” = give points briefly.")},
{id:"C-02",l:0,t:"cmd",q:P("«وضِّح ما يدل عليه الحديث» — ماذا يطلب؟","“Explain what the Hadith indicates” — what is demanded?"),
 o:[P("المعنى مع الربط بالدليل في جملتين أو ثلاث","The meaning linked to evidence in 2–3 sentences"),P("كلمة واحدة","One word"),P("نسخ النص","Copying the text"),P("تاريخ الراوي","The narrator’s dates")],a:0,
 w:P("«وضّح» = بيّن المعنى مع السبب.","“Explain” = give the meaning with reason.")},
{id:"C-03",l:0,t:"cmd",q:P("«أكمل: تتفق الرسالات في … و…» — الإجابة تكون:","“Complete: messages agree in … and …” — the answer is:"),
 o:[P("الكلمات نفسها من الملزمة","The exact words from the notes"),P("فقرة طويلة","A long paragraph"),P("سؤالًا جديدًا","A new question"),P("رسمًا","A drawing")],a:0,
 w:P("«أكمل» = املأ الفراغ بالكلمة المحددة.","“Complete” = fill the gap with the exact word.")},
{id:"C-04",l:0,t:"cmd",q:P("«ما دلالة …؟» تعني:","“What is the indication of …?” means:"),
 o:[P("ما الفكرة التي يثبتها النص","What idea the text proves"),P("أعد النص حرفيًا","Repeat the text word for word"),P("اذكر راوي النص","Name the text’s narrator"),P("اشرح الحروف","Explain the letters")],a:0,
 w:P("لا تعد النص، بل اذكر ما يدل عليه.","Do not repeat the text; state what it points to.")},
{id:"C-05",l:0,t:"cmd",q:P("«ما الحكمة من تعدد الرسالات؟» تطلب:","“What is the wisdom of multiple messages?” asks for:"),
 o:[P("السبب والنتيجة","A reason and its result"),P("عدد الرسالات","The number of messages"),P("أسماء الأنبياء","The prophets’ names"),P("تواريخ","Dates")],a:0,
 w:P("«الحكمة» = لماذا؟","“Wisdom” = why?")},
{id:"C-06",l:0,t:"cmd",q:P("«ما أثر الإيمان بالله على السلوك؟» تطلب:","“What is the effect of faith in Allah on behaviour?” asks for:"),
 o:[P("ربط السبب بالسلوك","Linking the cause to behaviour"),P("تعريف الإيمان فقط","Only a definition of faith"),P("قصة يوسف كاملة","The whole story of Yusuf"),P("رأي المعلم","The teacher’s opinion")],a:0,
 w:P("«أثر» = نتيجة.","“Effect” = result.")},
{id:"C-07",l:0,t:"match",q:P("طابق المصطلح بما يطلبه:","Match the term with what it demands:"),
 pairs:[[P("اذكر","State / list"),P("عدّد نقاطًا بإيجاز","Name points briefly")],[P("وضّح","Explain"),P("بيّن المعنى والسبب","Give meaning and reason")],[P("أكمل","Complete"),P("املأ الفراغ بالكلمة المحددة","Fill the exact word")],[P("بماذا تميز","How distinguished"),P("صفات انفرد بها","Traits that made it unique")]],
 w:P("مصطلحات من أسئلة ملزمتك.","Terms from your notes’ questions.")},
{id:"C-08",l:0,t:"mcq",q:P("«كيف ترد على من يزعم…؟» تعني:","“How do you respond to someone who claims…?” means:"),
 o:[P("أجب بالدليل على الادعاء","Answer the claim with evidence"),P("وافقه","Agree with him"),P("اسكت","Stay silent"),P("اذكر اسمه","Name him")],a:0,
 w:P("جواب مبني على أدلة من الدرس.","An answer built on evidence from the lesson.")},
];

/* ================= PALETTE (dark only) ================= */
const pal = {
  bg:"#16140F", dots:"rgba(255,240,210,.04)", panel:"rgba(40,37,30,.6)", panelBd:"#332F26",
  ink:"#F1ECE0", soft:"#B8AE9C", faint:"#7E7565", card:"#211E18", cardBd:"#3A3529", track:"#33302a",
  good:"#5BD08B", goodBg:"#15291C", goodBd:"#2F6B45",
  bad:"#F08C7E", badBg:"#2E1815", badBd:"#7A3A30",
  poolBg:"#1C1A14", poolBd:"#403A2D", answerInk:"#D9D1C0", shadow:"0 24px 60px -30px rgba(0,0,0,.7)",
  u1:"#F08A4B", u2:"#56C880", u3:"#6FA0FF", mix:"#A682F0",
};
const LESSON_COLOR = {0:pal.mix,1:pal.u1,2:pal.u2,3:pal.u3};
const FONT = "'Newsreader','Amiri','Noto Naskh Arabic',Georgia,serif";
const MONO = "'IBM Plex Mono','Courier New',monospace";
const ARFONT = "'Amiri','Noto Naskh Arabic','Traditional Arabic',serif";

/* ================= LANGUAGE ================= */
const LangCtx = createContext("both");
const LANGS = ["both","en","ar"];
const LANG_LABEL = {both:"English (عربي)", en:"English", ar:"العربية"};
const isP = p => p && typeof p === "object" && "ar" in p;
function txt(p, lang){ // plain string version
  if(p==null) return "";
  if(!isP(p)) return String(p);
  return lang==="ar" ? p.ar : lang==="en" ? p.en : `${p.en} (${p.ar})`;
}
function T({p}){
  const lang = useContext(LangCtx);
  if(p==null) return null;
  if(!isP(p)) return <span dir="auto" style={{fontFamily:ARFONT,fontSize:"1.12em",unicodeBidi:"plaintext"}}>{String(p)}</span>;
  if(lang==="en") return <span>{p.en}</span>;
  if(lang==="ar") return <span dir="rtl" style={{fontFamily:ARFONT,fontSize:"1.1em"}}>{p.ar}</span>;
  return <span>{p.en} <span dir="rtl" style={{fontFamily:ARFONT,color:pal.soft,unicodeBidi:"isolate",fontSize:"1.05em"}}>({p.ar})</span></span>;
}
const UI = {
  title:P("اختبار العقيدة","Aqeedah Quiz"), sub:P("الوحدة الثانية: الدروس الثلاثة كاملة","Unit 2: all three lessons"),
  start:P("ابدأ","Start"), next:P("التالي","Next"), check:P("تحقق","Check"), finish:P("إنهاء","Finish"),
  home:P("الرئيسية","Home"), correct:P("صحيح!","Correct!"), wrong:P("غير صحيح","Not quite"),
  why:P("لماذا؟","Why?"), best:P("أفضل نتيجة","Best"), score:P("النتيجة","Score"),
  reveal:P("أظهر الإجابة","Show answer"), knew:P("عرفتها","I knew it"), missed:P("لم أعرفها","I missed it"),
  clear:P("مسح التقدم","Clear progress"), review:P("مراجعة الأخطاء","Review misses"), again:P("أعد المحاولة","Try again"),
  empty:P("لا توجد أخطاء محفوظة","No saved misses"), pool:P("سؤال","questions"), time:P("الوقت","Time"),
  tapOrder:P("المس العناصر بالترتيب الصحيح","Tap items in the correct order"), yours:P("ترتيبك","Your order"),
  matchHint:P("المس عنصرًا من اليمين ثم ما يقابله","Tap a left item, then its match"), pickAll:P("اختر كل الإجابات الصحيحة","Select all correct answers"),
  typeHere:P("اكتب إجابتك","Type your answer"), bank:P("بنك الكلمات","Word bank"), model:P("الإجابة النموذجية","Model answer"),
  tfTrue:P("صحيح","True"), tfFalse:P("خطأ","False"), notes:P("تعتمد إجابات الملزمة","Answers follow your teacher’s notes"),
  tapPart:P("المس الجزء الصحيح من الرسم","Tap the correct part of the picture"),
};
const TYPE_LABEL = {mcq:P("اختيار","Multiple choice"),multi:P("متعدد","Select all"),tf:P("صح/خطأ","True / False"),fill:P("أكمل","Fill in"),
  order:P("رتّب","Put in order"),match:P("طابق","Match"),cat:P("صنّف","Sort"),short:P("بطاقة","Flashcard"),cmd:P("مصطلح","Command term"),diagram:P("رسم","Diagram")};

/* ================= HELPERS ================= */
const shuffle = arr => { const a=[...arr]; for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]];} return a; };
const norm = s => String(s||"").normalize("NFKD").replace(/[ً-ٰٟۖ-ۭـ]/g,"")
  .replace(/[إأآٱ]/g,"ا").replace(/ى/g,"ي").replace(/ة/g,"ه").replace(/[^\p{L}\p{N}\s]/gu,"").toLowerCase().replace(/\s+/g," ").trim();
const STORE_KEY = "aqeedah_quiz_v1";
const loadStore = () => { try{ const s=JSON.parse(localStorage.getItem(STORE_KEY)||"null"); if(s&&s.best&&s.misses) return s; }catch(e){} return {best:{},misses:{},lang:"both"}; };
const saveStore = s => { try{ localStorage.setItem(STORE_KEY, JSON.stringify(s)); }catch(e){} };
function useKeys(handler){
  const ref = useRef(handler); ref.current = handler;
  useEffect(()=>{ const h=e=>{ if(e.ctrlKey||e.metaKey||e.altKey) return; ref.current(e); }; window.addEventListener("keydown",h); return ()=>window.removeEventListener("keydown",h); },[]);
}
const btn = (extra={}) => ({fontFamily:FONT,fontSize:16,color:pal.ink,background:pal.card,border:`1px solid ${pal.cardBd}`,borderRadius:10,padding:"10px 14px",cursor:"pointer",textAlign:"start",lineHeight:1.45,...extra});

/* ================= QUESTION TYPES ================= */
function OptionList({q, onGrade, locked, multi}){
  const order = useMemo(()=>shuffle(q.o.map((_,i)=>i)),[q.id]);
  const [sel,setSel] = useState([]);
  const [graded,setGraded] = useState(false);
  const correctSet = multi ? q.a : [q.a];
  const submit = useCallback((s)=>{
    if(graded) return; setGraded(true);
    const ok = s.length===correctSet.length && s.every(x=>correctSet.includes(x));
    onGrade(ok);
  },[graded,correctSet,onGrade]);
  const pick = i => { if(graded) return; if(multi){ setSel(s=>s.includes(i)?s.filter(x=>x!==i):[...s,i]); } else { setSel([i]); submit([i]); } };
  useKeys(e=>{
    if(graded) return;
    const n = parseInt(e.key,10);
    if(n>=1 && n<=order.length) pick(order[n-1]);
    else if(e.key==="Enter" && multi && sel.length) submit(sel);
  });
  return (<div>
    {multi && <div style={{color:pal.faint,fontFamily:MONO,fontSize:12,marginBottom:8}}><T p={UI.pickAll}/></div>}
    <div style={{display:"grid",gap:8}}>
      {order.map((oi,k)=>{
        const chosen = sel.includes(oi), isC = correctSet.includes(oi);
        let bg=pal.card,bd=pal.cardBd;
        if(graded){ if(isC){bg=pal.goodBg;bd=pal.goodBd;} else if(chosen){bg=pal.badBg;bd=pal.badBd;} }
        else if(chosen){ bd=pal.mix; }
        return <button key={oi} onClick={()=>pick(oi)} style={btn({background:bg,borderColor:bd,display:"flex",gap:10,alignItems:"flex-start"})}>
          <span style={{fontFamily:MONO,fontSize:12,color:pal.faint,minWidth:16,paddingTop:3}}>{k+1}</span>
          <span style={{flex:1}}><T p={q.o[oi]}/></span>
          {graded && isC && <span style={{color:pal.good}}>✓</span>}
          {graded && chosen && !isC && <span style={{color:pal.bad}}>✗</span>}
        </button>;})}
    </div>
    {multi && !graded && <button disabled={!sel.length} onClick={()=>submit(sel)} style={btn({marginTop:12,background:sel.length?pal.mix:pal.track,color:"#16140F",fontWeight:700})}><T p={UI.check}/> ↵</button>}
  </div>);
}
function TF({q,onGrade}){
  const [pick,setPick]=useState(null);
  const go = v => { if(pick!==null) return; setPick(v); onGrade(v===q.a); };
  useKeys(e=>{ if(e.key==="1") go(true); if(e.key==="2") go(false); });
  const mk=(v,label,k)=>{ let bg=pal.card,bd=pal.cardBd; if(pick!==null){ if(v===q.a){bg=pal.goodBg;bd=pal.goodBd;} else if(pick===v){bg=pal.badBg;bd=pal.badBd;} }
    return <button onClick={()=>go(v)} style={btn({flex:1,textAlign:"center",background:bg,borderColor:bd})}><span style={{fontFamily:MONO,fontSize:12,color:pal.faint}}>{k} </span><T p={label}/></button>; };
  return <div style={{display:"flex",gap:10}}>{mk(true,UI.tfTrue,1)}{mk(false,UI.tfFalse,2)}</div>;
}
function Fill({q,onGrade}){
  const lang = useContext(LangCtx);
  const [v,setV]=useState(""); const [done,setDone]=useState(false);
  const bank = useMemo(()=>shuffle(q.bank||[]),[q.id]);
  const submit=()=>{ if(done||!v.trim()) return; setDone(true); onGrade(q.ans.map(norm).includes(norm(v))); };
  const chipVal = c => isP(c) ? (lang==="ar"?c.ar:c.en) : c;
  const ok = done && q.ans.map(norm).includes(norm(v));
  return (<div>
    <input value={v} disabled={done} onChange={e=>setV(e.target.value)} onKeyDown={e=>{ if(e.key==="Enter"){ e.stopPropagation(); submit(); } }} placeholder={txt(UI.typeHere,lang)} dir="auto" autoFocus
      style={{width:"100%",boxSizing:"border-box",fontFamily:ARFONT,fontSize:20,padding:"10px 12px",borderRadius:10,background:done?(ok?pal.goodBg:pal.badBg):pal.poolBg,color:pal.ink,border:`1px solid ${done?(ok?pal.goodBd:pal.badBd):pal.poolBd}`}}/>
    {bank.length>0 && <div style={{marginTop:10}}><div style={{color:pal.faint,fontFamily:MONO,fontSize:12,marginBottom:6}}><T p={UI.bank}/></div>
      <div style={{display:"flex",flexWrap:"wrap",gap:8}}>{bank.map((c,i)=><button key={i} disabled={done} onClick={()=>setV(chipVal(c))} style={btn({padding:"6px 12px"})}><T p={c}/></button>)}</div></div>}
    {done && !ok && <div style={{marginTop:10,color:pal.good,fontFamily:ARFONT,fontSize:18}}>✓ {q.ans[0]}</div>}
    {!done && <button onClick={submit} disabled={!v.trim()} style={btn({marginTop:12,background:v.trim()?pal.mix:pal.track,color:"#16140F",fontWeight:700})}><T p={UI.check}/> ↵</button>}
  </div>);
}
function Order({q,onGrade}){
  const idx = useMemo(()=>{ let s; do{ s=shuffle(q.items.map((_,i)=>i)); }while(s.every((x,i)=>x===i)&&q.items.length>1); return s; },[q.id]);
  const [seq,setSeq]=useState([]); const [done,setDone]=useState(false);
  const tap=i=>{ if(done) return; setSeq(s=>s.includes(i)?s.filter(x=>x!==i):[...s,i]); };
  const check=()=>{ if(done||seq.length!==q.items.length) return; setDone(true); onGrade(seq.every((x,i)=>x===i)); };
  useKeys(e=>{ if(e.key==="Enter" && !done) check(); });
  return (<div>
    <div style={{color:pal.faint,fontFamily:MONO,fontSize:12,marginBottom:8}}><T p={UI.tapOrder}/></div>
    <div style={{display:"grid",gap:8}}>{idx.map(i=>{ const pos=seq.indexOf(i); const used=pos>=0;
      let bg=used?pal.poolBg:pal.card, bd=used?pal.mix:pal.cardBd;
      if(done){ bd = pos===i?pal.goodBd:pal.badBd; bg = pos===i?pal.goodBg:pal.badBg; }
      return <button key={i} onClick={()=>tap(i)} style={btn({background:bg,borderColor:bd,display:"flex",gap:10})}>
        <span style={{fontFamily:MONO,fontSize:13,color:used?pal.mix:pal.faint,minWidth:18}}>{used?pos+1:"·"}</span><span style={{flex:1}}><T p={q.items[i]}/></span></button>;})}</div>
    {done && <div style={{marginTop:12}}><div style={{color:pal.good,fontFamily:MONO,fontSize:12}}>✓</div>{q.items.map((it,i)=><div key={i} style={{padding:"4px 0",color:pal.answerInk}}>{i+1}. <T p={it}/></div>)}</div>}
    {!done && <button onClick={check} disabled={seq.length!==q.items.length} style={btn({marginTop:12,background:seq.length===q.items.length?pal.mix:pal.track,color:"#16140F",fontWeight:700})}><T p={UI.check}/> ↵</button>}
  </div>);
}
function Match({q,onGrade}){
  const right = useMemo(()=>shuffle(q.pairs.map((_,i)=>i)),[q.id]);
  const [selL,setSelL]=useState(null); const [m,setM]=useState({}); const [done,setDone]=useState(false);
  const tapL=i=>{ if(done) return; if(m[i]!==undefined){ setM(o=>{const n={...o}; delete n[i]; return n;}); setSelL(null); } else setSelL(i); };
  const tapR=j=>{ if(done||selL===null) return; if(Object.values(m).includes(j)) return; setM(o=>({...o,[selL]:j})); setSelL(null); };
  const check=()=>{ if(done||Object.keys(m).length!==q.pairs.length) return; setDone(true); onGrade(q.pairs.every((_,i)=>m[i]===i)); };
  useKeys(e=>{ if(e.key==="Enter"&&!done) check(); });
  return (<div>
    <div style={{color:pal.faint,fontFamily:MONO,fontSize:12,marginBottom:8}}><T p={UI.matchHint}/></div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
      <div style={{display:"grid",gap:8}}>{q.pairs.map((p,i)=>{ const paired=m[i]!==undefined;
        let bd = selL===i?pal.mix:paired?pal.mix:pal.cardBd, bg=paired?pal.poolBg:pal.card;
        if(done){ bd=m[i]===i?pal.goodBd:pal.badBd; bg=m[i]===i?pal.goodBg:pal.badBg; }
        return <button key={i} onClick={()=>tapL(i)} style={btn({borderColor:bd,background:bg})}>{paired&&<span style={{color:pal.mix,fontFamily:MONO}}>{right.indexOf(m[i])+1}· </span>}<T p={p[0]}/></button>;})}</div>
      <div style={{display:"grid",gap:8}}>{right.map((j,k)=>{ const used=Object.values(m).includes(j);
        return <button key={j} onClick={()=>tapR(j)} style={btn({opacity:used&&!done?.55:1,borderColor:used?pal.mix:pal.cardBd})}><span style={{fontFamily:MONO,fontSize:12,color:pal.faint}}>{k+1} </span><T p={q.pairs[j][1]}/></button>;})}</div>
    </div>
    {done && <div style={{marginTop:12,color:pal.answerInk}}>{q.pairs.map((p,i)=><div key={i} style={{padding:"3px 0"}}><span style={{color:pal.good}}>✓</span> <T p={p[0]}/> — <T p={p[1]}/></div>)}</div>}
    {!done && <button onClick={check} disabled={Object.keys(m).length!==q.pairs.length} style={btn({marginTop:12,background:Object.keys(m).length===q.pairs.length?pal.mix:pal.track,color:"#16140F",fontWeight:700})}><T p={UI.check}/> ↵</button>}
  </div>);
}
function Cat({q,onGrade}){
  const items = useMemo(()=>shuffle(q.items.map((_,i)=>i)),[q.id]);
  const [a,setA]=useState({}); const [done,setDone]=useState(false);
  const check=()=>{ if(done||Object.keys(a).length!==q.items.length) return; setDone(true); onGrade(q.items.every((it,i)=>a[i]===it.c)); };
  useKeys(e=>{ if(e.key==="Enter"&&!done) check(); });
  return (<div>
    <div style={{display:"grid",gap:10}}>{items.map(i=>{ const it=q.items[i]; const ok=done&&a[i]===it.c;
      return <div key={i} style={{background:done?(ok?pal.goodBg:pal.badBg):pal.card,border:`1px solid ${done?(ok?pal.goodBd:pal.badBd):pal.cardBd}`,borderRadius:10,padding:10}}>
        <div style={{marginBottom:8}}><T p={it.p}/></div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>{q.cats.map((c,ci)=><button key={ci} disabled={done} onClick={()=>setA(o=>({...o,[i]:ci}))}
          style={btn({padding:"6px 12px",fontSize:14,borderColor:a[i]===ci?pal.mix:pal.cardBd,background:a[i]===ci?pal.poolBg:pal.card})}><T p={c}/></button>)}</div>
        {done && !ok && <div style={{marginTop:6,color:pal.good,fontSize:14}}>✓ <T p={q.cats[it.c]}/></div>}
      </div>;})}</div>
    {!done && <button onClick={check} disabled={Object.keys(a).length!==q.items.length} style={btn({marginTop:12,background:Object.keys(a).length===q.items.length?pal.mix:pal.track,color:"#16140F",fontWeight:700})}><T p={UI.check}/> ↵</button>}
  </div>);
}
function Short({q,onGrade}){
  const [shown,setShown]=useState(false); const [done,setDone]=useState(false);
  const grade=ok=>{ if(done) return; setDone(true); onGrade(ok); };
  useKeys(e=>{ if(!shown){ if(e.key==="Enter") setShown(true); } else if(!done){ if(e.key==="1") grade(true); if(e.key==="2") grade(false); } });
  return (<div>
    {!shown && <button onClick={()=>setShown(true)} style={btn({background:pal.mix,color:"#16140F",fontWeight:700})}><T p={UI.reveal}/> ↵</button>}
    {shown && <div style={{background:pal.goodBg,border:`1px solid ${pal.goodBd}`,borderRadius:10,padding:"12px 14px",color:pal.answerInk,lineHeight:1.7}}>
      <div style={{fontFamily:MONO,fontSize:12,color:pal.good,marginBottom:4}}><T p={UI.model}/></div><T p={q.ans}/></div>}
    {shown && !done && <div style={{display:"flex",gap:10,marginTop:12}}>
      <button onClick={()=>grade(true)} style={btn({flex:1,textAlign:"center",borderColor:pal.goodBd})}><span style={{fontFamily:MONO,fontSize:12,color:pal.faint}}>1 </span><T p={UI.knew}/></button>
      <button onClick={()=>grade(false)} style={btn({flex:1,textAlign:"center",borderColor:pal.badBd})}><span style={{fontFamily:MONO,fontSize:12,color:pal.faint}}>2 </span><T p={UI.missed}/></button></div>}
  </div>);
}
function BrickDiagram({q,onGrade}){
  const lang = useContext(LangCtx);
  const [pick,setPick]=useState(null);
  const go=r=>{ if(pick) return; setPick(r); onGrade(r===q.target); };
  const col=(r)=> pick ? (r===q.target?pal.good:(pick===r?pal.bad:null)) : null;
  const lab=(x,y,ar,en)=> <g><text x={x} y={y} textAnchor="middle" fontSize="13" fill={pal.ink} style={{pointerEvents:"none",fontFamily:FONT}}>{lang==="ar"?ar:en}</text>
    {lang==="both" && <text x={x} y={y+16} textAnchor="middle" fontSize="14" fill={pal.soft} style={{pointerEvents:"none",fontFamily:ARFONT}}>{ar}</text>}</g>;
  const bricks=[]; for(let r=0;r<4;r++) for(let c=0;c<6;c++){ if(r===0&&c===5) continue; const x=30+c*76-(r%2?35:0)+(r%2?35:0); bricks.push(<rect key={r+"-"+c} x={x} y={14+r*40} width={70} height={34} rx={4} fill="#3a2a1a" stroke="#7A4A22" style={{pointerEvents:"none"}}/>); }
  return (<div>
    <div style={{color:pal.faint,fontFamily:MONO,fontSize:12,marginBottom:6}}><T p={UI.tapPart}/></div>
    <svg viewBox="0 0 520 280" width="100%" style={{maxWidth:560,display:"block",margin:"0 auto"}}>
      <rect x={20} y={8} width={470} height={170} rx={8} fill={col("wall")?pal.goodBg:"transparent"} stroke={col("wall")||pal.cardBd} strokeWidth={col("wall")?3:1} style={{cursor:"pointer"}} onClick={()=>go("wall")}/>
      {bricks}
      <rect x={30+5*76} y={14} width={70} height={34} rx={4} fill={col("gap")?pal.goodBg:"transparent"} stroke={col("gap")||"#F08A4B"} strokeWidth={3} strokeDasharray="6 4" style={{cursor:"pointer"}} onClick={()=>go("gap")}/>
      <rect x={20} y={192} width={470} height={80} rx={8} fill="transparent" stroke={col("people")||pal.cardBd} strokeWidth={col("people")?3:1} style={{cursor:"pointer"}} onClick={()=>go("people")}/>
      {lab(255,222,"الناس يطوفون ويتعجبون","People walking round and marvelling")}
      {lab(30+5*76+35,66,"؟","?")}
    </svg>
    <div style={{display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap",marginTop:6}}>
      {[["wall",P("البيت","The house")],["gap",P("موضع اللبنة","The brick’s place")],["people",P("الناس","The people")]].map(([r,l])=>
        <button key={r} onClick={()=>go(r)} style={btn({padding:"6px 12px",fontSize:14,borderColor:pick&&r===q.target?pal.goodBd:pal.cardBd})}><T p={l}/></button>)}
    </div>
  </div>);
}
function Body({q,onGrade}){
  switch(q.t){
    case "mcq": case "cmd": return <OptionList q={q} onGrade={onGrade}/>;
    case "multi": return <OptionList q={q} onGrade={onGrade} multi/>;
    case "tf": return <TF q={q} onGrade={onGrade}/>;
    case "fill": return <Fill q={q} onGrade={onGrade}/>;
    case "order": return <Order q={q} onGrade={onGrade}/>;
    case "match": return <Match q={q} onGrade={onGrade}/>;
    case "cat": return <Cat q={q} onGrade={onGrade}/>;
    case "short": return <Short q={q} onGrade={onGrade}/>;
    case "diagram": return <BrickDiagram q={q} onGrade={onGrade}/>;
    default: return null;
  }
}

/* ================= RUNNER ================= */
function Runner({run, store, setStore, onExit}){
  const [i,setI]=useState(0); const [graded,setGraded]=useState(null); const [results,setResults]=useState([]);
  const [left,setLeft]=useState(run.seconds||0); const [finished,setFinished]=useState(false);
  const lang = useContext(LangCtx);
  const q = run.qs[i];
  const finish = useCallback((res)=>{
    setFinished(true);
    const r = res||results; const pct = run.qs.length ? Math.round(100*r.filter(Boolean).length/run.qs.length) : 0;
    if(run.key!=="weak"){ setStore(s=>{ const n={...s,best:{...s.best,[run.key]:Math.max(s.best[run.key]||0,pct)}}; saveStore(n); return n; }); }
  },[results,run,setStore]);
  useEffect(()=>{ if(!run.seconds||finished) return; const t=setInterval(()=>setLeft(l=>{ if(l<=1){ clearInterval(t); finish(); return 0;} return l-1; }),1000); return ()=>clearInterval(t); },[run.seconds,finished]);
  const onGrade = useCallback(ok=>{
    setGraded(ok);
    setResults(r=>{ const n=[...r]; n[i]=ok; return n; });
    setStore(s=>{ const m={...s.misses}; if(ok){ delete m[q.id]; } else { m[q.id]=(m[q.id]||0)+1; } const n={...s,misses:m}; saveStore(n); return n; });
  },[i,q,setStore]);
  const next = ()=>{ if(i+1>=run.qs.length){ finish([...results]); } else { setI(i+1); setGraded(null); } };
  useKeys(e=>{ if(e.key==="Enter" && graded!==null && !finished){ next(); } });
  if(finished){
    const r = run.qs.map((_,k)=>results[k]===true); const n=r.filter(Boolean).length; const pct=Math.round(100*n/run.qs.length);
    const missed = run.qs.filter((_,k)=>results[k]!==true);
    return <div>
      <div style={{textAlign:"center",padding:"18px 0"}}>
        <div style={{fontFamily:MONO,fontSize:12,color:pal.faint}}><T p={UI.score}/></div>
        <div style={{fontSize:64,fontWeight:700,color:pct>=80?pal.good:pct>=50?pal.u1:pal.bad}}>{pct}%</div>
        <div style={{color:pal.soft}}>{n} / {run.qs.length}{run.key!=="weak" && <> · <T p={UI.best}/>: {Math.max(store.best[run.key]||0,pct)}%</>}</div>
      </div>
      {missed.length>0 && <div><div style={{fontFamily:MONO,fontSize:12,color:pal.faint,margin:"8px 0"}}><T p={UI.review}/> ({missed.length})</div>
        {missed.map(m=><div key={m.id} style={{background:pal.card,border:`1px solid ${pal.cardBd}`,borderRadius:10,padding:12,marginBottom:8}}>
          <div style={{marginBottom:6}}><T p={m.q}/></div>
          {m.w && <div style={{color:pal.soft,fontSize:15}}>↳ <T p={m.w}/></div>}
          {m.t==="short" && <div style={{color:pal.answerInk,fontSize:15,marginTop:4}}><T p={m.ans}/></div>}
        </div>)}</div>}
      <div style={{display:"flex",gap:10,marginTop:14}}>
        <button onClick={onExit} style={btn({flex:1,textAlign:"center"})}><T p={UI.home}/></button>
        <button onClick={()=>onExit(run)} style={btn({flex:1,textAlign:"center",background:pal.mix,color:"#16140F",fontWeight:700})}><T p={UI.again}/></button></div>
    </div>;
  }
  const col = LESSON_COLOR[q.l];
  const mm = String(Math.floor(left/60)).padStart(2,"0"), ss=String(left%60).padStart(2,"0");
  return (<div>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8,fontFamily:MONO,fontSize:12,color:pal.faint}}>
      <button onClick={onExit} style={{background:"none",border:"none",color:pal.soft,cursor:"pointer",fontFamily:MONO}}>← <T p={UI.home}/></button>
      <span>{i+1} / {run.qs.length}</span>
      {run.seconds ? <span style={{color:left<60?pal.bad:pal.soft}}>⏱ {mm}:{ss}</span> : <span/>}
    </div>
    <div style={{height:4,background:pal.track,borderRadius:2,marginBottom:14}}><div style={{width:`${100*(i+(graded!==null?1:0))/run.qs.length}%`,height:4,background:col,borderRadius:2,transition:"width .2s"}}/></div>
    <div style={{background:pal.panel,border:`1px solid ${pal.panelBd}`,borderTop:`3px solid ${col}`,borderRadius:14,padding:"16px 16px 18px",boxShadow:pal.shadow}}>
      <div style={{display:"flex",gap:8,marginBottom:10,fontFamily:MONO,fontSize:11}}>
        <span style={{color:col,border:`1px solid ${col}`,borderRadius:99,padding:"1px 9px"}}>{q.l?<><T p={P("الدرس","Lesson")}/> {q.l}</>:<T p={P("مصطلحات","Terms")}/>}</span>
        <span style={{color:pal.faint,border:`1px solid ${pal.cardBd}`,borderRadius:99,padding:"1px 9px"}}><T p={TYPE_LABEL[q.t]}/></span>
      </div>
      <div style={{fontSize:20,lineHeight:1.55,marginBottom:14}}><T p={q.q}/></div>
      <Body key={run.id+"-"+q.id+"-"+i} q={q} onGrade={onGrade}/>
      {graded!==null && <div style={{marginTop:14,padding:"10px 12px",borderRadius:10,background:graded?pal.goodBg:pal.badBg,border:`1px solid ${graded?pal.goodBd:pal.badBd}`}}>
        <div style={{fontWeight:700,color:graded?pal.good:pal.bad}}>{graded?<T p={UI.correct}/>:<T p={UI.wrong}/>}</div>
        {q.w && <div style={{color:pal.answerInk,marginTop:4,fontSize:16}}><T p={q.w}/></div>}
      </div>}
      {graded!==null && <button onClick={next} style={btn({marginTop:12,width:"100%",textAlign:"center",background:col,color:"#16140F",fontWeight:700})}>{i+1>=run.qs.length?<T p={UI.finish}/>:<T p={UI.next}/>} ↵</button>}
    </div>
  </div>);
}

/* ================= HOME ================= */
function Home({store,onStart,onClear}){
  const misses = Object.keys(store.misses).filter(id=>QS.some(q=>q.id===id));
  const modes = [
    {key:"unit",label:P("الوحدة كاملة","Full unit"),col:pal.mix,qs:()=>shuffle(QS.filter(q=>q.l>0)),desc:P("كل الأسئلة","Every question")},
    {key:"l1",label:P("الدرس ١: خاتم النبيين","Lesson 1: Seal of the Prophets"),col:pal.u1,qs:()=>shuffle(QS.filter(q=>q.l===1))},
    {key:"l2",label:P("الدرس ٢: قيم رسخها الأنبياء","Lesson 2: Values of the Prophets"),col:pal.u2,qs:()=>shuffle(QS.filter(q=>q.l===2))},
    {key:"l3",label:P("الدرس ٣: الرسالة الخاتمة","Lesson 3: The Final Message"),col:pal.u3,qs:()=>shuffle(QS.filter(q=>q.l===3))},
    {key:"hadith",label:P("تدريب الحديث","Hadith drill"),col:pal.u1,qs:()=>shuffle(QS.filter(q=>q.tag==="hadith")),desc:P("حفظ نص الحديث ومعناه","Wording and meaning of the Hadith")},
    {key:"quick15",label:P("١٥ سؤالًا سريعة","Quick 15"),col:pal.mix,qs:()=>shuffle(QS.filter(q=>q.l>0)).slice(0,15)},
    {key:"weak",label:P("نقاط الضعف","Weak-spot drill"),col:pal.bad,qs:()=>shuffle(QS.filter(q=>misses.includes(q.id))),disabled:misses.length===0,desc:misses.length?null:UI.empty},
    {key:"exam",label:P("اختبار مختلط بوقت","Mixed timed exam"),col:pal.mix,qs:()=>shuffle(QS.filter(q=>q.l>0)).slice(0,30),seconds:20*60,desc:P("٣٠ سؤالًا · ٢٠ دقيقة","30 questions · 20 minutes")},
    {key:"cmd",label:P("تدريب مصطلحات الأسئلة","Command-term practice"),col:pal.mix,qs:()=>shuffle(QS.filter(q=>q.l===0)),desc:P("اذكر، وضّح، أكمل…","State, explain, complete…")},
  ];
  const count = m => { const a=m.qs(); return a.length; };
  return (<div>
    <div style={{textAlign:"center",padding:"10px 0 18px"}}>
      <div style={{fontFamily:MONO,fontSize:12,color:pal.faint}}><T p={P("الأحد ٤ / ١٠ / ٢٠٢٦","Sunday 4 / 10 / 2026")}/></div>
      <h1 style={{margin:"6px 0 2px",fontSize:34,fontWeight:700}}><T p={UI.title}/></h1>
      <div style={{color:pal.soft}}><T p={UI.sub}/></div>
    </div>
    <div style={{display:"grid",gap:10}}>
      {modes.map(m=>{ const n=count(m); const best=store.best[m.key];
        return <button key={m.key} disabled={m.disabled} onClick={()=>onStart({key:m.key,id:m.key+Date.now(),qs:m.qs(),seconds:m.seconds})}
          style={btn({opacity:m.disabled?.5:1,borderInlineStart:`4px solid ${m.col}`,display:"flex",justifyContent:"space-between",alignItems:"center",gap:10})}>
          <span><span style={{fontSize:18}}><T p={m.label}/></span>
            {m.desc && <span style={{display:"block",color:pal.faint,fontSize:14}}><T p={m.desc}/></span>}</span>
          <span style={{textAlign:"end",fontFamily:MONO,fontSize:12,color:pal.faint,whiteSpace:"nowrap"}}>{n} <T p={UI.pool}/>{best!==undefined && <><br/><span style={{color:pal.good}}><T p={UI.best}/> {best}%</span></>}</span>
        </button>; })}
    </div>
    <div style={{marginTop:16,textAlign:"center"}}><button onClick={onClear} style={{background:"none",border:"none",color:pal.faint,cursor:"pointer",fontFamily:MONO,fontSize:12,textDecoration:"underline"}}><T p={UI.clear}/></button></div>
    <div style={{marginTop:10,textAlign:"center",color:pal.faint,fontFamily:MONO,fontSize:11}}>1–9 · ↵</div>
  </div>);
}

/* ================= APP ================= */
export default function App(){
  const [store,setStore]=useState(loadStore);
  const [run,setRun]=useState(null);
  const lang = store.lang || "both";
  const setLang = l => setStore(s=>{ const n={...s,lang:l}; saveStore(n); return n; });
  useEffect(()=>{
    const html=document.documentElement, body=document.body;
    const prev={h:html.style.background,b:body.style.background,m:body.style.margin};
    html.style.background=pal.bg; body.style.background=pal.bg; body.style.margin="0";
    return ()=>{html.style.background=prev.h; body.style.background=prev.b; body.style.margin=prev.m;};
  },[]);
  useEffect(()=>{ document.documentElement.setAttribute("dir", lang==="ar"?"rtl":"ltr"); },[lang]);
  const clear = ()=>{ const n={best:{},misses:{},lang}; setStore(n); saveStore(n); };
  const exit = (again)=>{ if(again && again.qs){ setRun({...again,id:again.key+Date.now(),qs:shuffle(again.qs)}); } else setRun(null); };
  return (
    <LangCtx.Provider value={lang}>
      <div dir={lang==="ar"?"rtl":"ltr"} style={{minHeight:"100vh",width:"100%",background:pal.bg,backgroundImage:`radial-gradient(${pal.dots} 1px, transparent 1px)`,backgroundSize:"22px 22px",color:pal.ink,fontFamily:FONT,fontSize:17,boxSizing:"border-box",padding:"64px 14px 40px"}}>
        <button onClick={()=>setLang(LANGS[(LANGS.indexOf(lang)+1)%3])} aria-label="Change language"
          style={{position:"fixed",top:12,right:14,zIndex:50,background:pal.card,color:pal.ink,border:`1px solid ${pal.cardBd}`,borderRadius:999,padding:"8px 16px",fontFamily:MONO,fontSize:13,fontWeight:600,cursor:"pointer",boxShadow:"0 6px 20px -8px #000",direction:"ltr"}}>
          🌐 {LANG_LABEL[lang]}</button>
        <div style={{maxWidth:680,margin:"0 auto"}}>
          {run ? <Runner key={run.id} run={run} store={store} setStore={setStore} onExit={exit}/> : <Home store={store} onStart={setRun} onClear={clear}/>}
        </div>
      </div>
    </LangCtx.Provider>
  );
}
