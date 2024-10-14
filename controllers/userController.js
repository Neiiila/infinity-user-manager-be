const User = require('../models/User');
const bcrypt = require('bcrypt');


exports.addUser = async (req, res) => {
    const { username, email, password, role, verified } = req.body;
    try {
        let user = await User.findOne({ email});
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user = new User({
            username,
            email,
            password: hashedPassword,
            role,
            verified,
        });
        await user.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

exports.getUserProfile = async (req, res) => {
    const user = await User.findById(req.user.id);
    if(user) {
        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            verified: user.verified,
        });
    }else {
        console.error('User not found');
        res.status(404);
    }
};

exports.updateUserProfile = async (req, res) => {
    const user = await User.findById(req.user.id);

    if (user) {
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;

        // Check if password is being updated
        if (req.body.password) {
            user.password = await bcrypt.hash(req.body.password, 10); // Await bcrypt hashing
        }

        user.role = req.body.role || user.role;
        user.verified = req.body.verified || user.verified;

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            role: updatedUser.role,
            verified: updatedUser.verified,
        });
    } else {
        console.error('User not found');
        res.status(404).json({ message: 'User not found' });
    }
};

exports.getAllUsers = async (req, res) => {
    const users = await User.find({});  
    res.json(users);
}


exports.deleteUser = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      
      if (user) {
        await user.deleteOne();  // Use deleteOne() instead of remove()
        res.json({ message: 'User removed' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error('Error deleting user', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

exports.getUsersByRole = async (req, res) => {
const { role } = req.query; 

try {
    const users = await User.find({ role });
    res.status(200).json(users);
} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch users' });
}
};
  
  