const axios = require('axios');
const express = require('express');
const app = express()
app.use(express.json())


app.get('/',(req,res)=>{
    res.send('Listening on port 2000')
})
app.get('/api/users', async (req,res)=>{
    const response = await axios.get("http://localhost:3000/users")
                      .catch((err) => {
                          console.log(err)
                          res.send('ERROR')
                      })
    console.log(response.data)
    res.send(response.data)
})


app.get('/api/users/:id', async (req,res)=>{
    console.log(req.params.id)
    const response = await axios.get(`http://localhost:3000/users/${req.params.id}`)
                      .catch((err) => {
                          console.log(err)
                          console.log(response)
                          res.send('ERROR')
                          res.end()
                      })
    console.log(response.data)
    res.send(response.data)
})

app.post('/api/users',async (req,res)=>{
    const obj={
        id:req.body.id,
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        phoneNumber:req.body.phoneNumber,
    }
   const response = await axios.post("http://localhost:3000/users",obj)
   .catch((err)=>{
       console.log(err)
       res.end()
   })
   console.log("success",response.data)
   res.send(response.data)
})

app.delete('/api/users',async (req,res)=>{
    const response = await axios.delete(`http://localhost:3000/users/${req.body.id}`)
   .catch((err)=>{
       console.log(err)
       res.end()
   })
   console.log("success",response.data)
   res.send(response.data)
})

app.put('/api/users',async (req,res)=>{
    const obj={
        id:req.body.id,
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        phoneNumber:req.body.phoneNumber,
    }
    axios.put(`http://localhost:3000/users/${req.body.id}`,obj)
   .catch((err)=>{
       console.log(err)
       res.end()
   })
   res.send("Success")
})

app.listen(2000,() => {console.log("Listining on port 2000...")});