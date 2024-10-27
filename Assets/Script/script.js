document.addEventListener('DOMContentLoaded', function () {
    const terminal = document.getElementById('terminal');
    const output = document.getElementById('output');
    const input = document.getElementById('input');
    const typedText = document.getElementById('typedText');
    const wpmDisplay = document.getElementById('wpm-display');
    const startButton = document.getElementById('start-button');
    const languageSelector = document.getElementById('language');
    const customTextGroup = document.querySelector('.custom-text-group');
    const resultContainer = document.getElementById('result-container');
    const finalWpmDisplay = document.getElementById('final-wpm');
    const doAgainButton = document.getElementById('do-again-button');
    const menuToggle = document.getElementById('menu-toggle');
    const descriptionMenuToggle = document.getElementById('description-menu-toggle');
    const offCanvasMenu = document.getElementById('off-canvas-menu');
    const closeMenuButton = document.getElementById('close-menu');
    const reloadButton = document.getElementById('reload-button');
    const description = document.getElementById('description');
    const speedSlider = document.getElementById('speed-slider');
    const speedValue = document.getElementById('speed-value');

    let charactersPerKeyPress = parseInt(speedSlider.value);
    let currentLanguage = 'bangla';
    let customTextSelected = false;
    let codeIndex = 0;
    let wordsTyped = 0;
    let startTime = null;

    const paragraphs = {
        english: "Bangladesh is a situated in South Asia. It is a country of gorgeous greenery on the shore of the Bay of Bengal.Many rivers, birds, forests, historical places and above all, six seasons have made this country beautiful. Bangladesh is a land of rivers. The padma, the Meghna, and the Jamuna are the big rivers. We can see the fishermen catching fish using small boats. This scene enhance the beauty of Bangladesh. There are various kinds of flowers and fruits which have made the country attractive to all. Nowadays, people are cultivating flowers professionionally. Our country takes different colours with the help us various kinds of flowers. Bangladesh has some beautiful places like Sundarbans, Cox’s Bazar and Kuakata Sea Beaches, Chittagong Hill Tracts etc. These places have extra-ordinary beauties which attract the tourists from home and abroad. From Kuakata, one can enjoy both sunrise and sunset from the same place. Birds are playing an important role to make Bangladesh beautiful. There are various types of birds living in our country. We meet songs of different birds. Bangladesh is a country of six seasons. It takes different looks in different seasons. Peapole forget the monotony of life and start there work a new with the changes of six seasons. At last, we can say that Banglaesh is blessed with natural beauties. Many poets have written their poems on the beauty of Bangladesh. We fell proud of being citizens of this beautiful country.",
        bangla: "প্রাকৃতিক সৌন্দর্যের অপরূপ লীলাভূমি এই বাংলাদেশ। অপরূপা এ দেশের সবুজ বন-বনানী, নদ-নদী, শ্যামল পাহাড়, বিস্তীর্ণ সমুদ্র সৈকত। কবি এই বাংলার রূপে মুগ্ধ হয়ে বাংলাকে রূপসী বাংলা বলেছিলেন। ছয় ঋতুর বৈচিত্র্যময় দেশ এই বাংলাদেশ। যুগ যুগ ধরে কবিরা এই রূপে মুগ্ধ হয়েছেন। বাংলার উত্তরে হিমালয়, দক্ষিণে বঙ্গোপসাগর। এশিয়ার ছোট্ট সবুজ ভূমি এই বাংলাদেশ। টেকনাফ থেকে তেঁতুলিয়া পর্যন্ত নদী-নালা, খাল-বিল, পাহাড়-টিলা সবুজ সমতল ভূমি মিলে নানা রকম সৌন্দর্যের বেষ্টন, এক বিচিত্র রূপের অপূর্ব সমারোহ। বারো মাসের ষড়ঋতুর এ দেশে প্রতিটি ঋতু তার অনন্য বৈচিত্র্য নিয়ে আসে এবং নিজের অনাবিল সৌন্দর্য উপহার দিয়ে একসময় বিদায় নেয়। গ্রীষ্মের প্রচণ্ড রোদ, ছাতিমের স্নিগ্ধ ছায়া, নদীর নীলাভ গহ্বর থেকে জেগে ওঠা বালুচর। বাংলা বর্ষপঞ্জি অনুযায়ী প্রথম দুই মাস বৈশাখ ও জ্যৈষ্ঠজুড়ে গ্রীষ্মকাল। এ সময় সূর্যের প্রচণ্ড তাপে উত্তপ্ত হয়ে ওঠে ভূমি। পানি শুকিয়ে যায়। অনেক নদীই নাব্যতা হারায়। জলশূন্য মাটিতে ধরে ফাটল। গ্রীষ্মকালের শেষার্ধ্বে সন্ধ্যা সমাগত সময়ে ধেয়ে আসে কালবৈশাখি ঝড়। দক্ষিণ এশিয়ার দেশগুলোতে এ সময় গাছে গাছে বিভিন্ন মৌসুমি ফল দেখা যায়। যেমন- আম, কাঁঠাল, লিচু ইত্যাদি। বাংলা বর্ষপঞ্জি অনুযায়ী এর পরের ঋতু হলো বর্ষাকাল। সে সময় প্রচণ্ড বৃষ্টিপাত গ্রীষ্মকালীন সব তপ্ততা মিটিয়ে দেয়। গ্রীষ্মে ফোটা ফুল হচ্ছে অর্জুন, ইপিল, কনকচূড়া, করঞ্জা, কামিনী, ক্যাজুপুট, গাব, জারুল, জ্যাকারাণ্ডা, তেলসুর, দেবদারু, নাগকেশর, নাগেশ্বর, নিম, পরশপিপুল, পলকজুঁই, পারুল, পালাম, বনআসরা, বরুণ, বেরিয়া, মিনজিরি, মুচকুন্দ, মেহগনি, রক্তন, সোনালু, স্বর্ণচাঁপা ইত্যাদি। গ্রীষ্ম যতই শুকনো হোক, এ ঋতুতেও ফুলের অভাব নেই। বর্ষার থই থই জল, অবিরাম বৃষ্টিমেয়ের কান্না আর কদম, কামিনী, কেয়ার স্নিগ্ধ হাসি। বর্ষাই তো বাংলার চিরায়ত রূপ। কখনো রিমঝিম গান গেয়ে বৃষ্টি নামের মিষ্টি মেয়েটি সুরে সুরে ভরিয়ে তোলে প্রকৃতি। আবার ঝুমঝুম নূপুর বাজিয়ে মুগ্ধ করে দেয় আমাদের মন। বর্ষায় খাল-বিল-পুকুর-নদী-ডোবা পানিতে থই থই করে। সবুজ-সজীবতায় গাছপালা, বন-বনানী প্রাণ ফিরে পায়। আর কত ধরনের ফুল ফোটে এ বর্ষায়! খাল-বিলে বাংলার জাতীয় ফুল শাপলার অপরূপ দৃশ্য তো আছেই। কেয়া-কামিনী, হিজল, বকুল, জারুল, করবী ও সোনালু- এসবও বর্ষা ঋতুতে ফুটে থাকতে দেখা যায়। আর জুঁই-চামেলিকে বাদ দেব কী করে! তবে বর্ষার প্রধান ফুল হলো কদম। বৃষ্টিভেজা কদমের মনকাড়া সৌরভ ভিজে বাতাসে মিশে ছড়িয়ে পড়ে সারা প্রকৃতিতে।"
    }

    languageSelector.addEventListener('change', function () {
        currentLanguage = languageSelector.value;
        customTextSelected = currentLanguage === 'custom';
        customTextGroup.style.display = customTextSelected ? 'block' : 'none';
        resetTyping(true);
    });

    input.addEventListener('click', function () {
        input.focus();
    });

    input.addEventListener('input', function () {
        if (startTime === null) {
            startTime = Date.now();
        }

        const paragraphToUse = customTextSelected && document.getElementById('custom-text').value.trim() ?
            document.getElementById('custom-text').value :
            paragraphs[currentLanguage];

        if (codeIndex < paragraphToUse.length) {
            const typedCharacters = paragraphToUse.slice(codeIndex, codeIndex + charactersPerKeyPress);
            setTimeout(() => appendToTypedText(typedCharacters), 0);
            codeIndex += charactersPerKeyPress;

            if (typedCharacters.includes(' ')) {
                wordsTyped++;
            }

            updateWPM();

            if (codeIndex >= paragraphToUse.length) {
                const totalTimeInMinutes = (Date.now() - startTime) / 1000 / 60;
                const finalWpm = Math.round(wordsTyped / totalTimeInMinutes);
                displayResults(finalWpm);
            }
        }
    });

    function appendToTypedText(characters) {
        typedText.textContent += characters;
    }

    function resetTyping(hideDescription = false) {
        terminal.style.display = 'block';
        wpmDisplay.style.display = 'block';
        startButton.style.display = 'block';
        languageSelector.style.display = 'block';
        customTextGroup.style.display = customTextSelected ? 'block' : 'none';
        resultContainer.style.display = 'none';

        output.textContent = '';
        input.value = '';
        typedText.textContent = '';
        codeIndex = 0;
        wordsTyped = 0;
        startTime = null;
        wpmDisplay.textContent = 'WPM: 0';

        description.style.display = hideDescription ? 'none' : 'block';
        input.disabled = true;
    }

    function updateWPM() {
        const currentTimeInMinutes = (Date.now() - startTime) / 1000 / 60;
        const wpm = Math.round(wordsTyped / currentTimeInMinutes);
        wpmDisplay.style.display = 'block';
        wpmDisplay.textContent = `WPM: ${wpm}`;
    }

    function displayResults(wpm) {
        terminal.style.display = 'none';
        startButton.style.display = 'none';
        languageSelector.style.display = 'none';
        customTextGroup.style.display = 'none';
        wpmDisplay.style.display = 'none';

        finalWpmDisplay.textContent = `Words Per Minute: ${wpm}`;
        resultContainer.style.display = 'block';
    }

    speedSlider.addEventListener('input', function () {
        charactersPerKeyPress = parseInt(speedSlider.value);
        speedValue.textContent = `${charactersPerKeyPress}x`;
    });

    doAgainButton.addEventListener('click', function () {
        resultContainer.style.display = 'none';
        resetTyping(true);
        input.disabled = false;
        input.focus();
    });

    menuToggle.addEventListener('click', function () {
        offCanvasMenu.classList.toggle('open');
    });

    descriptionMenuToggle.addEventListener('click', function () {
        offCanvasMenu.classList.toggle('open');
    });

    closeMenuButton.addEventListener('click', function () {
        offCanvasMenu.classList.remove('open');
    });

    startButton.addEventListener('click', function () {
        resetTyping(true);
        offCanvasMenu.classList.remove('open');
        input.disabled = false;
        input.focus();
    });

    reloadButton.addEventListener('click', function () {
        location.reload();
    });
});
