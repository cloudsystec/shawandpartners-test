'use strinct'

const request = require('request');
const defUrl = 'https://api.github.com/users';
const defClientSecret = 'client_id=0a3daa2073616d7e0832&client_secret=a9417dba993c87b20ecb19fa56aa1c0adf92f6a9';
const options = {
    headers: {
        'User-Agent': 'MyTestApp'
    },
    json: true
};

exports.since = (req, res, next) => {
    var sinceId = parseInt(req.query.since);
    var perpage = 10;
    var r = res;
    var rq = req;

    options.url = defUrl + "?" + [isNaN(sinceId) ? '' : `since=${sinceId}`, `per_page=${perpage}`, defClientSecret].join('&');

    request(options, (err, res, body) => {
        if (err) { return console.log(err); }

        var fullUrl = rq.protocol + '://' + rq.get('host') + rq.baseUrl;
        var responseArr = Array.from(body);
        var lastId = responseArr[responseArr.length - 1].id;

        var nextLink = [fullUrl, '?', `since=${lastId}`].join('');

        var dataBody = responseArr.map((m) => {
            return {
                login: m.login,
                id: m.id,
                avatar_url: m.avatar_url,
                detail: [fullUrl, `/${m.login}/details`].join(''),
            };
        });

        var data = {
            next: nextLink,
            data: dataBody
        };

        r.status(200).send(data);
    });
};

exports.details = (req, res, next) => {
    var r = res;
    var userName = req.params.username;

    options.url = [defUrl, `/${userName}`, `?${defClientSecret}`].join('');

    request(options, (err, res, body) => {
        if (err) { return console.log(err); }

        var dataBody = {
            login: body.login,
            id: body.id,
            avatar_url: body.avatar_url,
            profile_url: body.url,
            created_at: body.created_at,
        };

        var data = {
            data: dataBody
        };

        r.status(200).send(data);
    });
};

exports.repos = (req, res, next) => {
    var r = res;
    var userName = req.params.username;

    options.url = [defUrl, `/${userName}`, `/repos`, `?${defClientSecret}`].join('');

    request(options, (err, res, body) => {
        if (err) { return console.log(err); }

        var responseArr = Array.from(body);

        var dataBody = responseArr.map((m) => {
            return {
                name: m.name,
                id: m.id,
                html_url: m.html_url,
            };
        });

        var data = {
            data: dataBody
        };

        r.status(200).send(data);
    });
};