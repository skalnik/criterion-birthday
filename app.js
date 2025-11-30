var movies
loadMovies()

document.querySelector("#month").value = (new Date).getMonth() + 1
document.querySelector("#date").value = (new Date).getDate()
document.querySelectorAll("input").forEach((input) => {
  input.addEventListener("input", chooseMovie, false)
})

function chooseMovie() {
  const form = document.querySelector("form")
  const date = form.querySelector("#date").value
  const month = form.querySelector("#month").value

  const spine = `${month}${pad(date)}`
  const movie = movies.find((m) => m['spine'] == spine)

  const result = document.querySelector("#result")

  const title = result.querySelector("#title")
  title.href = movie['link']
  title.innerText = movie['title']
  
  result.querySelector("#year").innerText = movie['year']
  result.querySelector("#director").innerText = movie['director']
  result.querySelector("#country").innerText = movie['country']
  result.querySelector("#poster").src = `posters/${spine}.jpg`
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
