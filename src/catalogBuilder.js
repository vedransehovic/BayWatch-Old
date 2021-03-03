import firebase from 'firebase';
var catalogRef = firebase.database().ref("classifyitems");

var dataWrangler = catalogRef.on('value', function (data) {
    console.log(data.val())
    // var itemsObject = data.val();
    // var items = [];
    // for (var key in itemsObject) {
    //     items.push({
    //         item: itemsObject[key].item,
    //     })
    // }
    // console.log(items)
    // return items;
});

export default dataWrangler();

