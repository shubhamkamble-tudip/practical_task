import React, { useState } from 'react'
import EditIcon from "@material-ui/icons/Edit";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { Button, makeStyles, Modal } from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import CancelIcon from '@material-ui/icons/Cancel';
import AddCircleIcon from "@material-ui/icons/AddCircle";
import './TableData.css';
import { useDispatch, useSelector } from 'react-redux';
import store from './redux/store';
import { deleteTodo } from './redux/Todo/todoActions';
import uuid from 'react-uuid';


// text line through
const getTextDecor = (done) => {
  return (done? 'line-through': 'none')
}

function TableData(props) {

  // const { id, title, body } = props.data;
  // console.log('pagination data', props.data);

  const {id, email, title} = props.data;
  console.log('serverPageCheck', props.data);

  // sortingDataApiPosts
  const handleSortPosts = () => {
    // props.data.sort((a, b) => {

      // console.log(props.data);
    //   let ta = a.title.toLowerCase(),
    //       tb = b.title.toLowerCase();
  
    //   if(ta < tb) {
    //     return -1;
    //   }
    //   if(ta > tb) {
    //     return 1;
    //   }
    //   return 0;
    // })
  }
  // ----------------------------

  const stores = useSelector(store => store.mytodo);
  console.log('items from store', stores)

  const dispatch = useDispatch();

//    <span>
//   {column.isSorted
//     ? column.isSortedDesc
//       ? ' 🔽'
//       : ' 🔼'
//     : ''}
// </span>
{/* <button>🔼</button> */}
  
    return (
      
       <div className="app__bottom">

{/* <Button onClick={() => handleSortPosts(props.data)} style={{backgroundColor:"whitesmoke", padding:"5px", textTransform:"capitalize"}}>Sort <i style={{backgroundColor:"blue", color:"white", padding:"5px 9px", borderRadius:"4px"}} className="fa fa-sort"></i></Button> */}

        {/* <div className="app__tableData">

        <table className="styled__table">
          <thead>
            <tr>
              <th onClick={() => props.handleSort()}><span>Summary <i style={{backgroundColor:"blue", color:"white", padding:"5px 9px", borderRadius:"4px"}} className="fa fa-sort"></i></span></th>

              <th><span>Description <i style={{backgroundColor:"blue", color:"white", padding:"5px 9px", borderRadius:"4px"}} className="fa fa-sort"></i></span></th>

              <th onClick={() => props.handleSortPriority()}><span>Priority <i style={{backgroundColor:"blue", color:"white", padding:"5px 9px", borderRadius:"4px"}} className="fa fa-sort"></i></span></th>

              <th><span>Created On <i style={{backgroundColor:"blue", color:"white", padding:"5px 9px", borderRadius:"4px"}} className="fa fa-sort"></i></span></th>

              <th><span>Due By <i style={{backgroundColor:"blue", color:"white", padding:"5px 9px", borderRadius:"4px"}} className="fa fa-sort"></i></span></th>

              <th><span>Actions</span></th>
            </tr>
          </thead>

          <tbody>
            {props.todos.length===0 ? "No Todos to display" :
            props.todos.map(todo => ( 
            <tr className="active__row" key={todo.id} style={{textDecoration: getTextDecor(todo.done)}}>
              
              <td>{todo.summary}</td>
              <td>{todo.desc}</td>
              <td>{todo.myPriority}</td>
              <td>{todo.createdOn}</td>
              <td>{todo.dueBy}</td>
              <td>

                <Button type="button" onClick={() => {props.handleEditClick(todo)}} >
                  <EditIcon style={{backgroundColor:"blue", color:"white", padding:"5px", borderRadius:"5px", marginLeft:"-0px"}} />
                  
                </Button>

                <Button style={{backgroundColor:"green", color:"white", padding:"5px 0px", textTransform:"lowercase", marginLeft:"-5px"}} onClick={() => {props.handleMarkDone(todo)}}>
                  
                  Done
                </Button>
                
                <Button onClick={() => props.deleteTodo(todo.id)}>
                  <DeleteForeverIcon style={{ color: "white", backgroundColor:"red", padding:"5px", borderRadius:"5px", marginLeft:"-8px" }} />
                </Button>
              </td>
              
              </tr>
              
            ))}
           </tbody> 
           </table>

           </div> */}

           {/* react old table above............... */}

{/* <CheckCircleOutlineIcon style={{ color: "green" }} /> */}

             {/* <ul>
               {
                 props.posts.map(post => 
                  <li key={post.id}>{post.title}</li>)
               }
             </ul> */}

             
        <div className="api__dataFetching">

        <table className="styled__table">
          <thead>
            <tr>
              {/* <th>Id</th>
              <th>Title</th>
              <th>Body</th> */}
              
            </tr>
          </thead>
          <tbody>
            {/* {props.posts.length===0 ? "No Posts to display" :
            props.posts.map(post => ( 
            <tr className="active__row" key={post.id} > */}


              <tr className="active__row">

              {/* <td>{post.id}</td>
              <td>{post.title}</td>
              <td>{post.body}</td>
            <td>{post.userId}</td> */}

              <td>{id}</td>
              <td>{title}</td>
              {/* <td>{body}</td> */}
            
              </tr>
            
              
            {/* ))
            } */}
           </tbody> 
           </table>
           

      {/* <small>{id}</small>
      <h1>{title}</h1>
      <p>{body}</p> */}
             
           </div>

           {/* <div>
             <button onClick={() => props.submitPostHandler}>submit</button>
           </div> */}



        {/* <div className="redux__getData">
          
          <table className="styled__table">
            <thead>
             <tr>
             <th onClick={() => props.handleSort()}><span>Summary <i style={{backgroundColor:"blue", color:"white", padding:"5px 9px", borderRadius:"4px"}} className="fa fa-sort"></i></span></th>

            <th><span>Description <i style={{backgroundColor:"blue", color:"white", padding:"5px 9px", borderRadius:"4px"}} className="fa fa-sort"></i></span></th>

            <th onClick={() => props.handleSortPriority()}><span>Priority <i style={{backgroundColor:"blue", color:"white", padding:"5px 9px", borderRadius:"4px"}} className="fa fa-sort"></i></span></th>

            <th><span>Created On <i style={{backgroundColor:"blue", color:"white", padding:"5px 9px", borderRadius:"4px"}} className="fa fa-sort"></i></span></th>

            <th><span>Due By <i style={{backgroundColor:"blue", color:"white", padding:"5px 9px", borderRadius:"4px"}} className="fa fa-sort"></i></span></th>

            <th><span>Actions</span></th>
              
             </tr>
            </thead>
          <tbody>
            
          {stores.todoss.map((item) => 
           {
              return(

            <tr key={item.id} className="active__row" >

              <td>{item.mytodo.summary}</td>
              <td>{item.mytodo.desc}</td>
              <td>{item.mytodo.myPriority}</td>
              <td>{item.mytodo.createdOn}</td>
              <td>{item.mytodo.dueBy}</td>
            
              <td>

              <Button type="button" >
              <EditIcon style={{backgroundColor:"blue", color:"white", padding:"5px", borderRadius:"5px", marginLeft:"-0px"}} />
              
              </Button>

              <Button style={{backgroundColor:"green", color:"white", padding:"5px 0px", textTransform:"capitalize", marginLeft:"-5px"}} >
              
                 Done
              </Button>

              <Button onClick={() => dispatch(deleteTodo(item.id))}>
              <DeleteForeverIcon style={{ color: "white", backgroundColor:"red", padding:"5px", borderRadius:"5px", marginLeft:"-8px" }} />
              </Button>
              </td>
            </tr>
              )  
              })}
            
           </tbody> 
           </table>

           </div> */}

          {/* <ul>
           {stores.todoss.map((item) => 
           {
              return(

                <li key={item.id}>{item.mytodo.summary}</li>
              )
            })}

          </ul> */}
           

           {/* <div>
             <button onClick={() => props.submitPostHandler}>submit</button>
           </div> */}

        </div>
    )
}

export default TableData
