
// (c) 2022 geschmit
// gnu gpl 3.0

import { program } from 'commander'

program
  .name('dinoverter')
  .description("converts various formats(png, jpg, bmp) to Sprig's string-based bitmap structure")
  .argument('image', 'image to be processed')
  .option('output', 'output file name, defaults to [name + timestamp].json')
  .parse()
