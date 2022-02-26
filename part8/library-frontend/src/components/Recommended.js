import { useQuery, useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { ALL_BOOKS, ME } from "../queries";

const Recommended = ({ show }) => {
  const user = useQuery(ME);
  const [getBooks, result] = useLazyQuery(ALL_BOOKS);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (result.data) setFavorites(result.data.allBooks);
  }, [setFavorites, result]);

  useEffect(() => {
    if (user.data && user.data.me)
      getBooks({ variables: { genre: user.data.me.favoriteGenre } });
  }, [getBooks, user.data]);

  if (!show) return null;

  return (
    <div>
      <h2>Recommendations</h2>
      <div>
        books in your favorite genre{" "}
        <strong>{user.data && user.data.me.favoriteGenre}</strong>
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {favorites.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommended;
