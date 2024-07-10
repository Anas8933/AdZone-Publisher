const mongoose = require('mongoose');

const AdZoneSchema = new mongoose.Schema({
  zoneID: {
    type: String,
    required: true,
    unique: true
  },
  zoneName: {
    type: String,
    required: true
  },
  selectsize:{
    type: String ,
    required : true
  },
  adFormat: {
    type: String,
    required: true
  },
  createdAt: {  
    type: Date,
    default: Date.now
  },
  
});

module.exports = mongoose.model('AdZone', AdZoneSchema);
