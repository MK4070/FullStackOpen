describe("Blog app", () => {
  beforeEach(function () {
    cy.request("POST", "http://localhost:8000/api/testing/reset");
    const users = [
      {
        name: "Super User",
        username: "superuser",
        password: "usersuper",
      },
      {
        name: "another user",
        username: "anotheruser",
        password: "useranother",
      },
    ];
    users.forEach((user) => {
      cy.request("POST", "http://localhost:8000/api/users", user);
    });
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", () => {
    cy.get("#viewForm").click();
    cy.contains("Blogs");
    cy.contains("Login to application");
    cy.contains("username");
    cy.contains("password");
    cy.contains("login");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#viewForm").click();
      cy.get("#username").type("superuser");
      cy.get("#password").type("usersuper");
      cy.get("#loginBtn").click();
      cy.contains("Super User logged-in");
    });

    it("fails with wrong credentials", function () {
      cy.get("#viewForm").click();

      cy.get("#username").type("superuser");
      cy.get("#password").type("wrong");
      cy.get("#loginBtn").click();

      cy.get(".error")
        .should("contain", "Wrong username or password")
        .and("have.css", "color", "rgb(255, 0, 0)")
        .and("have.css", "border-style", "solid");

      cy.get("html").should("not.contain", "Super User logged-in");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "superuser", password: "usersuper" });
      cy.createBlog({
        title: "testblog",
        author: "superman",
        url: "www.testing.com",
        likes: 5,
      });
    });

    it("A blog can be created", function () {
      cy.get("#viewForm").click();

      cy.get("#title").type("blog created by cypress");
      cy.get("#author").type("tester");
      cy.get("#url").type("www.testing.com");
      cy.get("#submitBtn").click();

      cy.contains("blog created by cypress tester");
      cy.get(".success")
        .should("contain", "blog created by cypress by tester added")
        .and("have.css", "color", "rgb(0, 128, 0)")
        .and("have.css", "border-style", "solid");
    });

    it("A blog can be liked", function () {
      cy.get("#viewDetails").click();
      cy.get("#likeBtn").click();
      cy.get("#blogLikes").should("contain", "likes 6");
    });

    it("The user who created a blog can delete it", function () {
      cy.get("#viewDetails").click();
      cy.contains("remove");
      cy.get("#removeBlogBtn").click();
      cy.get("html").should("not.contain", "testblog superman");
    });

    it("other users cannot delete the blog", function () {
      cy.get("#logoutBtn").click();
      cy.login({ username: "anotheruser", password: "useranother" });
      cy.get("#viewDetails").click();
      cy.get("#removeBlogBtn").should("not.exist");
    });

    describe("and several blogs exist", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "testblog2",
          author: "superman",
          url: "www.testing.com",
          likes: 3,
        });
        cy.createBlog({
          title: "testblog3",
          author: "superman",
          url: "www.testing.com",
          likes: 1,
        });
      });
      it("blogs are ordered according to likes", function () {
        cy.get(".blog #viewDetails").click({ multiple: true });
        cy.get("#blogLikes #likeText").then((blogs) => {
          const likes = [5, 3, 1];
          blogs.map((i, el) => cy.wrap(el).contains(`likes ${likes[i]}`));
        });
      });
    });
  });
});
