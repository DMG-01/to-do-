const todoList = require("../models")
const statusCodes = require("http-status-codes")

const createTodo = async (req, res) => {
    try {
      const { task } = req.body;
  
      if (!task) {
        return res
          .status(statusCodes.BAD_REQUEST)
          .json({ msg: "No required property found" });
      }
  
      const newToDo = await todoList.create({ task });
      return res
        .status(statusCodes.CREATED)
        .json({ msg: "New to-do list created", toDo: newToDo });
    } catch (error) {
      return res
        .status(statusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: "An error occurred" });
    }
  };
  

const editToDo = async(req,res)=> {
    try {

        const {newList} = req.body

        if(!newList) {
            return res.status(statusCodes.BAD_REQUEST).json({msg:`missing required parameter`})
        }

        const list = await todoList.findOne({_id : req.params.id})

        if(!list) {
            return res.status(statusCodes.NOT_FOUND).json({msg:`to do list of id ${req.params.id}`})
        }
        list.toDo = newList
        await list.save()
    }catch(error) {
        return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({msg:`an error occured`})
    }
}


const markAndUnMark = async(req,res)=> {
    try {
  const list = await todoList.findOne({_id: req.params.id})

  if(!list) {
    return res.status(statusCodes.NOT_FOUND).json({msg:`not found`})
  }

  list.checked = !list.checked
 await list.save()


 return res.status(statusCodes.OK).json({list})
    }catch(error) {
        console.log(error)
        return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({msg:`an error occured`, error})
    }
}

const deleteList = async(req,res)=> {
    try {
await todoList.findOneAndDelete({_id:req.params.id})
    }catch(error) {
        return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({error : error})
    }
}

const allList = async(req,res)=> {
    try {
   const _lists = await todoList.find()

   return res.status(statusCodes.OK).json({ists : _lists})

    }
        catch(error) {
            return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({msg:`an error occured`})
        }
    
}


const getOneList = async (req,res)=> {
    try {
     const list = await todoList.findOne({_id : req.params.id})

     if(!list) {
        return res.status(statusCodes.NOT_FOUND).json({msg:`none found`})
     }

     return res.status(statusCodes.OK).json({list})
    }catch(error) {
        return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({msg:`an error occured`})
    }
}

module.exports = {createTodo, deleteList,markAndUnMark, getOneList,  editToDo, allList}