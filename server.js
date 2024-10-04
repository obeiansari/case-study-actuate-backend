import express from 'express'
import cors from 'cors'
const app = express();
const PORT = 8080;

app.use(express.json())
app.use(cors())
const books = [
    {
      "author": "Chinua Achebe",
      "country": "Nigeria",
      "imageLink": "https://upload.wikimedia.org/wikipedia/en/2/28/ThingsFallApart.jpg",
      "language": "English",
      "link": "https://en.wikipedia.org/wiki/Things_Fall_Apart",
      "pages": 209,
      "title": "Things Fall Apart",
      "year": 1958,
      "shortDescription": "A novel about the impacts of colonialism in Nigeria, focusing on the life of Okonkwo."
    },
    {
      "author": "Hans Christian Andersen",
      "country": "Denmark",
      "imageLink": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Hans_Christian_Andersen_%281865%29.jpg/800px-Hans_Christian_Andersen_%281865%29.jpg",
      "language": "Danish",
      "link": "https://en.wikipedia.org/wiki/Fairy_Tales_Told_for_Children._First_Collection.",
      "pages": 784,
      "title": "Fairy Tales",
      "year": 1836,
      "shortDescription": "A collection of classic fairy tales that explore themes of morality and magic."
    },
    {
      "author": "Dante Alighieri",
      "country": "Italy",
      "imageLink": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Dante_Alighieri_portrait.jpg/800px-Dante_Alighieri_portrait.jpg",
      "language": "Italian",
      "link": "https://en.wikipedia.org/wiki/Divine_Comedy",
      "pages": 928,
      "title": "The Divine Comedy",
      "year": 1315,
      "shortDescription": "An epic poem detailing Dante's journey through Hell, Purgatory, and Heaven."
    },
    {
      "author": "Unknown",
      "country": "Sumer and Akkadian Empire",
      "imageLink": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Gilgamesh.jpg/800px-Gilgamesh.jpg",
      "language": "Akkadian",
      "link": "https://en.wikipedia.org/wiki/Epic_of_Gilgamesh",
      "pages": 160,
      "title": "The Epic Of Gilgamesh",
      "year": -1700,
      "shortDescription": "One of the oldest known pieces of literature, telling the adventures of Gilgamesh."
    },
    {
      "author": "Unknown",
      "country": "Achaemenid Empire",
      "imageLink": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Job_losing_his_children.jpg/800px-Job_losing_his_children.jpg",
      "language": "Hebrew",
      "link": "https://en.wikipedia.org/wiki/Book_of_Job",
      "pages": 176,
      "title": "The Book Of Job",
      "year": -600,
      "shortDescription": "A biblical text exploring the themes of suffering and faith through the story of Job."
    }
  ]
  ;

app.get('/books', (req, res) => {
    try {
        res.status(200).json(books)
    } catch (error) {
        return res.status(500).json({message: "internal server error"})
    }
})

app.get('/books/:searchTerm', (req, res) => {
    const { searchTerm } = req.params;
    console.log(`Search Term: ${searchTerm}`);
    
    if (!searchTerm) {
        return res.status(400).json({ message: "Search term cannot be empty" });
    }
    
    try {
        const book = books.filter(b => 
            b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            b.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
            b.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
            b.year == searchTerm
        );

        if (book.length > 0) {
            return res.json(book);
        } else {
            return res.status(404).json({ message: "Book not found" });
        }
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).json({ message: "Internal server error" });
    }
});


app.post('/books', (req, res) => {

    const { title, author, shortDescription, year } = req.body;

    try {
        if (!title || !author || !year || !shortDescription) {
            return res.status(400).json({message: "title author and year are required"})
        }

        const book = {title, author, year, shortDescription}
    
        books.push(book)
        res.status(201).json(books)
    } catch (error) {
        return res.status(500).json({message: "internal server error"})
    }

})

app.listen(PORT, () => {
    console.log(`server is running on PORT ${PORT}`);
})