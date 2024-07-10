const express = require('express');
const router = express.Router();

const { getSites ,createSite,updateSite ,deleteSite    } = require("../controllers/applicationController");




router.get("/sites",getSites);

router.post("/sites",createSite);
router.put("/sites/:siteId",updateSite);
router.delete("/sites/:siteId",deleteSite)

module.exports = router;
