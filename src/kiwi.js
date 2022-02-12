import pida from "pida"
import md5 from "blueimp-md5";

let  gotapiHost = "https://ws.gotapi.net";
const  MSGTYPE_DATA=2;
class messageBody {
    data
    hash

    constructor(data) {
        this.data = data;
        this.hash = md5(data);
    }
}
class message {
    type
    body
    uuid
    constructor(str) {
        this.type = MSGTYPE_DATA
        this.body = new messageBody(str)
        this.uuid = md5(Math.random()+Math.random()+new Date().toString())
    }
}

class CommentItem {
    id =""
    ua ="chrome-wx"
    browser = "chrome"
    version="99"
    url = "/index"
    link = "/index"
    ACL = ""
    QQAvatar = ""
    comment = "-"
    insertedAt = new Date()
    createdAt = new Date()
    updatedAt = new Date()
    ip = "127"
    mail = "55547082@qq.com"
    nick = ""
    pid = ""

    constructor(str) {
        if(!str){
            return
        }
        let res,obj
        try {
            res = JSON.parse(str)
        }catch (e){
            console.log("parse failed")
            console.log(str)
        }
        console.log(res.body.data)
        try {
            obj = JSON.parse(res.body.data)
        }catch (e){
            console.log("parse failed")
            console.log(res.body.data)
        }
        this.id = obj.id
        this.ua = obj.ua
        this.browser = obj.browser
        this.version=obj.version
        this.pid = obj.pid
        this.ip = obj.ip
        this.link = obj.link
        this.url = obj.url
        this.ACL = obj.ACL
        this.QQAvatar = obj.QQAvatar
        this.comment = obj.comment
        this.mail = obj.mail
        this.nick = obj.nick
        this.pid = obj.pid
        this.rids = obj.rids
        this.createdAt = new Date(obj.createdAt)
        this.updatedAt = new Date(obj.updated)
        this.insertedAt = new Date(obj.insertedAt)

    }

    get(k){
        if(k==="id") return this.id
        if(k==="pid") return  this.pid;
        if(k==="nick") return this.nick
        if(k==="mail")  return this.mail
        if(k==="ip") return this.ip
        if(k==="updatedAt") return this.updatedAt
        if(k==="createdAt") return this.createdAt
        if(k==="insertedAt") return this.insertedAt
        if(k==="comment") return this.comment
        if(k==="ACK") return this.ACL
        if(k==="link") return this.link
        if(k==="url") return this.url
        if(k==="browser") return this.browser;

    }
    getGroupNameOfMain (path,config){
        return "/Paline/main/"+config.app_id+"/"+md5(path);
    }
    save(config){

        let groupName = this.getGroupNameOfMain(this.url,config);
        return new Promise((resolve,reject)=>{
            let msg = new message(JSON.stringify(this))
            pida.post(gotapiHost+groupName,{},msg).then(()=>{
                resolve(this);
            }).catch((evt)=>{
                reject(evt);
            });
        });


    }
    set(k,v){
        if(k==="id") this.id =v;
        if(k==="pid") this.pid =v;
        if(k==="nick") this.nick = v;
        if(k==="mail") this.mail = v;
        if(k==="ip") this.ip = v;
        if(k==="updatedAt") this.updatedAt = v;
        if(k==="createdAt") this.createdAt = v;
        if(k==="insertedAt") this.insertedAt = v;
        if(k==="comment") this.comment = v;
        if(k==="ACK") this.ACL = v;
        if(k==="link") this.link = v;
        if(k==="browser") this.browser = v;
        if(k==="url") this.url = v;
        if(k==="QQAvatar") this.QQAvatar = v;

    }
}

class Kiwi {
    config = {}
    constructor(config) {
        this.config = config;
    }

    getUrlOfHistory(){
        return gotapiHost+"/__/history/";//+this.config.app_id;
    }
    getGroupNameOfMain (path){
        return "/Paline/main/"+this.config.app_id+"/"+md5(path);
    }
    getGroupNameOfReplies  (path,id){
        return "/Paline/replies/"+this.config.app_id+"/"+md5(path)+"/"+id;
    }

    gotapiQuery (data){
        let url = this.getUrlOfHistory();
    }
    queryMain(path,size,position){
        return new Promise((resolve,reject) =>{
            pida.post(this.getUrlOfHistory(),{
                "headers": {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            },"position="+encodeURIComponent(position)+"&size="+encodeURIComponent(size)+"&groupName="+encodeURIComponent(this.getGroupNameOfMain(path))).then((resp)=>{
                console.log(resp.data);
                let results  =[]
                pida.each(resp.data,(item,i)=>{
                    if(item!==undefined) {
                        results.push(new CommentItem(item))
                    }
                })

                    //results.append(new CommentItem(iter.))
                resolve.call(null,results)

                //resolve(resp.data);
            }).catch((e)=>{
                reject.call(null,e);
            })
        });
    }

    queryReplies(path,id){
        console.log("fetch replies")
        console.log(arguments);
        return new Promise((resolve,reject) =>{
            resolve([
            ]);
        });
    }
    count(path){
         return new Promise((resolve,reject)=>{
             resolve(100);
         })
    }
}

export { Kiwi,CommentItem}