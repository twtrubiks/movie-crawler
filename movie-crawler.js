var fs = require('fs'),
    request = require('request'),
    cheerio = require('cheerio');

var HOST = 'http://www.atmovies.com.tw/';

var getPage = function(url, callback, links) {
    var links = links || []; 
    request(url, function(err, res, body) {
        if (!err && res.statusCode == 200) {
            var lastPage;
            var $ = cheerio.load(body); 
			//得到全部 page 的 URL
            $('div > div:nth-child(3) > div > ul > li > a').each(function(i, e) { 
                links.push($(e).attr('href'));
            });
            callback(links);
        }
    });
};

//利用遞迴(recursion)的觀念
var getArticle = function(links, callback, contents) {
    contents = contents || [];
    if (links.length === 0) {
		//遞迴(recursion)結束
        callback(contents);
    }
    request(HOST + links[0], function(err, res, body) {
        if (!err && res.statusCode === 200) {
            //console.log(body); 
            var $ = cheerio.load(body);
            $('article.box.post').each(function(i, e) {
                movie = $(e).find('.filmTitle').text()
                movie = movie.replace(/\s+/g, " "); // 移除 前後中 多餘的空格
                //console.log("movie:" + movie);
				
                url = $(e).find('.filmTitle a').attr('href')
                //console.log("url:" + url);
				
                descri = $(e).find('p').text()
                //console.log("descri:" + descri);
				
                $('.openthis').remove(); // 移除 class openthis	，避免	infor 抓取到多於字串
				//console.log($(e).html())
				
                infor = $(e).find('span.date').first().text()
                infor = infor.replace(/\s+/g, " ");
                //console.log("infor:" + infor);
                //console.log("===========");

                var article = {
                    movie: movie,
                    url: HOST + url,
                    descri: descri,
                    infor: infor
                };
                contents.push(article);
            });
            links = links.slice(1);
            getArticle(links, callback, contents);
        }
    });
};

console.log("爬蟲開始......");
getPage('http://www.atmovies.com.tw/movie/next/0/', function(links) {
    getArticle(links, function(contents) {
        fs.writeFile('movie_result.json', JSON.stringify(contents, null, '\t'), function(err) {
            if (err) {
                return console.error(err);
            }
			console.log("抓取結束");
        });
    });
});