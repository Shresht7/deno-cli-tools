//  ANSI Template String Builder
import { ansi } from '../../ansi/builder.ts'

//  Helper Functions
import { compose } from '../../helpers/composition.ts'
import { red, blue } from '../../ansi/colors.ts'
import { inverse, bold } from '../../ansi/styles.ts'

console.log(
    ansi`ANSI ${blue} Template ${inverse} String ${compose(red, bold)} Builder ${inverse("!").repeat(3)}`
)