const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  first_name: { type: String, required: true, maxlength: 100 },
  family_name: { type: String, required: true, maxlength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

AuthorSchema.virtual("name").get(function () {
  return `${this.family_name} ${this.first_name}`;
});

AuthorSchema.virtual("life_span_string").get(function () {
  const birthDateString = this.date_of_birth
    ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED)
    : "";

  const deathDateString = this.date_of_death
    ? DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED)
    : "";

  if (birthDateString && deathDateString) {
    return `${birthDateString}- ${deathDateString}`;
  }
  return "No data";
});

AuthorSchema.virtual("url").get(function () {
  return `/catalog/author/${this._id}`;
});

module.exports = mongoose.model("Author", AuthorSchema);
