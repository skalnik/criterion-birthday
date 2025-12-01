var movies
loadMovies()

const monthInput = document.querySelector("#month")
const dateInput = document.querySelector("#date")
const result = document.querySelector("#result")

addEventListener("load", () => {
  if(location.hash == "") {
    monthInput.value = (new Date).getMonth() + 1
    dateInput.value = (new Date).getDate()
  } else {
    const spine = location.hash.slice(1)
    monthInput.value = spine.slice(0, -2)
    dateInput.value = spine.slice(-2)
  }
})

document.querySelectorAll("input").forEach((input) => {
  input.addEventListener("input", chooseMovie, false)
})

function chooseMovie(setHash = true) {
  if(!validateBirthday()) {
    return
  }

  const month = monthInput.value
  const date = dateInput.value
  const spine = `${month}${pad(date)}`
  const movie = movies.find((m) => m['spine'] == spine)

  const title = result.querySelector("#title")
  title.href = movie['link']
  title.innerText = movie['title']

  if(setHash) {
    location.hash = `#${spine}`
  }

  function setAttr(attr, value) {
    if(value && value.trim() !== "") {
      result.querySelector(`#${attr}`).innerText = value
      document.querySelectorAll(`.${attr}`).forEach((e) => e.style['display'] = 'block')
    } else {
      document.querySelectorAll(`.${attr}`).forEach((e) => e.style['display'] = 'none')
    }
  }

  setAttr("spine", spine)
  setAttr("year", movie['year'])
  setAttr("director", movie['director'])
  setAttr("country", movie['country'])

  result.querySelector("#poster").src = `posters/${spine}.jpg`
  result.style["display"] = 'block'
}

function validateBirthday() {
  const fieldset = document.querySelector("fieldset")
  const msg = fieldset.querySelector(".msg")

  const month = monthInput.value
  const date = dateInput.value

  function addError(msg) {
    fieldset.classList.add("error")
    msg.innerText = msg
  }

  if(month > 12 || month < 1) {
    return false
  }

  if(date < 1 || date > 31) {
    addError("Now see here, I need a valid birthdate!")
    return false
  }

  if([4, 6, 9, 11].includes(parseInt(month)) && date > 30) {
    addError("Something smells off about that date.")
    return false
  }

  if(month == 2 && date > 29) {
    addError("Leaping lizards I don't think we got leap years that big!")
    return false
  }

  fieldset.classList.remove("error")
  msg.innerText = ""
  return true;
}

async function loadMovies() {
  movies = await fetch("data.json").then((response) => response.json())
  chooseMovie(false)
}

function pad(value) {
  if (value < 10) {
    return `0${parseInt(value)}`
  }

  return value
}
