const jwt=require("jsonwebtoken")

const auth =(req,res,next)=>{
    const  token=req.headers.authorization
    if(token){
      try {
        const decodedToken=jwt.verify(token.split(" ")[1],"backend")
        if(decodedToken){
          req.body.authorId=decodedToken.authorId;
          req.body.author=jwt.decodedToken.author
            next()
        }else{
            res.send({"msg":"Login first!!"})
        }
      } catch (error) {
        res.send({"err":error.message})
      }
    }else{
        res.send({"msg":"Login first!!"})
    }
    
}

module.exports={
    auth
}