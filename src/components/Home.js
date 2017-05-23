import React from 'react'
// import { Link } from 'react-router'
import { connect } from 'react-redux'
import ga from 'react-ga'
import epi from '../services/epi'

class Home extends React.Component {
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
      <div id='home' className='view-container'>
        <section className=''>

          <div className='flex-content'>
            test
            


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



export default connect(mapStateToProps)(Home)