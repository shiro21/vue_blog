const lib = require('../config/lib');
const response = lib.response.complete;

const router = lib.plugins.express.Router();
const uuid = lib.plugins.uuidv4;
const getConnection = require('../config/db');


// 회원가입
router.post('/create', async (req, res) => {

  const item = req.body;
  console.log(uuid())

  try {
    const _uid = uuid();
    const date = new Date();
    const koDate = date.toLocaleString();

    console.log(koDate)
    const _sql = `
      INSERT INTO users (_uid, id, createdAt, updatedAt, email, nick, birth, gender)
      VALUES ('${_uid}', '${item['id']}', '${koDate}', '${koDate}', '${item['email']}', '${item['nick']}', '${item['birth']}', '${item['gender']}');`;
    
    let passport = '';
    let salt = '';

    // 비밀번호 생성까지 완료, 로그인 시작
    lib.connections.query(_sql, (err, result) => {
      if (err) return console.error('err', err);

      new Promise((resolve, reject) => {
        lib.plugins.crypto.randomBytes(64, (err, buf) => {
          if (err) return reject(err);
          lib.plugins.crypto.pbkdf2(item['password'], buf.toString('base64'), 20000, 64, 'sha512', async (err, key) => {
            passport = key.toString('base64');
            salt = buf.toString('base64');

            const _sql_pass = `
              INSERT INTO passports (_uid, owner, passport, salt)
              VALUES ('${_uid}', '${item['id']}', '${passport}', '${salt}');
            `;

            lib.connections.query(_sql_pass, (err, pass) => {
              if (err) return console.error('err', err);

              res.send({
                code: 'y',
                data: result
              });
            })
          })
        })
      })
    })
  } catch(err) {
    console.log('auth', err);
  }
});

router.post('/idNickConfirm', async (req, res) => {

  const { id, nick } = req.body;

  try {
    let sql_id = `SELECT id FROM users WHERE id='${id}';`;
    let sql_nick = `SELECT id FROM users WHERE nick='${nick}';`;
    
    // const promise1 = new Promise((resolve, reject) => {})
    
    lib.connections.query(sql_id, (err, result) => {
      if (err) return console.error('아이디 에러');

      if (result.length !== 0) {
        res.status(200).json({
          code: 'id'
        })
      } else {

        lib.connections.query(sql_nick, (err, result) => {
          if (err) return console.error('닉네임 에러');
          
          if (result.length !== 0) {
            res.status(200).json({
              code: 'nick'
            })
          } else {
            res.status(200).json({
              code: 'y'
            })
          }
        })
      }
    })
  } catch(err) {
    console.log('에러남', err)
  }

});

router.post('/login', async (req, res) => {
  console.log('로그인 입장')
  const { id, password } = req.body;

  try {
    let sql_id = `SELECT * FROM users WHERE id='${id}';`;

    lib.connections.query(sql_id, (err, result) => {
      if (err) return console.error('로그인 에러');

      if (result.length === 0) {
        res.status(200).json({
          code: 'n',
          message: '아이디가 없습니다.'
        });
      } else {
        let sql__uid = `SELECT * FROM passports WHERE _uid='${result[0]._uid}';`;

        lib.connections.query(sql__uid, (err, passports) => {
          if (err) return console.error('로그인 에러2')

          lib.plugins.crypto.pbkdf2(password, passports[0].salt, 20000, 64, 'sha512', (err, key) => {

            if (key.toString('base64') === passports[0].passport) {
              res.status(200).json({
                code: 'y',
                data: result[0],
                message: '로그인 성공!'
              });
            } else {
              res.status(200).json({
                code: 'n',
                message: '로그인 실패!'
              });
            }
          })
        })

        // const decryption = (password, key) => {

        // }
      }
    })

  } catch(err) {
    console.log('login Err', err);
  }
});

router.post('/user', (req, res) => {

  const { id } = req.body;

  let sql_id = `SELECT * FROM users WHERE _uid='${id}';`;

  lib.connections.query(sql_id, (err, result) => {
    if (err) return console.error('id', err);
    
    if (result[0]) {
      if (result[0].img === undefined || result[0].img === null) {
        result[0].img = "";
      } else {
        result[0].img = result[0].img.toString('utf8');
      }
    }

    res.status(200).json({
      code: 'y',
      data: result[0]
    })
  })
});

router.post('/nickConfirm', async (req, res) => {
  const { nick } = req.body;

  try {
    let sql_nick = `SELECT id FROM users WHERE nick='${nick}';`;

    lib.connections.query(sql_nick, (err, result) => {
      if (err) return console.error('nickCheckErr', err)

      if (result.length !== 0) {
        res.status(200).json({
          code: 'nick'
        })
      } else {
        res.status(200).json({
          code: 'y'
        })
      }

    })

  } catch(err) {
    console.log('idConfirm 에러남', err)
  }
});

router.post('/update', async (req, res) => {
  const item = req.body;
  const date = new Date();
  const koDate = date.toLocaleString();

  const _sql = `UPDATE users SET nick='${item.nick}', updatedAt='${koDate}', img='${item.img}' WHERE _uid='${item._uid}';`;

  lib.connections.query(_sql, (err, result) => {
    if (err) return console.error('UpdateErr', err)

    res.status(200).json({
      code: 'y'
    })
  });
});

router.post('/test', async (req, res) => {
  console.log('테스트');
  try {
    let _sql = `SELECT * FROM users`;
    let _res = await lib.services.queryService(_sql);
    
    console.log(_res)

    if (_res.length > 0) {
      response(res, 200, {
        "res_status": "success",
        "res_msg": '성공',
        "res_data": _res
      });
    }
  } catch(err) {
    response(res, 500, []);
  }
});

module.exports = router;