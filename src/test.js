var o = (function () {
    var obj = {
        a: 1,
        b: 2,
    };
    Object.setPrototypeOf(obj, null);
    return {
        get: function (k) {
            return obj[k];
        },
    };
})();

//

let a = "\n";
let b = `
`;

console.log("\\|");

// // Object.prototype.setPrototypeOf = () => {};

// Object.prototype.hasOwnProperty = () => {
//     return 1234;
// };

// let t = {
//     n:0
// };

// Object.setPrototypeOf(t, null);

// Object.prototype.constructor.setPrototypeOf = () => {};

// Object.defineProperty(Object.prototype, "abc", {
//     get() {
//         return 12345;
//     }
// });

// console.log(t.abc);

// console.log(Object.hasOwnProperty.call(t, "abc"));

const funcTest = () => {
    let end = 157;
    let liList = [];
    let full = 0;
    let timer = setInterval(() => {
        if(full > 100*10*60){
            clearInterval(timer);
            console.log("超时");
        }
        full += 100;
        for (
            let i = 0;
            i < document.getElementsByClassName("sc-bjztBV fHWcSU").length;
            i++
        ) {
            let index = parseInt(
                document
                    .getElementsByClassName("sc-bjztBV fHWcSU")[i].childNodes[0].childNodes[2].getAttribute(
                        "data-page-number"
                    )
            );
            liList[index] =
                document.getElementsByClassName("sc-bjztBV fHWcSU")[i].childNodes[0].childNodes[0].childNodes[0].outerHTML;
            if (index === end) {
                clearInterval(timer);
                let res = "";
                liList.forEach((ele) => {
                    res += ele;
                });
                console.log(res);
                break;
            }
        }
    }, 100);
};

class C1{
    constructor() {
        this.c = 0;
        console.log("c1");
        console.log(this.c);
    }
}

class C2 extends C1{
    constructor() {
        super();
        console.log("c2");
        this.c = 1;
    }
}

class C3 extends C2{
    constructor() {
        super();
        console.log("c3");
    }
}

class C4 {
    constructor(a){
        this.a = a;
    }
    static show() {
        console.log(this.a);
    }
}

const c = new C3();