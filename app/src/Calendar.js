import React from 'react';
import axios from 'axios';
//import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';


import './css/Calendar.css';
import { NavLink } from 'react-router-dom';

class CalendarHeader extends React.Component {
  render() {
    const leftArrow = <FontAwesomeIcon icon={faArrowCircleLeft} size="1x" />;
    const rightArrow = <FontAwesomeIcon icon={faArrowCircleRight} size="1x" />;
    let path = this.props.path;
    let size;
    if (window.innerWidth < 580) {
      size = 40;
    } else if (window.innerWidth < 1100) {
      size = 70;
    } else {
      size = 90;
    }
    return (
      <div className='ui-header'>
        <NavLink className='icon-block' to='/'>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8.5 8.5" width={size} height={size}>
              <g fill="#e6e6e6">
                <path d="m 2.1166667,2.1166667 c -0.1465791,0 -0.2645833,0.1180043 -0.2645833,0.2645833 V 4.7625 5.0270833 5.2916667 h 0.2645833 1.984375 V 4.7625 H 2.3812501 V 2.6458334 H 5.55625 v 1.0474811 0.1431439 h 0.5291667 v -0.396875 -1.179773 c 0,-0.079397 -0.063747,-0.1431437 -0.1431438,-0.1431437 H 5.8208333 Z M 4.365625,3.96875 c -0.07329,0 -0.1322916,0.059002 -0.1322916,0.1322917 v 0.5291666 c 0,0.07329 0.059001,0.1322917 0.1322916,0.1322917 h 2.6458333 c 0.07329,0 0.1322917,-0.059001 0.1322917,-0.1322917 V 4.1010417 C 7.14375,4.0277517 7.084748,3.96875 7.0114583,3.96875 Z M 4.6245241,4.2333334 H 5.297351 c 0.070256,0 0.1266073,0.056352 0.1266073,0.1266073 v 0.011369 c 0,0.070256 -0.056352,0.1266074 -0.1266073,0.1266074 H 4.6245241 c -0.070256,0 -0.1266074,-0.056352 -0.1266074,-0.1266074 v -0.011369 c 0,-0.070256 0.056352,-0.1266073 0.1266074,-0.1266073 z m 1.7223753,0 a 0.13229165,0.13229165 0 0 1 0.0031,0 A 0.13229165,0.13229165 0 0 1 6.4822917,4.365625 0.13229165,0.13229165 0 0 1 6.35,4.4979167 0.13229165,0.13229165 0 0 1 6.2177083,4.365625 0.13229165,0.13229165 0 0 1 6.3468994,4.2333334 Z m 0.3968749,0 a 0.13229165,0.13229165 0 0 1 0.0031,0 A 0.13229165,0.13229165 0 0 1 6.8791667,4.365625 0.13229165,0.13229165 0 0 1 6.746875,4.4979167 0.13229165,0.13229165 0 0 1 6.6145833,4.365625 0.13229165,0.13229165 0 0 1 6.7437743,4.2333334 Z M 4.365625,4.8947917 c -0.07329,0 -0.1322916,0.059001 -0.1322916,0.1322916 V 5.55625 c 0,0.07329 0.059001,0.1322917 0.1322916,0.1322917 h 2.6458333 c 0.07329,0 0.1322917,-0.059002 0.1322917,-0.1322917 V 5.0270833 c 0,-0.07329 -0.059002,-0.1322916 -0.1322917,-0.1322916 z M 4.6245241,5.159375 H 5.297351 c 0.070256,0 0.1266073,0.056351 0.1266073,0.1266074 v 0.011369 c 0,0.070256 -0.056351,0.1266073 -0.1266073,0.1266073 H 4.6245241 c -0.070256,0 -0.1266074,-0.056352 -0.1266074,-0.1266073 v -0.011369 c 0,-0.070256 0.056351,-0.1266074 0.1266074,-0.1266074 z m 1.7223753,0 a 0.13229165,0.13229165 0 0 1 0.0031,0 A 0.13229165,0.13229165 0 0 1 6.4822917,5.2916667 0.13229165,0.13229165 0 0 1 6.35,5.4239583 0.13229165,0.13229165 0 0 1 6.2177083,5.2916667 0.13229165,0.13229165 0 0 1 6.3468994,5.159375 Z m 0.3968749,0 a 0.13229165,0.13229165 0 0 1 0.0031,0 A 0.13229165,0.13229165 0 0 1 6.8791667,5.2916667 0.13229165,0.13229165 0 0 1 6.746875,5.4239583 0.13229165,0.13229165 0 0 1 6.6145833,5.2916667 0.13229165,0.13229165 0 0 1 6.7437743,5.159375 Z M 1.4552084,5.55625 c -0.07329,0 -0.1322917,0.059002 -0.1322917,0.1322917 V 5.8208333 5.953125 6.0854167 C 1.3229167,6.2319958 1.4409209,6.35 1.5875001,6.35 H 4.1010417 V 5.8208333 h -0.79375 C 3.2340017,5.8208333 3.175,5.7618313 3.175,5.6885417 V 5.55625 H 1.5875001 Z M 4.365625,5.8208333 c -0.07329,0 -0.1322916,0.059002 -0.1322916,0.1322917 v 0.5291667 c 0,0.073289 0.059001,0.1322916 0.1322916,0.1322916 h 2.6458333 c 0.07329,0 0.1322917,-0.059001 0.1322917,-0.1322916 V 5.953125 c 0,-0.07329 -0.059003,-0.1322917 -0.1322917,-0.1322917 z M 4.6245241,6.0854167 H 5.297351 c 0.070256,0 0.1266073,0.056352 0.1266073,0.1266073 v 0.011369 c 0,0.070256 -0.056351,0.1266074 -0.1266073,0.1266074 H 4.6245241 c -0.070256,0 -0.1266074,-0.056351 -0.1266074,-0.1266074 V 6.212024 c 0,-0.070256 0.056351,-0.1266073 0.1266074,-0.1266073 z m 1.7223753,0 a 0.13229165,0.13229165 0 0 1 0.0031,0 A 0.13229165,0.13229165 0 0 1 6.4822917,6.2177083 0.13229165,0.13229165 0 0 1 6.35,6.35 0.13229165,0.13229165 0 0 1 6.2177083,6.2177083 0.13229165,0.13229165 0 0 1 6.3468994,6.0854167 Z m 0.3968749,0 a 0.13229165,0.13229165 0 0 1 0.0031,0 A 0.13229165,0.13229165 0 0 1 6.8791667,6.2177083 0.13229165,0.13229165 0 0 1 6.746875,6.35 0.13229165,0.13229165 0 0 1 6.6145833,6.2177083 0.13229165,0.13229165 0 0 1 6.7437743,6.0854167 Z" transform="scale(1)" className="undefined"/>
              </g>
            </svg>
          </div>
          <div className='connection-circle'></div>
          <div className='connection-line'></div>
          <div className='connection-circle'></div>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8.5 8.5" width={size} height={size}>
              <g fill="#e6e6e6">
                <path d="m 2.1166667,2.1166667 c -0.080872,0 -0.145977,0.064902 -0.145977,0.1455208 v 0.7276042 c 0,0.080619 0.065106,0.1455208 0.145977,0.1455208 h 3.6494252 c 0.080872,0 0.145977,-0.064902 0.145977,-0.1455208 V 2.2621875 c 0,-0.080619 -0.065106,-0.1455208 -0.145977,-0.1455208 z m 2.8556752,0.3643705 a 0.14597699,0.14552081 0 0 1 0.00342,0 A 0.14597699,0.14552081 0 0 1 5.1217403,2.626558 0.14597699,0.14552081 0 0 1 4.9757633,2.7720789 0.14597699,0.14552081 0 0 1 4.8297863,2.626558 0.14597699,0.14552081 0 0 1 4.9723419,2.4810372 Z m 0.4858296,0 a 0.14597699,0.14552081 0 0 1 0.00399,0 A 0.14597699,0.14552081 0 0 1 5.6081401,2.626558 0.14597699,0.14552081 0 0 1 5.4621631,2.7720789 0.14597699,0.14552081 0 0 1 5.3161861,2.626558 0.14597699,0.14552081 0 0 1 5.4581715,2.4810372 Z m -3.1225393,0.072192 h 1.3137931 c 0.040436,0 0.072989,0.032451 0.072989,0.07276 0,0.04031 -0.032553,0.07276 -0.072989,0.07276 H 2.3356322 c -0.040436,0 -0.072989,-0.032451 -0.072989,-0.07276 0,-0.04031 0.032553,-0.07276 0.072989,-0.07276 z M 2.1166667,3.2808334 c -0.080872,0 -0.145977,0.064902 -0.145977,0.1455208 v 0.7276041 c 0,0.080619 0.065106,0.1455209 0.145977,0.1455209 H 4.0143678 V 3.6031393 c 0,-0.097818 0.079215,-0.1767851 0.1773393,-0.1767851 h 1.7203618 c 0,-0.080619 -0.065106,-0.1455208 -0.145977,-0.1455208 z M 4.3376841,3.571875 c -0.098124,0 -0.1773393,0.078968 -0.1773393,0.1767851 v 2.5568464 c 0,0.097818 0.079216,0.1767851 0.1773393,0.1767851 h 1.8349765 c 0.098124,0 0.1773393,-0.078968 0.1773393,-0.1767851 V 4.5905208 h -0.729885 c -0.1617434,0 -0.291954,-0.1126485 -0.291954,-0.2523878 V 3.571875 Z m 1.2824308,0 v 0.7276042 h 0.729885 V 4.1658957 L 5.7370106,3.571875 Z M 2.3356322,3.7173958 h 1.3137931 c 0.040436,0 0.072989,0.032451 0.072989,0.072761 0,0.040309 -0.032553,0.07276 -0.072989,0.07276 H 2.3356322 c -0.040436,0 -0.072989,-0.032451 -0.072989,-0.07276 0,-0.04031 0.032553,-0.072761 0.072989,-0.072761 z M 2.1411863,4.445 c -0.094349,0 -0.1704966,0.07591 -0.1704966,0.1699637 v 0.6787184 c 0,0.094054 0.076148,0.1699637 0.1704966,0.1699637 H 4.0143678 V 4.445 Z m 0.1944459,0.4365625 h 1.3137931 c 0.040436,0 0.072989,0.032451 0.072989,0.07276 0,0.04031 -0.032553,0.07276 -0.072989,0.07276 H 2.3356322 c -0.040436,0 -0.072989,-0.032451 -0.072989,-0.07276 0,-0.04031 0.032553,-0.07276 0.072989,-0.07276 z" transform="scale(1)" className="undefined"/>
              </g>
            </svg>
          </div>
        </NavLink>
        <div className='month-navbar'>
          <button
            className='month-arrow'
            onClick={(e) => this.props.onClick('prev')}
          >
            {leftArrow}
          </button>
          <div className='month'>
            {this.props.month}
          </div>
          <button
            className='month-arrow'
            onClick={(e) => this.props.onClick('next')}
          >
            {rightArrow}
          </button>
        </div>
      </div>
    )
  }
}

class PopUp extends React.Component {
  handleFocus(e) {
    e.target.select();
  }

  render() {
    const monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    if (this.props.contents == null){
      return null;
    } else if (this.props.contents[0] === 'add') {
      return (
        <form className='popup' onSubmit={(e) => this.props.onSubmit(this.props.contents[1], e)}>
          <div className='event-popup'>
            <div className='popup-title'>
              Enter New Event Name:
            </div>
            <input type='text' name='eventName' placeholder='New-Event-Name' autoComplete='off' className='event-input'/>
            <div className='day-buttons'>
              <button type='submit'>
                Add
              </button>
              <button onClick={(e) => this.props.onClick('cancel', this.props.contents[1], e)}>
                Cancel
              </button>
            </div>
          </div>
        </form>
      )
    } else if (this.props.contents[1].length === 0) {
      let day = this.props.contents[1];
      let dayMonth = monthList[parseInt(day.day.slice(0,2),10)];
      let dayNum = day.day.slice(2,4);
      let dayYear = day.day.slice(4,8);
      let dayName = dayNames[new Date(parseInt(dayYear), parseInt(day.day.slice(0,2), 10), parseInt(dayNum, 10)).getDay()];
      return (
        <form className='popup'>
          <div className='day-popup'>
            <div className='popup-title'>
              {dayName + ", " + dayMonth + " " + dayNum}
            </div>
            <div className='popup-events-empty'>
              <p>No Events</p>
            </div>
            <div className='day-buttons'>
              <button onClick={(e) => this.props.onClick('add', this.props.contents[1], e)}>
                Add Event
              </button>
              <button onClick={(e) => this.props.onClick('close', this.props.contents[1], e)}>
                Close
              </button>
            </div>
          </div>
        </form>
      )
    } else {
      let day = this.props.contents[1];
      let dayMonth = monthList[parseInt(day.day.slice(0,2),10)];
      let dayNum = day.day.slice(2,4);
      let dayYear = day.day.slice(4,8);
      let dayName = dayNames[new Date(parseInt(dayYear), parseInt(day.day.slice(0,2), 10), parseInt(dayNum, 10)).getDay()];
      let eventList = day.events.map((event) => {
        return (
          <div
            key={event.eName}
          >
            {event.eName}
          </div>
        )
      })
      return (
        <form className='popup'>
          <div className='day-popup'>
            <div className='popup-title'>
              {dayName + ", " + dayMonth + " " + dayNum}
            </div>
            <div className='popup-events'>
              <div className='popup-event-list'>
                {eventList}
              </div>
            </div>
            <div className='day-buttons'>
              <button onClick={(e) => this.props.onClick('add', this.props.contents[1], e)}>
                Add Event
              </button>
              <button onClick={(e) => this.props.onClick('close', this.props.contents[1], e)}>
                Close
              </button>
            </div>
          </div>
        </form>
      )
    }
  }
}

class Calendar extends React.Component {
  /* Calendar component constructor */
  constructor(props) {
    super(props);
    this.handleAddEvent = this.handleAddEvent.bind(this);
    this.handleArrowClick = this.handleArrowClick.bind(this);
    this.handlePopupButtonClick = this.handlePopupButtonClick.bind(this);
    this.state = {
      month: "",
      events: [],
      popup: null,
    }
  }

  /* When the component mounts, get the drives from the server */
  componentDidMount() {
    // Get todays date in order to get data for the current month
    let today = new Date();
    // Define drives in case an error occurs
    let monthEvents;
    // Get drives on remote server
    axios.get('http://192.168.1.100:4000/getMonth', {
      params: {
        month: String(today.getMonth()).padStart(2, '0'),
        year: today.getFullYear(),
      }
    }).then(res => {
      monthEvents = res.data;
      this.setState({
        month: String(today.getMonth()).padStart(2, '0') + today.getFullYear(),
        events: monthEvents,
      });
    }).catch(error => {
      console.log("Calendar.componentDidMount Error: " + error);
    });
  }

  handleAddEvent(day, e) {
    e.preventDefault();
    console.log(e.target.eventName.value);
    console.log(day);
    /*let month = day.day.slice(0,2);
    let dayNum = day.day.slice(2,4);
    let year = day.day.slice(4,8);*/
    axios.post('http://192.168.1.100:4000/insertEvent', {
        name: e.target.eventName.value,
        date: day.day
    }).then(res => {
      let insertConfirmation = res.data;
      console.log(insertConfirmation);
      this.setState({
        popup: ['display', day]
      });
      /*if (typeof insertConfirmation !== "string") {
        this.setState({
          popup: ["Success", "Successfully added event!"],
        });
      } else {
        console.log("FAILED TO MAKE FOLDER");
        this.setState({
          popup: files,
        });
      }*/
    }).catch(error => {
      console.log("Calendar.handleAddEvent Error: " + error);
      this.setState({
        popup: ['display', day]
      });
    });
  }

  handleArrowClick(direction) {
    let month = parseInt(this.state.month.slice(0, 2), 10);
    let year = parseInt(this.state.month.slice(2));
    if (direction === 'prev') {
      month = month - 1;
      if (month < 0) {
        month = (month + 12) % 12;
        year = year - 1;
      }
    } else if (direction === 'next') {
      month = month + 1;
      if (month > 11) {
        month = month % 12;
        year = year + 1; 
      }
    } else {
      console.log("arrowClickErr: An unexpected error occured.")
      return;
    }

    let monthEvents;
    axios.get('http://192.168.1.100:4000/getMonth', {
      params: {
        month: String(month).padStart(2, '0'),
        year: year,
      }
    }).then(res => {
      monthEvents = res.data;
      this.setState({
        month: String(month).padStart(2, '0') + year,
        events: monthEvents,
      });
    }).catch(error => {
      console.log("Calendar.arrowClick Error: " + error);
    });
  }

  handleDayClick(day) {
    this.setState({
      popup: ['display', day]
    });
  }

  handlePopupButtonClick(action, day, e) {
    e.preventDefault();
    if (action === 'add') {
      this.setState({
        popup: ['add', day],
      });
    } else if (action === 'cancel') {
      this.setState({
        popup: ['display', day],
      });
    } else {
      this.setState({
        popup: null,
      });
    }
  }

  /* Gets the number of days in month by getting the '0th' day of the next month,
     which is the last day of the input month. */
  getDaysInMonth(month, year) {
    return new Date(year, month+1, 0).getDate();
  }

  renderEvents(events) {
    if (events.length > 1) {
      return (
        <div className='day-events'>
          {events.length + " events"}
        </div>
      )
    } else {
      let eventList = events.map((e) => {
        return (
          <div
            className='day-events'
            key={e.eName}
          >
            {e.eName}
          </div>
        )
      })
      return eventList;
    }
  }

  renderWeeks() {
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let month = parseInt(this.state.month.slice(0,2), 10);
    let year = this.state.month.slice(2);
    let events = this.state.events;
    
    // Calculate the number of days in the month
    let numDaysInMonth = this.getDaysInMonth(month, year);
    // Calculate the number of 'blank' day spots in the first week
    // by getting the index of the weekday of the first day of the month, and subtracting 1
    let startingBlanks = new Date(year, month, 1).getDay();
    // Calculate the number of 'blank' day spots in the last week
    let endingBlanks = 7 - ((startingBlanks + numDaysInMonth) % 7);
    
    // Iterable to create each week
    let i;
    // Create all the days, without events
    let days = [];
    for (i = 0; i < numDaysInMonth; i ++) {
      let dayString = this.state.month.slice(0,2) + String(i+1).padStart(2, '0') + this.state.month.slice(2);
      days.push({day: dayString, display: "", events: []})
    }
    // Iterate through the events, and add them to the days
    for (i = 0; i < events.length; i ++) {
      let dayNum = parseInt(events[i].eDate.slice(2,4), 10);
      days[dayNum-1].events.push(events[i]);
    }
    // Iterate through the days, and set the display based on the events
    for (i = 0; i < days.length; i ++) {
      let numEvents = days[i].events.length;
      if (numEvents === 0) {
        days[i].display = "";
      } else if (numEvents > 2) {
        days[i].display = numEvents + " events";
      } else {
        let e;
        for (e = 0; e < days[i].events.length; e ++) {
          days[i].display += days[i].events[e].eName;
          days[i].display += "\n";
        }
      }
    }
    // Prepend 'blank' days for first week
    for (i = 0; i < startingBlanks; i ++) {
      days.unshift({day: "", events: []});
    }
    // Append 'blank' days for the last week
    for (i = 0; i < endingBlanks; i ++) {
      days.push({day: "", events: []});
    }

    let index = 0;
    const dayButtons = days.map((day) => {
      index ++; 
      return (
        <button
          className={`${day.day === '' ? 'day-blank' : 'day'}`}
          key={index}
          onClick={() => this.handleDayClick(day)}
        >
          <div className='day-num'>
            {day.day.slice(2,4)}
          </div>
          {this.renderEvents(day.events)}
        </button>
      )
    });
    return (
      <div className='calendar-panel'>
        <div className='day-names'>Sunday</div>
        <div className='day-names'>Monday</div>
        <div className='day-names'>Tuesday</div>
        <div className='day-names'>Wednesday</div>
        <div className='day-names'>Thursday</div>
        <div className='day-names'>Friday</div>
        <div className='day-names'>Saturday</div>
        {dayButtons}
      </div>
    )
  }

  /* Overall render method */
  render() {
    const monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let month = monthList[parseInt(this.state.month.slice(0,2), 10)];
    return (
      <div className='ui'>
        <CalendarHeader
          month={month}
          onClick={this.handleArrowClick}
        />
        <PopUp
          contents={this.state.popup}
          onSubmit={this.handleAddEvent}
          onClick={this.handlePopupButtonClick}
        />
        {this.renderWeeks()}
      </div>
    )
  }
}

export default Calendar;
