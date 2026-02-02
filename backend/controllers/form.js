import Form from "../models/form.js";

export async function saveForm(req, res) {
  try {
    const { fields } = req.body;

    if (!fields || !Array.isArray(fields)) {
      return res.status(400).json({ message: "Invalid form data" });
    }

    const form = new Form({ fields });
    await form.save();

    return res.status(201).json({
      message: "Form saved successfully",
      form,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
