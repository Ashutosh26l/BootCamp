const questionPools = {
    'world-map': [
        { question: "What is the capital of Brazil?", options: ["Rio de Janeiro", "Brasilia", "Sao Paulo", "Salvador"], answer: "Brasilia" },
        { question: "Which country has the most deserts?", options: ["Australia", "India", "Antarctica", "Saudi Arabia"], answer: "Antarctica" },
        { question: "Which is the longest river in the world?", options: ["Nile", "Amazon", "Yangtze", "Mississippi"], answer: "Nile" },
        { question: "What is the smallest country by land area?", options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"], answer: "Vatican City" },
        { question: "Which continent is the Sahara Desert located in?", options: ["Asia", "Africa", "Australia", "South America"], answer: "Africa" },
        { question: "What is the capital of Australia?", options: ["Sydney", "Melbourne", "Canberra", "Perth"], answer: "Canberra" },
        { question: "Which country is known as the Land of the Rising Sun?", options: ["China", "Japan", "Thailand", "South Korea"], answer: "Japan" },
        { question: "Which ocean is the largest?", options: ["Atlantic", "Indian", "Pacific", "Arctic"], answer: "Pacific" },
        { question: "What is the capital of Russia?", options: ["Moscow", "St. Petersburg", "Kazan", "Novosibirsk"], answer: "Moscow" },
        { question: "Which country has the most population?", options: ["India", "China", "USA", "Indonesia"], answer: "India" },
        { question: "Which mountain is the highest in the world?", options: ["K2", "Kangchenjunga", "Everest", "Lhotse"], answer: "Everest" }
    ],
    'history': [
        { question: "Who was the first President of the United States?", options: ["Abraham Lincoln", "George Washington", "Thomas Jefferson", "John Adams"], answer: "George Washington" },
        { question: "In which year did World War II end?", options: ["1943", "1944", "1945", "1946"], answer: "1945" },
        { question: "Who wrote the Declaration of Independence?", options: ["Benjamin Franklin", "Thomas Jefferson", "John Hancock", "Samuel Adams"], answer: "Thomas Jefferson" },
        { question: "Which civilization built the pyramids of Giza?", options: ["Mayan", "Inca", "Egyptian", "Mesopotamian"], answer: "Egyptian" },
        { question: "Who was the first man to walk on the moon?", options: ["Buzz Aldrin", "Neil Armstrong", "Yuri Gagarin", "Michael Collins"], answer: "Neil Armstrong" },
        { question: "In which year did the Titanic sink?", options: ["1910", "1912", "1914", "1916"], answer: "1912" },
        { question: "Who was the leader of the Indian independence movement?", options: ["Jawaharlal Nehru", "Mahatma Gandhi", "Subhas Chandra Bose", "Sardar Patel"], answer: "Mahatma Gandhi" },
        { question: "Which war was fought between 1861 and 1865 in the USA?", options: ["Civil War", "Revolutionary War", "World War I", "Mexican-American War"], answer: "Civil War" },
        { question: "Who discovered America in 1492?", options: ["Vasco da Gama", "Christopher Columbus", "Ferdinand Magellan", "Marco Polo"], answer: "Christopher Columbus" },
        { question: "Which empire was ruled by Genghis Khan?", options: ["Ottoman", "Mongol", "Roman", "Byzantine"], answer: "Mongol" },
        { question: "In which year was the Magna Carta signed?", options: ["1215", "1066", "1348", "1453"], answer: "1215" }
    ],
    'geography': [
        { question: "Which is the largest desert in the world?", options: ["Sahara", "Gobi", "Kalahari", "Antarctic"], answer: "Antarctic" },
        { question: "What is the longest mountain range?", options: ["Himalayas", "Andes", "Rockies", "Alps"], answer: "Andes" },
        { question: "Which river flows through Egypt?", options: ["Nile", "Amazon", "Danube", "Ganges"], answer: "Nile" },
        { question: "Which country has the most volcanoes?", options: ["Japan", "Indonesia", "USA", "Italy"], answer: "Indonesia" },
        { question: "What is the capital of Canada?", options: ["Toronto", "Vancouver", "Ottawa", "Montreal"], answer: "Ottawa" },
        { question: "Which continent is the smallest by land area?", options: ["Asia", "Australia", "Europe", "Antarctica"], answer: "Australia" },
        { question: "Which is the deepest ocean trench?", options: ["Mariana Trench", "Tonga Trench", "Philippine Trench", "Puerto Rico Trench"], answer: "Mariana Trench" },
        { question: "What is the capital of South Africa?", options: ["Cape Town", "Pretoria", "Johannesburg", "Durban"], answer: "Pretoria" },
        { question: "Which country is the largest by land area?", options: ["Canada", "China", "Russia", "USA"], answer: "Russia" },
        { question: "Which lake is the largest by surface area?", options: ["Lake Superior", "Lake Victoria", "Caspian Sea", "Lake Baikal"], answer: "Caspian Sea" },
        { question: "Which is the most populous city in the world?", options: ["Tokyo", "Delhi", "Shanghai", "Mexico City"], answer: "Tokyo" },
        { question: "Which country is known for fjords?", options: ["Sweden", "Norway", "Finland", "Denmark"], answer: "Norway" }
    ],
    'mathematics': [
        { question: "What is 7 × 8?", options: ["54", "56", "64", "48"], answer: "56" },
        { question: "What is the square root of 16?", options: ["2", "4", "8", "16"], answer: "4" },
        { question: "What is 15% of 200?", options: ["30", "25", "20", "35"], answer: "30" },
        { question: "What is the value of π (pi) to two decimal places?", options: ["3.12", "3.14", "3.16", "3.18"], answer: "3.14" },
        { question: "What is 9 + 6 ÷ 2?", options: ["7.5", "12", "6", "15"], answer: "12" },
        { question: "What is the area of a triangle with base 10 and height 5?", options: ["25", "50", "15", "30"], answer: "25" },
        { question: "What is 2³?", options: ["6", "8", "16", "12"], answer: "8" },
        { question: "What is the sum of angles in a triangle?", options: ["90°", "180°", "360°", "270°"], answer: "180°" },
        { question: "What is 100 ÷ 4?", options: ["20", "25", "30", "40"], answer: "25" },
        { question: "What is the value of 5! (factorial)?", options: ["120", "60", "100", "20"], answer: "120" },
        { question: "What is 3/4 as a decimal?", options: ["0.75", "0.5", "0.25", "0.7"], answer: "0.75" },
        { question: "What is the perimeter of a square with side length 5?", options: ["20", "25", "15", "10"], answer: "20" }
    ]
};

let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let selectedOption = null;
let selectedTopic = null;

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');
const resultEl = document.getElementById('result');
const progressEl = document.getElementById('progress');
const progressBar = document.getElementById('progress-bar');
const topicSelectionEl = document.getElementById('topic-selection');

function getRandomQuestions(pool, num) {
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
}

function loadTopicSelection() {
    topicSelectionEl.style.display = 'flex';
    questionEl.style.display = 'none';
    optionsEl.style.display = 'none';
    nextBtn.style.display = 'none';
    progressBar.style.display = 'none';
    resultEl.style.display = 'none';
}

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;
    optionsEl.innerHTML = '';
    selectedOption = null;

    currentQuestion.options.forEach(option => {
        const optionEl = document.createElement('div');
        optionEl.classList.add('option');
        optionEl.textContent = option;
        optionEl.addEventListener('click', () => selectOption(option, optionEl));
        optionsEl.appendChild(optionEl);
    });

    updateProgress();
    nextBtn.style.display = 'none';
}

function selectOption(option, optionEl) {
    if (selectedOption) return;

    selectedOption = option;
    optionEl.classList.add('selected');

    const correctAnswer = questions[currentQuestionIndex].answer;
    if (option === correctAnswer) {
        score++;
    } else {
        optionEl.classList.add('wrong');
    }

    optionsEl.querySelectorAll('.option').forEach(opt => {
        if (opt.textContent === correctAnswer) {
            opt.classList.add('selected');
        }
        opt.style.pointerEvents = 'none';
    });

    nextBtn.style.display = 'block';
}

function updateProgress() {
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressEl.style.width = `${progress}%`;
}

function showResult() {
    questionEl.style.display = 'none';
    optionsEl.style.display = 'none';
    nextBtn.style.display = 'none';
    progressBar.style.display = 'none';
    resultEl.textContent = `You scored ${score} out of ${questions.length}!`;
    resultEl.classList.add('show');

    const resultButtons = document.createElement('div');
    resultButtons.classList.add('result-buttons');

    const backBtn = document.createElement('button');
    backBtn.classList.add('result-btn');
    backBtn.textContent = 'Back to Topics';
    backBtn.addEventListener('click', () => {
        currentQuestionIndex = 0;
        score = 0;
        questions = [];
        selectedTopic = null;
        resultEl.classList.remove('show');
        resultEl.textContent = '';
        loadTopicSelection();
    });

    const retakeBtn = document.createElement('button');
    retakeBtn.classList.add('result-btn');
    retakeBtn.textContent = 'Retake Quiz';
    retakeBtn.addEventListener('click', () => {
        currentQuestionIndex = 0;
        score = 0;
        questions = getRandomQuestions(questionPools[selectedTopic], 4);
        resultEl.classList.remove('show');
        resultEl.textContent = '';
        questionEl.style.display = 'block';
        optionsEl.style.display = 'grid';
        progressBar.style.display = 'block';
        loadQuestion();
    });

    const finishBtn = document.createElement('button');
    finishBtn.classList.add('result-btn', 'finish-btn');
    finishBtn.textContent = 'Finish';
    finishBtn.addEventListener('click', () => {
        resultEl.textContent = 'Thanks for playing!';
        resultEl.classList.add('show');
        resultButtons.style.display = 'none';
    });

    resultButtons.appendChild(backBtn);
    resultButtons.appendChild(retakeBtn);
    resultButtons.appendChild(finishBtn);
    resultEl.appendChild(resultButtons);
}

document.querySelectorAll('.topic-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        selectedTopic = btn.getAttribute('data-topic');
        questions = getRandomQuestions(questionPools[selectedTopic], 4);
        topicSelectionEl.style.display = 'none';
        questionEl.style.display = 'block';
        optionsEl.style.display = 'grid';
        progressBar.style.display = 'block';
        loadQuestion();
    });
});

nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
});

loadTopicSelection();