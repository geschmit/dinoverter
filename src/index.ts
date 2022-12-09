
// (c) 2022 geschmit
// gnu gpl 3.0

import { Argument, program } from 'commander'
import { closest, RGBColor } from 'color-diff'
import { palObj } from './pallette'
import Jimp from "jimp"

program
  .name('dinoverter')
  .description("Convert various image formats to Sprig's string-based bitmap structure.")
  .addArgument(new Argument("<input>","image passed to program"))

const main = async (iArg: string): Promise<void> => {
  if (!iArg || iArg == "") { throw new Error("image was not passed to program") }
  let dataStr = `const ${iArg.includes(".") && iArg.substring(0,iArg.indexOf(".")).toLowerCase() || "convertion"} = bitmap\`\r\n`
  const img = await Jimp.read(iArg)
  img.resize(16,16) // ensure we have a perfect 16^2

  img.scan(0,0,img.getWidth(),img.getHeight(), (x,y,ind) => {
    const rgba = {
      R: img.bitmap.data[ind+0],
      G: img.bitmap.data[ind+1],
      B: img.bitmap.data[ind+2],
      A: img.bitmap.data[ind+3]
    }
    const clst = closest(rgba,Object.values(palObj))
    const letter = Object.keys(palObj).find(key => palObj[key] === clst)
    dataStr += letter
    if (x == 15) {
      dataStr+="\r\n"
    }
  })
  dataStr += "`"
  console.log(dataStr)
}

program.action(main)
program.parse()
