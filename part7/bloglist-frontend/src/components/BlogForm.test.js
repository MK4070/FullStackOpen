import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BlogForm from "./BlogForm";
import userEvent from "@testing-library/user-event";

test("<BlogForm /> updates parent state and calls onSubmit", () => {
  const createBlog = jest.fn();

  const { container } = render(<BlogForm addBlog={createBlog} />);

  const title = container.querySelector("#title");
  const author = container.querySelector("#author");
  const url = container.querySelector("#url");

  const submitBtn = container.querySelector("#submitBtn");

  userEvent.type(title, "testing form");
  userEvent.type(author, "best tester");
  userEvent.type(url, "www.best-tester.com");
  userEvent.click(submitBtn);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe("testing form");
  expect(createBlog.mock.calls[0][0].author).toBe("best tester");
  expect(createBlog.mock.calls[0][0].url).toBe("www.best-tester.com");
});
