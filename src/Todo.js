import { Button, makeStyles, Modal } from "@material-ui/core";
import React, { useState } from "react";
import "./Todo.css";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import {
  MuiPickersUtilsProvider,
  // KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import CancelIcon from '@material-ui/icons/Cancel';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

function Todo(props) {

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

  const useStyles = makeStyles((theme) => ({
    paper: {
      position: "absolute",
      width: 500,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid whitesmoke",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

  const classes = useStyles();

  // const [selectedDate, setSelectedDate] = useState(new Date('2021-04-18T21:11:54'));
  const [selectedDate, setSelectedDate] = useState(null);

  const [modalStyle, setModalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const handleDateChange = (date) => {
  //   setSelectedDate(date);
  // };

  const handleSummaryInput = (event) => {
    event.preventDefault();
    
    
  }

  const body = (
    <div className="todo__modal">
      <div style={modalStyle} className={classes.paper}>
        <h2 className="todo__addTask">Add Task</h2>
        
        <form className="todo__form">

        <input type="text" placeholder="Summary" />
        <textarea type="text" placeholder="Description" />
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

        {/* react-datepicker */}
        {/* filterDate={date => date.getDay() != 6 && date.getDay() != 0} */}
        <label>Due Date</label>
        <DatePicker selected={selectedDate} onChange={date => setSelectedDate(date)} dateFormat='dd/MM/yyyy' minDate={new Date()} isClearable showYearDropdown scrollableMonthYearDropdown />

        <div className="todo__button">
        <Button type="submit" onClick={handleSummaryInput} >
          <AddCircleIcon color="primary" style={{ fontSize: 30 }} />
        </Button>
        <Button onClick={handleClose}>
          <CancelIcon color="error" style={{ fontSize: 30 }} />
        </Button>

        </div>
        </MuiPickersUtilsProvider>
        </form>
      </div>
    </div>
  );

  return (
    <div className="todo">

      {/* When user click add data into the table using props */}
      <Button type="button" onClick={handleOpen}>
        <AddCircleIcon color="primary" style={{ fontSize: 30 }} />
      </Button>
      <Modal open={open} onClose={handleClose}>
        {body}
      </Modal>
    </div>
  );
}

export default Todo;
