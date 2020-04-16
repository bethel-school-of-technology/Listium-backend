import React, { Component } from 'react';

class Events extends Component {
  constructor() {
    super();
    this.state = {
      events: []
    };
  }

  componentDidMount() {
    fetch('/api/events')
      .then(res => res.json())
      .then(events => this.setState({events}, () => console.log('Events fetched...', events)));
  }

  render() {
    return (
      <div>
        <h2>Events</h2>
        <ul>
        {this.state.events.map(event => 
          <li key={event.id}>{event.eventName} {event.eventCategory}{event.eventDate}</li>
        )}
        </ul>
      </div>
    );
  }
}

export default Events;
