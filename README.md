1. вставка данных трех книг в коллекцию books
db.books.insertMany(
  [ 
    {
      title: "Madame Bovary",
      description: "When Emma Rouault marries Charles Bovary she imagines she will pass into the life of luxury and passion that she reads about in sentimental novels and women’s magazines. But Charles is a dull country doctor, and provincial life is very different from the romantic excitement for which she yearns.",
      authors: "Gustav Flaubert"
    },
    {
      title: "Hamlet",
      description: "Hamlet is Shakespeare’s most popular, and most puzzling, play. It follows the form of a revenge tragedy, in which the hero, Hamlet, seeks vengeance against his father’s murderer, his uncle Claudius, now the king of Denmark.",
      authors: "William Shakespeare"
    },
    {
      title: "The Great Gatsby",
      description: "he story primarily concerns the young and mysterious millionaire Jay Gatsby and his quixotic passion and obsession with the beautiful former debutante Daisy Buchanan.",
      authors: "F. Scott Fizgerald"
    }
  ],
)

2. запрос для поиска полей документов коллекции books по полю title
db.books.find(
  {
    title: { $ne: null, $ne: undefined },
  }
)

3. запрос для редактирования полей: description и authors коллекции books по _id записи
db.books.updateOne(
   { _id: ObjectId("значение_id_записи") },
   { $set: { description: "New description", authors: "new Author" } }
)