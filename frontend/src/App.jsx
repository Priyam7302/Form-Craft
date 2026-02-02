// import { useState } from "react";

// const App = () => {
//   const [input, setInput] = useState([
//     {
//       id: Date.now(),
//       input: {
//         name: "",
//         value: "",
//         properties: {
//           label: "",
//           placeholder: "",
//           autofocus: false,
//           autocomplete: true,
//         },
//       },
//     },
//     {
//       id: Date.now() + 1,
//       textarea: {
//         name: "",
//         value: "",
//         properties: {
//           label: "",
//           placeholder: "",
//           autofocus: false,
//           autocomplete: true,
//         },
//       },
//     },
//     {
//       id: Date.now() + 2,
//       btn: {
//         name: "",
//         value: "",
//         properties: {
//           button_text: "",
//         },
//       },
//     },
//   ]);
//   function handleChange() {
//     setInput((prev) => prev); 
//   }

//   return (
//     <div>
//       <>
//         <button onClick={handleChange}>Text Input</button>
//         <button onClick={handleChange}>Text Area</button>
//         <button onClick={handleChange}>Submit Button</button>
//       </>
//     </div>
//   );
// };

// export default App;
import { useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [fields, setFields] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  // add field
  function addField(type) {
    const newField = {
      id: Date.now(),
      type,
      label: "Text Input",
      placeholder: "Enter Text",
      value: "",
      autofocus: false,
      autocomplete: true,
    };
    setFields((prev) => [...prev, newField]);
    setSelectedId(newField.id);
  }

  // update any property
  function updateField(id, key, value) {
    setFields((prev) =>
      prev.map((f) => (f.id === id ? { ...f, [key]: value } : f)),
    );
  }

  const selectedField = fields.find((f) => f.id === selectedId);
  async function saveForm() {
    try {
      const response = await axios.post(
        "http://localhost:3000/form",
        {
          fields: fields,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      console.log("Saved Form:", response.data);
      alert("Form saved successfully ");
    } catch (error) {
      alert("Error saving form ");
    }
  }


  return (
    <div className="app">
      {/* LEFT – BUTTONS */}
      <div className="panel left">
        <h3>Elements</h3>
        <button onClick={() => addField("input")}>Text Input</button>
        <button onClick={() => addField("textarea")}>Text Area</button>
        <button onClick={() => addField("button")}>Submit Button</button>
      </div>

      {/* MIDDLE – FORM PREVIEW */}
      <div className="panel middle">
        <h3>Untitled Form</h3>

        {fields.map((field) => (
          <div
            key={field.id}
            className={`form-item ${field.id === selectedId ? "active" : ""}`}
            onClick={() => setSelectedId(field.id)}
          >
            {field.type !== "button" && <label>{field.label}</label>}

            {field.type === "input" && (
              <input
                placeholder={field.placeholder}
                value={field.value}
                autoFocus={field.autofocus}
                autoComplete={field.autocomplete ? "on" : "off"}
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

            {field.type === "button" && (
              <button className="submit-btn">{field.label || "Submit"}</button>
            )}
          </div>
        ))}
      </div>

      {/* RIGHT – PROPERTIES */}
      <div className="panel right">
        <button onClick={saveForm}>Save form</button>

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

            {selectedField.type !== "button" && (
              <>
                <input
                  placeholder="Placeholder"
                  value={selectedField.placeholder}
                  onChange={(e) =>
                    updateField(selectedField.id, "placeholder", e.target.value)
                  }
                />

                <label className="checkbox">
                  <input
                    type="checkbox"
                    checked={selectedField.autofocus}
                    onChange={(e) =>
                      updateField(
                        selectedField.id,
                        "autofocus",
                        e.target.checked,
                      )
                    }
                  />
                  Autofocus
                </label>

                <label className="checkbox">
                  <input
                    type="checkbox"
                    checked={selectedField.autocomplete}
                    onChange={(e) =>
                      updateField(
                        selectedField.id,
                        "autocomplete",
                        e.target.checked,
                      )
                    }
                  />
                  Autocomplete
                </label>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default App;
