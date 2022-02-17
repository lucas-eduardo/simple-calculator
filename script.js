const resume = document.querySelector('.calculator--display span')
const display = document.querySelector('.calculator--display p')

let allowsToReplace = true
let calc = ''

const handleNumber = value => {
  if (display.textContent.length >= 11) {
    return
  }

  if (display.textContent === '0' || allowsToReplace) {
    display.textContent = value

    allowsToReplace = false
  } else {
    display.textContent += value
  }
}

const handleClear = () => {
  display.textContent = '0'
  resume.textContent = ''
  allowsToReplace = true
  calc = ''
}

const backspace = () => {
  const total = display.textContent.length
  const newValue = display.textContent.substring(0, total - 1)

  display.textContent = newValue || '0'
}

const handleAction = action => {
  if (action !== '=') {
    const textResume = `${display.textContent}${action}`

    resume.textContent += textResume

    calc += textResume
  } else {
    resume.textContent = ''

    calc += display.textContent

    display.textContent = eval(calc)

    calc = ''
  }

  allowsToReplace = true
}

const effectHover = action => {
  const element = document.getElementById(action)

  element.style.filter = 'brightness(0.8)'

  setTimeout(() => element.style.filter = null, 200)
}

document.addEventListener('keyup', (event) => {
  if (event.key === 'Escape' || event.key === 'Delete') {
    handleClear()

    effectHover('clear')
  } else if (event.key === 'Backspace') {
    backspace()

    effectHover('back')
  }
})

document.addEventListener('keypress', (event) => {
  const convertStringToNumber = Number(event.key)

  if (convertStringToNumber >= 0) {
    handleNumber(convertStringToNumber)

    effectHover(event.key)
  } else if (event.key !== 'Enter') {
    handleAction(event.key)

    effectHover(event.key)
  } else if (event.key === 'Enter' || event.key === '=') {
    handleAction('=')

    effectHover('=')
  }
})