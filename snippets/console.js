document.querySelectorAll("#gridview tr.gridFilm").forEach(row => {
  const spine = row.querySelector(".g-spine").innerText
  if(spine === "") { return }
  if(spine > 1231 || spine < 101) { return }
  if(spine > 131 && spine < 201) { return }
  if(spine > 229 && spine < 301) { return }
  if(spine > 331 && spine < 401) { return }
  if(spine > 430 && spine < 501) { return }
  if(spine > 531 && spine < 601) { return }
  if(spine > 630 && spine < 701) { return }
  if(spine > 731 && spine < 801) { return }
  if(spine > 831 && spine < 901) { return }
  if(spine > 930 && spine < 1001) { return }
  if(spine > 1031 && spine < 1101) { return }
  if(spine > 1130 && spine < 1201) { return }

  const movie = {
    spine:    row.querySelector(".g-spine").innerText,
    title:    row.querySelector(".g-title").innerText,
    img:      row.querySelector(".g-img img").src,
    director: row.querySelector(".g-director").innerText,
    country:  row.querySelector(".g-country").innerText,
    year:     row.querySelector(".g-year").innerText,
    link:     row.dataset["href"]
  }

  console.log(`${movie['spine']};${movie['title']};${movie['img']};${movie['director']};${movie['country']};${movie['year']};${movie['link']}`)
})
