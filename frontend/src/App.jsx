import { useState } from "react";
import instance from "./axios";
import "./App.css";

/* ===== FIELD BLUEPRINT ===== */
const FIELD_CONFIG = {
  input: {
    label: "Text Input",
    placeholder: "Enter text",
    value: "",
  },
  textarea: {
    label: "Text Area",
    placeholder: "Enter message",
    value: "",
  },
  select: {
    label: "Select Menu",
    options: ["Option 1", "Option 2"],
    value: "",
  },
  radio: {
    label: "Radio Choice",
    options: ["Option 1", "Option 2"],
    value: "",
  },
  checkbox: {
    label: "Checkbox",
    checked: false,
  },
  date: {
    label: "Date Picker",
    value: "",
  },
  email: {
    label: "Email",
    placeholder: "Enter email",
    value: "",
  },
  number: {
    label: "Number",
    placeholder: "Enter number",
    value: "",
  },
  button: {
    label: "Submit Form",
  },
};

const App = () => {
  const [fields, setFields] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  /* ===== ADD FIELD ===== */
  function addField(type) {
    const base = FIELD_CONFIG[type];

    const newField = {
      id: Date.now(),
      type,
      ...base,
      autofocus: false,
      autocomplete: true,
    };

    setFields((prev) => [...prev, newField]);
    setSelectedId(newField.id);
  }

  /* ===== UPDATE FIELD ===== */
  function updateField(id, key, value) {
    setFields((prev) =>
      prev.map((f) => (f.id === id ? { ...f, [key]: value } : f)),
    );
  }

  function deleteField(id) {
    setFields((prev) => prev.filter((f) => f.id !== id));

    // if deleted field was selected
    if (id === selectedId) {
      setSelectedId(null);
    }
  }

  const selectedField = fields.find((f) => f.id === selectedId);

  /* ===== SAVE FORM ===== */
  async function saveForm() {
    try {
      await instance.post("/form", { fields });
      alert("Form saved successfully");
    } catch (error) {
      alert("Error saving form");
    }
  }

  return (
    <div className="app">
      {/* LEFT PANEL */}
      <div className="panel left">
        <h3>Components</h3>

        <button onClick={() => addField("input")}>Text Input</button>
        <button onClick={() => addField("textarea")}>Text Area</button>
        <button onClick={() => addField("select")}>Select Menu</button>
        <button onClick={() => addField("radio")}>Radio Choice</button>
        <button onClick={() => addField("checkbox")}>Checkbox</button>
        <button onClick={() => addField("date")}>Date Picker</button>
        <button onClick={() => addField("email")}>Email</button>
        <button onClick={() => addField("number")}>Number</button>
        <button onClick={() => addField("button")}>Submit Button</button>
      </div>

      {/* MIDDLE PANEL */}
      <div className="panel middle">
        <h3>Untitled Form</h3>

        {fields.map((field) => (
          <div
            key={field.id}
            className={`form-item ${field.id === selectedId ? "active" : ""}`}
            onClick={() => setSelectedId(field.id)}
          >
            {/* DELETE BUTTON */}
            <button
              className="delete-btn"
              onClick={(e) => {
                e.stopPropagation(); // VERY IMPORTANT
                deleteField(field.id);
              }}
            >
              Delete
            </button>

            {field.type !== "button" && <label>{field.label}</label>}

            {field.type === "input" && (
              <input
                placeholder={field.placeholder}
                value={field.value}
                onChange={(e) => updateField(field.id, "value", e.target.value)}
              />
            )}

            {field.type === "textarea" && (
              <textarea
                placeholder={field.placeholder}
                value={field.value}
                onChange={(e) => updateField(field.id, "value", e.target.value)}
              />
            )}

            {field.type === "email" && (
              <input
                type="email"
                placeholder={field.placeholder}
                value={field.value}
                onChange={(e) => updateField(field.id, "value", e.target.value)}
              />
            )}

            {field.type === "number" && (
              <input
                type="number"
                placeholder={field.placeholder}
                value={field.value}
                onChange={(e) => updateField(field.id, "value", e.target.value)}
              />
            )}

            {field.type === "date" && (
              <input
                type="date"
                value={field.value}
                onChange={(e) => updateField(field.id, "value", e.target.value)}
              />
            )}

            {field.type === "select" && (
              <select
                value={field.value}
                onChange={(e) => updateField(field.id, "value", e.target.value)}
              >
                {field.options.map((opt, i) => (
                  <option key={i}>{opt}</option>
                ))}
              </select>
            )}

            {field.type === "radio" &&
              field.options.map((opt, i) => (
                <label key={i}>
                  <input
                    type="radio"
                    name={field.id}
                    checked={field.value === opt}
                    onChange={() => updateField(field.id, "value", opt)}
                  />
                  {opt}
                </label>
              ))}

            {field.type === "checkbox" && (
              <input
                type="checkbox"
                checked={field.checked}
                onChange={(e) =>
                  updateField(field.id, "checked", e.target.checked)
                }
              />
            )}

            {field.type === "button" && (
              <button className="submit-btn">{field.label}</button>
            )}
          </div>
        ))}
      </div>

      {/* RIGHT PANEL */}
      <div className="panel right">
        <button className="save-form-btn" onClick={saveForm}>Save Form</button>

        <h3>Properties</h3>

        {!selectedField && <p>Select an element</p>}

        {selectedField && (
          <>
            <input
              placeholder="Label"
              value={selectedField.label}
              onChange={(e) =>
                updateField(selectedField.id, "label", e.target.value)
              }
            />

            {selectedField.placeholder !== undefined && (
              <input
                placeholder="Placeholder"
                value={selectedField.placeholder}
                onChange={(e) =>
                  updateField(selectedField.id, "placeholder", e.target.value)
                }
              />
            )}

            {selectedField.options && (
              <textarea
                placeholder="Options (comma separated)"
                value={selectedField.options.join(",")}
                onChange={(e) =>
                  updateField(
                    selectedField.id,
                    "options",
                    e.target.value.split(","),
                  )
                }
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default App;
