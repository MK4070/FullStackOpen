import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { ALL_AUTHORS, SET_BORN } from "../queries";

const AuthorForm = ({ authors, setError }) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const [changeBorn, result] = useMutation(SET_BORN, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => console.log(error.graphQLErrors[0].message),
  });

  useEffect(() => {
    if (result.data && !result.data.editAuthor) setError("not Authenticated");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data]);

  const submit = (event) => {
    event.preventDefault();
    changeBorn({
      variables: { name, setBornTo: parseInt(born) },
    });
    setName("");
    setBorn("");
  };

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        name{" "}
        <select value={name} onChange={({ target }) => setName(target.value)}>
          {authors.map((a) => {
            return (
              <option key={a.id} value={a.name}>
                {a.name}
              </option>
            );
          })}
        </select>
        <div>
          born{" "}
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">udpate author</button>
      </form>
    </div>
  );
};

export default AuthorForm;
