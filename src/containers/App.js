/*
 * Copyright (C) 2016 Mark P. Lindsay
 * 
 * This file is part of mysteriousobjectsatnoon.
 *
 * mysteriousobjectsatnoon is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * mysteriousobjectsatnoon is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with mysteriousobjectsatnoon.  If not, see <http://www.gnu.org/licenses/>.
 */

import actions from '../actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Dropzone from 'react-dropzone'
import { getPaddingLeft } from '../selectors'
import InfoAndEditControl from '../components/app-control/InfoAndEditControl'
import Login from '../components/Login'
import LoginUsernameLogoutControl from '../components/app-control/LoginUsernameLogoutControl'
import React from 'react'
import Sort from './Sort'
import Uploads from './Uploads'

class App extends React.Component {
  constructor() {
    super()
    this._handleDroppedFiles = this._handleDroppedFiles.bind(this)
    this._handleScroll = this._handleScroll.bind(this)
    this._handleWheel = this._handleWheel.bind(this)
    this.componentWillMount = this.componentWillMount.bind(this)
    this.render = this.render.bind(this)
  }
  _handleDroppedFiles(files, event) {
    const x = event.clientX + this.props.scrollLeft - this.props.paddingLeft
    this.props.handleDroppedFiles(files, x, event.clientY, this.props.authData)
  }
  _handleScroll(event) {
    this.props.handleScroll(event.target.scrollLeft)
  }
  _handleWheel(event) {
    // We need to use `getElementById` here because the Dropzone component makes
    // it difficult to access its underlying <div> directly.
    let scroller = document.getElementById('scroller')
    scroller.scrollLeft = scroller.scrollLeft + event.deltaY
  }
  componentWillMount() {
    this.props.listenToAuth()
  }
  render() {
    if (this.props.authData === null || this.props.authData.isEmpty()) {
      return (
        <div className='app'
             id='scroller'
             ref='scroller'
             onScroll={this._handleScroll}
             onWheel={this._handleWheel}>
          {this.props.children}
          <LoginUsernameLogoutControl authData={this.props.authData} 
                                      logout={this.props.logout}
                                      openLogin={this.props.openLogin} />
          <InfoAndEditControl isUploading={this.props.isUploading}
                              showMetadata={this.props.showMetadata} 
                              windowHeight={this.props.windowHeight}
                              windowWidth={this.props.windowWidth} />
          <Login attemptLogin={this.props.attemptLogin}
                 authData={this.props.authData} 
                 closeLogin={this.props.closeLogin}
                 login={this.props.login} />
          <Sort />
        </div>
      )
    }
    return (
      <div className='app'>
        <Dropzone accept='video/*'
                  activeClassName='dropzone-active'
                  className='dropzone' 
                  disableClick={true} 
                  id='scroller'
                  multiple={false} 
                  onDrop={this._handleDroppedFiles}
                  onScroll={this._handleScroll}
                  onWheel={this._handleWheel}
                  ref='scroller'>
          {this.props.children}
          <Uploads authData={this.props.authData} />
          <LoginUsernameLogoutControl authData={this.props.authData} 
                                      logout={this.props.logout}
                                      openLogin={this.props.openLogin} 
                                      params={this.props.params} />
          <InfoAndEditControl isUploading={this.props.isUploading}
                              showMetadata={this.props.showMetadata} 
                              windowHeight={this.props.windowHeight}
                              windowWidth={this.props.windowWidth} />
          <div className='dropzone-veil veil'>
            <div>
              <div>Drop Video</div>
            </div>
          </div>
          <Sort />
        </Dropzone>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    authData: state.getIn(['app', 'authData']),
    isUploading: state.getIn(['upload', 'isUploading']),
    login: state.getIn(['app', 'login']),
    paddingLeft: getPaddingLeft(state),
    scrollLeft: state.getIn(['page', 'scrollLeft']),
    windowHeight: state.getIn(['page', 'height']),
    windowWidth: state.getIn(['page', 'width'])
  }
}

function mapDispatchToProps (dispatch) {
  return {
    attemptLogin: bindActionCreators(actions.attemptLogin, dispatch),
    closeLogin: bindActionCreators(actions.closeLogin, dispatch),
    handleDroppedFiles: bindActionCreators(actions.handleDroppedFiles, dispatch),
    handleScroll: bindActionCreators(actions.handleScroll, dispatch),
    listenToAuth: bindActionCreators(actions.listenToAuth, dispatch),
    logout: bindActionCreators(actions.logout, dispatch),
    openLogin: bindActionCreators(actions.openLogin, dispatch),
    showMetadata: bindActionCreators(actions.showMetadata, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
