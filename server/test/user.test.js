import { app } from "../app.js";
import supertest from "supertest";

const server = supertest(app);

describe("User", () => {
    describe("get / route", () => {
        describe("given the user does not have a token", async () => {
            it("should return a 401 status", async () => {
                const response = await server.get("/user");
                expect(response.status).toEqual(401);
            });
        });
    });
});
