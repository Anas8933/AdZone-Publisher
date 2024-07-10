const AdZone = require('../models/AdZone');
const { v4: uuidv4 } = require('uuid');
exports.createSite = async (req, res) => {
  const {  zoneName, adFormat, selectsite, selectsize } = req.body;
  try {
    const newAdZone = new AdZone({
      zoneID:generateZoneId(),
      zoneName,
      selectsite,
      selectsize,
      adFormat,
      
    });
    const savedAdZone = await newAdZone.save();
    res.status(201).json({ status: 'success', data: savedAdZone });
  } catch (err) {
    console.error('Error creating AdZone:', err.message);
    res.status(500).json({ status: 'error', message: 'Server Error', error: err.message });
  }
};

function generateZoneId() {
    const uuid = uuidv4().replace(/[^0-9]/g, ''); 
    return uuid.slice(0, 8); 
}
exports.getSite = async (req, res) => {
  try {
    const adZones = await AdZone.find();
    res.status(200).json({ status: 'success', data: adZones });
  } catch (err) {
    console.error('Error fetching AdZones:', err.message);
    res.status(500).json({ status: 'error', message: 'Server Error', error: err.message });
  }
};




exports.updateSite = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedAdZone = await AdZone.updateOne(id, req.body, { new: true, runValidators: true });
    if (!updatedAdZone) {
      return res.status(404).json({ status: 'error', message: 'AdZone not found' });
    }
    res.status(200).json({ status: 'success', data: updatedAdZone });
  } catch (err) {
    console.error('Error updating AdZone:', err.message);
    res.status(500).json({ status: 'error', message: 'Server Error', error: err.message });
  }
};


exports.deleteSite = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedAdZone = await AdZone.deleteOne(id);
    if (!deletedAdZone) {
      return res.status(404).json({ status: 'error', message: 'AdZone not found' });
    }
    res.status(204).json({ status: 'success', data: null });
  } catch (err) {
    console.error('Error deleting AdZone:', err.message);
    res.status(500).json({ status: 'error', message: 'Server Error', error: err.message });
  }
};
