const mongoose = require('mongoose');                      

const helloClick = new mongoose.Schema({
  short: {
    type: String,
    required: true,
  },
  clicks: {                                                
    type: Number,                                          
    required: true,
    default: 0 
  }                                                        
});                                                        
                                                           
module.exports = mongoose.model('Click', helloClick);

