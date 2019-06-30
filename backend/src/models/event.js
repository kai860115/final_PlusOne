import mongoose from 'mongoose'
var ObjectId = mongoose.Schema.Types.ObjectId;


const eventSchema = new mongoose.Schema({
  title: String,
  descript: String,
  createBy: String,
  members: [ObjectId],
  date: Date
})

const Event = mongoose.model('events', eventSchema)
export default Event