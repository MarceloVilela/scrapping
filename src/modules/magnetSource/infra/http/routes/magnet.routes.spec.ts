import "reflect-metadata";
import express, { Router } from "express"; // import express
const request = require("supertest"); // supertest is a framework that allows to easily test web apis

import '@shared/container';
import serverRoutes from "./magnet.routes"; //import file we are testing

const app = express(); //an instance of an express app, a 'fake' express app
const routes = Router();
routes.use('', serverRoutes);
app.use('', routes); //routes

describe("testing-server-routes", () => {

  it("GET /states - success", async () => {
    const { body } = await request(app).get("/search?url=aHR0cHM6Ly9jb21hbmRvdG9ycmVudC5uZXQvbGlnYS1kYS1qdXN0aWNhLWRlLXphY2stc255ZGVyLXRvcnJlbnQv&encoded=1") //uses the request function that calls on express app instance
    //.expect('Content-Type', /json/)
    expect(body).toEqual(1);
  });
});
