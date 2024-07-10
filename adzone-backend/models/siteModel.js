
const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  websiteName: {
    type: String,
    required: true
  },
  websiteUrl: {
    type: String,
    required: true
  },
  mainCategory: {
    type: String,
    required: true
  },
  subCategory:{
    type:String, 
  },
  metaTagCode: {
    type: String,
    required: true
  },
 publisherId: {
    type: String,
    required: true
  },
  siteId: {
    type: Number,
    required: true,
    unique: true
  },
  createdAt:{
    type: Date ,
    default :Date.now 
  },
  status:{
     type:String, 
     enum:['approved' , 'pending' , 'cancelled'],
     default: 'pending'
  },
 
});

module.exports = mongoose.model('sites', ApplicationSchema);
