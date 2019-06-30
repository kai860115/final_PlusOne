import Joi from 'joi'

const CreateEvent = Joi.object().keys({
  title: Joi.string().required().label('Title'),
  descript: Joi.string().required().label('Desctripion'),
  date: Joi.string().required().label('Date'),
})

export default CreateEvent