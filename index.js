const mongoose=require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
mongoose.Promise=global.Promise;
mongoose.connect(process.env.URL,{ useNewUrlParser: true,useUnifiedTopology: true })
.then(()=>{
    console.log("connected");
});
mongoose.set('useFindAndModify', false);
var taskSchema=new mongoose.Schema({
    Description:String,
    Completed:Boolean
    
});
var Task = mongoose.model("Task", taskSchema);
var t1=new Task(
    {
        Description:"Physics homework done",
        Completed:false
    }

);

var t2=new Task(
    {
        Description:"Maths homework done",
        Completed:false
    }

);

var t3=new Task(
    {
        Description:"History homework done",
        Completed:false
    }

);
var t4=new Task(
    {
        Description:"English homework done",
        Completed:false
    }

);
t1.save();t2.save();t3.save();t4.save();
const read=async ()=>{
try{
    const foundTask=await Task.find({Completed:false});
    if(foundTask.length===0)
    {
        console.log("No Task found");

    }
    foundTask.forEach(li=>{
        console.log(li.Description);
    });

}
catch(error){
    console.log(error);
}
}
const update=async(id)=>{
    
    if(!mongoose.Types.ObjectId.isValid(id))return console.log("the id doesnot exits");
    await Task.findByIdAndUpdate(id,{Description:"English home done"});
    console.log("Updated the task");
}
const delTask =  async (id) => {
    if(!mongoose.Types.ObjectId.isValid(id)) return console.log('the id doesnot exist');
     await Task.findByIdAndRemove(id);
    console.log('selected task deleted successfully');
}    
const delAllTask = async () => {
    try {
        await Task.find().remove();
        console.log('all tasks deleted successfully');
    } catch (error) {
        console.log(error);
    }
} 



setTimeout(()=>{ read()}, 1000);
setTimeout(()=>{update(t2._id)}, 3000);

setTimeout(()=>{ read(); }, 5000);

setTimeout(()=>{delTask(t1._id)}, 7000);
setTimeout(()=>{ read(); }, 10000);
setTimeout(()=>{ delAllTask(); }, 11000);
setTimeout(()=>{ read(); }, 15000);
