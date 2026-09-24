import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

// Complete 22 Scheduled Bharatiya Languages + English
export const BHASHINI_LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇮🇳' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'sa', name: 'Sanskrit', nativeName: 'संस्कृतम्', flag: '🇮🇳' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇮🇳' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', flag: '🇮🇳' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', flag: '🇮🇳' },
  { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া', flag: '🇮🇳' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', flag: '🇮🇳' },
  { code: 'mai', name: 'Maithili', nativeName: 'मैथिली', flag: '🇮🇳' },
  { code: 'sat', name: 'Santali', nativeName: 'संताली', flag: '🇮🇳' },
  { code: 'ks', name: 'Kashmiri', nativeName: 'कश्मीरी', flag: '🇮🇳' },
  { code: 'ne', name: 'Nepali', nativeName: 'नेपाली', flag: '🇮🇳' },
  { code: 'kok', name: 'Konkani', nativeName: 'कोंकणी', flag: '🇮🇳' },
  { code: 'sd', name: 'Sindhi', nativeName: 'सिन्धी', flag: '🇮🇳' },
  { code: 'doi', name: 'Dogri', nativeName: 'डोगरी', flag: '🇮🇳' },
  { code: 'brx', name: 'Bodo', nativeName: 'बड़ो', flag: '🇮🇳' },
  { code: 'mni', name: 'Manipuri', nativeName: 'মৈতৈলোন্', flag: '🇮🇳' },
  { code: 'bho', name: 'Bhojpuri', nativeName: 'भोजपुरी', flag: '🇮🇳' }
];

// Comprehensive Official Bhashini Indic Knowledge & Content Translation Matrix
const BHASHINI_DICTIONARY = {
  // --- HERO SECTION HEADINGS & PARAGRAPHS ---
  'Build the skills.': {
    hi: 'कौशल का निर्माण करें।', sa: 'कौशलानि संवर्धयतु।', mr: 'कौशल्ये विकसित करा.', gu: 'કૌશલ્યો વિકસાવો.', ta: 'திறன்களை வளர்த்துக் கொள்ளுங்கள்.', te: 'నైపుణ్యాలను పెంపొందించుకోండి.', bn: 'দক্ষতা গড়ে তুলুন।', kn: 'ಕೌಶಲ್ಯಗಳನ್ನು ಬೆಳೆಸಿಕೊಳ್ಳಿ.', ml: 'കഴിവുകൾ വികസിപ്പിക്കുക.'
  },
  'Prove your readiness.': {
    hi: 'अपनी तत्परता सिद्ध करें।', sa: 'स्वसज्जतां प्रमाणयतु।', mr: 'आपली सज्जता सिद्ध करा.', gu: 'તમારી તત્પરતા સાબિત કરો.', ta: 'உங்கள் தயார்நிலையை நிரூபியுங்கள்.', te: 'మీ సన్నద్ధతను నిరూపించుకోండి.', bn: 'আপনার প্রস্তুতি প্রমাণ করুন।', kn: 'ನಿಮ್ಮ ಸನ್ನದ್ಧತೆಯನ್ನು ಸಾಬೀತುಪಡಿಸಿ.', ml: 'നിങ്ങളുടെ സന്നദ്ധത തെളിയിക്കുക.'
  },
  'Find your next opportunity.': {
    hi: 'अपना अगला अवसर खोजें।', sa: 'स्वकीयं अग्रिमम् अवसरं प्राप्नोतु।', mr: 'आपली पुढील संधी शोधा.', gu: 'તમારી આગામી તક શોધો.', ta: 'உங்கள் அடுத்த வாய்ப்பைக் கண்டறியவும்.', te: 'మీ తదుపరి అవకాశాన్ని కనుగొనండి.', bn: 'আপনার পরবর্তী সুযোগ সন্ধান করুন।', kn: 'ನಿಮ್ಮ ಮುಂದಿನ ಅವಕಾಶವನ್ನು ಕಂಡುಕೊಳ್ಳಿ.', ml: 'നിങ്ങളുടെ അടുത്ത അവസരം കണ്ടെത്തുക.'
  },
  'SkillSetu is the centralized Ayush web platform connecting 42,000+ scholars, 536+ permitted colleges, and 7,345+ licensed pharma units for practical skill testing, 15-minute bridge courses, and direct placements.': {
    hi: 'स्किलसेतु एक एकीकृत आयुष वेब मंच है जो 42,000+ विद्यार्थियों, 536+ अनुमति प्राप्त कॉलेजों, और 7,345+ लाइसेंस प्राप्त फार्मा इकाइयों को व्यावहारिक कौशल परीक्षण, 15-मिनट ब्रिज कोर्स और सीधे प्लेसमेंट के लिए जोड़ता है।',
    sa: 'स्किलसेतुः केन्द्रीयकृतः आयुष-जालमञ्चः अस्ति यः ४२,०००+ छात्रान्, ५३६+ अनुमत-महाविद्यालयान्, ७,३४५+ अनुज्ञापत्र-प्राप्त-फार्मा-घटकान् च व्यावहारिक-कौशलपरीक्षणाय, १५-निमेषात्मक-सेतुपाठ्यक्रमाय साक्षात्-नियोजनेभ्यः च योजयति।',
    mr: 'स्किलसेतु हे एक एकीकृत आयुष वेब व्यासपीठ आहे जे ४२,०००+ विद्यार्थी, ५३६+ अधिकृत महाविद्यालये आणि ७,३४५+ परवानाधारक फार्मा युनिट्सना व्यावहारिक कौशल्य चाचणी, १५-मिनिटांचे ब्रिज कोर्सेस आणि थेट नोकऱ्यांसाठी जोडते.',
    gu: 'સ્કિલસેતુ એ કેન્દ્રીયકૃત આયુષ વેબ પ્લેટફોર્મ છે જે 42,000+ વિદ્યાર્થીઓ, 536+ માન્ય કોલેજો અને 7,345+ લાઇસન્સ પ્રાપ્ત ફાર્મા એકમોને વ્યવહારુ કૌશલ્ય પરીક્ષણ, 15-મિનિટના બ્રિજ કોર્સ અને સીધા પ્લેસમેન્ટ માટે જોડે છે.',
    ta: 'ஸ்கில்சேது என்பது 42,000+ மாணவர்கள், 536+ அனுமதிக்கப்பட்ட கல்லூரிகள் மற்றும் 7,345+ உரிமம் பெற்ற மருந்தக நிறுவனங்களை இணைக்கும் மத்திய ஆயுஷ் தளமாகும்.',
    te: 'స్కిల్‌సేతు అనేది 42,000+ విద్యార్థులు, 536+ అనుమతి పొందిన కళాశాలలు మరియు 7,345+ లైసెన్స్ పొందిన ఫార్మా విభాగాలను అనుసంధానించే కేంద్ర ఆయుష్ ప్లాట్‌ఫామ్.'
  },
  'Specializations:': {
    hi: 'विशेषज्ञताएं:', sa: 'विशिष्टक्षेत्राणि:', mr: 'विशेष शाखा:', gu: 'વિશેષતાઓ:', ta: 'சிறப்புப் பிரிவுகள்:', te: 'ప్రత్యేకతలు:', bn: 'বিশেষীকরণসমূহ:'
  },
  'Ayurveda (BAMS)': {
    hi: 'आयुर्वेद (बीएएमएस)', sa: 'आयुर्वेदः (BAMS)', mr: 'आयुर्वेद (BAMS)', gu: 'આયુર્વેદ (BAMS)', ta: 'ஆயுர்வேதம் (BAMS)', te: 'ఆయుర్వేదం (BAMS)'
  },
  'Yoga & Naturopathy (BNYS)': {
    hi: 'योग एवं प्राकृतिक चिकित्सा (बीएनवाईएस)', sa: 'योगः प्राकृतिकचिकित्सा च (BNYS)', mr: 'योग व निसर्गोपचार (BNYS)', gu: 'યોગ અને નેચરોપથી (BNYS)', ta: 'யோகா மற்றும் இயற்கை மருத்துவம் (BNYS)'
  },
  'Unani (BUMS)': {
    hi: 'यूनानी (बीयूएमएस)', sa: 'यूनानी-चिकित्सा (BUMS)', mr: 'युनानी (BUMS)', gu: 'યુનાની (BUMS)', ta: 'யுனானி (BUMS)'
  },
  'Siddha (BSMS)': {
    hi: 'सिद्ध (बीएसएमएस)', sa: 'सिद्ध-चिकित्सा (BSMS)', mr: 'सिद्ध (BSMS)', gu: 'સિદ્ધ (BSMS)', ta: 'சித்த மருத்துவம் (BSMS)'
  },
  'Homeopathy (BHMS)': {
    hi: 'होम्योपैथी (बीएचएमएस)', sa: 'समचिकित्सा (BHMS)', mr: 'होमिओपॅथी (BHMS)', gu: 'હોમિયોપેથી (BHMS)', ta: 'ஹோமியோபதி (BHMS)'
  },

  // --- NAVIGATION & CORE CTAS ---
  'Home': {
    hi: 'होम', sa: 'गृहम्', mr: 'मुख्यपृष्ठ', gu: 'હોમ', ta: 'முகப்பு', te: 'హోమ్', bn: 'হোম', kn: 'ಮುಖಪುಟ', ml: 'ഹോം', pa: 'ਮੁੱਖ ਪੰਨਾ', or: 'ମୁଖ୍ୟ ପୃଷ୍ଠା', ur: 'ہوم'
  },
  'How It Works': {
    hi: 'यह कैसे कार्य करता है', sa: 'कार्यप्रणाली कथम्', mr: 'हे कसे कार्य करते', gu: 'તે કેવી રીતે કાર્ય કરે છે', ta: 'இது எப்படி செயல்படுகிறது', te: 'ఇది ఎలా పనిచేస్తుంది', bn: 'এটি কীভাবে কাজ করে', kn: 'ಇದು ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ', ml: 'ഇത് എങ്ങനെ പ്രവർത്തിക്കുന്നു', pa: 'ਇਹ ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ', or: 'ଏହା କିପରି କାମ କରେ', ur: 'یہ کیسے کام کرتا ہے'
  },
  'Features': {
    hi: 'विशेषताएं', sa: 'वैशिष्ट्यानि', mr: 'वैशिष्ट्ये', gu: 'વિશેષતાઓ', ta: 'அம்சங்கள்', te: 'ఫీచర్లు', bn: 'বৈশিষ্ট্যসমূহ', kn: 'ವೈಶಿಷ್ಟ್ಯಗಳು', ml: 'സവിശേഷതകൾ', pa: 'ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ', or: 'ବିଶେଷତା', ur: 'خصوصیات'
  },
  'Fields & Skills': {
    hi: 'क्षेत्र एवं कौशल', sa: 'क्षेत्राणि च कौशल्यानि', mr: 'क्षेत्रे व कौशल्ये', gu: 'ક્ષેત્રો અને કૌશલ્યો', ta: 'துறைகள் மற்றும் திறன்கள்', te: 'రంగాలు మరియు నైపుణ్యాలు', bn: 'ক্ষেত্র ও দক্ষতাসমূহ', kn: 'ಕ್ಷೇತ್ರಗಳು ಮತ್ತು ಕೌಶಲ್ಯಗಳು', ml: 'മേഖലകളും കഴിവുകളും', pa: 'ਖੇਤਰ ਅਤੇ ਹੁਨਰ', or: 'କ୍ଷେତ୍ର ଏବଂ ଦକ୍ଷତା', ur: 'شعبہ جات اور مہارتیں'
  },
  'Comparison': {
    hi: 'तुलना', sa: 'तुलना', mr: 'तुलना', gu: 'તુલના', ta: 'ஒப்பீடு', te: 'పోలిక', bn: 'তুলনা', kn: 'ಹೋಲಿಕೆ', ml: 'താരતമ്യം', pa: 'ਤੁਲਨਾ', or: 'ତୁଳନା', ur: 'موازنہ'
  },
  'Sign In': {
    hi: 'साइन इन करें', sa: 'प्रवेशं कुर्वन्तु', mr: 'साइन इन करा', gu: 'સાઇન ઇન કરો', ta: 'உள்நுழையவும்', te: 'సైన్ ఇన్ చేయండి', bn: 'সাইন ইন করুন', kn: 'ಸೈನ್ ಇನ್ ಮಾಡಿ', ml: 'സൈൻ ഇൻ ചെയ്യുക', pa: 'ਸਾਈਨ ਇਨ ਕਰੋ', or: 'ସାଇନ୍ ଇନ୍ କରନ୍ତୁ', ur: 'سائن ان کریں'
  },
  'Sign Out': {
    hi: 'साइन आउट', sa: 'निर्गमनम्', mr: 'बाहेर पडा', gu: 'સાઇન આઉટ', ta: 'வெளியேறு', te: 'సైన్ అవుట్', bn: 'সাইন আউট', kn: 'ಸೈನ್ ಔಟ್', ml: 'സൈൻ ഔട്ട്', pa: 'ਸਾਈਨ ਆਊਟ', or: 'ସାଇନ୍ ଆଉଟ୍', ur: 'سائن آؤٹ'
  },
  'Notifications': {
    hi: 'सूचनाएं', sa: 'सूचनाः', mr: 'सूचना', gu: 'સૂચનાઓ', ta: 'அறிவிப்புகள்', te: 'నోటిఫికేషన్లు', bn: 'বিজ্ঞপ্তি', kn: 'ಸೂಚನೆಗಳು', ml: 'അറിയിപ്പുകൾ', pa: 'ਸੂਚਨਾਵਾਂ', or: 'ବିଜ୍ଞପ୍ତି', ur: 'اطلاعات'
  },
  'Verify Credential Integrity': {
    hi: 'प्रमाणपत्र प्रामाणिकता सत्यापित करें', sa: 'प्रमाणपत्रसत्यतासत्यापनम्', mr: 'प्रमाणपत्र पडताळणी करा', gu: 'પ્રમાણપત્ર ચકાસો', ta: 'சான்றிதழை சரிபார்க்கவும்', te: 'ధృవీకరణ పత్రాన్ని పరిశీలించండి', bn: 'সার্টিফিকেট যাচাই করুন'
  },
  'Select Your Ayush Portal': {
    hi: 'अपना आयुष पोर्टल चुनें', sa: 'स्वकीयायुषद्वारं चिनुत', mr: 'आपले आयुष पोर्टल निवडा', gu: 'તમારું આયુષ પોર્ટલ પસંદ કરો', ta: 'உங்கள் ஆயுஷ் போர்ட்டலைத் தேர்வுசெய்க', te: 'మీ ఆయుష్ పోర్టల్‌ను ఎంచుకోండి', bn: 'আপনার আয়ুষ পোর্টাল নির্বাচন করুন'
  },
  'Back to Home': {
    hi: 'होम पर वापस जाएं', sa: 'गृहं प्रति प्रत्यागमनम्', mr: 'मुख्यपृष्ठावर परत या', gu: 'હોમ પર પાછા જાઓ', ta: 'முகப்புக்குத் திரும்பு', te: 'హోమ్‌కు తిరిగి వెళ్లండి', bn: 'হোমে ফিরে যান'
  },
  'Get Started': {
    hi: 'आरंभ करें', sa: 'प्रारम्भं कुर्वन्तु', mr: 'सुरुवात करा', gu: 'શરૂ કરો', ta: 'தொடங்கவும்', te: 'ప్రారంభించండి', bn: 'শুরু করুন', kn: 'ಪ್ರಾರಂಭಿಸಿ', ml: 'ആരംഭിക്കുക', pa: 'ਸ਼ੁਰੂ ਕਰੋ', or: 'ଆରମ୍ଭ କରନ୍ତୁ', ur: 'شروع کریں'
  },
  'See How It Works': {
    hi: 'कार्यप्रणाली देखें', sa: 'कार्यप्रणालीं पश्यन्तु', mr: 'कार्यपद्धती पहा', gu: 'કાર્યપદ્ધતિ જુઓ', ta: 'செயல்முறையை காண்க', te: 'ఇది ఎలా పనిచేస్తుందో చూడండి', bn: 'কীভাবে কাজ করে দেখুন'
  },

  // --- HOW IT WORKS STEPS & FEATURES ---
  'Step 1: Open Portal': {
    hi: 'चरण 1: पोर्टल खोलें', sa: 'प्रथमं सोपानम्: द्वारम् उद्घाटयतु', mr: 'पायरी १: पोर्टल उघडा', gu: 'પગલું 1: પોર્ટલ ખોલો', ta: 'படி 1: போர்ட்டலைத் திறக்கவும்', te: 'దశ 1: పోర్టల్ తెరవండి'
  },
  'Visit the Portal': {
    hi: 'पोर्टल पर आएं', sa: 'जालमञ्चं पश्यतु', mr: 'पोर्टलला भेट द्या', gu: 'પોર્ટલની મુલાકાત લો', ta: 'போர்ட்டலை பார்வையிடவும்', te: 'పోర్టల్‌ను సందర్శించండి'
  },
  'Step 2: Quick Sign In': {
    hi: 'चरण 2: त्वरित साइन इन', sa: 'द्वितीयं सोपानम्: शीघ्रप्रवेशः', mr: 'पायरी २: जलद साइन इन', gu: 'પગલું 2: ઝડપી સાઇન ઇન', ta: 'படி 2: விரைவு உள்நுழைவு'
  },
  'Select Role & Sign In': {
    hi: 'भूमिका चुनें और साइन इन करें', sa: 'भूमिकां चिनुत प्रवेशं च कुरुत', mr: 'भूमिका निवडा आणि साइन इन करा', gu: 'ભૂમિકા પસંદ કરો અને સાઇન ઇન કરો', ta: 'பங்கைத் தேர்ந்தெடுத்து உள்நுழைக'
  },
  'Step 3: Test & Gap Check': {
    hi: 'चरण 3: परीक्षण एवं कौशल खाई जांच', sa: 'तृतीयं सोपानम्: परीक्षणं अन्तरपरीक्षणं च', mr: 'पायरी ३: चाचणी व तफावत पडताळणी'
  },
  'Give Skill Test & Know Skill Gap': {
    hi: 'कौशल परीक्षा दें और कौशल अंतर जानें', sa: 'कौशलपरीक्षणं दत्त्वा कौशलान्तरं जानन्तु', mr: 'कौशल्य चाचणी द्या आणि तफावत जाणा'
  },
  'Step 4: Bridge Modules': {
    hi: 'चरण 4: 15-मिनट ब्रिज मॉड्यूल', sa: 'चतुर्थं सोपानम्: सेतुपाठ्यक्रमाः', mr: 'पायरी ४: १५-मिनिटांचे ब्रिज मॉड्युल्स'
  },
  'Step 5: Practice & Certification': {
    hi: 'चरण 5: अभ्यास एवं प्रमाणन', sa: 'पञ्चमं सोपानम्: अभ्यासः प्रमाणनं च', mr: 'पायरी ५: सराव व प्रमाणपत्र'
  },
  'Step 6: Direct Placement': {
    hi: 'चरण 6: सीधा प्लेसमेंट', sa: 'षष्ठं सोपानम्: साक्षात्-नियोजनम्', mr: 'पायरी ६: थेट नोकरी संधी'
  },
  'Skill Up & Get Placed!': {
    hi: 'कौशल बढ़ाएं और नौकरी पाएं!', sa: 'कौशलं वर्धयित्वा नियोजनं प्राप्नोतु!', mr: 'कौशल्य वाढवा आणि नोकरी मिळवा!'
  },

  // --- PLATFORM CAPABILITIES ---
  'Practical Skill Assessment': {
    hi: 'व्यावहारिक कौशल मूल्यांकन', sa: 'व्यावहारिक-कौशल-मूल्यांकनम्', mr: 'व्यावहारिक कौशल्य मूल्यमापन', gu: 'વ્યવહારુ કૌશલ્ય મૂલ્યાંકન', ta: 'நடைமுறைத் திறன் மதிப்பீடு'
  },
  'Instant Skill-Gap Report': {
    hi: 'तात्कालिक कौशल अंतर रिपोर्ट', sa: 'सद्यः कौशलान्तर-विवरणम्', mr: 'त्वरित कौशल्य तफावत अहवाल', gu: 'ત્વરિત કૌશલ્ય અક્ષમતા રિપોર્ટ'
  },
  '15-Minute Bridge Modules': {
    hi: '15-मिनट व्यावहारिक ब्रिज मॉड्यूल', sa: '१५-निमेषात्मकाः सेतुपाठ्याः', mr: '१५-मिनिटांचे ब्रिज मॉड्युल्स'
  },
  'Job Match Score & Alerts': {
    hi: 'रोजगार मिलान अंक एवं अलर्ट', sa: 'वृत्ति-समीकरण-अङ्काः सूचनाः च', mr: 'नोकरी जुळवणी गुण आणि सूचना'
  },
  'Direct Industry Placements': {
    hi: 'सीधे उद्योग प्लेसमेंट', sa: 'साक्षात्-उद्योग-नियोजनानि', mr: 'थेट उद्योग प्लेसमेंट', gu: 'સીધા ઔદ્યોગિક પ્લેસમેન્ટ'
  },

  // --- TRUST METRICS ---
  'Students Assessed': {
    hi: 'मूल्यांकित विद्यार्थी', sa: 'परीक्षिताः छात्राः', mr: 'मूल्यमापन केलेले विद्यार्थी', gu: 'મૂલ્યાંકન કરેલ વિદ્યાર્થીઓ', ta: 'மதிப்பிடப்பட்ட மாணவர்கள்'
  },
  'Ayush Permitted Colleges': {
    hi: 'मान्यता प्राप्त आयुष कॉलेज', sa: 'अनुमताः आयुष-महाविद्यालयाः', mr: 'मान्यताप्राप्त आयुष महाविद्यालये', gu: 'માન્ય આયુષ કોલેજો'
  },
  'Licensed Pharma Units': {
    hi: 'लाइसेंस प्राप्त फार्मा इकाइयां', sa: 'अनुज्ञाप्राप्ताः फार्मा-घटकाः', mr: 'परवानाधारक फार्मा युनिट्स', gu: 'લાઇસન્સ પ્રાપ્ત ફાર્મા એકમો'
  },
  'Placement Readiness Gap Closed': {
    hi: 'उद्योग कौशल खाई पाटी गई', sa: 'कौशलान्तरं परिपूरितम्', mr: 'कौशल्य तफावत दूर झाली', gu: 'કૌશલ્ય તફાવત પૂર્ણ થયો'
  },

  // --- HOW SKILLSETU WORKS (FULL SENTENCES & STEPS) ---
  'How SkillSetu Works for Students': {
    hi: 'विद्यार्थियों के लिए स्किलसेतु कैसे कार्य करता है',
    sa: 'छात्रेभ्यः स्किलसेतुः कथं कार्यं करोति',
    mr: 'विद्यार्थ्यांसाठी स्किलसेतु कसे कार्य करते',
    gu: 'વિદ્યાર્થીઓ માટે સ્કિલસેતુ કેવી રીતે કાર્ય કરે છે',
    ta: 'மாணவர்களுக்கான ஸ்கில்சேது எவ்வாறு செயல்படுகிறது',
    te: 'విద్యార్థుల కోసం స్కిల్‌సేతు ఎలా పనిచేస్తుంది',
    bn: 'শিক্ষার্থীদের জন্য স্কিলসেতু কীভাবে কাজ করে'
  },
  'A simple, transparent 6-step journey designed for all students across rural and urban India to learn practical skills, bridge gaps, and get placed.': {
    hi: 'ग्रामीण और शहरी भारत के सभी विद्यार्थियों के लिए व्यावहारिक कौशल सीखने, अंतर पाटने और नौकरी पाने हेतु एक सरल, पारदर्शी 6-चरणीय यात्रा।',
    sa: 'ग्रामीण-नगर-भारतस्य सर्वेभ्यः छात्रेभ्यः व्यावहारिक-कौशल-शिक्षणाय, अन्तर-पूरणाय, वृत्ति-प्राप्तये च ६-सोपानात्मकः सरलः पारदर्शी मार्गः।',
    mr: 'ग्रामीण आणि शहरी भारतातील सर्व विद्यार्थ्यांसाठी व्यावहारिक कौशल्ये शिकण्यासाठी, तफावत भरून काढण्यासाठी आणि नोकरी मिळवण्यासाठी एक सोपा, पारदर्शी ६-टप्प्यांचा प्रवास.',
    gu: 'ગ્રામીણ અને શહેરી ભારતના તમામ વિદ્યાર્થીઓ માટે વ્યવહારુ કૌશલ્ય શીખવા, અંતર પૂરવા અને નોકરી મેળવવા માટે સરળ, પારદર્શક 6-પગલાંની પ્રક્રિયા.'
  },
  'Any Ayush student from any city or village can open SkillSetu on any mobile phone or computer with fast, simple, zero-confusion navigation.': {
    hi: 'किसी भी शहर या गांव का कोई भी आयुष छात्र तेज, सरल और बिना किसी भ्रम के किसी भी मोबाइल फोन या कंप्यूटर पर स्किलसेतु खोल सकता है।',
    sa: 'कस्यापि नगरस्य ग्रामस्य वा कश्चिदपि आयुष-छात्रः त्वरित-सरल-जालसञ्चारेण केनापि भ्रमं विना चलदूरभाषे सङ्गणके वा स्किलसेतु उद्घाटयितुं शक्नोति।',
    mr: 'कोणत्याही शहरातील किंवा गावातील कोणताही आयुष विद्यार्थी वेगवान, सोप्या आणि गोंधळमुक्त नेव्हिगेशनसह कोणत्याही मोबाईल किंवा संगणकावर स्किलसेतु उघडू शकतो.'
  },
  'Select "Student" and sign in securely with your student email, ABHA ID, or college roll number to access your personal dashboard.': {
    hi: 'अपने व्यक्तिगत डैशबोर्ड तक पहुंचने के लिए "विद्यार्थी" चुनें और अपने छात्र ईमेल, आभा आईडी या कॉलेज रोल नंबर के साथ सुरक्षित रूप से साइन इन करें।',
    sa: 'स्वकीयं व्यक्तिगतं पटलम् उपगन्तुं "छात्रः" इति चित्वा स्व-छात्र-ईमेल, आभा-क्रमाङ्केन वा सुरक्षिततया प्रवेशं कुर्वन्तु।',
    mr: 'आपल्या वैयक्तिक डॅशबोर्डवर जाण्यासाठी "विद्यार्थी" निवडा आणि आपल्या विद्यार्थी ईमेल, आभा आयडी किंवा कॉलेज रोल नंबरने सुरक्षितपणे साइन इन करा.'
  },
  'Complete short, practical assessments on clinical diagnosis, Schedule T GMP, and herb assays. The system instantly reveals your exact skill gap.': {
    hi: 'नैदानिक परीक्षण, शेड्यूल टी जीएमपी और हर्बल परख पर संक्षिप्त, व्यावहारिक मूल्यांकन पूरा करें। प्रणाली तुरंत आपके सटीक कौशल अंतर को प्रकट करती है।',
    sa: 'नैदानिक-परीक्षणे, शेड्यूल् टी जीएमपी तथा वनौषधि-परीक्षायां संक्षिप्तं व्यावहारिक-परीक्षणं समापयन्तु। प्रणाली तत्क्षणमेव भवतः वास्तविकं कौशलान्तरं सूचयति।',
    mr: 'क्लिनिकल निदान, शेड्युल टी जीएमपी आणि औषधी वनस्पती चाचणीवरील लहान, व्यावहारिक चाचण्या पूर्ण करा. प्रणाली त्वरित तुमची कौशल्य तफावत दाखवते.'
  },
  'SkillSetu automatically recommends short 15-minute practical bridge courses co-created with top Ayush pharma companies to quickly fix your missing skills.': {
    hi: 'स्किलसेतु आपकी अधूरी कौशलों को तुरंत पूरा करने के लिए शीर्ष आयुष फार्मा कंपनियों के सहयोग से निर्मित 15-मिनट के व्यावहारिक ब्रिज कोर्स की सिफारिश करता है।',
    sa: 'स्किलसेतुः भवतः अपूर्ण-कौशल्यानि सद्यः पूरयितुं प्रमुख-आयुष-फार्मा-संस्थाभिः सह निर्मितान् १५-निमेषात्मकान् व्यावहारिक-सेतुपाठ्यक्रमान् अनुमोदयति।',
    mr: 'स्किलसेतु आपली अपूर्ण कौशल्ये त्वरित दुरुस्त करण्यासाठी अग्रगण्य आयुष फार्मा कंपन्यांसोबत तयार केलेल्या १५-मिनिटांच्या व्यावहारिक ब्रिज कोर्सेसची शिफारस करते.'
  },
  'Practice simulated clinic cases, drug formulations, and herb identification. Earn verified certificates with unique hashes and QR codes.': {
    hi: 'सिम्युलेटेड क्लिनिक मामलों, दवा निर्माण और जड़ी-बूटी पहचान का अभ्यास करें। विशिष्ट हैश और क्यूआर कोड के साथ सत्यापित प्रमाणपत्र प्राप्त करें।',
    sa: 'काल्पनिक-चिकित्सा-प्रकरणानां, औषधि-निर्माणस्य, वनौषधि-अभिज्ञानस्य च अभ्यासं कुर्वन्तु। विशिष्ट-हैश्-सङ्केतैः क्युआर्-सङ्केतैः च सह प्रमाणितं प्रमाणपत्रं लभन्ताम्।',
    mr: 'सिम्युलेटेड क्लिनिक केसेस, औषध निर्मिती आणि वनस्पती ओळखीचा सराव करा. युनिक हॅश आणि क्यूआर कोडसह पडताळणी केलेली प्रमाणपत्रे मिळवा.'
  },
  'Apply with 1 click to verified Ayush pharma internships, clinical roles, and research assistantships using your verified digital portfolio.': {
    hi: 'अपने सत्यापित डिजिटल पोर्टफोलियो का उपयोग करके सत्यापित आयुष फार्मा इंटर्नशिप, क्लिनिकल भूमिकाओं और अनुसंधान सहायक पदों के लिए 1 क्लिक में आवेदन करें।',
    sa: 'स्व-प्रमाणित-अङ्कीय-विवरणिकायाः उपयोगेन १-क्लिक-मात्रेण प्रमाणितासु आयुष-फार्मा-इण्टर्नशिप्, नैदानिक-भूमिकासु, अनुसन्धान-सहायक-पदेषु च आवेदनं कुर्वन्तु।',
    mr: 'आपल्या पडताळलेल्या डिजिटल पोर्टफोलिओचा वापर करून १-क्लिकमध्ये पडताळणी केलेल्या आयुष फार्मा इंटर्नशिप, क्लिनिकल भूमिका आणि संशोधन सहाय्यक पदांसाठी अर्ज करा.'
  },
  'Step-by-Step Flow': {
    hi: 'चरण-दर-चरण प्रवाह', sa: 'सोपानक्रम-प्रवाहः', mr: 'टप्प्याटप्प्याने प्रवाह', gu: 'પગલાવાર પ્રક્રિયા'
  },
  'STEP 01': { hi: 'चरण 01', sa: 'सोपानम् ०१', mr: 'पायरी ०१', gu: 'પગલું 01' },
  'STEP 02': { hi: 'चरण 02', sa: 'सोपानम् ०२', mr: 'पायरी ०२', gu: 'પગલું 02' },
  'STEP 03': { hi: 'चरण 03', sa: 'सोपानम् ०३', mr: 'पायरी ०३', gu: 'પગલું 03' },
  'STEP 04': { hi: 'चरण 04', sa: 'सोपानम् ०४', mr: 'पायरी ०४', gu: 'પગલું 04' },
  'STEP 05': { hi: 'चरण 05', sa: 'सोपानम् ०५', mr: 'पायरी ०५', gu: 'પગલું 05' },
  'STEP 06': { hi: 'चरण 06', sa: 'सोपानम् ०६', mr: 'पायरी ०६', gu: 'પગલું 06' },
  'Take 15-Minute Bridge Modules': {
    hi: '15-मिनट ब्रिज मॉड्यूल लें', sa: '१५-निमेषात्मक-सेतुपाठ्यं स्वीकुर्वन्तु', mr: '१५-मिनिटांचे ब्रिज मॉड्युल्स घ्या'
  },
  'Practice & Earn Verification': {
    hi: 'अभ्यास करें और सत्यापन अर्जित करें', sa: 'अभ्यासं कृत्वा प्रमाणनं प्राप्नुवन्तु', mr: 'सराव करा आणि पडताळणी मिळवा'
  },
  '1-Click Direct Placement': {
    hi: '1-क्लिक सीधा प्लेसमेंट', sa: '१-क्लिक साक्षात्-नियोजनम्', mr: '१-क्लिक थेट नोकरी संधी'
  },
  'Accessible on any mobile or desktop device': {
    hi: 'किसी भी मोबाइल या डेस्कटॉप डिवाइस पर सुलभ', sa: 'केनापि चलदूरभाषेण सङ्गणकेन वा सुलभम्', mr: 'कोणत्याही मोबाईल किंवा संगणकावर उपलब्ध'
  },
  'Simple, clear language designed for all students': {
    hi: 'सभी विद्यार्थियों के लिए उपयुक्त सरल और स्पष्ट भाषा', sa: 'सर्वेषां छात्राणां कृते सरला स्पष्टा च भाषा', mr: 'सर्व विद्यार्थ्यांसाठी सोपी आणि स्पष्ट भाषा'
  },
  'Instant access without complicated steps': {
    hi: 'जटिल चरणों के बिना तुरंत पहुंच', sa: 'जटिलसोपानेभ्यः विना सद्यः प्रवेशः', mr: 'जटिल टप्प्यांशिवाय त्वरित प्रवेश'
  },
  'One-click role selection (Student / College / Company)': {
    hi: 'एक-क्लिक भूमिका चयन (विद्यार्थी / कॉलेज / कंपनी)', sa: 'एक-क्लिकेन भूमिका-चयनम् (छात्रः / महाविद्यालयः / उद्योगः)', mr: 'एक-क्लिक भूमिका निवड (विद्यार्थी / कॉलेज / कंपनी)'
  },
  'Fast and secure login with OTP or password': {
    hi: 'ओटीपी या पासवर्ड के साथ तेज और सुरक्षित लॉगिन', sa: 'ओटीपी-सङ्केतेन गुप्तपदेन वा त्वरित-सुरक्षित-प्रवेशः', mr: 'ओटीपी किंवा पासवर्डसह जलद आणि सुरक्षित लॉगिन'
  },
  'Instant access to your personalized learning workspace': {
    hi: 'अपने व्यक्तिगत अध्ययन कार्यक्षेत्र तक त्वरित पहुंच', sa: 'स्वकीय-व्यक्तिगत-अध्ययन-स्थले सद्यः प्रवेशः', mr: 'आपल्या वैयक्तिक शिक्षण कार्यक्षेत्रात त्वरित प्रवेश'
  },
  'Short, timed practical assessment questions': {
    hi: 'संक्षिप्त, समयबद्ध व्यावहारिक मूल्यांकन प्रश्न', sa: 'संक्षिप्ताः समयबद्धाः व्यावहारिकाः परीक्षणप्रश्नाः', mr: 'लहान, वेळेनुसार व्यावहारिक चाचणी प्रश्न'
  },
  'Identifies exact clinical & lab skill gaps': {
    hi: 'सटीक नैदानिक और प्रयोगशाला कौशल कमियों की पहचान करता है', sa: 'सटीक-नैदानिक-प्रयोगशाला-कौशलान्तरं सूचयति', mr: 'अचूक क्लिनिकल आणि लॅब कौशल्य तफावत ओळखते'
  },
  'Clear, visual readiness score report': {
    hi: 'स्पष्ट, दृश्य तत्परता स्कोर रिपोर्ट', sa: 'स्पष्टा दृश्या च सज्जता-अङ्क-विवरणिका', mr: 'स्पष्ट, दृश्यमान सज्जता स्कोअर अहवाल'
  },
  'Platform Access': {
    hi: 'मंच पहुंच', sa: 'मञ्चप्रवेशः', mr: 'व्यासपीठ प्रवेश'
  },
  '100% Free & Open': {
    hi: '100% निःशुल्क एवं खुला', sa: '१००% निःशुल्कं विवृतं च', mr: '१००% मोफत व खुले'
  },
  'Sign In Time': {
    hi: 'साइन इन समय', sa: 'प्रवेशसमयः', mr: 'साइन इन वेळ'
  },
  'Under 30 Seconds': {
    hi: '30 सेकंड से कम', sa: '३० निमेषार्धतः न्यूनम्', mr: '३० सेकंदांपेक्षा कमी'
  },
  'Gap Detection': {
    hi: 'कौशल अंतर पहचान', sa: 'कौशलान्तर-परिज्ञानम्', mr: 'तफावत शोध'
  },
  'Instant Analysis': {
    hi: 'त्वरित विश्लेषण', sa: 'सद्यः विश्लेषणम्', mr: 'त्वरित विश्लेषण'
  },


  // --- DASHBOARD TABS & ROLES ---
  'Student Portal': {
    hi: 'विद्यार्थी पोर्टल', sa: 'छात्रद्वारम्', mr: 'विद्यार्थी पोर्टल', gu: 'વિદ્યાર્થી પોર્ટલ', ta: 'மாணவர் போர்டல்', te: 'విద్యార్థి పోర్టల్'
  },
  'Company Console': {
    hi: 'उद्योग कंसोल', sa: 'उद्योगपटलम्', mr: 'उद्योग कन्सोल', gu: 'કંપની કન્સોલ', ta: 'நிறுவன கன்சோல்', te: 'కంపెనీ కన్సోల్'
  },
  'Faculty Console': {
    hi: 'संकाय कंसोल', sa: 'प्राध्यापकपटलम्', mr: 'प्राध्यापक कन्सोल', gu: 'ફેકલ્ટી કન્સોલ', ta: 'பேராசிரியர் கன்சோல்'
  },
  'Ministry Command': {
    hi: 'मंत्रालय नियंत्रण कक्ष', sa: 'मन्त्रालयपटलम्', mr: 'मंत्रालय कमांड', gu: 'મંત્રાલય કમાન્ડ', ta: 'அமைச்சகக் கட்டளை'
  },
  'Feed': {
    hi: 'सामुदायिक फ़ीड', sa: 'समुदायसंवादः', mr: 'फीड', gu: 'ફીડ', ta: 'சமூகப் பதிவு', te: 'ఫీడ్', bn: 'ফিড'
  },
  'Courses': {
    hi: 'पाठ्यक्रम', sa: 'पाठ्यक्रमाः', mr: 'अभ्यासक्रम', gu: 'અભ્યાસક્રમ', ta: 'பாடப்பிரிவுகள்', te: 'కోర్సులు', bn: 'কোর্সসমূহ'
  },
  'Jobs': {
    hi: 'रोजगार अवसर', sa: 'वृत्ति-अवसराः', mr: 'नोकऱ्या', gu: 'નોકરીઓ', ta: 'வேலைவாய்ப்புகள்', te: 'ఉద్యోగాలు', bn: 'চাকরি'
  },
  'Skills': {
    hi: 'व्यावहारिक कौशल', sa: 'कौशल्यानि', mr: 'कौशल्ये', gu: 'કૌશલ્યો', ta: 'திறன்கள்', te: 'నైపుణ్యాలు', bn: 'দক্ষতা'
  },
  'Messages': {
    hi: 'संदेश', sa: 'सन्देशाः', mr: 'संदेश', gu: 'સંદેશાઓ', ta: 'செய்திகள்', te: 'సందేశాలు', bn: 'বার্তাসমূহ'
  },
  'Verification': {
    hi: 'सत्यापन', sa: 'सत्यापनम्', mr: 'पडताळणी', gu: 'ચકાસણી', ta: 'சரிபார்ப்பு', te: 'ధృవీకరణ', bn: 'যাচাইকরণ'
  },
  'Self Assessment': {
    hi: 'स्व-मूल्यांकन', sa: 'आत्मपरीक्षणम्', mr: 'स्वयंमूल्यमापन', gu: 'સ્વ-મૂલ્યાંકન', ta: 'சுய மதிப்பீடு'
  },
  'Download PDF': {
    hi: 'पीडीएफ डाउनलोड करें', sa: 'पीडीएफ अवतरणम्', mr: 'पीडीएफ डाउनलोड करा', gu: 'પીડીએફ ડાઉનલોડ કરો', ta: 'PDF பதிவிறக்கவும்'
  }
};

const BhashiniContext = createContext(null);

export const BhashiniProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    try {
      // Check googtrans cookie if set
      const match = document.cookie.match(/(?:^|;\s*)googtrans=\/en\/([a-zA-Z_-]+)/);
      if (match && match[1] && match[1] !== 'en') {
        const revMap = { 'gom': 'kok', 'mni-Mtei': 'mni' };
        return revMap[match[1]] || match[1];
      }
      return localStorage.getItem('bhashini_language') || 'en';
    } catch {
      return 'en';
    }
  });

  const [isTranslating, setIsTranslating] = useState(false);
  const originalNodesMap = useRef(new Map());

  // Language Change Handler with full-page refresh synchronization
  const changeLanguage = useCallback((langCode) => {
    setCurrentLanguage(langCode);
    setIsTranslating(true);

    try {
      localStorage.setItem('bhashini_language', langCode);
    } catch {}

    // Map language code to Google Translate if needed
    const gtMap = {
      'kok': 'gom',
      'mni': 'mni-Mtei',
    };
    const targetCode = gtMap[langCode] || langCode;

    // Cookie management for full-page neural translation engine
    if (langCode === 'en') {
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
      document.cookie = 'googtrans=/en/en; path=/;';
      document.cookie = `googtrans=/en/en; path=/; domain=${window.location.hostname};`;
    } else {
      document.cookie = `googtrans=/en/${targetCode}; path=/;`;
      document.cookie = `googtrans=/en/${targetCode}; path=/; domain=${window.location.hostname};`;
    }

    // Try dispatching directly to Google Translate dropdown if available
    try {
      const selectEl = document.querySelector('#google_translate_element select');
      if (selectEl) {
        selectEl.value = targetCode;
        selectEl.dispatchEvent(new Event('change'));
      }
    } catch (e) {}

    window.dispatchEvent(new CustomEvent('bhashini_language_change', {
      detail: { language: langCode }
    }));

    // Auto-refresh the content and apply on whole page as requested by user
    setTimeout(() => {
      window.location.reload();
    }, 120);
  }, []);

  // Comprehensive DOM Translation Engine across ALL Page Content
  useEffect(() => {
    if (currentLanguage === 'en') {
      // Revert all modified nodes cleanly back to exact original English
      originalNodesMap.current.forEach((originalText, node) => {
        if (node && node.nodeValue !== undefined) {
          node.nodeValue = originalText;
        }
      });
      originalNodesMap.current.clear();
      return;
    }

    const translateAllContent = () => {
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode: (node) => {
            const parent = node.parentElement;
            if (!parent) return NodeFilter.FILTER_REJECT;

            // Skip code, script, sensitive IDs, inputs, and elements marked notranslate
            if (
              parent.closest('.bhashini-skip-translation') ||
              parent.closest('.notranslate') ||
              parent.closest('code') ||
              parent.closest('pre') ||
              parent.closest('script') ||
              parent.closest('style') ||
              parent.closest('textarea') ||
              parent.closest('input')
            ) {
              return NodeFilter.FILTER_REJECT;
            }

            const val = node.nodeValue.trim();
            if (!val || val.length < 2 || /^\d+$/.test(val)) {
              return NodeFilter.FILTER_SKIP;
            }
            return NodeFilter.FILTER_ACCEPT;
          }
        }
      );

      let node;

      while ((node = walker.nextNode())) {
        const rawText = node.nodeValue;
        const trimmed = rawText.trim();

        // High-Precision Match for Full Sentences, Headings, Paragraphs
        // (No word-level regex replacement to prevent mixed Hinglish sentences)
        if (BHASHINI_DICTIONARY[trimmed] && BHASHINI_DICTIONARY[trimmed][currentLanguage]) {
          if (!originalNodesMap.current.has(node)) {
            originalNodesMap.current.set(node, rawText);
          }
          const translated = BHASHINI_DICTIONARY[trimmed][currentLanguage];
          const leadingSpace = rawText.match(/^\s*/)[0];
          const trailingSpace = rawText.match(/\s*$/)[0];
          node.nodeValue = `${leadingSpace}${translated}${trailingSpace}`;
        }
      }
    };

    // Run translation immediately
    const timer = setTimeout(translateAllContent, 30);

    // Watch for dynamic route transitions and tab changes
    const observer = new MutationObserver(() => {
      clearTimeout(timer);
      setTimeout(translateAllContent, 60);
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [currentLanguage]);

  const activeLangObj = BHASHINI_LANGUAGES.find(l => l.code === currentLanguage) || BHASHINI_LANGUAGES[0];

  return (
    <BhashiniContext.Provider
      value={{
        languages: BHASHINI_LANGUAGES,
        currentLanguage,
        activeLangObj,
        changeLanguage,
        isTranslating
      }}
    >
      {children}
    </BhashiniContext.Provider>
  );
};

export const useBhashini = () => {
  const context = useContext(BhashiniContext);
  if (!context) {
    throw new Error('useBhashini must be used within a BhashiniProvider');
  }
  return context;
};
