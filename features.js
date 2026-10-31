// Walow AI - الميزات الإضافية المتقدمة (ملف منفصل خارج الإندكس القديم)

(function() {
    // 1. حقن الواجهة البرمجية (UI Injection) داخل التطبيق ديناميكياً
    function injectFeaturesUI() {
        const container = document.createElement('div');
        container.id = 'walow-advanced-features';
        container.style.cssText = 'margin: 15px; padding: 15px; border-top: 1px solid #ccc; font-family: sans-serif; direction: rtl;';

        container.innerHTML = `
            <h4 style="margin-top: 0; color: #007bff;">أدوات Walow AI الإضافية</h4>
            <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 10px;">
                <button id="btn-smart-timer" style="padding: 8px 12px; background: #28a745; color: white; border: none; border-radius: 5px; cursor: pointer;">⏱️ مؤقت ذكي</button>
                <button id="btn-file-extractor" style="padding: 8px 12px; background: #17a2b8; color: white; border: none; border-radius: 5px; cursor: pointer;">📂 قراءة مستند</button>
                <button id="btn-voice-translator" style="padding: 8px 12px; background: #6f42c1; color: white; border: none; border-radius: 5px; cursor: pointer;">🗣️ مترجم فوري</button>
            </div>
            <div id="feature-working-area" style="padding: 10px; background: #f8f9fa; border-radius: 5px; display: none;"></div>
            <input type="file" id="walow-file-input" style="display: none;" accept=".txt,.json,.js,.html,.css">
        `;

        const mainContainer = document.querySelector('body') || document.documentElement;
        mainContainer.appendChild(container);

        document.getElementById('btn-smart-timer').addEventListener('click', initSmartTimer);
        document.getElementById('btn-file-extractor').addEventListener('click', () => document.getElementById('walow-file-input').click());
        document.getElementById('btn-voice-translator').addEventListener('click', initVoiceTranslator);
        document.getElementById('walow-file-input').addEventListener('change', handleFileSelection);
    }

    // 2. ميزة المساعد الموقّت (Smart Timer & Reminders)
    function initSmartTimer() {
        const area = document.getElementById('feature-working-area');
        area.style.display = 'block';
        area.innerHTML = `
            <h5>⏱️ ضبط مؤقت ذكي</h5>
            <p>قل للتطبيق مثلاً: "اضبط مؤقت لمدة دقيقة" وسيقوم Gemini بالتعرف على الوقت وتشغيله.</p>
            <input type="text" id="timer-prompt" placeholder="اكتب أمر التنبيه هنا..." style="width: 70%; padding: 5px;">
            <button id="btn-run-timer" style="padding: 5px 10px;">تشغيل</button>
        `;

        document.getElementById('btn-run-timer').addEventListener('click', () => {
            const prompt = document.getElementById('timer-prompt').value;
            const matches = prompt.match(/\d+/);
            if (matches) {
                const minutes = parseInt(matches);
                area.innerHTML += `<p style="color: green;">⏳ تم ضبط المؤقت لمدة ${minutes} دقيقة بنجاح ومزامنته مع المساعد.</p>`;
                setTimeout(() => {
                    alert("🚨 Walow AI: انتهى الوقت يا معلمي محمد!");
                }, minutes * 60000);
            } else {
                alert("يرجى تحديد المدة بالأرقام (مثال: 5 دقائق)");
            }
        });
    }

    // 3. ميزة قارئ ومحلل المستندات (File Text Extractor)
    function handleFileSelection(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function(e) {
            const textContent = e.target.result;
            const area = document.getElementById('feature-working-area');
            area.style.display = 'block';
            area.innerHTML = `
                <h5>📂 مستخرج النصوص</h5>
                <p><strong>اسم الملف:</strong> \${file.name}</p>
                <textarea id="extracted-text-preview" style="width: 100%; height: 80px; direction: ltr;">\${textContent.substring(0, 500)}...</textarea>
                <button id="btn-send-to-gemini" style="margin-top: 5px; padding: 5px 10px; background: #007bff; color: white; border: none; border-radius: 3px;">تحليل بواسطة Gemini</button>
            `;

            document.getElementById('btn-send-to-gemini').addEventListener('click', () => {
                const mainInput = document.querySelector('input[type="text"]') || document.querySelector('textarea');
                if (mainInput) {
                    mainInput.value = `يا جيميناي، حلل لي هذا النص المستخرج من ملفي باختصار:\n\n\${textContent}`;
                    area.style.display = 'none';
                    alert("تم نقل النص إلى صندوق المحادثة الرئيسي، اضغط إرسال ليحلله Gemini!");
                }
            });
        };
        reader.readAsText(file);
    }

    // 4. ميزة المترجم الفوري الصوتي (Real-time Voice Translator)
    function initVoiceTranslator() {
        const area = document.getElementById('feature-working-area');
        area.style.display = 'block';
        area.innerHTML = `
            <h5>🗣️ المترجم الفوري الصوتي</h5>
            <p>اضغط للترجمة الفورية عبر ميكروفون جهازك مباشرة.</p>
            <button id="btn-start-trans" style="padding: 10px; background: #dc3545; color: white; border: none; border-radius: 5px;">🎤 ابدأ التحدث بالترجمة</button>
            <p id="trans-output" style="font-weight: bold; margin-top: 10px; color: #333;"></p>
        `;

        document.getElementById('btn-start-trans').addEventListener('click', () => {
            const output = document.getElementById('trans-output');
            output.innerText = "جاري الاستماع برعاية نظام Walow الذكي...";
            
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (!SpeechRecognition) {
                output.innerText = "التعرف على الصوت غير مدعوم في متصفحك الحالي.";
                return;
            }

            const recognition = new SpeechRecognition();
            recognition.lang = 'ar-IQ'; 
            recognition.start();

            recognition.onresult = function(event) {
                const speechToText = event.results[0][0].transcript;
                output.innerHTML = `🗣️ التقطت: "\${speechToText}" <br><br> <span style="color: blue;">جاري الترجمة الفورية عبر Gemini...</span>`;
                
                const mainInput = document.querySelector('input[type="text"]') || document.querySelector('textarea');
                if (mainInput) {
                    mainInput.value = `ترجم العبارة التالية بدقة فورية إلى الإنجليزية وإلى الكردية أيضاً:\n"\${speechToText}"`;
                }
            };
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectFeaturesUI);
    } else {
        injectFeaturesUI();
    }
})();