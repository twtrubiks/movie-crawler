# movie-crawler
簡易爬蟲 抓取 [開眼電影網](http://www.atmovies.com.tw/movie/next/0/) 近期上映電影 使用Node.js<br>
使用遞迴的方式抓取資料<br>
* [Demo Video - 等待新增]() - Windows 

## 特色
* 抓取 [開眼電影網](http://www.atmovies.com.tw/movie/next/0/) 近期上映電影，並輸出 JSON 檔案。
   
## 安裝套件
請先在電腦安裝 [Node.js](https://nodejs.org/en/)<br>
由於有使用到 fs 、request、[cheerio](https://github.com/cheeriojs/cheerio)<br>
所以請記得安裝，使用cmd輸入以下指令
```
npm install fs  request cheerio
```

## 執行範例 
```
node movie-crawler.js
```

## 執行過程
![alt tag](http://i.imgur.com/YNaYWDq.jpg)

## 輸出格式 ( JSON )

    "movie": 電影名稱,
    "url": 電影網址,
    "descri": 電影簡介,
    "infor": 上映日期(影片長度)
    
movie_result.json<br>
![alt tag](http://i.imgur.com/rfYeEWb.jpg)

## 執行環境
* Windows 8.1
* node 4.4.3

## License
[MIT license](https://github.com/twtrubiks/movie-crawler/blob/master/LICENSE)
