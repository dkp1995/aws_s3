import React, { useState } from 'react'

import axios from 'axios'

const Form = () => {

  const [file , setFile] = useState('')


  const submitHanlder = (e) => { 

      e.preventDefault()

      const formData = new FormData()
      formData.append('file', file)
     

      const url = 'http://localhost:5000/fileupload'

      axios.post(url, formData )
        .then((res) =>{
              console.log(res)
        })
        .catch((err)=>console.log(err))
      
      console.log(file)
  }



  return (

    <div className='container'>

        <form onSubmit={submitHanlder} encType='multipart/form-data'> 
             <input type='file' onChange={(e)=>setFile(e.target.files[0])}/>   
             <input type='submit'/>
        </form>

    </div>
  )
}

export default Form