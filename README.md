# -
F2E 3rd Week1

# LionTravel Calendar

## ![index page snap shot](https://imgur.com/a/Dc6P7nw)
## [Online demo on Netlify] (https://awesome-curie-51e091.netlify.app/)
## Features
- ODATA was used for reducing JSON response size as well as selecting data which contain at least one image.
- Current events was filtered by start date, passed events won't be displaied.
- Support searches with categories, cities, subjects or/and keywords.
- Nearby option buttons on detail pages will search nearby spots.
- 20 search results per page, the ones with more than 20 will displaied with pagination. 
- RWD 
---

## Notice
- TDX and Google Decelopers API keys is required.
- API key names changed during the development. Similar changes might occur in the near future and cause errors.

## TDX JSON format 
# ScenicSpot
```
[
  {
    "ScenicSpotID": "C1_315080500H_000068",
    "ScenicSpotName": "紫坪",
    "DescriptionDetail": "紫坪位在綠島最南方，緊鄰「綠島露營區」。從露營區旁的步道，可通往海岸邊的潟湖「紫坪」。「紫坪」是一處由珊瑚礁構成的潮池，也是綠島著名的潟湖所在地，有全綠島最完整的潟湖地形以及珊瑚礁植群，更有茂盛的植物水芫花和珍貴的陸寄居蟹。外海儘管浪濤洶湧，內湖依然波平如鏡，宛若沉睡的湖水，清淺的躺在外珊瑚礁岩與內珊瑚貝砂灘間；水芫花灌叢身影倒映於平靜無波的水面上，潔白柔細的白砂鋪陳水底。熱帶海岸旖旎風情，盡在不言中。",
    "Description": "紫坪位在綠島最南方，從附近的步道，可通往海岸邊的潟湖。此處是由珊瑚礁構成的潮池，也是綠島著名的潟湖所在地，有全綠島最完整的潟湖地形以及珊瑚礁植群，更有茂盛的植物水芫花和珍貴的陸寄居蟹。",
    "Phone": "886-8-9672026",
    "Address": "臺東縣951綠島鄉溫泉路256號",
    "ZipCode": "951",
    "TravelInfo": "南下：於花蓮火車站前搭乘花蓮客運，往豐濱、靜浦，或是台東方向班車，在富岡漁港站下車後步行至富岡漁港，轉乘渡船前往綠島。北上：自台東火車站前搭乘台灣好行東部海岸線或鼎東客運海線班車，在富岡漁港站下車後步行至富岡漁港，轉乘渡船前往綠島。綠島：島上設有環島公車，搭乘公車至朝日溫泉下車，往前步行約5分鐘(查詢電話：089-672510)。。",
    "OpenTime": "全天候開放",
    "Picture": {
      "PictureUrl1": "https://www.eastcoast-nsa.gov.tw/image/419/640x480",
      "PictureDescription1": "從步道上遙望綠島露營區海邊"
    },
    "Position": {
      "PositionLon": 121.49990844726562,
      "PositionLat": 22.633939743041992,
      "GeoHash": "wsn2ub3s3"
    },
    "ParkingPosition": {},
    "TicketInfo": "免費，露營活動另計。",
    "Remarks": "1、紫坪上方的綠島露營區為生態保護區，禁止採集花木生物，並請維護環境整潔，讓這片美景能留與後代子孫。2、露營區目前已於2009年委由「東方之泉有限股份公司」經營，      聯絡電...",
    "SrcUpdateTime": "2022-01-22T01:11:16+08:00",
    "UpdateTime": "2022-01-22T02:34:29+08:00"
  }
  ...
]
```
# Restaurant
```
[
  {
    "RestaurantID": "C3_315081000H_020111",
    "RestaurantName": "友誼山莊簡餐",
    "Description": "友誼山莊坐落莒光鄉西莒田沃村，於2002年開張，是一座現代化旅館，站在頂樓陽臺上，登高望遠、海天一色、視野極佳。一樓餐廳部有各式簡餐、點心及宵夜，並提供旅遊團體預約的「馬祖風味餐合菜」經濟特餐。",
    "Address": "連江縣莒光鄉田澳村67號",
    "ZipCode": "211",
    "Phone": "886-836-88028",
    "OpenTime": "08:00-20:00",
    "WebsiteUrl": "https://www.facebook.com/%E5%8F%8B%E8%AA%BC%E5%B1%B1%E8%8E%8A-1463211133895942/",
    "Picture": {
      "PictureUrl1": "https://www.matsu-nsa.gov.tw/FileArtPic.ashx?id=2913&w=1280&h=960",
      "PictureDescription1": "友誼山莊四樓景觀"
    },
    "Position": {
      "PositionLon": 119.94477844238281,
      "PositionLat": 25.972139358520508,
      "GeoHash": "wst7c2j4e"
    },
    "Class": "地方特產",
    "SrcUpdateTime": "2022-01-22T01:12:30+08:00",
    "UpdateTime": "2022-01-22T02:34:29+08:00"
  }
  ...
]
```
# Activity
```
[
  {
    "ActivityID": "C2_315080000H_502037",
    "ActivityName": "2022年第十屆澎湖灣國際帆船公開賽",
    "Description": "澎湖位於臺灣海峽中央，因為多島嶼及海灣的特殊地理環境，近年來許多超級遊 艇與帆船慕名而來，除了連續舉辦多年的亞洲風浪板巡迴賽之外，2010年的海峽盃帆船賽一直到2022年第十屆澎湖島帆船週系列賽，已經連續第11年在澎湖舉辦。",
    "Location": "馬公第一漁港",
    "Address": "澎湖馬公亞果遊艇碼頭",
    "Phone": "886-2-87711442",
    "Organizer": "中華民國帆船協會",
    "StartTime": "2022-06-17T10:00:00+08:00",
    "EndTime": "2022-06-21T17:00:00+08:00",
    "Picture": {},
    "Position": {
      "PositionLon": 119.56814575195312,
      "PositionLat": 23.563018798828125,
      "GeoHash": "wsjn0cdbe"
    },
    "Class1": "其他",
    "SrcUpdateTime": "2022-01-22T01:12:22+08:00",
    "UpdateTime": "2022-01-22T02:34:29+08:00"
  }
  ...
]
```
## Library
- react-router-dom
- styled-components
- redaxios
- date-fns/format
