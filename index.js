import express from "express";
import ejs from "ejs";
import bodyParser from "body-parser";

const app = express();
const port = 4000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let arraypost = [];

app.get("/", (req, res) => {
    res.render("home.ejs", { arraypost });
});

app.get("/create", (req, res) => {
    res.render("createblog.ejs");

});

app.post("/post-list", (req, res) => {
    const { title, content } = req.body;
    arraypost.push({ title, content });
    res.redirect('/');
});

app.get("/post-list/:id", (req, res) => {
    const viewarray = arraypost[req.params.id];
    res.render("viewpost.ejs", { viewarray, id: req.params.id });
});

app.get("/post-list/:id/edits", (req, res) => {
    const editarray = arraypost[req.params.id];
    res.render("editpost.ejs", { editarray, id: req.params.id });
});

app.post("/post-list/:id/edits/update", (req, res) => {
    const { title, content } = req.body;
    arraypost[req.params.id] = { title, content };
    res.redirect(`/post-list/${req.params.id}`);
});

app.get("/post-list/:id/Delete", (req, res) => {
    arraypost.splice(req.params.id, 1);
    res.redirect("/"); s
});
 
app.listen(port, () => {
    console.log("server is running on", port);
});