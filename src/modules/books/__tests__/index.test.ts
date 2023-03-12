import { app, server } from "src/server";
import request from "supertest";

const bookExample = {
    isbn: "9788576571407",
    name: "Neuromancer",
    description:
        "No futuro, existe a matrix. Uma espécie de alucinação coletiva...",
    genre: "Cyberpunk",
    author: "William Gibson",
    language: "PORTUGUESE",
    publisher: "Editora Aleph",
    pages: 312,
};

afterAll(() => {
    server.close();
});

describe("GET /books", () => {
    test("List books", async () => {
        const res = await request(app).get("/books");
        expect(res.statusCode).toBe(200);
    });
});

describe("GET /books/:bookIsbn", () => {
    test("Show one book", async () => {
        const res = await request(app).get("/books/9788576571407");
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual({
            message: "Book not found",
            code: 404,
        });
    });
});

describe("POST /books", () => {
    test("Create a new book", async () => {
        const res = await request(app).post("/books").send(bookExample);
        expect(res.statusCode).toBe(201);
    });
});

describe("DELETE /books/:bookIsbn", () => {
    test("Delete one book", async () => {
        const res = await request(app).delete("/books/9788576571407");
        expect(res.statusCode).toBe(200);
    });
});
