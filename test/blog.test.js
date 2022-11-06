const mongoose = require("mongoose");
const supertest = require("supertest");
require("dotenv").config();
 const blog_test_url = process.env.blog_test_url;
const app = require("../app");
const TEST_TOKEN = process.env.TEST_TOKEN;




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
// //BLOG ROUTE TESTING


let blogId
test("POST blog",async()=>{

    const blog_body = {
        title: "adeola's blog",
        tags: "lifestyle",
        body: "my new  blog",
        author: "adeola",
        description: "my first blog",
      };
  
      const response = await supertest(app)
        .post("/blogs")
        .set("Authorization", `Bearer ${TEST_TOKEN}`)
        .send(blog_body);
      blogId = response.body.newBlog._id;
      expect(response.status).toBe(201);
      expect(response.body.newBlog.title).toBe("adeola's blog");
      expect(response.body.newBlog.state).toBe("draft");
})


test("GET blog",async()=>{
    
      const response = await supertest(app)
        .get("/blogs")
        .set("authrization", `Bearer ${TEST_TOKEN}`)
  
      expect(response.status).toBe(200);
      expect(response.body.status).toBe("success")

})

test("GET blog?id",async()=>{
    
    const response = await supertest(app)
      .get(`/blogs/${blogId}`)
      .set("Authorization", `Bearer ${TEST_TOKEN}`);
    expect(response.status).toBe(200);
    expect(response.body.Blog).toHaveProperty("author");
})


// describe("/blogs", () => {
//   it("GET/blogs", async () => {
//     const response = await supertest(app)
//       .get("/blogs")
//       .set("authrization", `Bearer ${TEST_TOKEN}`);

//     expect(response.status).toBe(200);
//     // expect(response.body.length).toBe(1);
//     expect(response.body).toHaveProperty("status");
//   });

//   it("POST/blogs", async () => {
//     const body = {
//       title: "blog 5",
//       body: "i am realy, my name is olawole jethro",
//       description: "am new jhf sdsdd jdjs jfjf here",
//       tags: "campaign",
//     };

//     const response = await supertest(app)
//       .post("/blogs")
//       .set("Authorization", `Bearer ${TEST_TOKEN}`)
//       .send(body);
//     expect(response.status).toBe(201);
//     expect(response.body.newBlog.title).toBe("blog 5");
//   });

//   it("GET/blogs?id", async () => {
//     const response = await supertest(app)
//       .get(`/blogs/${Blog._id}`)
//       .set("Authorization", `Bearer ${TEST_TOKEN}`)
//       .send(Blog);
//     console.log(response.Blog._id);
//     expect(response.status).toBe(200);
//     expect(response.Blog.tags).toBe("tourisim");
//   });

//   it("DELETE/blogs/blogId", async () => {
//     const response = await supertest(app)
//       .delete(`/blogs/${Blog._id}`)
//       .set("Authorization", `Bearer${TEST_TOKEN}`);

//     // console.log(response);
//     expect(response.status).toBe(204);
//   });
// });
