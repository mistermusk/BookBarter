const Book = require('../models/book');
const User = require('../models/user');
const BooksOnTrade = require('../models/booksOnTrade');

exports.addBook = function(req, res , next ) {
    // you have access to req.user because of requireAuth
    let newBook = new Book({
        name: req.body.name,
        img_url: req.body.img_url,
        rating: req.body.rating,
        onTrade: false,
        createdBy: req.user.name,
        createdById: req.user._id
    });

    newBook.save(function(err) {
        if (err) res.send('there was an error');

        res.send('book saved');
    });
};

exports.deleteBook = function(req , res, next) {
    Book.findByIdAndRemove(req.body.id , function(err) {
        if (err) res.send('there was an error');

        res.send('book deleted!');
    })
}

exports.getAllBooks = function(req, res , next) {
    Book.find({} , function(err, books) {
        if (err) res.send('there was an error');

        res.json(books);
    })
}

exports.requestTrade = function( req , res , next) {
   //save to db this request
   var newRequest = new BooksOnTrade({
    name: req.body.name,
    img_url: req.body.img_url,
    rating: req.body.rating,
    onTrade: false,
    createdBy: req.body.createdBy,
    createdById: req.body.createdById,
    requestedBy: req.user.name,
    requestedById: req.user._id,
    accepted: false
   });
   newRequest.save(function(err) {
    if(err) throw err;
    res.send('request sent');
   })
}

exports.acceptTrade = function(req , res , next) {
    // send trade id not book id.!!!!!
   var requestedBookId = req.body.id;
   BooksOnTrade.findById( requestedBookId , function(err , book) {
       // flip onTrade boolean
       if(err) res.status(404).send('there was a problem with accepting');
       book.onTrade = true;
       book.accepted = true;
       book.save(function(err) {
           if (err) throw err;
           res.send('trade accepted');
       })
   })

}

exports.deleteTrade = function(req , res ,next ) {
    // id of the request trade element in the DB
    BooksOnTrade.findByIdAndRemove( req.body.id , function(err) {
        if (err) res.status(404).send('there was problem with deleting');

        res.send('trade finished therefore deleted');
    })
}

exports.getBooksOnTrade = function(req , res) {
    BooksOnTrade.find({} , function(err , books ) {
        if (err) res.status(404).send('problem with finding books');

        let booksToReturn = books.filter(function(e) {
            if((e.requestedById == req.user._id) || (e.createdById == req.user._id)) {
                return true
            } 
        })

        res.json(booksToReturn);
    })
}