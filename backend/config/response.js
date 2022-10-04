function complete(res, code, data) {
    let message;
    switch(code) {
        // 오류 코드
        case 400 : message = "파라미터 오류"; break;
        case 401 : message = "인증 실패"; break;
        case 403 : message = "허용하지 않는 호출"; break;
        case 404 : message = "존재하지 않는 API"; break;
        case 405 : message = "허용되지 않는 메소드"; break;
        case 429 : message = "호출 한도 초과"; break;
        case 500 : message = "서버 오류"; break;

        // 성공 코드
        case 200 : message = "통신성공"; break;
        case 202 : message = "불일치"; break;
    }

    const response = {
        "message": message,
        "data": data
    };
    res.status(code).json({response});
}

module.exports = {
    complete: complete
}