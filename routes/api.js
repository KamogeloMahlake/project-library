/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';
const mongoose = require('mongoose');
const {model, Schema} = mongoose;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const bookSchema = new Schema({
  title: {type: String, required: true},
  comments: [String]
})

const Book = model("Book", bookSchema);

module.exports = function (app) {

  app.route('/api/books')
    .get(function (req, res){
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
      Book.find({}).then(data => {
        const array = []
        data.forEach(e => {
          array.push({
            title: e.title,
            _id: e._id,
            commentcount: e.comments.length
          })
        })
        res.json(array);
      })
    })
    
    .post(function (req, res){
      let title = req.body.title;
      if (!title) return res.send("missing required field title");
      const book = new Book({title: title});
      book.save().then(({_id, title}) => res.json({_id, title}));

      //response will contain new book object including atleast _id and title
    })
    
    .delete(function(req, res){
      //if successful response will be 'complete delete successful'
      Book.deleteMany({}).then(_e => res.send("complete delete successful"));
    });



  app.route('/api/books/:id')
    .get(async  (req, res) => {
      let bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
      const book = await Book.find({_id: bookid});
      if (book.length === 0) return res.send("no book exists");
      const {title, _id, comments} = book[0];
      console.log(title);
      return res.json({title, _id, comments});
    
    })
    
    .post(async (req, res) => {
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get
      if (!comment) return res.send("missing required field comment");
      

      Book.findByIdAndUpdate(bookid, {$addToSet: {comments: comment}}).then(data => {
        data.comments.push(comment);
        return res.json({title: data.title, _id: data._id, comments: data.comments})
      }).catch(err => res.send("no book exists"))
    })
    
    .delete(async (req, res) => {
      let bookid = req.params.id;
      const book = await Book.find({_id: bookid});
      if (book.length === 0) return res.send("no book exists");
      Book.findByIdAndDelete(bookid).then(e => res.send("delete successful"))

    });
  
};
