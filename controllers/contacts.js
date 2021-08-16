const Contact = require("../models/Contact");
const ErrorResponse = require("../utils/errorResponse");

exports.createContact = async (req, res, next) => {
  req.body.user = req.user.id;

  try {
    const contact = await Contact.create(req.body);

    res.json({ success: true, data: contact });
  } catch (error) {
    return next(new ErrorResponse(`Contact not created.`, 500));
  }
};

exports.getUserContacts = async (req, res) => {
  const contacts = await Contact.find({ user: req.user.id });

  res.json({ success: true, data: contacts });
};

exports.updateContact = (req, res) => {
  res.send("contact updated...");
};

exports.deleteContact = (req, res) => {
  res.send("contacts deleted...");
};
