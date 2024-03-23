

# 此專案需要和另一個 server 專案一起使用
- /Users/re4388/project/personal/nodets/mqtt-server-aedes

# 2024_03_23
- 新增可以發 http in client 的功能
- 因此可以透過 post request 來發送資料
```
###
POST http://localhost:3111/publishMsg
content-type: application/json

 {
     "msg": "dsfdsfs"
 }

```
- 因此可以達到 client A 發送資料給 client B 的功能 (中間透過broker)

