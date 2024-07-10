const express = require('express');
const router = express.Router();
const {getSite , createSite , updateSite , deleteSite} = require('../controllers/adZoneController');

router.get("/sites",getSite);

router.post("/sites",createSite);
router.put("/sites/:siteId",updateSite);
router.delete("/sites/:siteId",deleteSite)

module.exports = router;
