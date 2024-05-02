const express = require("express");
const router = express.Router();
// const availabilityRoute = require("./availability");
// const bookingRoute = require("./booking");
// const contactRoute = require("./contact");
const servicesRoute = require("./services");
// const staffRoute = require("./staff");

// router.use("/availability", availabilityRoute);
// router.use("/contact", contactRoute);
router.use("/services", servicesRoute);
// router.use("/staff", staffRoute);
// router.use("/booking", bookingRoute);

/**
 * GET /
 *
 * Entry point for the app. Will redirect to the /services endpoint.
 */
router.get("/", async (req, res, next) => {
  res.redirect("/services");
});

module.exports = router;
