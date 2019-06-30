import Joi from 'joi'

const SignUp = Joi.object().keys({
  email: Joi.string().email().required().label('Email'),
  username: Joi.string().alphanum().alphanum().min(1).max(30).required().label('Username'),
  name: Joi.string().max(254).required().label('Name'),
  password: Joi.string().regex(/[a-zA-Z0-9]{6,30}$/).required().label('Password')
})

export default SignUp