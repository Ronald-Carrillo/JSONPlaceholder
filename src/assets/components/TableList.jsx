import React, { useEffect, useState } from 'react'
import  "../style/TableList.css"
import axios from 'axios'
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { Modal, ModalBody, ModalFooter } from 'reactstrap';


const TableList = () => {

   const [posts, setPosts] = useState([])
   const [modal, setModal] = useState(false)

   const api = axios.create({
     baseURL:'https://jsonplaceholder.typicode.com'
    });
    
    const listPost = async () =>{
      const {data} = await api.get("/posts")
      setPosts(data)
      console.log('res', data)
    }
    
    
    // const selectPost = (post) => {
    //    const data = {...post}

    //  console.log('data', data)
    // }

    const postDelete = async (post) => {
       await api.delete(`/posts/${post.id}`)
      const dataDelete = posts.filter( p => p.id !== post.id )
      console.log('dataDElete', dataDelete)
      setPosts(dataDelete)
      // setOpenModal(false)
      console.log('posts', posts)
    }

    
    const openModal = () => {
      setModal(true)
      console.log(modal)
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
              <input className="form-control" type="text" name="id" id="id"/>
              <br />
              <label htmlFor="nombre">TITLE</label>
              <input className="form-control" type="text" name="title" id="title" />
              <br />
              <label htmlFor="nombre">BODY</label>
              <input className="form-control" type="text" name="body" id="body" />
            </div>
          </ModalBody>
        </Modal>
      </div>
    </div>
  )
}

export default TableList