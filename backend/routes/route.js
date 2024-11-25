const express = require('express');
const router = express.Router();
const controller = require('../controller/registrationcontroller');
const passwordcontroller = require("../controller/passwordcontroller");
const logincontroller = require("../controller/logincontroller");
const homecontroller = require("../controller/homecontroller");
const alumniregistrationcontroller = require("../controller/alumniregistrationcontroller");
const jobcontroller = require("../controller/jobpostcontroller");
const upload = require('../middleware/upload');
const eventcontroller=require('../controller/eventcontroller');
const eventupload=require('../middleware/eventupload');
const adminregistration=require('../controller/adminregistrationcontroller');
const admincontroller=require('../controller/admincontroller');
const fetch=require('../controller/fetchcontroller');

router.route("/postevents").post(eventupload.single("eventImage"),eventcontroller.postevent);

router.route("/getevents").get(eventcontroller.getevent);
router.route("/studentregistration").post(controller.studentregistration);
router.route("/verifystudentemail").post(controller.verifyEmail);

router.route("/alumniregistration").post(alumniregistrationcontroller.alumniregistration);
router.route("/verify-email").post(alumniregistrationcontroller.verifyEmail);

router.route("/forgotPassword").post(passwordcontroller.forgotPassword);
router.route("/resetPassword/:role/:token").patch(passwordcontroller.resetPassword);

router.route("/updatePassword").patch(logincontroller.protect, passwordcontroller.updatePassword);

router.route("/postjobs").post(upload.single("companyImage"), jobcontroller.postjobposts);

// Changed to GET for retrieving job posts
router.route("/getjobs").get(jobcontroller.getjobposts);

 // Middleware for image upload

 router.route("/students").get(fetch.getstudents);

 router.route("/alumnis").get(fetch.getalumnis);



router.route("/home").get(logincontroller.protect, homecontroller.home);

router.route("/login").post(logincontroller.login);


router.route("/admin/signup").post(adminregistration.adminregistration);


router.route("/admin/login").post(admincontroller.login);

module.exports = router;
