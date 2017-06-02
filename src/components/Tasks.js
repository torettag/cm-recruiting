import React from 'react'
// import { Link } from 'react-router'
import { connect } from 'react-redux'
import ga from 'react-ga'
import epi from '../services/epi'
import '../styles/Tasks.css';


class Tasks extends React.Component {
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
      <div className='view-container'>
        <section id='tasks' className=''>
          <div className='flex-col'>
            <h1>Tasks</h1>
            
            <div className='task-child'>

              <div className='flex-col'>
                <div className='flex-row'>
                  <div className='task-child-headline'>
                    <p>Testing 1 2 3<br/> TESTING TESTING</p>
                  </div>
                  <div className='task-child-close'>
                    <span className="icon-close_icon"></span>
                  </div>
                </div>
                <div className='flex-row'>
                  <div className='action-alert-container'>
                    <span className="icon-alert_icon"></span>
                  </div>
                  <div className='action-name-container'>
                    Test
                  </div>
                  <div className='action-button'>
                    <span className="icon-redarrow_icon"></span>
                  </div>
                </div>
              </div>

            </div>

            <div className='task-child'>

              <div className='flex-col'>
                <div className='flex-row'>
                  <div className='task-child-headline'>
                    <p>Testing 1 2 3<br/> TESTING TESTING</p>
                  </div>
                  <div className='task-child-close'>
                    <span className="icon-close_icon"></span>
                  </div>
                </div>
                <div className='flex-row'>
                  <div className='action-alert-container'>
                    <span className="icon-alert_icon"></span>
                  </div>
                  <div className='action-name-container'>
                    Test
                  </div>
                  <div className='action-button'>
                    <span className="icon-redarrow_icon"></span>
                  </div>
                </div>
              </div>

            </div>

            <div className='task-child'>

              <div className='flex-col'>
                <div className='flex-row'>
                  <div className='task-child-headline'>
                    <p>Testing 1 2 3<br/> TESTING TESTING</p>
                  </div>
                  <div className='task-child-close'>
                    <span className="icon-close_icon"></span>
                  </div>
                </div>
                <div className='flex-row'>
                  <div className='action-alert-container'>
                    <span className="icon-alert_icon"></span>
                  </div>
                  <div className='action-name-container'>
                    Test
                  </div>
                  <div className='action-button'>
                    <span className="icon-redarrow_icon"></span>
                  </div>
                </div>
              </div>

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

export default connect(mapStateToProps)(Tasks)