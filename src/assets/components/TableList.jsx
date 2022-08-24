
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { Modal, ModalBody, ModalFooter, Button } from 'reactstrap';


const TableList = () => {

   const [posts, setPosts] = useState([])
   const [modal, setModal] = useState(false)
   const [form, setform] = useState({id:"", title: "", body: ""})

   const api = axios.create({
     baseURL:'https://jsonplaceholder.typicode.com'
    });


    const openModal = () => {
          setModal(true)
        }
    
    const closeModal= () => {
      setModal(false)
    }
    
    const listPost = async () =>{
      const {data} = await api.get("/posts")
      setPosts(data)
      console.log('res', data)
    }
    
    
    const handleAddForm = (e) => {
      e.preventDefault()
       let name = e.target.name
       let value = e.target.value
       const newFormDate = {...form}
        newFormDate[name] = value 
        setform(newFormDate)
        console.log('form', form)
    }

    // const add = () =>{
    //  let newValue = {...form}
    //  let list = posts
    //  list.unshift(newValue)
    //  closeModal()
    //  setPosts(list)
    // }

    const addPosts = async () =>{
      await api.post("/posts",form)
      .then(response=>{
        setPosts(posts.concat(response.data) )
        closeModal()
    }).catch(error=>{
          console.log(error.status);
        })

    }

    const postDelete = async (post) => {
       await api.delete(`/posts/${post.id}`)
      const dataDelete = posts.filter( p => p.id !== post.id )
      console.log('dataDElete', dataDelete)
      setPosts(dataDelete)
      // setOpenModal(false)
      console.log('posts', posts)
    }
    useEffect(() => {
        listPost()
    },[])


  return (
    <div>
      <div style={{margin: "5% 0"}} >
        <button type="button" className="btn btn-outline-primary" onClick={openModal}>agregar posts</button>
      </div>
       <div className='row justify-content-md-center' >
         <table style={{width: "60%"}} className='table table-bordered border-dark'>
           <thead className='table-success border-dark'>
              <tr>
                  <th scope="col">id</th>
                  <th scope="col"> title</th>
                  <th scope="col">body</th>
                  <th scope="col">eliminar</th>
              </tr>
           </thead>
            {posts.map((n, i)=>
              <tbody key={i+1} style={{fontSize: "10px"}} className='align-middle'>
                  <tr key={i+1}>
                      <td scope="row">{n.id}</td>
                      <td>{n.title}</td>
                      <td>{n.body}</td>
                      <td><FontAwesomeIcon icon={faTrashCan } style = {{color:'red', fontSize: "20px", cursor: "pointer"}} onClick={()=> postDelete(n)} /></td>
                  </tr>
              </tbody>
           )}
          </table>
       </div>
      <div>
        <Modal isOpen={modal}>
          <ModalBody>
            <div className="form-group">
              <label htmlFor="id">ID</label>
              <input className="form-control" type="number" name="id" id="id" onChange={handleAddForm}/>
              <br />
              <label htmlFor="nombre">TITLE</label>
              <input className="form-control" type="text" name="title" id="title" onChange={handleAddForm} />
              <br />
              <label htmlFor="nombre">BODY</label>
              <input className="form-control" type="text" name="body" id="body" onChange={handleAddForm} />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={()=>addPosts()}>agregar</Button>
            <Button color="secondary" onClick={closeModal} >Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  )
}

export default TableList