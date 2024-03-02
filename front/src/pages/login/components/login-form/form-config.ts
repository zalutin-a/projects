export const loginFormConfig = {
  pass: {
    isRequred: true,
    id: 'passId',
    validator: (value) => new RegExp(/^(?=.*[0-9])(?=.*[A-z]).{6,32}$/g).test(value) ? '' : 'Password is not strong enough.',
    transform: (value) => value,
    initialValue: '',
  },
  email: {
    isRequred: true,
    id: 'emailId',
    validator: (value) => new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g).test(value) ? '' : 'Email is incorrect.',
    transform: (value) => value,
    initialValue: '',
  }
}
