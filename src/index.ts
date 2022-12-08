
// (c) 2022 geschmit
// gnu gpl 3.0

import { Argument, program } from 'commander'
import Jimp from "jimp/es"

program
  .name('dinoverter')
  .description("Convert various image formats to Sprig's string-based bitmap structure.")
  .addArgument(new Argument("[input]","image passed to program"))

const main = async (iArg) => {
  let dataStr = ""
  const img = await Jimp.read(iArg)
  img.resize(16,16) // ensure we have a perfect 16^2
  img.scan(0,0,img.getWidth(),img.getHeight(), (x,y,ind) => {
    const rgba = {
      r: img.bitmap.data[ind+0],
      g: img.bitmap.data[ind+1],
      b: img.bitmap.data[ind+2],
      a: img.bitmap.data[ind+3]
    }
    
  })
}

program.action(main)
program.parse()
