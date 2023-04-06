const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');


let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: '___________ is the process of breaking down food into small molecules that can be absorbed by the body.' ,
        choice1: 'Digestion',
        choice2: 'Circulation',
        choice3: 'Respiration', 
        choice4: 'Excretion', 
        answer: 1,
    },
    {
        question: 'The ___________ is the largest organ of the human body. ',
        choice1: 'Heart',
        choice2: 'Liver',
        choice3: 'Lungs', 
        choice4: 'Kidney', 
        answer: 2,
    },
    {
        question: 'The basic unit of life is the ___________.',
        choice1: 'Cell',
        choice2: 'Tissue',
        choice3: 'Organ', 
        choice4: 'Organ system', 
        answer: 1,
    },
    {
        question: 'The _________ system is responsible for the transport of oxygen and nutrients throughout the body. ',
        choice1: 'Respiratory',
        choice2: 'Circulatory',
        choice3: 'Digestive', 
        choice4: 'Urinary', 
        answer: 2,
    },
    {
        question: 'The _________ system is responsible for regulating the body’s response to internal and external stimuli.',
        choice1: 'Nervous',
        choice2: 'Muscular',
        choice3: 'Skeletal', 
        choice4: 'Endocrine', 
        answer: 1,
    },
    {
        question: 'The process by which a plant makes its own food is called ___________.',
        choice1: 'Respiration',
        choice2: 'Photosynthesis',
        choice3: 'Transpiration', 
        choice4: 'Fermentation', 
        answer: 2,
    },
    {
        question: 'The process by which plants release water vapor into the air is called ___________. ',
        choice1: 'Respiration',
        choice2: 'Photosynthesis',
        choice3: 'Transpiration', 
        choice4: 'Fermentation', 
        answer: 3,
    },
    {
        question: 'The ___________ gland is responsible for regulating metabolism.',
        choice1: 'Pituitary',
        choice2: 'Thyroid',
        choice3: 'Adrenal', 
        choice4: 'Pancreas', 
        answer: 2,
    },
    {
        question: 'The _________ bone is located in the upper arm and connects to the shoulder and elbow.',
        choice1: 'Femur',
        choice2: 'Tistibiasue',
        choice3: 'Humerus', 
        choice4: 'Radius', 
        answer: 3,
    },
    {
        question: ' The _________ joint connects the thigh bone to the shin bone.',
        choice1: 'Hip',
        choice2: 'Knee',
        choice3: 'Ankle', 
        choice4: 'Shoulder', 
        answer: 2,
    },
    {
        question: 'The ___________ muscle is responsible for pumping blood throughout the body.',
        choice1: 'Biceps',
        choice2: 'Triceps',
        choice3: 'Quadriceps', 
        choice4: 'Heart', 
        answer: 4,
    },
    {
        question: 'The ___________ gland is responsible for producing insulin.',
        choice1: 'Pituitary',
        choice2: 'Thyroid',
        choice3: 'Adrenal', 
        choice4: 'Pancreas', 
        answer: 4,
    },
    {
        question: 'The ___________ system is responsible for removing waste products from the body.',
        choice1: 'Respiratory',
        choice2: 'Circulatory',
        choice3: 'Digestive', 
        choice4: 'Urinary', 
        answer: 4,
    },
    {
        question: 'The ___________ is the main organ of the respiratory system.',
        choice1: 'Lungs',
        choice2: 'Trachea',
        choice3: 'Bronchi', 
        choice4: 'Alveoli', 
        answer: 1,
    },
    {
        question: 'The ___________ system is responsible for supporting the body and protecting internal organs.',
        choice1: 'Nervous',
        choice2: 'Muscular',
        choice3: 'Skeletal', 
        choice4: 'Endocrine', 
        answer: 3,
    },
    {
        question: 'The process of converting food into energy is called ___________.',
        choice1: 'Digestion',
        choice2: 'Respiration',
        choice3: 'Metabolism', 
        choice4: 'Excretion ', 
        answer: 3,
    },
    {
        question: 'The ___________ system is responsible for the production and secretion of hormones.',
        choice1: 'Respiratory',
        choice2: 'Circulatory',
        choice3: 'Digestive', 
        choice4: 'Endocrine', 
        answer: 4,
    },
    {
        question: 'The ___________ is the outermost layer of the skin.',
        choice1: 'Epidermis',
        choice2: 'Dermis',
        choice3: 'Hypodermis', 
        choice4: 'Subcutaneous layer', 
        answer: 1,
    },
    {
        question: 'The ___________ is the smallest unit of an element that retains the properties of that element.',
        choice1: 'Proton',
        choice2: 'Neutron',
        choice3: 'Electron', 
        choice4: 'Atom', 
        answer: 4,
    },
    {
        question: 'The ___________ is responsible for filtering waste products from the blood and regulating fluid and electrolyte balance.',
        choice1: 'Liver',
        choice2: 'Kidney',
        choice3: 'Spleen', 
        choice4: 'Gallbladder', 
        answer: 2,
    }
    

]

const SCORE_POINTS = 5
const MAX_QUESTIONS = 20

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length ===0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = ` Question ${questionCounter} of ${MAX_QUESTIONS} `
    progressBarFull.style.width = ` ${(questionCounter/MAX_QUESTIONS) * 100}% `

    const questionIndex = Math.floor(Math.random()* availableQuestions.length)
    currentQuestion = availableQuestions[questionIndex]
    question.innerText = currentQuestion.question


    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionIndex, 1)

    acceptingAnswers = true

}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']
        
        let classToApply  = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout (() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)

    })
})

incrementScore = num => {
    score += num
   
}

startGame()