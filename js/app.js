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
        // console.warn(array.length);

        this.renderable = array.map(val => letsee.addXRElement(val, letsee.getEntityByUri('namecard.json')));
        this.renderable.forEach((val, index) => {
            this.world.add(val);
            this.world.children[0].position.set(0, 0, 1);
            val.element.style.visibility = 'hidden';

            // console.warn(this.world);
            /*TweenLite.to(
                this.world.children[0].position,
                3,
                {
                    ease: Elastic.easeOut.config(1, 0.3),
                    y: -this.distance,
                    delay:index/5
                });
            val.rotation.set(0, 0, DEGtoRAD(this.angle * index + this.offset));
            if (this.ground) this.world.children[0].rotation.set(0, 0, -DEGtoRAD(angle * index + this.offset));*/
        });
        // console.warn(this.world);
        // this.world.children.forEach(c => {
        //     c.element.style.visibility = 'hidden';
        // })


        /*this.renderable = array.map(val => this.createDomRenderable(val));
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
        });*/
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
                val.position,
                3,
                {
                    ease: Elastic.easeOut.config(1, 0.3),
                    y: -this.distance,
                    delay:index/5
                });
            console.log(this.angle * index - this.angle);
            val.rotation.set(0, 0, DEGtoRAD(this.angle * index + this.offset));
            if (this.ground) val.rotation.set(0, 0, -DEGtoRAD(this.angle * index + this.offset));
            // else val.element.children[0].children[0].style.transform = `rotateZ(${-(this.angle * index - this.angle)}deg)`;
            // TweenLite.to(
            //     this.bgObject.children[0].element,
            //     2,
            //     {
            //         css: {opacity: 1},
            //         delay:index*2
            //     })
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

        // this.bgObject = this.createDomRenderable(backgroundEle);
        this.bgObject = letsee.addXRElement(backgroundEle, letsee.getEntityByUri('namecard.json'));
        backgroundEle.id = "bgImage";

        // this.world = this.createDomRenderable(worldEle);
        this.world = letsee.addXRElement(worldEle, letsee.getEntityByUri('namecard.json'));

        this.world.add(this.bgObject);

        // app.engine.getEntities()[0].addRenderable(this.world)
        console.warn(this.bgObject);
        // this.bgObject.element.style.visibility = 'hidden';

        this.btnEle = document.getElementsByClassName(className);
        this.setElement();
    },

}

