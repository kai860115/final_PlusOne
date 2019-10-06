# Plus One

## 一句話描述這個專題在做什麼

這是一個讓使用者註冊登入揪團的網站，使用者可以當主辦人新增自己的活動，也可以看到所有的活動並選擇想要的+1

## Demo Link
[https://youtu.be/UZU709YprG4](https://youtu.be/UZU709YprG4)

## Github Link

[https://github.com/kai860115/final_PlusOne](https://github.com/kai860115/final_PlusOne)

## How to use

### Install

Download

```shell
git clone

```

Install

```shell
cd backend && npm install
cd frontend && npm install
```

### Run

```shell
cd backend && npm start
cd frontend && npm start
```

### Demo


### Features

+ [x] 可以註冊登入
+ [x] 後端儲存密碼有加密
+ [x] 使用GraphQL
+ [x] 使用者可以查看目前有的活動
+ [x] 依照顏色區別是否以加入
+ [x] 可以新增活動或編輯活動
+ [x] 有月曆，可以直接在上面看到活動資訊

## using packages/ References

### Using

#### 前端

packages

* React
* Reactstrap
* apollo-boost & react-apollo & graphql
* moment
* react-big-calendar

css
*  [https://bootswatch.com/flatly/](https://bootswatch.com/flatly/)

#### 後端

packages

* express
* apollo-server-express & graphql
* bcrypt
* joi
* mongoose & mongodb
* jsonwebtoken

### Reference

* react-big-calendar: [https://github.com/intljusticemission/react-big-calendar/blob/master/examples/demos/basic.js](https://github.com/intljusticemission/react-big-calendar/blob/master/examples/demos/basic.js)
* apollo server: [https://www.apollographql.com/docs/apollo-server/](https://www.apollographql.com/docs/apollo-server/)
* learn graphql: [https://github.com/MoonHighway/learning-graphql](https://github.com/MoonHighway/learning-graphql)
* Authentication: [https://ithelp.ithome.com.tw/articles/10208278](https://ithelp.ithome.com.tw/articles/10208278)
* MERN / GraphQL tutorial: [https://www.youtube.com/playlist?list=PLcCp4mjO-z9_y8lByvIfNgA_F18l-soQv](https://www.youtube.com/playlist?list=PLcCp4mjO-z9_y8lByvIfNgA_F18l-soQv)

### 心得

這次的期末報告，更加的了解Web programing上的一些知識，再後端部份了解該如何使用製作一個可以登入登出的系統，整個驗證的流程，以及該如何使用jsonwebtoken來做驗證；也學習到該如何使用GraphQL幫助開發，以及怎麼跟資料庫做連接；此外也更加了解到ES6的async/await的使用；在前端部份，更加熟悉對React的認識，以及使用Apollo client對後端的GraphQL取得資料與更改資料的動作；雖然以上這些東西都花了我整整一學期來弄懂，但花費的時間是值得的，也很高興可以修到這門好課。
