/**
 * HTTP Server Settings
 * (sails.config.http)
 *
 * Configuration for the underlying HTTP server in Sails.
 * Only applies to HTTP requests (not WebSockets)
 *
 * For more information on configuration, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.http.html
 */

module.exports.http = {

  /****************************************************************************
  *                                                                           *
  * Express middleware to use for every Sails request. To add custom          *
  * middleware to the mix, add a function to the middleware config object and *
  * add its key to the "order" array. The $custom key is reserved for         *
  * backwards-compatibility with Sails v0.9.x apps that use the               *
  * `customMiddleware` config option.                                         *
  *                                                                           *
  ****************************************************************************/

  middleware: {


  /***************************************************************************
  *                                                                          *
  * The order in which middleware should be run for HTTP request. (the Sails *
  * router is invoked by the "router" middleware below.)                     *
  *                                                                          *
  ***************************************************************************/

    order: [
      'startRequestTimer',
      'cookieParser',
      'session',
      'myRequestLogger',
      'bodyParser',
      'handleBodyParserError',
      'compress',
      'methodOverride',
      'poweredBy',
      '$custom',
      'isAuthorized',
      'router',
      'www',
      'favicon',
      '404',
      '500'
    ],

  /****************************************************************************
  *                                                                           *
  * Example custom middleware; logs each request to the console.              *
  *                                                                           *
  ****************************************************************************/
  isAuthorized: function(req, res, next){
    var token, flag;
    var skip = [
      '/User/login',
      '/User/signup',
      '/home',
      '/static/index.html',
      '/static/loggedin.html'
    ];

    console.log('Requested', req.path, 'SkipLength', skip.length);
    console.log('Params',req.params);
    console.log('Headers', req.headers.authorization);

    flag = skip.indexOf(req.path) > -1;
    console.log("skip", flag)
    if(!flag) {
        console.log('Still Here :)', flag);
        console.log(req.method);
        if(req.headers && req.headers.authorization){
            var parts = req.headers.authorization.split(' ');

            if(parts.length == 2){
                var scheme = parts[0], credentials = parts[1];
                console.log(scheme, credentials);
                if(scheme == 'Bearer')
                    token = credentials;
                else return res.json(401, {err: 'Format is Auth: Bearer [token]'});
            }
        }

        else if(req.param('token')){
          token = req.param('token');
          delete req.query.token;
        }

        else return res.json(401, {err: 'No Auth header found'});

        jwToken.verify(token, function(err, token){
            if(err) return res.json(401, {err: 'Invalid Token'});
            req.token = token;
            console.log('Token ----------> ', token.payload.id);
            next();
            // console.log("post next")
        });
      } else {
        next(); //!flag
      }
  }

}
  /***************************************************************************
  *                                                                          *
  * The body parser that will handle incoming multipart HTTP requests. By    *
  * default as of v0.10, Sails uses                                          *
  * [skipper](http://github.com/balderdashy/skipper). See                    *
  * http://www.senchalabs.org/connect/multipart.html for other options.      *
  *                                                                          *
  * Note that Sails uses an internal instance of Skipper by default; to      *
  * override it and specify more options, make sure to "npm install skipper" *
  * in your project first.  You can also specify a different body parser or  *
  * a custom function with req, res and next parameters (just like any other *
  * middleware function).                                                    *
  *                                                                          *
  ***************************************************************************/

    // bodyParser: require('skipper')({strict: true})


  /***************************************************************************
  *                                                                          *
  * The number of seconds to cache flat files on disk being served by        *
  * Express static middleware (by default, these files are in `.tmp/public`) *
  *                                                                          *
  * The HTTP static cache is only active in a 'production' environment,      *
  * since that's the only time Express will cache flat-files.                *
  *                                                                          *
  ***************************************************************************/

  // cache: 31557600000
};
