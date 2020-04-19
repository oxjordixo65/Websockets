module.exports = class JugadorEX {

    constructor(n, psw, p) {
        this.name = n;
        this.password = psw;
        this.points = p;
    }


    get jugadorName() {
        return this.name;
    }

    set jugadorName(x) {
        this.name = x;
    }

    info() {
        return `${this.name} ${this.password} ${this.points}`;
    }
}

