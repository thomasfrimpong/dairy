exports.getUserInfo = async (req, res) => {
  res.json({ success: true, data: req.user });
};
