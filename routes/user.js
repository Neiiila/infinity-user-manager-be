const express = require('express');

const { getUserProfile, updateUserProfile, getAllUsers, deleteUser, addUser, getUsersByRole }   = require('../controllers/userController');
const { protect, authorize } = require('../middlewares/authMiddleware');
const router = express.Router(); 

router.route("/user/:id")
  .get(protect, getUserProfile) 
  .put(protect, updateUserProfile) 
  .delete(protect, authorize('Admin'), deleteUser); 
router.route("/user").post(protect, authorize('Admin'), addUser)
router.route("/users").get( protect, authorize('Admin'),  getAllUsers);
router.route("/usersbyrole").get( protect, authorize('Admin'),  getUsersByRole);

module.exports = router; 