// MyCustomDocument必须实现下面1个方法和1个属性：
// 方法：
//      dispose
// 属性：
//      uri

class MyCustomDocument {
    constructor(uri) {
        this.uri = uri;
    }

    dispose() {
        console.log('=====[MyCustomDocument::dispose]=====')
    }
}

module.exports = MyCustomDocument