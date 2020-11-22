const express = require("express");
const router = express.Router();

const Employee = require("../models/Employee");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  const userId = req.user.id;

  try {
    const employees = await Employee.find({ userId });
    res.json(employees);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server error" });
  }
});

router.post("/", auth, async (req, res) => {
  const userId = req.user.id;
  const employeeName = req.body.employeeName;
  try {
    const check = await Employee.findOne({ employeeName, userId });
    if (check) {
      return res.status(400).json({ msg: "Employee already added" });
    }

    const employee = new Employee({ employeeName, userId });
    const save = await employee.save();
    res.json(save);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server error" });
  }
});

router.put("/:id", auth, async (req, res) => {
  const id = req.params.id;
  const newName = req.body.newName;
  try {
    const check = await Employee.findById(id);
    if (!check) {
      return res.status(400).json({ msg: `Invalid employee` });
    }

    const update = await Employee.findByIdAndUpdate(
      id,
      { $set: { employeeName: newName } },
      { new: true }
    );
    res.json({ update });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server error" });
  }
});

router.delete("/:id", auth, async (req, res) => {
  const id = req.params.id;
  try {
    const check = await Employee.findById(id);
    if (!check) {
      return res.status(400).json({ msg: `Invalid employee` });
    }

    await Employee.findByIdAndRemove(id);
    res.json({ msg: "Deleted successfuflly" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
