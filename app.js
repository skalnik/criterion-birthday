var movies
loadMovies()

const monthInput = document.querySelector("#month")
const dateInput = document.querySelector("#date")
const result = document.querySelector("#result")

monthInput.value = (new Date).getMonth() + 1
dateInput.value = (new Date).getDate()

document.querySelectorAll("input").forEach((input) => {
  input.addEventListener("input", chooseMovie, false)
})

function chooseMovie() {
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
  
  result.querySelector("#year").innerText = movie['year']
  result.querySelector("#director").innerText = movie['director']
  result.querySelector("#country").innerText = movie['country']
  result.querySelector("#poster").src = `posters/${spine}.jpg`
  result.style["display"] = 'block'
}

function validateBirthday() {
  const fieldset = document.querySelector("fieldset")
  const msg = fieldset.querySelector(".msg")

  const month = monthInput.value
  const date = dateInput.value

  if(month > 12 || month < 1) {
    fieldset.classList.add("error")
    msg.innerText = "Woah buddy, that month ain't right."
    return false
  }

  if(date < 1 || date > 31) {
    fieldset.classList.add("error")
    msg.innerText = "Now see here, I need a valid birthdate!"
    return false
  }

  if([4, 6, 9, 11].includes(parseInt(month)) && date > 30) {
    fieldset.classList.add("error")
    msg.innerText = "Something smells off about that date."
    return false
  }

  if(month == 2 && date > 29) {
    fieldset.classList.add("error")
    msg.innerText = "Leaping lizards I don't think we got leap years that big!"
    return false
  }

  fieldset.classList.remove("error")
  msg.innerText = ""
  return true;
}

async function loadMovies() {
  movies = await fetch("data.json").then((response) => response.json())
  chooseMovie()
}

function pad(value) {
  if (value < 10) {
    return `0${value}`
  }

  return value
}
