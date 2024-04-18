process.env.NODE_ENV = "test";
const request = require("supertest")

const app = require("../app")
let items = require("../fakeDb")

let item = {name:"popcorn", price:2.35};

beforeEach(function (){
    items.push(item);
});

afterEach(function (){
    items = []
});

describe("GET /items", () => {
    test("Get all items", async () => {
        const res = await request(app).get("/items");
        const {items} = res.body;
        expect(res.statusCode).toBe(200);
        expect(items).toHaveLength(1);
    });
});

describe("POST /items", () => {
    test("Create a new item", async () => {
        const res = await request(app).post("/items").send({name:"Sprite", price:6.00});
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({item: {name: "Sprite", price: 6.00}});
    });
});

describe("GET /items/:name", () => {
    test("Gets item by name", async () => {
        const res = await request(app).get(`/items/${item.name}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.item).toEqual(item);
    });
    test("Responds with 404 for invalid item", async () => {
        const res = await request(app).get(`/items/nope`);
        expect(res.statusCode).toBe(404);
    });

});


describe("PATCH /items/:name", () => {
    test("Updates an item", async () => {
        const res = await request(app).patch(`/items/${item.name}`).send({price: 2.50});
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({item: {price: 2.50}});
    });
    test("Responds with 404 for invalid item", async () => {
        const res = await request(app).patch(`/items/nope`);
        expect(res.statusCode).toBe(404);
    });

});

describe("DELETE /items/:name", () => {
    test("Deletes an item", async () => {
        const res = await request(app).delete(`/items/${item.name}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({message: "Deleted" });
    });
    test("Responds with 404 for invalid item", async () => {
        const res = await request(app).delete(`/items/nope`);
        expect(res.statusCode).toBe(404);
    });

});



