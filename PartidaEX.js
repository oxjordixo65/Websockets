module.exports = class PartidaEX {

    constructor(id) {
        this.userId = id;

    }

    info() {
        return `${this.userId}`;
    }
}
