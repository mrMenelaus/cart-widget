const formatter = new Intl.DateTimeFormat("ru-RU", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric"
})

export function format(date: Date){
    return formatter.format(date)
}