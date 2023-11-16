const lib = require('../config/lib');
const fs = require('fs');

const router = lib.plugins.express.Router();
const uuid = lib.plugins.uuidv4;

router.post('/create', (req, res) => {
    const item = req.body;
    console.log(item["owner"]);
    const _uid = uuid();

    const _sql = `
        INSERT INTO editor (_uid, owner, title, contents, image)
        VALUES ('${_uid}', '${item['owner']}', '${item['title']}', '${item['contents']}', '${item['img']}');
    `;

    try {
        lib.connections.query(_sql, (err, result) => {
            if (err) return console.log('Editor Create Error', err);
    
            res.send({
                code: 'y',
                data: result
            });
        })
    } catch(err) {
        console.log(err)
    }
});

router.post('/read', (req, res) => {
    console.log('read 들어옴')
    const _sql = `
        SELECT editor.*, users.id, users.nick FROM editor JOIN users ON users._uid = editor.owner;
    `;

    lib.connections.query(_sql, (err, result) => {
        if (err) return console.log('Editor Read Err', err)
        if (result.length !== 0) {
            for(let i = 0; i < result.length; i++) {
                result[i].image = result[i].image.toString('utf8');

                if (result.length === i + 1) {
                    res.status(200).json({
                        code: 'y',
                        data: result
                    })
                }
            }

        } else {
            res.status(200).json({
                code: "y",
                data: []
            })
        }
    })
});

router.post('/view', (req , res) => {
    const { id } = req.body;
    
    const _sql = `
    SELECT editor.*, users.id, users.nick FROM users INNER JOIN editor ON editor.owner = users._uid WHERE editor._uid = '${id}';
    `;

    lib.connections.query(_sql, (err, result) => {
        if (err) return console.error('view', err)

        result[0].image = result[0].image.toString('utf8');

        res.status(200).json({
            code: 'y',
            data: result
        })
    })
});


module.exports = router