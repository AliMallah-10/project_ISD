const express = require("express");
const router = express.Router();

// Import the co-manager requests controller
const coManagerRequestsController = require("../controllers/coManagerRequestController");

// Define routes for co-manager modification requests
router.get("/", coManagerRequestsController.getAllCoManagerRequests);
router.get("/RequestsByUser/:id", coManagerRequestsController.getCoManagerRequestsByUserId);
router.get("/CoManagerRequest/:id", coManagerRequestsController.getCoManagerRequestById);
router.post("/createCoManager", coManagerRequestsController.createCoManagerRequest);
router.put("/updateCoManager/:id", coManagerRequestsController.updateCoManagerRequest);
router.delete("/deleteCoManager/:id", coManagerRequestsController.deleteCoManagerRequest);

module.exports = router;
