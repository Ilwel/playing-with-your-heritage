export class SignInValidation {
  validate(form: FormData) {
    let errors = []
    errors = [...this.noEmptyFields(form)]
    return errors
  }

  private noEmptyFields(form: FormData) {
    const errors = []
    for (const entry of form.entries()) {
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (!entry[1]) {
        errors.push('input:' + entry[0])
      }
    }
    return errors
  }

  private captlize(term: string) {
    term = term.split('-').join(' ')
    return term.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
      letter.toUpperCase()
    )
  }

  convertToMessage(error: string = '') {
    if (error.includes('input:')) {
      return `${this.captlize(error.split(':')[1])} Is Required`
    } else {
      return ''
    }
  }
}
