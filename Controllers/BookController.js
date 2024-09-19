const Book = require('../Modals/Books');

// Get all books
exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get book by ID
exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.json(book);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Add a new book
exports.addBook = async (req, res) => {
    const { title, author, year } = req.body;
    try {
        const newBook = new Book({ title, author, year });
        await newBook.save();
        res.status(201).json({message:'Book Added'});
    } catch (error) {
        res.status(400).json({ message: 'Bad request' });
    }
};

// Update an existing book
exports.updateBook = async (req, res) => {
    const { title, author, year } = req.body;
    try {
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            { title, author, year },
            { new: true }
        );
        if (!updatedBook) return res.status(404).json({ message: 'Book not found' });
        res.json(updatedBook);
    } catch (error) {
        res.status(400).json({ message: 'Bad request' });
    }
};

// Delete a book
exports.deleteBook = async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) return res.status(404).json({ message: 'Book not found' });
        res.json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
