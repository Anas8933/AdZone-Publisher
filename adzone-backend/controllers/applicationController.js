const Application = require('../models/siteModel');
const { v4: uuidv4 } = require('uuid');

const createSite = async (req, res) => {
  const { websiteName, websiteUrl, publisherId,mainCategory, subCategory  } = req.body;
  console.log(req.body)
  try {
    const newApplication = new Application({
      mainCategory,
      subCategory,
      websiteName,
      websiteUrl,
      publisherId,
      siteId: generateSiteUniqueId(),
      metaTagCode: generateMetaCode()
    });

    const application = await newApplication.save();
    res.json({ status: 'success', data: application });
  } catch (err) {
    console.error('Error saving application:', err.message);
    res.status(500).json({ status: 'error', message: 'Server Error', error: err.message });
  }
};

function generateSiteUniqueId() {
  const uuid = uuidv4().replace(/[^0-9]/g, ''); 
  return uuid.slice(0, 8); 
}

function generateMetaCode() {
  const random = Math.floor(Math.random() * 100000000000000000);
  const split = random.toString().split('');
  const simbolAdd = split.map((item, index) => {
    if (index % 5 === 0) {
      if (index % 2 === 0) {
        if (index % 3 === 0) {
          return item + 'dc';
        }
        return item + 'bh';
      }
      return item + 'af';
    }
    return item;
  });
  return simbolAdd.join('');
}

const getSites = async (req, res) => {
  
  try {
    const {status}=req.query;
      console.log(status)
    const query={};
    if(status)
      query.status=status;
    const applications = await Application.find(query);
    res.json({ status: 'success', data: applications });
  } catch (err) {
    console.error('Error fetching applications:', err.message);
    res.status(500).json({ status: 'error', message: 'Server Error', error: err.message });
  }
};

const updateSite = async (req, res) => {
  const {siteId} = req.params;
  const data=req.body;
  console.log(siteId,data,"data")
  try {
    const updatedSite = await Application.updateOne(
      { siteId },
      data,
      { new: true, runValidators: true }
    );
    if (!updatedSite) return res.status(404).json({ status: 'error', message: 'Site not found' });
    res.status(200).json({ status: 'success', data: updatedSite });
  } catch (err) {
    console.error('Error updating site:', err.message);
    res.status(500).json({ status: 'error', message: 'Server Error', error: err.message });
  }
};

const deleteSite = async (req, res) => {
  
  const {siteId} = req.params;
  console.log(parseInt(siteId),"siteid")
  try {
    const deletedSite = await Application.deleteOne({ siteId:siteId});
    console.log(deletedSite,"deleted")
    if (!deletedSite) {
      return res.status(404).json({ status: 'error', message: 'Site not found' });
    }
    res.status(200).json({ status: 'success', message: 'Site deleted successfully'});
  } catch (err) {
    console.error('Error deleting site:', err.message);
    res.status(500).json({ status: 'error', message: 'Server Error', error: err.message });
  }
};



module.exports = {
  createSite,
  getSites,
  updateSite,
  deleteSite,
  

  
  
};
