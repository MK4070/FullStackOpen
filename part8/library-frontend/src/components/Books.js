import { useLazyQuery, useSubscription } from "@apollo/client";
import { useEffect, useRef, useState } from "react";
import { ALL_BOOKS, BOOK_ADDED } from "../queries";

const Books = (props) => {
  const [genre, setGenre] = useState(null);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const allGenres = useRef();
  const [getBooks, result] = useLazyQuery(ALL_BOOKS);

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded;
      window.alert(`added ${addedBook.title}`);
    },
  });

  useEffect(() => {
    if (result.data) {
      if (!genre) {
        const genres = [];
        result.data.allBooks.forEach((b) => {
          for (const g of b.genres) if (!genres.includes(g)) genres.push(g);
        });
        allGenres.current = genres;
      }
      setFilteredBooks(result.data.allBooks);
    }
  }, [result, genre]);

  useEffect(() => {
    getBooks({ variables: { genre } });
  }, [getBooks, genre]);

  if (!props.show) return null;

  return (
    <div>
      <h2>Books</h2>
      <div>
        in genre <strong>{genre || "ALL"}</strong>
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {allGenres.current.map((g, i) => (
        <button key={i + 1} onClick={() => setGenre(g)}>
          {g}
        </button>
      ))}
      <button onClick={() => setGenre(null)}>All genres</button>
    </div>
  );
};

export default Books;
