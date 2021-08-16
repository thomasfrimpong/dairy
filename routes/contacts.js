const express = require("express");
const router = express.Router();

const {
  getUserContacts,
  createContact,
  updateContact,
  deleteContact,
} = require("../controllers/contacts");

const { protect } = require("../middleware/auth");

router.get("/", protect, getUserContacts);

router.post("/", protect, createContact);

router.put("/:id", protect, updateContact);

router.delete("/:id", protect, deleteContact);

module.exports = router;
