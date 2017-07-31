// Shared Buble Constructor
bubleApp.factory("Buble", function () {
    function Buble(plainObject) {
        this.user = plainObject.user;
        this.date = plainObject.date;
        this.time = plainObject.time;
        this.content = plainObject.content;
        this.media = "text";
        this.mediaUrl = "" ;

        if (String(this.content).indexOf("<‏מצורף>") !== -1) {
            this.media = "image";
            this.mediaUrl = "/app/data/img/" + this.content.replace(" <‏מצורף>", "").replace(" ", "");
            this.content = "";
        }

    };

    return Buble;
});




// need to add index
bubleApp.factory("bubles", function (Buble) {
    var bubleArr = [];

    var add = function (buble) {
        bubleArr.push(buble);
    }

    var update = function (index, buble) {
        bubleArr[index] = buble;
    }

    var updateContent = function (index, newContent) {
        bubleArr[index].content = newContent;
    }

    var remove = function (index) {
        bubleArr.splice(index, 1);
    }

    var load = function (bublePlainObjectArr) {
        for (var i = 0; i < bublePlainObjectArr.length; i++) {
            bubleArr.push(new Buble(bublePlainObjectArr[i]))
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
        return bubleArr[index].media ;
    }
    

    return {
        add: add,
        update: update,
        updateContent: updateContent,
        remove: remove,
        load: load,
        getAll: getAll,
        get: get,
        removeAll: removeAll,
        isImage: isImage,
        getUser: getUser
    }
})