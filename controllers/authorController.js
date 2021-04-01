const AuthorModel = require("../models/author");
const BookModel = require("../models/book");

const async = require("async");

exports.author_list = function (req, res, next) {
  AuthorModel.find()
    .sort([["family_name", "ascending"]])
    .exec(function (err, list_authors) {
      if (err) {
        next(err);
      }
      res.render("author_list", {
        title: "Author List",
        author_list: list_authors,
      });
    });
};

exports.author_detail = function (req, res, next) {
  async.parallel(
    {
      author: function (callback) {
        AuthorModel.findById(req.params.id).exec(callback);
      },
      author_books: function (callback) {
        BookModel.find({ author: req.params.id }, "title summary").exec(
          callback
        );
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      } else if (results.author == null) {
        const error = new Error("Author not found");
        error.status = 404;
        return next(error);
      }
      res.render("author_detail", {
        title: results.author.name,
        author: results.author,
        author_books: results.author_books,
      });
    }
  );
};

exports.author_create_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Author create GET");
};

exports.author_create_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Author create POST");
};

exports.author_delete_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Author delete GET");
};

exports.author_delete_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Author delete POST");
};

exports.author_update_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Author update GET");
};

exports.author_update_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Author update POST");
};
