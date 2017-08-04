// Shared Buble Constructor
bubleApp.factory("Buble", function () {
    function Buble(plainObject) {
        this.user = plainObject.user;
        this.date = plainObject.date;
        this.time = plainObject.time;
        this.content = plainObject.content;
        this.media = "text";
        this.mediaUrl = "";
        this.bubleHeight = 20;
        this.unique = this.date + this.time;
        // console.log("unique " + this.unique);


        if (String(this.content).indexOf("<‏מצורף>") !== -1) {
            this.media = "image";
            this.mediaUrl = "/app/data/img/" + this.content.replace(" <‏מצורף>", "").replace(" ", "");
            this.content = "";
        }
        //set bible default size bases on media type 
        if (this.media === "text") {
            //  console.log("text");
            this.bubleHeight = 20;
        }
        else if (this.media === "image") {
            //    console.log("image");
            var orientation,
                img = new Image();
            img.onload = function () {
                if (img.naturalWidth > img.naturalHeight) {
                    orientation = 'landscape';
                    //     console.log("portrait");
                    this.bubleHeight = 95;
                } else if (img.naturalWidth < img.naturalHeight) {
                    orientation = 'portrait';
                    //    console.log("landscape");
                    this.bubleHeight = 65;
                } else {
                    orientation = 'other';
                    //    console.log("other");
                    this.bubleHeight = 20;
                }
            }
            img.src = this.mediaUrl;
        }
        else if (this.media === "date") {
            this.bubleHeight = 10;
        }


    }
    return Buble;
});








// need to add index
bubleApp.factory("bubles", function (Buble) {
    var bubleArr = [];

    var add = function (index, buble) {
        bubleArr.splice(index+1,0,buble);
    }

    var update = function (index, buble) {
        bubleArr[index] = buble;
    }

    var updateContent = function (index, newContent) {
        bubleArr[index].content = newContent;
    }

    var updateUser = function (index, newContent) {
        bubleArr[index].user = newContent;
    }
    var updateMedia = function (index, newContent) {
        bubleArr[index].media = newContent;
    }

    var updateMediaUrl = function (index, newContent) {
        bubleArr[index].mediaUrl = newContent;
        bubleArr[index].content = "";
    }

    var updateDate = function (index, newContent) {
        bubleArr[index].date = newContent;
        bubleArr[index].user = "DATE";
        bubleArr[index].time = "";
    }
    var updateTime = function (index, newContent) {
        bubleArr[index].time = newContent;
    }

    var remove = function (index) {
        bubleArr.splice(index, 1);
    }

    var load = function (bublePlainObjectArr) {

        bubleArr.push(new Buble(bublePlainObjectArr[0]))
        bubleArr[0].content = "";
        bubleArr[0].user = "DATE";
        bubleArr[0].media = "date";
        bubleArr[0].mediaUrl = "";
        bubleArr[0].time = "";
        bubleArr[0].unique = bubleArr[0].date + bubleArr[0].time;
        var d1 = new Date(bublePlainObjectArr[0].date);
        for (var i = 0; i < bublePlainObjectArr.length; i++) {
            var d2 = new Date(bublePlainObjectArr[i].date)

            if (d2 > d1) {
                bubleArr.push(new Buble(bublePlainObjectArr[i]))
                bubleArr.push(new Buble(bublePlainObjectArr[i]))
                bubleArr[bubleArr.length - 2].date = bubleArr[bubleArr.length - 1].date;
                bubleArr[bubleArr.length - 2].content = "";
                bubleArr[bubleArr.length - 2].user = "DATE";
                bubleArr[bubleArr.length - 2].media = "date";
                bubleArr[bubleArr.length - 2].mediaUrl = "";
                bubleArr[bubleArr.length - 2].time = "";
                bubleArr[bubleArr.length - 2].unique = bubleArr[bubleArr.length - 2].date + bubleArr[bubleArr.length - 2].time;
                d1 = new Date(bublePlainObjectArr[i].date);
            }
            else {
                bubleArr.push(new Buble(bublePlainObjectArr[i]))
                //console.log("length" + bubleArr.length);
            }

            //console.log(bubleArr[i]);
        }
    }

    var getAll = function () {
        return bubleArr;
    }

    var get = function (index) {
        return bubleArr[index];
    }

    var removeAll = function () {
        bubleArr = [];
    }

    var isImage = function (index) {
        return bubleArr[index].media == "image" ? true : false;
    }

    var getUser = function (index) {
        return bubleArr[index].media;
    }

    var getUnique = function (index) {
        return bubleArr[index].unique;
    }


    return {
        add: add,
        update: update,
        updateContent: updateContent,
        updateMedia: updateMedia,
        updateMediaUrl: updateMediaUrl,
        updateUser: updateUser,
        updateDate: updateDate,
        updateTime:updateTime,
        remove: remove,
        load: load,
        getAll: getAll,
        get: get,
        removeAll: removeAll,
        isImage: isImage,
        getUser: getUser,
        getUnique: getUnique
    }
})