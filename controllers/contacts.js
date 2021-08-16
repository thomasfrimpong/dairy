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

exports.updateContact = async (req, res, next) => {
  let contact = await Contact.findById(req.params.id);

  if (!contact)
    return next(
      new ErrorResponse(`Contact with id ${req.params.id} is not found`, 404)
    );

  try {
    contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    });

    res.json({ success: true, data: contact });
  } catch (error) {
    return next(new ErrorResponse(`Contact not updated.`, 500));
  }
};

exports.deleteContact = (req, res, next) => {
  res.send("contacts deleted...");
};
