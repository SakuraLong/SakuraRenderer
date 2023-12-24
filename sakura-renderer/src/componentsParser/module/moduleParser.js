/*
模块解析器
*/


class ModuleParser{
    constructor(option, content, rendererData){
        this.option = option;
        this.content = content;
        this.rendererData = rendererData;
        this.parsers = [];
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

export default ModuleParser;