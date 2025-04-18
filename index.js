const express = require('express')
const cookieParser = require('cookie-parser')
const {restrictToLoggedInUserOnly, checkAuth} = require('./middlewares/auth')
const {connectToMongoDB} = require("./connect")
const urlRoute = require('./routes/url')
const staticRoute = require('./routes/staticRouter')
const path = require('path')    
const URL = require('./models/url')
const userRoute = require('./routes/user')


const app = express()
const port = 8001

app.get('/test', async (req, res) => {
    const allUrls = URL.find({})
    return res.render("home",{
        urls: allUrls
    })
})

connectToMongoDB('mongodb://localhost:27017/shorturl')
.then(() => console.log("connected to mongodb"))

app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use("/url", restrictToLoggedInUserOnly,urlRoute)
app.use("/user", userRoute)
app.use("/", checkAuth,staticRoute)

app.get("/:shortId", async (req, res) => {
    const shortId = req.params.shortId
    const entry = await URL.findOneAndUpdate({shortId},{$push: {visitHistory: {timestamp: Date.now()}}})
    res.redirect(entry.redirectUrl)
})

app.listen(port, () => console.log(`server started on port ${port}!`)) 