import { app } from "src/server";
import request from "supertest";

describe("Books routes", () => {
    test("Get all books /", async () => {
        const res = await request(app).get("/books");
        expect(res.statusCode).toBe(200);
    });
});
