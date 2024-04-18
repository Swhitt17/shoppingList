const express = require("express")
const Item = require("../item")
const router = new express.Router()
router.get("/", function(req,res,next){
    try{
       return res.json({items: Item.findAll()}) 
    }
    catch(e){
        return next(e)
    }
   
})

router.post("/", function(req,res,next){
    try{
    const newItem = new Item(req.body.name, req.body.price)
    return res.json({item: newItem}) 
    }
    catch(e){
        return next(e)
    }
  
})

router.get("/:name", function(req,res,next){
    try{
    const foundItem = Item.find(req.params.name)
     return res.json({item: foundItem})
    }
    catch(e){
        return next(e)
    }

    
})

router.patch("/:name", function(req,res,next){
    try{
    const foundItem = Item.update( req.params.name,req.body);
     return res.json({item: foundItem})
    }
    catch(e){
        return next(e)
    }
 
})

router.delete("/:name", function(req,res,next){
    try{
     Item.remove(req.params.name);
     return res.json({message: "Deleted"});
    }
    catch(e){
        return next(e)
    }
   
})

module.exports = router;
