### Assignment-6 Result:



#### cleaning the title:
```
function cleanTitle(title){
    return title.split(' -')[0]
    .replace("(:II)","")
    .replace("(:I)","")
    .replace("(:1)","")
    .replace("(I)","")
    .trim();
}
```


#### cleaning the address:
```
function cleanAddress(addr){
        return addr
        .replace('W.', 'West')
        .replace('E.', 'East')
        .concat(", New York, NY")
        .trim();
}
```

#### meetings object:
```
{ address: '273 Bowery, New York, NY',
    location: 'University Settlement @ Houston Street Center',
    title: 'WOMEN TOGETHER',
    timings: '6:15 PM to 7:30 PM',
    day: 'Fridays',
    startTime: 1815,
    type: 'C = Closed Discussion meeting',
    interest: 'Lesbian',
    latLong: { lat: 40.7237496, lng: -73.992395 } }

```