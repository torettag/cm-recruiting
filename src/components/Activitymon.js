import React from 'react'
// import { Link } from 'react-router'
import { connect } from 'react-redux'
import epi from '../services/epi'
import '../styles/Activitymon.css';


class Activitymon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.epi = new epi();
  }

  componentDidMount () {

  }

  render () {
    return (
      <div id='activitymon' className='view-container'>
        <section className=''>
          <div className='flex-col'>
            <p>ACTIVITY MONITOR</p>
          </div>
        </section>

      </div>
    )
  }
}

function mapStateToProps(state){
  return {

  }
}

export default connect(mapStateToProps)(Activitymon)







