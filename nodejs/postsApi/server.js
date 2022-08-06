const express = require("express");
const fs = require("fs");
const app = express();
let data = require("./posts.json");

console.log(data);

const PORT = 8000;
app.use(express.json());

app.get("/api/posts", (req, res) => {
  fs.readFile("posts.json", "utf-8", (err, data) => {
    if (data && JSON.parse(data)?.posts.length === 0) {
      // if(JSON.parse(data) && JSON.parse(data).posts)
      return res.status(404).json({
        success: false,
        msg: "No POSTS found",
      });
    }

    res.status(200).json({
      success: true,
      data: JSON.parse(data)?.posts,
    });
  });
});

app.post("/api/posts", (req, res) => {
  const errors = [];
  console.log("req.body: ", req.body);
  // const { title, description } = req.body;
  // req.body.title, req.body.description
  if (!req.body.title) {
    // push an error
    errors.push({ msg: "Please enter the title" });
  }
  if (!req.body.description) {
    // push an error
    errors.push({ msg: "Please enter the description" });
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      errors,
    });
  }

  // Create resource
  data.posts.push({
    title: req.body.title,
    description: req.body.description,
    id: new Date().getTime(),
  });

  fs.writeFile("posts.json", JSON.stringify(data), "utf-8", function (err) {
    if (err) throw err;
    res.status(201).json({
      success: true,
      msg: "Post created successfully...",
    });
  });
});

// app.put("/api/posts/:id", (req, res) => {
//   console.log("req.params: ", req.params);
//   if (req.params.id !== "") {
//     const id = req.params.id;
//     // Find the id that matches in my posts data
//     const post = data.posts.find((current) => String(current.id) === id);
//     if (post !== -1 || post !== undefined) {
//       console.log(post);
//       // Then, get the properties to update
//       const update = {
//         title: req.body.title ? req.body.title : post.title,
//         description: req.body.description
//           ? req.body.description
//           : post.description,
//       };

//       // Then, update the post data with the new prop
//       data.posts.map((current, index) => {
//         console.log("current: ", current);
//         if (String(current.id) === id) {
//           data.posts[index] = {
//             id: current.id,
//             ...update,
//           };
//         }
//       });

//       fs.writeFileSync("posts.json", JSON.stringify(data), "utf-8", (err) => {
//         if (err) throw Error(err);
//         // Finally, send a success message to the client
//         return res.status(200).json({
//           success: true,
//           msg: "Post updated successfully...",
//         });
//       });
//       // return res.send({ update });
//     }
//   }
//   res.send({});
// });

app.put("/api/posts/:id", (req, res) => {
  const id = req.params.id;
  const errors = [];

  if (!id) {
    errors.push({ msg: "please pass an id" });
    return res.status(400).send({
      success: false,
      errors,
    });
  }

  // Find the id that matches in my posts data
  const post = data.posts.find((current) => String(current.id) === id);

  if (!post) {
    errors.push({ msg: "post not found" });
    return res.status(404).send({
      success: false,
      errors,
    });
  }

  // Then, get the properties to update
  const update = {
    title: req.body.title ? req.body.title : post.title,
    description: req.body.description ? req.body.description : post.description,
  };

  if (errors.length > 0) {
    return res.status(400).send({
      success: false,
      errors,
    });
  }

  // Then, update the post data with the new prop
  data.posts.map((current, index) => {
    console.log("current: ", current);
    if (String(current.id) === id) {
      data.posts[index] = {
        id: current.id,
        ...update,
      };
    }
  });

  fs.writeFile("posts.json", JSON.stringify(data), "utf-8", (err) => {
    if (err) throw Error(err);
    // Finally, send a success message to the client
    return res.status(200).json({
      success: true,
      msg: "Post updated successfully...",
    });
  });
});

app.delete("/api/posts/:id", (req, res) => {
  //Get the id of the post
  const errors = [];
  const id = req.params.id;
  // Check if the id is defined
  if (!id) {
    errors.push({ msg: "id not found" });
    return res.status(400).send({
      success: false,
      errors,
    });
  }
  //Find if the post exists
  const post = data.posts.find((current) => String(current.id) === id);
  if (!post) {
    errors.push({ msg: "post not found" });
    return res.status(404).send({
      success: false,
      errors,
    });
  }
  // Remove post from array
   data.posts = data.posts.filter((val)=> String(val.id) !== id)
  console.log(data)
  // res.send(data)
  // Update the  new content of the array in the file
  fs.writeFile("posts.json", JSON.stringify(data), "utf-8", (err) => {
    if (err) throw Error(err);
    // Finally, send a success message to the client
    return res.status(204).json({
      success: true,
      msg: "Post deleted successfully...",
    });
  });

});

app.listen(PORT, () => console.log("Server listening on port " + PORT));
