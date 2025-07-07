// 100 ta mashhur til ro'yxati
const languages = [
    { code: 'af', name: 'Afrikaans' },
    { code: 'sq', name: 'Albanian' },
    { code: 'am', name: 'Amharic' },
    { code: 'ar', name: 'Arabic' },
    { code: 'hy', name: 'Armenian' },
    { code: 'az', name: 'Azerbaijani' },
    { code: 'eu', name: 'Basque' },
    { code: 'be', name: 'Belarusian' },
    { code: 'bn', name: 'Bengali' },
    { code: 'bs', name: 'Bosnian' },
    { code: 'bg', name: 'Bulgarian' },
    { code: 'ca', name: 'Catalan' },
    { code: 'ceb', name: 'Cebuano' },
    { code: 'ny', name: 'Chichewa' },
    { code: 'zh', name: 'Chinese (Simplified)' },
    { code: 'zh-TW', name: 'Chinese (Traditional)' },
    { code: 'co', name: 'Corsican' },
    { code: 'hr', name: 'Croatian' },
    { code: 'cs', name: 'Czech' },
    { code: 'da', name: 'Danish' },
    { code: 'nl', name: 'Dutch' },
    { code: 'en', name: 'English' },
    { code: 'eo', name: 'Esperanto' },
    { code: 'et', name: 'Estonian' },
    { code: 'fi', name: 'Finnish' },
    { code: 'fr', name: 'French' },
    { code: 'fy', name: 'Frisian' },
    { code: 'gl', name: 'Galician' },
    { code: 'ka', name: 'Georgian' },
    { code: 'de', name: 'German' },
    { code: 'el', name: 'Greek' },
    { code: 'gu', name: 'Gujarati' },
    { code: 'ht', name: 'Haitian Creole' },
    { code: 'ha', name: 'Hausa' },
    { code: 'haw', name: 'Hawaiian' },
    { code: 'iw', name: 'Hebrew' },
    { code: 'hi', name: 'Hindi' },
    { code: 'hmn', name: 'Hmong' },
    { code: 'hu', name: 'Hungarian' },
    { code: 'is', name: 'Icelandic' },
    { code: 'ig', name: 'Igbo' },
    { code: 'id', name: 'Indonesian' },
    { code: 'ga', name: 'Irish' },
    { code: 'it', name: 'Italian' },
    { code: 'ja', name: 'Japanese' },
    { code: 'jw', name: 'Javanese' },
    { code: 'kn', name: 'Kannada' },
    { code: 'kk', name: 'Kazakh' },
    { code: 'km', name: 'Khmer' },
    { code: 'ko', name: 'Korean' },
    { code: 'ku', name: 'Kurdish (Kurmanji)' },
    { code: 'ky', name: 'Kyrgyz' },
    { code: 'lo', name: 'Lao' },
    { code: 'la', name: 'Latin' },
    { code: 'lv', name: 'Latvian' },
    { code: 'lt', name: 'Lithuanian' },
    { code: 'lb', name: 'Luxembourgish' },
    { code: 'mk', name: 'Macedonian' },
    { code: 'mg', name: 'Malagasy' },
    { code: 'ms', name: 'Malay' },
    { code: 'ml', name: 'Malayalam' },
    { code: 'mt', name: 'Maltese' },
    { code: 'mi', name: 'Maori' },
    { code: 'mr', name: 'Marathi' },
    { code: 'mn', name: 'Mongolian' },
    { code: 'my', name: 'Myanmar (Burmese)' },
    { code: 'ne', name: 'Nepali' },
    { code: 'no', name: 'Norwegian' },
    { code: 'ps', name: 'Pashto' },
    { code: 'fa', name: 'Persian' },
    { code: 'pl', name: 'Polish' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'pa', name: 'Punjabi' },
    { code: 'ro', name: 'Romanian' },
    { code: 'ru', name: 'Russian' },
    { code: 'sm', name: 'Samoan' },
    { code: 'gd', name: 'Scots Gaelic' },
    { code: 'sr', name: 'Serbian' },
    { code: 'st', name: 'Sesotho' },
    { code: 'sn', name: 'Shona' },
    { code: 'sd', name: 'Sindhi' },
    { code: 'si', name: 'Sinhala' },
    { code: 'sk', name: 'Slovak' },
    { code: 'sl', name: 'Slovenian' },
    { code: 'so', name: 'Somali' },
    { code: 'es', name: 'Spanish' },
    { code: 'su', name: 'Sundanese' },
    { code: 'sw', name: 'Swahili' },
    { code: 'sv', name: 'Swedish' },
    { code: 'tl', name: 'Tagalog (Filipino)' },
    { code: 'tg', name: 'Tajik' },
    { code: 'ta', name: 'Tamil' },
    { code: 'te', name: 'Telugu' },
    { code: 'th', name: 'Thai' },
    { code: 'tr', name: 'Turkish' },
    { code: 'uk', name: 'Ukrainian' },
    { code: 'ur', name: 'Urdu' },
    { code: 'uz', name: 'Uzbek' },
    { code: 'vi', name: 'Vietnamese' },
    { code: 'cy', name: 'Welsh' },
    { code: 'xh', name: 'Xhosa' },
    { code: 'yi', name: 'Yiddish' },
    { code: 'yo', name: 'Yoruba' },
    { code: 'zu', name: 'Zulu' }
];

// DOM elementlarini olish
const fromLang = document.getElementById('from-lang');
const toLang = document.getElementById('to-lang');
const swapBtn = document.getElementById('swap-btn');
const inputText = document.getElementById('input-text');
const outputText = document.getElementById('output-text');
const speakBtn = document.getElementById('speak-btn');
const ttsBtn = document.getElementById('tts-btn');
const copyBtn = document.getElementById('copy-btn');
const translateBtn = document.getElementById('translate-btn');

// Tillarni selectlarga joylash
function populateLanguages() {
    fromLang.innerHTML = '';
    toLang.innerHTML = '';
    languages.forEach(lang => {
        const option1 = document.createElement('option');
        option1.value = lang.code;
        option1.textContent = lang.name;
        fromLang.appendChild(option1);
        const option2 = document.createElement('option');
        option2.value = lang.code;
        option2.textContent = lang.name;
        toLang.appendChild(option2);
    });
    fromLang.value = 'uz';
    toLang.value = 'en';
}
populateLanguages();

// Tillarni almashtirish
swapBtn.addEventListener('click', () => {
    const temp = fromLang.value;
    fromLang.value = toLang.value;
    toLang.value = temp;
    // Matnlarni ham almashtirish
    const tempText = inputText.value;
    inputText.value = outputText.textContent !== 'Tarjima natijasi bu yerda chiqadi' ? outputText.textContent : '';
    outputText.textContent = tempText || 'Tarjima natijasi bu yerda chiqadi';
});

// Gapirish (Speech-to-Text)
speakBtn.addEventListener('click', () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        alert('Brauzeringiz gapirishni qo\'llab-quvvatlamaydi!');
        return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = fromLang.value;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.start();
    speakBtn.classList.add('listening');
    speakBtn.textContent = '🎙️';
    recognition.onresult = (event) => {
        inputText.value = event.results[0][0].transcript;
        speakBtn.classList.remove('listening');
        speakBtn.innerHTML = '<span>🎤</span>';
    };
    recognition.onerror = () => {
        speakBtn.classList.remove('listening');
        speakBtn.innerHTML = '<span>🎤</span>';
    };
    recognition.onend = () => {
        speakBtn.classList.remove('listening');
        speakBtn.innerHTML = '<span>🎤</span>';
    };
});

// So'zlab berish (Text-to-Speech)
ttsBtn.addEventListener('click', () => {
    if (!('speechSynthesis' in window)) {
        alert('Brauzeringiz so\'zlab berishni qo\'llab-quvvatlamaydi!');
        return;
    }
    const utter = new SpeechSynthesisUtterance(outputText.textContent);
    utter.lang = toLang.value;
    window.speechSynthesis.speak(utter);
});

// Nusxa olish
copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(outputText.textContent);
    copyBtn.textContent = '✅';
    setTimeout(() => {
        copyBtn.innerHTML = '<span>📋</span>';
    }, 1200);
});

// Noodatiy animatsiya uchun Translate tugmasi
translateBtn.addEventListener('mousedown', () => {
    translateBtn.style.transform = 'scale(0.95) rotate(-2deg)';
});
translateBtn.addEventListener('mouseup', () => {
    translateBtn.style.transform = '';
});
translateBtn.addEventListener('mouseleave', () => {
    translateBtn.style.transform = '';
});

// Google Translate API bilan tarjima qilish
async function translateWithGoogle(text, fromLang, toLang) {
    try {
        // Google Translate API (bepul proxy orqali)
        const response = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${fromLang}&tl=${toLang}&dt=t&q=${encodeURIComponent(text)}`);
        
        if (!response.ok) {
            throw new Error('Google Translate API xatosi');
        }
        
        const data = await response.json();
        
        if (data && data[0] && data[0][0] && data[0][0][0]) {
            return data[0][0][0];
        } else {
            throw new Error('Tarjima natijasi topilmadi');
        }
    } catch (error) {
        console.error('Google Translate xatosi:', error);
        throw error;
    }
}

// Tarjima qilish funksiyasi (Google Translate asosiy)
async function translateText(text, fromLang, toLang) {
    try {
        // Google Translate API bilan urinish
        const result = await translateWithGoogle(text, fromLang, toLang);
        return result;
    } catch (error) {
        console.error('Google Translate xatosi:', error);
        
        try {
            // Agar Google Translate ishlamasa, LibreTranslate ga o'tish
            const response = await fetch('https://libretranslate.de/translate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    q: text,
                    source: fromLang,
                    target: toLang,
                    format: 'text'
                })
            });
            
            const data = await response.json();
            
            if (data.translatedText) {
                return data.translatedText;
            } else {
                throw new Error('LibreTranslate xatosi');
            }
        } catch (fallbackError) {
            console.error('Fallback xatosi:', fallbackError);
            
            // Murakkab so'zlar uchun maxsus xabar
            if (text.length > 50 || text.includes(' ') && text.split(' ').length > 5) {
                return 'Murakkab matn uchun ChatGPT API tavsiya etiladi. Iltimos, API key qo\'shing yoki matnni qismlarga bo\'lib tarjima qiling.';
            }
            
            return 'Tarjima qilishda xatolik yuz berdi. Iltimos, qaytadan urinib ko\'ring.';
        }
    }
}

// ChatGPT API bilan manoli tarjima qilish (agar API key bo'lsa)
async function translateWithChatGPT(text, fromLang, toLang) {
    const OPENAI_API_KEY = ''; // Bu yerga OpenAI API keyingizni kiriting
    
    if (!OPENAI_API_KEY) {
        return await translateText(text, fromLang, toLang);
    }
    
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: `Siz professional tarjimon bo'lasiz. Matnni ${fromLang} tilidan ${toLang} tiliga manoli va kontekstli tarjima qiling. Murakkab so'zlar va iboralarni to'g'ri tarjima qiling.`
                    },
                    {
                        role: 'user',
                        content: text
                    }
                ],
                max_tokens: 2000,
                temperature: 0.3
            })
        });
        
        const data = await response.json();
        if (data.choices && data.choices[0]) {
            return data.choices[0].message.content;
        } else {
            throw new Error('ChatGPT API xatosi');
        }
    } catch (error) {
        console.error('ChatGPT API xatosi:', error);
        return await translateText(text, fromLang, toLang);
    }
}

// Tarjima tugmasi uchun event listener
translateBtn.addEventListener('click', async () => {
    const text = inputText.value.trim();
    const fromLanguage = fromLang.value;
    const toLanguage = toLang.value;
    
    if (!text) {
        outputText.textContent = 'Iltimos, tarjima qilish uchun matn kiriting!';
        return;
    }
    
    if (fromLanguage === toLanguage) {
        outputText.textContent = 'Bir xil tillar tanlangan!';
        return;
    }
    
    // Tugmani loading holatiga o'tkazish
    translateBtn.textContent = 'Tarjima qilinmoqda...';
    translateBtn.disabled = true;
    outputText.textContent = 'Tarjima qilinmoqda...';
    
    try {
        const translatedText = await translateWithChatGPT(text, fromLanguage, toLanguage);
        outputText.textContent = translatedText;
    } catch (error) {
        outputText.textContent = 'Tarjima qilishda xatolik yuz berdi. Iltimos, qaytadan urinib ko\'ring.';
    } finally {
        // Tugmani normal holatga qaytarish
        translateBtn.textContent = 'Tarjima';
        translateBtn.disabled = false;
    }
});

// Enter tugmasi bilan ham tarjima qilish
inputText.addEventListener('keypress', async (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        translateBtn.click();
    }
});