// import mongoose from "mongoose";
// const formSchema = new mongoose.Schema(
//   {
//     forms: { type: String },
//   },
//   { timestamps: true },
// );
// const Form = mongoose.model("Form", formSchema);
// export default Form;
import mongoose from "mongoose";

const fieldSchema = new mongoose.Schema(
  {
    id: Number,
    type: String,
    label: String,
    placeholder: String,
    value: String,
    autofocus: Boolean,
    autocomplete: Boolean,
  },
  { _id: false },
);

const formSchema = new mongoose.Schema(
  {
    fields: [fieldSchema], //  yahan form builder data aayega
  },
  { timestamps: true },
);

const Form = mongoose.model("Form", formSchema);
export default Form;
