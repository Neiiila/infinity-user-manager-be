const Project = require('../models/Project');

// Create a new project
exports.createProject = async (req, res) => {
  const { title, description, developer, client, budget, state } = req.body;
  
  try {
    const project = new Project({
      title,
      description,
      developer,
      client,
      budget,
      state,
    });

    await project.save();
    res.status(201).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create project' });
  }
};

// Get all projects
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find()
    .populate('developer', 'username email')
    .populate('client', 'username email');

    res.status(200).json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch projects' });
  }
};

// Get a specific project by ID
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate('developer client', 'username email');
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch project' });
  }
};

// Update a project by ID
exports.updateProject = async (req, res) => {
  const { title, description, developer, client, budget, state } = req.body;

  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    project.title = title || project.title;
    project.description = description || project.description;
    project.developer = developer || project.developer;
    project.client = client || project.client;
    project.budget = budget || project.budget;
    project.state = state || project.state;

    await project.save();
    res.status(200).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update project' });
  }
};

// Delete a project by ID
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    await project.deleteOne();
    res.status(200).json({ message: 'Project deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete project' });
  }
};
