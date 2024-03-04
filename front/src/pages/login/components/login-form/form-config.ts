export const loginFormConfig = {
  pass: {
    isRequred: true,
    validator: (value) => new RegExp(/^(?=.*[0-9])(?=.*[A-z]).{6,32}$/g).test(value) ? '' : 'Password is not strong enough.',
    initialValue: () =>  '',
  },
  email: {
    isRequred: true,
    validator: (value) => new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g).test(value) ? '' : 'Email is incorrect.',
    initialValue: () => '',
  }
}
