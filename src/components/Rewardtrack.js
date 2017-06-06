import React from 'react'
// import { Link } from 'react-router'
import { connect } from 'react-redux'
import epi from '../services/epi'
import '../styles/Rewardtrack.css';


class Rewardtrack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.epi = new epi();
  }

  componentDidMount () {

  }

  render () {
    return (
      <div id='rewardtrack' className='view-container'>
        <section className=''>
          <div className='flex-col'>
            <div className='subhead'>Last Reward</div><br/>
            <div id='textblock' className='flex-row'>
              <div className='large-red-text'>$5000</div>
            </div>
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

export default connect(mapStateToProps)(Rewardtrack)







