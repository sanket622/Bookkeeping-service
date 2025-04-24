const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();
    res.status(201).json({ message: req.t('user_registered') });
  } catch (error) {
    res.status(500).json({ message: req.t('registration_failed'), error });
  }
};

exports.login = async (req, res) => {
  try {
    // Check if client already has a valid token
    const authHeader = req.header('Authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return res.json({ token }); // Return the same token if it's still valid
      } catch {
        // Token is invalid or expired – continue with login process
      }
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: req.t('user_not_found') });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: req.t('invalid_credentials') });

    // Generate new token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: req.t('login_failed'), error });
  }
};
