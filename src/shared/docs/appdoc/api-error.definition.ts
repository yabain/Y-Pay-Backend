

/**
 * @apiDefine apiError
 * @apiError  (500 Internal Server Error) InternalServerError  500 statusCode 
 * @apiUse apiInternalErrorExample
 */

/**
 * @apiDefine apiBadRequestExampleUser
 * @apiExample {json} Bad Request (Example) 
 * * HTTP/1.1 400 Bad Request
 * {
 *  statusCode: 400
 *  error: "Bad Request",
 *  message:[ "firstName should not be empty"  ]
 * }
 */

/**
 * @apiDefine apiInternalErrorExample
 * @apiExample {json} Internal Server Error (Response):
 * HTTP/1.1 500 Internal Error
 * {
 *  statusCode: 500
 *  message: "Internal Error"
 * }
 */