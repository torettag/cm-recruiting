import React from 'react'
// import { Link } from 'react-router'
import { connect } from 'react-redux'
import ga from 'react-ga'
import epi from '../services/epi'
import '../styles/Welcomestatus.css';


class Welcomestatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.epi = new epi();
  }

  componentDidMount () {
    ga.pageview('/home');
  }

  render () {
    return (
      <div id='welcomestatus'className='view-container'>
        <section className=''>
          <div className='flex-row'>
            Welcome, Joseph
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

export default connect(mapStateToProps)(Welcomestatus)







