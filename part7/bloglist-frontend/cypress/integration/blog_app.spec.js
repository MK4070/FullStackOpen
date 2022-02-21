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
    cy.contains("Login to application");
    cy.get("#username").should("be.visible");
    cy.get("#password").should("be.visible");
    cy.get("#loginBtn").should("be.visible");
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

      cy.get("#notification").should("contain", "Wrong username or password");

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
      cy.visit("http://localhost:3000/blogs");
    });

    it("A blog can be created", function () {
      cy.get("#viewForm").click();

      cy.get("#title").type("blog created by cypress");
      cy.get("#author").type("tester");
      cy.get("#url").type("www.testing.com");
      cy.get("#submitBtn").click();

      cy.get("#notification").should(
        "contain",
        "blog created by cypress by tester added"
      );
    });
  });
});
