const resume = document.querySelector('.calculator--display span')
const display = document.querySelector('.calculator--display p')

let allowsToReplace = true
let calc = ''

function handleNumber(value) {
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

function handleClear() {
  display.textContent = '0'
  resume.textContent = ''
  allowsToReplace = true
  calc = ''
}

function backspace() {
  const total = display.textContent.length
  const newValue = display.textContent.substring(0, total - 1)
  
  display.textContent = newValue || '0'
}

function handleAction(action) {
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