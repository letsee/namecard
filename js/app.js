const RADtoDEG = (rad) => rad * (180/Math.PI);
const DEGtoRAD = (deg) => deg * (Math.PI/180);

const namecard = {
    // world: new Object3D(),
    world: null,
    btnEle: null,
    offset: 0,
    distance: 230,
    renderable: [],
    ground: false,
    angle: 0,
    bgObject: null,
    createDomRenderable: function(element) {
        const ele = new DOMRenderable(element);
        const wrap = new Object3D();
        wrap.add(ele);
        return wrap;
    },
    setElement: function() {
        const array = Array.from(this.btnEle); //convert to array
        this.angle = this.calculateAngle(this.btnEle.length);
        this.renderable = array.map(val => this.createDomRenderable(val));
        this.renderable.forEach((val, index) => {
            this.world.add(val);
            val.children[0].position.set(0, 0, 1);
            // TweenLite.to(
            //     val.children[0].position,
            //     3,
            //     {
            //         ease: Elastic.easeOut.config(1, 0.3),
            //         y: -this.distance,
            //         delay:index/5
            //     });
            // val.rotation.set(0, 0, DEGtoRAD(this.angle * index + this.offset));
            // if (this.ground) val.children[0].rotation.set(0, 0, -DEGtoRAD(angle * index + this.offset));
        });
        // TweenLite.to(
        //     this.bgObject.children[0].element,
        //     2,
        //     {css:{opacity: 1}}
        // )
        this.world.rotation.set(0,0,-DEGtoRAD(this.offset + this.angle));
        // this.startAnimation();
    },
    startAnimation: function() {
        this.renderable.forEach((val, index) => {
            // val.children[0].position.set(0, 0, 0);
            TweenLite.to(
                val.children[0].position,
                3,
                {
                    ease: Elastic.easeOut.config(1, 0.3),
                    y: -this.distance,
                    delay:index/5
                });
            console.log(this.angle * index - this.angle);
            val.rotation.set(0, 0, DEGtoRAD(this.angle * index + this.offset));
            if (this.ground) val.children[0].rotation.set(0, 0, -DEGtoRAD(this.angle * index + this.offset));
            else val.children[0].element.children[0].children[0].style.transform = `rotateZ(${-(this.angle * index - this.angle)}deg)`;
            TweenLite.to(
                this.bgObject.children[0].element,
                2,
                {
                    css: {opacity: 1},
                    delay:index*2
                })
        });
    },
    calculateAngle: function(num, _offset = null, base = 180)  {
        this.offset = _offset || 20;
        if (num < 2) return false;
        const baseAngle = base - this.offset * 2;
        return (num === 2) ? baseAngle : baseAngle / (num - 1);
    },
    init: function(className) {
        // const world = new Object3D();
        const worldEle = document.createElement('div');
        const backgroundEle = document.createElement('div');
        this.bgObject = this.createDomRenderable(backgroundEle);
        backgroundEle.id = "bgImage";
        this.world = this.createDomRenderable(worldEle);
        this.world.add(this.bgObject);
        app.engine.getEntities()[0].addRenderable(this.world)
        this.btnEle = document.getElementsByClassName(className);
        this.setElement();
    },

}

