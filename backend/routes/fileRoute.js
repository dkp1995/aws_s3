const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const aws = require('aws-sdk')
const fs = require('fs')


const storage = multer.diskStorage( { 

  

      destination: ( req, file , cd) =>{
        cd(null, 'public')
      },
      filename : (req, file , cd) =>{
        cd( null, file.originalname)
      }
})

const upload = multer({ storage })
// const upload = multer({ dest: 'uploads/' })

const accesskey = process.env.AWS_ACCESS_KEY_ID
const secretKey = process.env.AWS_ACCESS_KEY_SECRET

aws.config.update({ 
      accessKeyId:accesskey, 
      secretAccessKey:secretKey
})

const s3 = new aws.S3({ params : { Bucket : process.env.AWS_BUCKET_NAME}})



router.post('/' , upload.single('file') , async (req, res)=>{

      console.log(req.file)

      const bucketName = process.env.AWS_BUCKET_NAME

      

      const promise = await fs.promises.readFile(path.join(req.file.path));

      

      

      await Promise.resolve(promise).then(function(buffer){

            const fileData = { 
              Bucket: bucketName,
              Key:req.file.originalname,
              Body:buffer,
              ACL:"public-read-write",
              ContentType:"image/jpeg"
            }
          
          s3.putObject(fileData, (error, data) =>{
                if(error){
                      console.log(error)
                }
                else{ 
                      console.log(data)
                      res.json(data)
                }
              }) 
        
      });

    
    

      
})


module.exports = router