import "./App.css";
import {
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { useState } from "react";
import Todo from "./Todo";
import TabPanel from "./TabPanel";
import SearchIcon from "@material-ui/icons/Search";
// from Todo imports
import { Button, Modal } from "@material-ui/core";
// import React, { useState } from "react";
import "./Todo.css";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import {
  MuiPickersUtilsProvider,
  // KeyboardTimePicker,
  KeyboardDatePicker,
  Picker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import CancelIcon from '@material-ui/icons/Cancel';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import TableData from "./TableData";
import TableTodo from "./TableTodo";
import Tabs from "./Tabs";
import { useEffect } from "react";
import uuid from 'react-uuid';
import axios from 'axios';

// Redux imports
import { connect } from 'react-redux';
import { addTodo, deleteTodo } from './redux/Todo/todoActions';
import { useDispatch, useSelector } from 'react-redux';
// import pagination from "./pagination/pagination";
import ServersidePagination from "./ServersidePagination";

import { Pagination } from "./pagination/pagination";

import './TableData.css';
// Redux

// 1
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(2),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  paper: {
    position: "absolute",
    width: 700,
    backgroundColor: theme.palette.background.paper,
    // border: "2px solid whitesmoke",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 1, 0),
  },
}));
// 2 4 3

// Redux props coming from redux
function App(props, dataLimit, pageLimit) {
  
  console.log("props", props);

  // const handleReduxAdd = (event) => {
  //   event.preventDefault();
  //   props.d_addTodo(summary);
  // }
  // let mytodos = useSelector(state=>state);
  // redux

  // ------------------
  const [students, setStudents] = useState([]);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const [isLoadingStudents, setLoadingStudents] = useState(false);
  const [isSearchingStudents, setSearchingStudents] = useState(false);
  const [reload, setReload] = useState(false);
  const [search, setSearch] = useState({});
  // const { register, handleSubmit, errors } = useForm();

  /*
   * Clear search results
   * Make search object empty if no value
   * Trigger reload in pagination
   */
  const clearSearchResults = (event) => {
    if (!event.target.value && search) {
      setSearch({
        term: "",
      });
      setReload(true);
      setTimeout(() => {
        setReload(false);
      }, 1000);
    }
  };
  

  const [todos, setTodos] = useState([
    {id: 1, summary: 'Purchase Notebook', desc: 'description here', myPriority: 'low', createdOn: '2021-05-16', dueBy: '2021-05-16', done: false},
    {id: 2, summary: 'Buy', desc: 'buy something', myPriority: 'normal', createdOn: '2021-05-16', dueBy: '2021-05-16', done: false},
  ])

  // let currentDateTime = new Date().toLocaleString()

  let getCurrentDate = () => {
    const now = new Date();
    return now.toISOString().slice(0, 10);
  }

  const [summary, setSummary] = useState('')
  // Redux dispatch
  const dispatch = useDispatch();
  // Redux dispatch

  const [desc, setDesc] = useState('')
  const [myPriority, setMyPriority] = useState('')
  const [createdOn, setCreatedOn] = useState(getCurrentDate)
  const [dueBy, setDueBy] = useState(getCurrentDate)

  // const [editing, setEditing] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [editTodo, setEditTodo] = useState({});

  const [priorityFilter, setPriorityFilter] = useState('')
  
  const [sortedField, setSortedField] = useState(null)

  // state for get method
  const [posts, setPosts] = useState([])
  const [error, setError] = useState('')

  // state for post method [{userId: '', title: '', bodyData: ''}]
  const [postData, setPostData] = useState([])
  const [userId, setUserId] = useState('')
  const [title, setTitle] = useState('')
  const [bodyData, setBodyData] = useState('') 

  const handlePriorityClick = (myPriority) => {
    setPriorityFilter(myPriority)
  }


  // let compareBy = (key) => {
  //   return function (a, b) {
  //     if (a[key] < b[key]) return -1;
  //     if (a[key] > b[key]) return 1;
  //     return 0;
  //   };
  // }

  // const sortBy = (key) => {
  //   let arrayCopy = [...todos]
  //   arrayCopy.sort(compareBy(key))
  //   setSortedField({todos: arrayCopy})
  //   console.log('You clicked on sorted summary')
  // }

  const handleSort = () => {
    let sortedTodos = [...todos];
    sortedTodos.sort((a, b) => {
      if (a.summary < b.summary) {
        return -1;
      }
      if (a.summary > b.summary) {
        return 1;
      }
      return 0;

    });

    setTodos(sortedTodos)

    console.log(sortedTodos);

//     const array = ['ccc', 'aaa', 'bbb'];
// array.sort();
// console.log(array);
 
  }

  const handleSortPriority = () => {
    let sortedPriority = [...todos]
    sortedPriority.sort((low, normal) => {
      if(low.myPriority < normal.myPriority){
        return -1
      }
      if(low.myPriority > normal.myPriority) {
        return 1
      }
      return 0;
    })

    setTodos(sortedPriority)
    console.log(sortedPriority)
  }

  
  // let sortedTodos = [...todos]
  // if(sortedField !== null){
  //   sortedTodos.sort((a, b) => {
  //     if(a[sortedField] < b[sortedField]) {
  //       return -1
  //     }
  //     if(a[sortedField] > b[sortedField]) {
  //       return 1
  //     }
  //     return 0
  //   })
  // }

  // sorting table
  // const handleSort = (event, sortKey) => {
  //   todos.summary = summary
  //   todos.sort((a,b) => a[sortKey].localeCompare(b[sortKey]))
  //   setSummary({summary})
  // }

  // searching ------------------
const [allData, setAllData] = useState([]);
const [filteredData, setFilteredData] = useState(allData);

const handleSearch = (event) => {

    let sortedPosts = [...students];
    console.log('checking sort', sortedPosts);
    let filteredPost = sortedPosts.filter((item) => {
      console.log('itemPost', item.firstName.toUpperCase(), event.target.value.toUpperCase())
     return item.firstName.toUpperCase() == event.target.value.toUpperCase();
    })
console.log('filtered Post', filteredPost);
    setStudents(filteredPost);
  
}

useEffect(() => {
  axios.get('https://jsonplaceholder.typicode.com/posts')
  .then(response => {
    console.log('search response', response.data);
    setAllData(response.data);
    setFilteredData(response.data)
  })
  .catch(error => {
    console.log('Error getting fake data: ' + error);
  })
}, []);


//   let token = null;
//   const [query, setQuery] = useState('')

//   const search = query => {
//     const url = `https://jsonplaceholder.typicode.com/posts?search=${query}`;
//     const token = {};
//     token = token;

//     axios.get(url)
//     .then(result => result)
//     .then(data => {
//       if(token === token) {
//         setPosts({posts: data.result})
//       }
//     })
//   }
//  console.log('searc', search);

//  --------------------
// pageLimit={5}
// dataLimit={10}
// _page=1&_limit=2
  
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts?_page=${pageLimit}&_limit=${dataLimit}')
    .then(res => {
      console.log(res)
      setPosts(res.data)
      console.log('checkPost_Serverside_Pagination ',posts);
    })
    // .then((data) => {
    //   data.sort((a, b) => a.userId - b.userId);
    //   setPosts({data: data});
    // })
    .catch(err => {
      console.log(err)
      // setError(err.message);
    })
  },[])

  // sorting for posts api
  // const handleSortPosts = () => {
    
  //   let sortedPosts = [...posts];
  //   console.log('checking sort', sortedPosts);
  //   sortedPosts.sort((a, b) => {
  //     if(a.title < b.title) {
  //       return -1;
  //     }
  //     if(a.title > b.title){
  //       return 1
  //     }
  //     return 0;
  //   })

  //   setPosts(sortedPosts);
  // }

  const [sort, changeSortOrder] = useState('asc')

  const handleSortPosts = () => {
    changeSortOrder(sort  == 'asc' ? 'dsc' : 'asc')
    console.log('changeSortorder',sort)


    let sortedPosts = [...students];
    console.log('checking sort', sortedPosts);
    sortedPosts.sort((a, b) => {
        if(sort == 'asc'){
          if(b.firstName > a.firstName){
            return -1;
          }
        }
        if(sort == 'dsc'){
          if(a.firstName > b.firstName){
            return -1;
          }
        }


      // if(a.firstName < b.firstName) {

      //   return -1;
      // }
      // if(a.firstName > b.firstName){
      //   return 1
      // }
      // return 0;
    })

    setStudents(sortedPosts);

    
    
    
  }

  // const handleApiSort = (data) => {
  //  const sortedData = res.data.sort((a, b) => a.userId - b.userId);
  //   console.log('sortedApiData', sortedData);
  //   setPosts(sortedData)
  // }

  
  const submitPostHandler = (event) => {
    // const headers = {
    //   'Content-Type': 'application/json',
    // }

    // const body = {
    //   JSON.stringify(
    //     title: 'foo',
    //     body: 'bar',
    //     userId: 1,
    //   )
    // }

    event.preventDefault()
    // console.log(postData)
    axios.post('https://jsonplaceholder.typicode.com/posts', {title: 'foo',
        body: 'bar',
        userId: 1,} )

    .then(response => {
      console.log(response)
      // setPostData(...posts, response)
      
    })
    .catch(error => {
      console.log(error)
    })

//     const res = await axios.put('https://jsonplaceholder.typicode.com/posts', '');

// res.data.form; // { hello: 'world' }
// res.data.headers['Content-Type']; 
    
  }

  // let axios client(read) -> http get post put methods -> differences between method -> get-> url -> data fetch from which loaction -> by default pass content type -> handling responses ->status code-> 200 -> OK, success it will goes .then() , if error goes into catch()


  useEffect(() => {
    if(isEditMode){
      // todos.summary= editTodo.summary;
      // todos.id.summary = editTodo.summary;
    
      
    }else {
      // todos.id.summary = '';
      // todos.summary = '';
      // todos.myPriority = 'low'
      // todos.createdOn = currentDateTime;
    }
  }, [isEditMode])

  // delete functionalist usong id
  // const deleteTodo = (todo) => setTodos(todos.filter((t) => t.id !== todo.id));
  const deleteTodo = id => setTodos(todos.filter(todo => todo.id !== id));

  const handleEditClick = (todo) => {
    setOpen(true);
    setIsEditMode(true);
    setEditTodo(todo);
  }

  // Mark todo as done
  const handleMarkDone = (todo) => {
    const newTodos = [...todos];
    const t = newTodos.find(t => t.id === todo.id);
    t.done = !t.done;
    setTodos(newTodos);
  }

  // Edit functionality
  // const handleEdit = id => {
  //   setTodos(todos.filter(todo => todo.id !== id));
  //   const selectedTodo = todos.find(todo => todo.id === id);
  //   console.log(selectedTodo);
  //   setTodos({
  //     todos: selectedTodo,
  //     todos: id,
  //     editTodo: true
  //   })
  // }

  // const editTodo = (e) => {
  //   e.preventDefault();

  //   setTodos(todos.map(todo => {
  //     if(todo.id === e.id) {
  //       return {
  //         ...todo, 
  //         summary: todo.summary === "Done" ? "Pending" : "Done"
  //       }
  //     }
  //     else {
  //       return todo
  //     }
  //   }))
  // }

  // const editTodo = (todoEvent) => {
  //   setEditing(true)
  //   setTodos({
  //     id: todoEvent.id,
  //     summary: todoEvent.summary
  //   })
  // }

  // const updateTodo = (id, updatedTodo) => {
  //   setEditing(false)
  //   console.log(id, 'iddd')
  //   setTodos(todos.map(todo => (todo.id === id ? updatedTodo: todo)))
  // }



  const classes = useStyles();

  const [priority, setPriority] = useState("Normal");

  const handleChange = (event) => {
    setPriority(event.target.value);
  };

  // let id;
  // if(summary.length === 0) {
  //   id = 0;
  // }
  // else {
  //   id = summary[summary.length - 1].id + 1;
  // }

  // increament id based on todos
  // let id;
  // if(todos.length === 0) {
  //   id = 0;
  // }
  // else {
  //   id = todos[todos.length - 1].id + 1;
  // }

  // for unique id install npm install uuid -> then import and use like -> id: uuid();

  function rand() {
    return Math.round(Math.random() * 20) - 10;
  }

  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  

  // const [selectedDate, setSelectedDate] = useState(new Date('2021-04-18T21:11:54'));
  const [selectedDate, setSelectedDate] = useState(null);
  

  const [modalStyle, setModalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    // changes on setIsEditMode.
    setIsEditMode(false);
  };

  // const handleDateChange = (date) => {
  //   setSelectedDate(date);
  // };

  const addSummary = (event) => {
    event.preventDefault();
    
    if(!isEditMode){ 
    setTodos([...todos, {id: uuid(), summary: summary, desc: desc, myPriority : myPriority, createdOn: createdOn, dueBy: dueBy}])
    }else{
      const newTodos = [...todos];
      //find() method returns the value of the first element in an array that pass a test
      const t = newTodos.find(t => t.id === editTodo.id);

      t.summary = summary;
      t.desc = desc;
      t.myPriority = myPriority;
      t.dueBy = dueBy;
      setIsEditMode(false)
      setEditTodo({})
      setTodos(newTodos);
    }

    setOpen(false)
    
    setSummary('')
    setDesc('')
    setMyPriority('')
    // setSelectedDate('')
    // setCreatedOn('')
    // setDueBy('')
    
  }

  const body = (
    <div className="todo__modal">
      <div style={modalStyle} className={classes.paper}>
        <h2 className="todo__addTask">{isEditMode? 'Edit': 'Add'} Task</h2>
        <hr />
        
        <form className="todo__form">

        <label className="modalText__style some__spacing">Summary</label>
        <input type="text" placeholder="Summary" value={summary} onChange={event => setSummary(event.target.value)} />

        <label className="modalText__style desc__space">Description</label>
        <textarea type="text" placeholder="Description" value={desc} onChange={event => setDesc(event.target.value)} />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        {/* <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Due Date"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        /> */}

        {/* react-datepicker isClearable */}
        {/* filterDate={date => date.getDay() != 6 && date.getDay() != 0} */}

          {/* <label>Due Date</label> */}
        <div className="app__datePriority">
          {/* <TextField type="date" value={dueBy} onChange={event => setDueBy(event.target.value)}>
          </TextField> */}

        {/* <FormControl>
        <label>Due Date</label>
        <DatePicker selected={selectedDate} onChange={date => setSelectedDate(date)} dateFormat='MM/dd/yyyy' minDate={new Date()} isClearable  />
        </FormControl> */}

        <FormControl>
        <label className="datePriority__spacing">Due Date</label>
        {/* <DatePicker value={dueBy} onChange={event => setDueBy(event.target.value)} isClearable  /> */}

        <TextField variant="outlined"  type="date" value={dueBy} onChange={event => setDueBy(event.target.value)} />
        </FormControl>

        {/* scrollableMonthYearDropdown showYearDropdown */}

        {/* date DueBy under construction */}

        {/* <FormControl className={classes.formControl}>
          <InputLabel>Priority</InputLabel>
          <Select value={priority} onChange={handleChange}>
            <MenuItem value={"low"}>Low</MenuItem>
            <MenuItem value={"normal"}>Normal</MenuItem>
            <MenuItem value={"high"}>High</MenuItem>
            <MenuItem value={"immediate"}>Immediate</MenuItem>
          </Select>
        </FormControl> */}

        <FormControl className="priority__select">
          {/* <InputLabel id="priority">Priority</InputLabel> */}
          <label className="datePriority__spacing">Priority</label>
          <select className="app__selectModal"  value={myPriority} onChange={event => setMyPriority(event.target.value)}>
            <option value="none">None</option>
            <option value="low">Low</option>
            <option value="normal">Normal</option>
            <option value="high">High</option>
          </select>
        </FormControl>

        </div>

        <hr />

        {/* <AddCircleIcon color="primary" style={{ fontSize: 30 }} />} */}

        {/* ------------------------------------ */}

        <div className="todo__button">
        <Button style={{backgroundColor: "green", color: "white", marginLeft: "10px", marginTop: "10px", textTransform: "capitalize"}} type="submit" onClick={
          (e) => {e.preventDefault(); setOpen(false); props.d_addTodo({id:uuid(), summary: summary, desc: desc, myPriority : myPriority, createdOn: createdOn, dueBy: dueBy })} } >

          {isEditMode ? 'Save' : 'Add'}
        </Button>
        {/* ->> dispatch(addTodo(summary)) <<- >>props.d_addTodo(summary)<< testing dispatch */}
        {/* old todos ->>> onClick={addSummary} */}
        {/* Redux addTodo -----------------changes*/}

        <Button style={{backgroundColor: "gray", color: "white", marginTop: "10px", textTransform: "capitalize"}} onClick={handleClose}>
          {/* <CancelIcon color="error" style={{ fontSize: 30 }} /> */}
          Cancel
        </Button>

        </div>
        </MuiPickersUtilsProvider>
        </form>
      </div>
    </div>
  );


  return (
    <div className="app">
      {/* top section */}
      <div className="app__top">
        <h1>ToDo App</h1>
        {/* props changes... */}
        {/* <Todo /> */}
        {/* Todo return data here... */}

        <div className="todo">

      {/* When user click add data into the table using props */}
      <Button type="button" onClick={handleOpen}>
        <AddCircleIcon color="primary" style={{ fontSize: 50 }} />
      </Button>
      <Modal open={open} onClose={handleClose}>
        {body}
      </Modal>


    </div>
    {/* todo return till here... */}
      
      </div>

      {/* middle section */}
      {/* <div className="app__middle"> */}


        <FormControl className={classes.formControl}>
          {/* <InputLabel variant="outlined">Group By</InputLabel> */}

          {/* <label>Group By</label> */}
          {/* <Select value={priority} onChange={handleChange}> */}

          {/* onClick={() => handlePriorityClick(todos.myPriority)} */}
          {/* <Select variant="standard" onClick={() => handleSortPriority()}>
            <MenuItem value={"low"}>Priority</MenuItem> */}
            {/* <MenuItem value={"normal"}>Normal</MenuItem> */}
            {/* <MenuItem value={"high"}>High</MenuItem> */}

          {/* </Select> */}


          {/* <label className="datePriority__spacing">Group By</label>
          <select className="app__select" >
            <option value="priority">Priority</option>
            <option value="low">Low</option>
            <option value="normal">Normal</option>
            <option value="high">High</option>
          </select> */}
          {/* Note above code from label for select group*/}
          
        </FormControl>


        {/* <div className="app__searchIcon"> */}
          <FormControl>
            {/* <label>Search</label> */}
          {/* <SearchIcon /> */}
            {/* <InputLabel>Search</InputLabel> */}

            {/* note below */}

            {/* <TextField variant="outlined" type="search" placeholder="Search Tasks" style={{width:"100%"}} /> */}

            {/* note above and for label go above*/}


            {/* <label className="datePriority__spacing">Search</label>
            <input className="app__inputSearch" type="search" placeholder="Search Tasks" /> */}
          </FormControl>

        {/* </div> */}


      {/* </div> */}


      <div className="app__redesignGroupAndSearch">

        {/* <div className="app__groupBy">
            
            <div className="group__by">
            <label>Group By</label>

            </div>
            
          <form>
            <select className="app__select" >
              <option value="priority">Priority</option>
              <option value="low">Low</option>
              <option value="normal">Normal</option>
              <option value="high">High</option>
            </select>
          </form>
        </div> */}

        <div className="app__searchDesign">

          <div className="datePriority__spacing">
            <label>Search</label>

          </div>
          
          <div className="form__search">
          <form>
            {/* <TextField variant="outlined" type="search" placeholder="Search Tasks" style={{width:"100%"}} /> */}
            <input onChange={(event) => handleSearch(event)} type="search" placeholder="Search Task" style={{padding:"10px", width:"100%"}} />
          </form>

          </div>
        </div>
      </div>

      {/* <input type="text" class="st-default-search-input" style="width: 300px; height: 150px" />
 */}


      {/* <Button onClick={() => handleSortPosts(props.data)} style={{backgroundColor:"whitesmoke", padding:"5px", textTransform:"capitalize"}}>Sort <i style={{backgroundColor:"blue", color:"white", padding:"5px 9px", borderRadius:"4px"}} className="fa fa-sort"></i></Button> */}




      {/* status section */}
      <div className="app__status">
            {/* <table>
            {
              todos.map(todo => (
                <TableData todo={todo} />
                // <li>{todo}</li>
              ))
            }
            </table> */}
            {/* <TableTodo /> */}
            
            {/* passes data through props into TableDatacomponent */}

            {priorityFilter === ''? null: priorityFilter}
              {/* {props.todoss.map((item) => {
                
              })} */}

              {/* <TableData todos={todos} deleteTodo={deleteTodo} handleEditClick={handleEditClick} handleMarkDone={handleMarkDone} handleSort={handleSort} handleSortPriority={handleSortPriority} 
              posts={posts} postData={postData} submitPostHandler={submitPostHandler} 
              goToNextPage={goToNextPage}
              getPaginatedData={getPaginatedData}
              getPaginationGroup={getPaginationGroup}
              changePage={changePage}
              currentPage={currentPage}
               /> */}

               <div className="app__tableData">
               <table className="styled__table">
                <thead>
                  <tr>
                  <th className="bt-none">Profile</th>
                    <th onClick={() => handleSortPosts(props.data)} className="bt-none"><span>Name <i style={{backgroundColor:"blue", color:"white", padding:"5px 9px", borderRadius:"4px"}} className="fa fa-sort"></i></span></th>
                    <th className="bt-none">Email</th>
                    
                    {/* <th>phone</th> */}
                  </tr>
                </thead>
                <tbody>
                  {!students.length && !isLoadingStudents && (
                    <tr className="text-center">
                      <td colSpan={3}>No students</td>
                    </tr>
                  )}
                  {isLoadingStudents && (
                    <tr className="text-center">
                      <td colSpan={3}>
                        <span>Loading...</span>
                      </td>
                    </tr>
                  )}
                  {!isLoadingStudents &&
                    students.map((student, index) => {
                      return (
                        <tr key={index}>
                          <td><img src={student.picture} alt=""/></td>
                          <td>{student.title}. {student.firstName}</td>
                           <td>{student.email}</td>
                          {/* <td>{student.}</td> */}
                          
                          {/* <td>{student.}</td> */}
                          
                          {/* <td>{student.phone}</td> */}
                        </tr>
                      );
                    })}
                </tbody>
              </table>
               </div>


               <div>
                 {/* {posts.length > 0 ? (
                   <>
                   
                     <Pagination
                     data={posts}
                     RenderComponent={TableData}
                     title="Posts"
                     pageLimit={5}
                     dataLimit={10}
                     />
                     
                   </>
                 ) : (
                   <h1>No posts to display</h1>
                 )} */}

                <Pagination
                apiRoute={`/user`}
                recordsPerPage={recordsPerPage}
                responseData={setStudents}
                isLoadingData={setLoadingStudents}
                reloadApi={reload}
                search={search}
                isSearchingData={setSearchingStudents}
              />

               </div>


               

               {/* show posts ,10 pposts at a time */}
                {/* <div className="dataContainer">
                  {getPaginatedData().map((d, idx) => (
                    <TableData key={idx} posts={d} />
                  ))}
                </div> */}

                <div className="pagination">
                  {/* previous button */}
                  {/* <button
                    onClick={goToPreviousPage}
                    className={`prev ${currentPage === 1 ? 'disabled' : ''}`}
                  >
                    prev
                  </button> */}

                  {/* show page number */}
                  {/* {getPaginationGroup().map((item, index) => (
                    <button
                      key={index}
                      onClick={changePage}
                      className={`paginationItem ${currentPage === item ? 'active' : null}`}
                    >
                      <span>{item}</span>
                    </button>
                  ))} */}

                  {/* next button */}
                  {/* <button
                    onClick={goToNextPage}
                    className={`next ${currentPage === pages ? 'disabled': ''}`}
                  >
                    next
                  </button> */}
                </div>


                  {/* delete from todos using id */}
                  


            {/* {console.log(todos)} */}
            {/* {console.log(myPriority)} */}
            {/* {console.log(selectedDate)} */}
            {/* {console.log(postData)} */}
            {/* {console.log(response)} */}
            
            {/* redux */}
           {/* <ul> {
              props.todoss.map((item) => {
                // return console.log('Mapitems',item)

                 <li key={item.id}>{item}</li>

                // <TableData item={item} />
              })}
            </ul> */}
            {/* redux */}

      </div>

      {/* api fetching form for post */}

      <div className="try__postMethod">
        {/* <form>
          <div>
            <input type="text" value={userId} onChange={event => setUserId(event.target.value)} />
          </div>
          <div>
            <input type="text" value={title} onChange={event => setTitle(event.target.value)} />
          </div>
          <div>
            <input type="text" value={bodyData} onChange={event => setBodyData(event.target.value)} />
          </div>
          <button type="button" onClick={submitPostHandler}>Submit</button>
        </form> */}

        {/* <ul>
          {props.todoss.map(mytodo => {
            <li key={mytodo.id}>{console.log('iterate map', mytodo)}</li>
          })}
        </ul> */}

      </div>


    </div>
  );
}

// redux...
const mapStateToProps = state => {
  console.log('coming mapToSateProps',state.mytodo.todoss);
  return {
    todoss: state.mytodo.todoss,
    // todoss: state.todoss,
  } 
}

const mapDispatchToProps = (dispatch) => {
  return {
    d_addTodo: (data) => dispatch(addTodo(data)),
    // d_deleteTodo: (data) => dispatch(deleteTodo(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (App);



// ->> For toggle button use Fontawesome icon <i class="fas fa-sort"></i>
