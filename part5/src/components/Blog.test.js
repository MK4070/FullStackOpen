import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("<Blog />", () => {
  let container;
  const blog = {
    title: "testing component",
    author: "tester1",
    url: "www.testing.com",
    likes: 2,
    user: {
      name: "testuser",
      username: "testuser",
    },
  };

  const likeBlog = jest.fn();
  const deleteBlog = jest.fn();

  beforeEach(() => {
    container = render(
      <Blog blog={blog} likeBlog={likeBlog} deleteBlog={deleteBlog} />
    ).container;
  });

  test("renders title and author only by default", () => {
    const title = screen.getByText("testing component", { exact: false });
    const author = screen.getByText("tester1", { exact: false });
    const url = screen.queryByText(blog.url);
    const likes = screen.queryByText(blog.likes);

    expect(title).toBeDefined();
    expect(author).toBeDefined();
    expect(url).toBeNull();
    expect(likes).toBeNull();
  });

  test("after clicking the button, all blog content is displayed", () => {
    const btn = container.querySelector(".viewBtn");
    userEvent.click(btn);

    const url = container.querySelector("#blogUrl");
    const likes = container.querySelector("#blogLikes");
    expect(url).toBeDefined();
    expect(likes).toBeDefined();
  });

  test("clicking like button twice calls the event handler twice", () => {
    const btn = container.querySelector(".viewBtn");
    userEvent.click(btn);

    const likeBtn = container.querySelector("#likeBtn");
    userEvent.click(likeBtn);
    userEvent.click(likeBtn);
    expect(likeBlog.mock.calls).toHaveLength(2);
  });
});
