const { v4: uuidv4 } = require('uuid');

class Task{
    id = ""
    desc = ""
    completeIN = null

    constructor(desc){
        this.desc = desc
        this.id = uuidv4()
        this.completeIN = null
    }
}


module.exports = Task