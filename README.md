### Assignment-5 Results:


```db.meetingtimes.find().count()

57
```


```db.meetingtimes.find()

{ "_id" : ObjectId("57f2c2cbbb2c1e1f26840a3d"), "address" : "20 Cardinal Hayes Place", "day" : "Thursdays", "timings" : "7:00 AM to 8:00 AM", "startTime" : 700 }
{ "_id" : ObjectId("57f2c2cbbb2c1e1f26840a3e"), "address" : "20 Cardinal Hayes Place", "day" : "Tuesdays", "timings" : "7:00 AM to 8:00 AM", "startTime" : 700 }
{ "_id" : ObjectId("57f2c2cbbb2c1e1f26840a3f"), "address" : "20 Cardinal Hayes Place", "day" : "Mondays", "timings" : "12:15 PM to 1:15 PM", "startTime" : 1215 }
{ "_id" : ObjectId("57f2c2cbbb2c1e1f26840a40"), "address" : "20 Cardinal Hayes Place", "day" : "Wednesdays", "timings" : "12:15 PM to 1:15 PM", "startTime" : 1215 }
{ "_id" : ObjectId("57f2c2cbbb2c1e1f26840a41"), "address" : "20 Cardinal Hayes Place", "day" : "Thursdays", "timings" : "12:15 PM to 1:15 PM", "startTime" : 1215 }
{ "_id" : ObjectId("57f2c2cbbb2c1e1f26840a42"), "address" : "20 Cardinal Hayes Place", "day" : "Fridays", "timings" : "12:15 PM to 1:15 PM", "startTime" : 1215 }
{ "_id" : ObjectId("57f2c2cbbb2c1e1f26840a43"), "address" : "29 Mott Street", "day" : "Tuesdays", "timings" : "6:30 PM to 7:30 PM", "startTime" : 1830 }
{ "_id" : ObjectId("57f2c2cbbb2c1e1f26840a44"), "address" : "49 Fulton Street", "day" : "Mondays", "timings" : "7:00 PM to 8:00 PM", "startTime" : 1900 }
{ "_id" : ObjectId("57f2c2cbbb2c1e1f26840a45"), "address" : "44 John Street", "day" : "Mondays", "timings" : "12:15 PM to 1:15 PM", "startTime" : 1215 }
{ "_id" : ObjectId("57f2c2cbbb2c1e1f26840a46"), "address" : "44 John Street", "day" : "Tuesdays", "timings" : "12:15 PM to 1:15 PM", "startTime" : 1215 }
{ "_id" : ObjectId("57f2c2cbbb2c1e1f26840a47"), "address" : "44 John Street", "day" : "Thursdays", "timings" : "12:15 PM to 1:15 PM", "startTime" : 1215 }
{ "_id" : ObjectId("57f2c2cbbb2c1e1f26840a48"), "address" : "44 John Street", "day" : "Mondays", "timings" : "1:30 PM to 2:30 PM", "startTime" : 1330 }
{ "_id" : ObjectId("57f2c2cbbb2c1e1f26840a49"), "address" : "44 John Street", "day" : "Thursdays", "timings" : "1:30 PM to 2:30 PM", "startTime" : 1330 }
{ "_id" : ObjectId("57f2c2cbbb2c1e1f26840a4a"), "address" : "49 Fulton Street", "day" : "Mondays", "timings" : "6:30 AM to 7:30 AM", "startTime" : 630 }
{ "_id" : ObjectId("57f2c2cbbb2c1e1f26840a4b"), "address" : "49 Fulton Street", "day" : "Tuesdays", "timings" : "6:30 AM to 7:30 AM", "startTime" : 630 }
{ "_id" : ObjectId("57f2c2cbbb2c1e1f26840a4c"), "address" : "49 Fulton Street", "day" : "Wednesdays", "timings" : "6:30 AM to 7:30 AM", "startTime" : 630 }
{ "_id" : ObjectId("57f2c2cbbb2c1e1f26840a4d"), "address" : "49 Fulton Street", "day" : "Thursdays", "timings" : "6:30 AM to 7:30 AM", "startTime" : 630 }
{ "_id" : ObjectId("57f2c2cbbb2c1e1f26840a4e"), "address" : "49 Fulton Street", "day" : "Fridays", "timings" : "6:30 AM to 7:30 AM", "startTime" : 630 }
{ "_id" : ObjectId("57f2c2cbbb2c1e1f26840a4f"), "address" : "49 Fulton Street", "day" : "Mondays", "timings" : "7:30 AM to 8:30 AM", "startTime" : 730 }
{ "_id" : ObjectId("57f2c2cbbb2c1e1f26840a50"), "address" : "49 Fulton Street", "day" : "Tuesdays", "timings" : "7:30 AM to 8:30 AM", "startTime" : 730 }
Type "it" for more
```


```db.meetingtimes.find({ day: "Tuesdays", startTime: { $gt: 1900}})

{ "_id" : ObjectId("57f2ca30cfc9a821bc7da088"), "address" : "49 Fulton Street", "day" : "Tuesdays", "timings" : "7:30 PM to 8:30 PM", "startTime" : 1930 }
{ "_id" : ObjectId("57f2ca30cfc9a821bc7da08e"), "address" : "283 West Broadway", "day" : "Tuesdays", "timings" : "7:45 PM to 8:45 PM", "startTime" : 1945 }
```