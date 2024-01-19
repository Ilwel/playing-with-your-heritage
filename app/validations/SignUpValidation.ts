export class SignUpValidation {
  validate(form: FormData) {
    let errors = []
    errors = [...this.noEmptyFields(form), ...this.matchPassword(form)]
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

  private matchPassword(form: FormData) {
    const password = form.get('password')
    const repeatPassword = form.get('repeat-password')
    if (password !== repeatPassword) return ['match:password']
    else return []
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
    } else if (error.includes('match:')) {
      return "Passwords Don't Match"
    } else {
      return ''
    }
  }
}
