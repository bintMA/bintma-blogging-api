const mongoose = require("mongoose");
const supertest = require("supertest");
require("dotenv").config();
 const blog_test_url = process.env.blog_test_url;
const app = require("../app");
const TEST_TOKEN = process.env.TEST_TOKEN;

jest.setTimeout(40000);


beforeAll((done) => {
  mongoose.connect(blog_test_url);
  mongoose.connection.on("connected", async () => {
    console.log("connected to Mongodb successfully");
  });

  mongoose.connection.on("error", (err) => {
    console.log(err);
    console.log("An error occured");
  });
  done();
});
afterAll((done) => {
  mongoose.connection.close(() => done());
});


let userId
test("POST user",async()=>{

            const userData = {
              first_name: "adeola",
              last_name: "aderemi",
              email: "demo@gmail.com",
              password: "qwerty",
            };
            const response = await supertest(app)
              .post("/signup")
              .set("content-type", "application/x-www-form-urlencoded")
              .send(userData);

              userId = response.body.user._id;
              console.log(userId);
            expect(response.status).toBe(200);
            expect(response.body.message).toBe("Signup successfull");
            expect(response.body).toHaveProperty("user");
})
test("GET user",async()=>{

            
            const response = await supertest(app)
              .get("/users")
              .set("Authorization", `Bearer ${TEST_TOKEN}`);
            expect(response.status).toBe(200);
            expect(response.body.message).toBe("success");
})

test("get userByID",async()=>{
 
  const response = await supertest(app)
    .get(`/users/${userId}`)
    .set("Authorization", `Bearer ${TEST_TOKEN}`)

  expect(response.status).toBe(200);
  expect(response.body.status).toBe(JSON.parse("true"));
  expect(response.body).toHaveProperty("user")
})

test("update userByID",async()=>{
  const userData= {
    email: "adeola@gmail.come",
  };
  const response = await supertest(app)
    .patch(`/users/${userId}`)
    .set("Authorization", `Bearer ${TEST_TOKEN}`)
    .send(userData);

  expect(response.status).toBe(200);
  expect(response.body.status).toBe(JSON.parse("true"));
})


test("delete userByID",async()=>{
  const response = await supertest(app)
  .delete(`/users/${userId}`)
  .set("Authorization", `Bearer ${TEST_TOKEN}`);

expect(response.status).toBe(200);
expect(response.body.status).toBe(JSON.parse("true"));
})