import { ArgumentParser } from "argparse"

const parser = new ArgumentParser()

parser.add_argument("-y", "--year", {
  default: new Date().getFullYear(),
})
parser.add_argument("-d", "--date", {
  default: new Date().getDate(),
})

const { year, date } = parser.parse_args()

const dateString = ("0" + date).padStart(2, "0")

import(`./${year}/${dateString}/solution`)
  .then((solution) => {
    solution.run()
  })
  .catch((e) => console.error(e.message || "Cant't import module"))
