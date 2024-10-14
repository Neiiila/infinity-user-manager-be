const express = require('express');
const router = express.Router();
const {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject
} = require('../controllers/projectController');
const { protect, authorize } = require('../middlewares/authMiddleware');

// Route to create a new project (Admin/Developer)
router.post('/', protect, authorize('Admin', 'Developer'), createProject);

// Route to get all projects (Admin/Developer/Client)
router.get('/', protect, authorize('Admin', 'Developer', 'Client'), getAllProjects);

// Route to get a specific project by ID (Admin/Developer/Client)
router.get('/:id', protect, authorize('Admin', 'Developer', 'Client'), getProjectById);

// Route to update a specific project by ID (Admin/Developer)
router.put('/:id', protect, authorize('Admin', 'Developer'), updateProject);

// Route to delete a specific project by ID (Admin only)
router.delete('/:id', protect, authorize('Admin'), deleteProject);

module.exports = router;
