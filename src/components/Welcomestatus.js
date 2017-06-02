import React from 'react'
// import { Link } from 'react-router'
import { connect } from 'react-redux'
import epi from '../services/epi'
import '../styles/Welcomestatus.css';


class Welcomestatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.epi = new epi();
  }

  componentDidMount () {

  }

  render () {
    return (
      <div id='welcomestatus'className='view-container'>
        <section className=''>
          <div className='flex-row'>
            Welcome, <span className='your-name'>{this.props.councilMemberStore.councilMember.first_name} {this.props.councilMemberStore.councilMember.last_name}</span>
          </div>
        </section>

      </div>
    )
  }
}

function mapStateToProps(store){
  return {
    councilMemberStore: store.reducers.councilMember
  }
}

export default connect(mapStateToProps)(Welcomestatus)







