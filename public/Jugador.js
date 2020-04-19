class Jugador {

    constructor(n,psw) {
      this.name=n;
      this.password=psw;
      this.points=0;
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

