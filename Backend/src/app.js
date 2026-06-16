const express = require("express")
const app = express()
const path = require("path")
const noteModel = require('./model/note.model')
const cors = require("cors")
app.use(cors())
app.use(express.json())
app.use(express.static("./public"))

// Post

app.post("/api/notes",async(req,res)=>{
    const {title, description} = req.body

    const note = await noteModel.create({
        title,description
    })

    res.status(201).json({
        message:"note create succesfully",
        note
    })
})

// GET

app.get("/api/notes",async(req,res)=>{
    const note = await noteModel.find()

    res.status(200).json({
        message:"notes fetched successfully",
        note
    })
})

/* DELETE /api */

app.delete("/api/notes/:id",async(req,res)=>{
    const id = req.params.id

    await noteModel.findByIdAndDelete(id)
    
    res.status(200).json({
        message:"note deleted successfully"
    })

})

// PATCH

app.patch("/api/notes/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const updatedNote = await noteModel.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      message: "note updated successfully",
      note: updatedNote
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// Wild card api
console.log(__dirname)
app.use("*name",(req, res)=>{
  res.sendFile(path.join(__dirname, ".." , '/public/index.html'))
})

module.exports = app