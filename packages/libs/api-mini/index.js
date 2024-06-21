const express = require("express");

const cors = require('cors');

const { mockList } = require('./mockList');

const app = express();

const router = express.Router();

app.use(cors());

router.get('/api/feed/list', (req, res) => {
    const { startNum = 0, pageSize = 10 } = req.query;
    console.log(startNum,pageSize)
    const resList = mockList.slice(Number(startNum), Number(startNum) + Number(pageSize));
    res.json({ list: resList });
});


app.use(router);

app.listen(4000, () => {
    console.log('app in 4000')
})