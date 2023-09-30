/*
语法解析器
*/
import MathParser from "./mathParser";


class GrammerParser{
    constructor(option, content){
        this.option = option;
        this.content = content;
        this.parsers = [MathParser];
    }
    analyse(){
        let finish = [];
        this.parsers.forEach((element)=>{
            finish.push(false);
        });
        while(!this.isFinish(finish)){
            finish.forEach((element, index)=>{
                if(!element){
                    let content = new this.parsers[index](this.option, this.content).analyse();
                    if(content === this.content) finish[index] = true;
                    this.content = content;
                }
            });
        }
        return this.content;
    }
    isFinish(finish){
        for(let i=0;i<finish.length;i++){
            if(!finish[i]) return false;
        }
        return true;
    }
}

export default GrammerParser;