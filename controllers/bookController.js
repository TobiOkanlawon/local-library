const BookModel = require("../models/book");
const AuthorModel = require("../models/author");
const GenreModel = require("../models/genre");
const BookInstanceModel = require("../models/bookinstance");

const async = require("async");

exports.index = function (req, res) {
  async.parallel(
    {
      book_count: function (callback) {
        BookModel.countDocuments({}, callback);
      },
      book_instance_count: function (callback) {
        BookInstanceModel.countDocuments({}, callback);
      },
      book_instance_available_count: function (callback) {
        BookInstanceModel.countDocuments({ status: "Available" }, callback);
      },
      author_count: function (callback) {
        AuthorModel.countDocuments({}, callback);
      },
      genre_count: function (callback) {
        GenreModel.countDocuments({}, callback);
      },
    },
    function (err, results) {
      res.render("index", {
        title: "Local Library Home",
        error: err,
        data: results,
      });
    }
  );
};

// Display list of all books.
exports.book_list = function (req, res, next) {
  BookModel.find({}, "title author")
    .populate("author")
    .exec(function (err, list_books) {
      if (err) {
        return next(err);
      }
      res.render("book_list", { title: "Book list", book_list: list_books });
    });
};

// Display detail page for a specific book.
exports.book_detail = function (req, res, next) {
  async.parallel(
    {
      book: function (callback) {
        BookModel.findById(req.params.id)
          .populate("author")
          .populate("genre")
          .exec(callback);
      },
      bookinstance: function (callback) {
        BookInstanceModel.find({ book: req.params.id }).exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      } else if (results.book == null) {
        const err = new Error("Book not found");
        err.status = 404;
        return next(err);
      }
      res.render("book_detail", {
        title: results.book.title,
        book: results.book,
        book_instances: results.bookinstance,
      });
    }
  );
};

// Display book create form on GET.
exports.book_create_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Book create GET");
};

// Handle book create on POST.
exports.book_create_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Book create POST");
};

// Display book delete form on GET.
exports.book_delete_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Book delete GET");
};

// Handle book delete on POST.
exports.book_delete_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Book delete POST");
};

// Display book update form on GET.
exports.book_update_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Book update GET");
};

// Handle book update on POST.
exports.book_update_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Book update POST");
};
