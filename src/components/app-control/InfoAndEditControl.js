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

import Draggable from 'react-draggable'
import React from 'react'
import ReactDOM from 'react-dom'

export default class InfoAndEditControl extends React.Component {
  constructor() {
    super()
    this.state = {
      height: 0,
      width: 0
    }
    this._handleClick = this._handleClick.bind(this)
    this._handleDragStart = this._handleDragStart.bind(this)
    this.componentDidUpdate = this.componentDidUpdate.bind(this)
    this.render = this.render.bind(this)
  }
  _handleClick(event) {
    event.preventDefault()
    this.props.showMetadata()
  }
  _handleDragStart(event) {
    event.preventDefault()
  }
  componentDidUpdate() {
    let el = ReactDOM.findDOMNode(this)
    if (el !== null && this.state.height === 0 && this.state.width === 0) {
      this.setState({
        height: el.offsetHeight,
        width: el.offsetWidth
      })
    }
  }
  render() {
    if (this.props.windowHeight === undefined || 
        this.props.windowWidth === undefined) {
      return null
    }
    const bounds = {
      top: 0,
      right: this.props.windowWidth - this.state.width,
      bottom: this.props.windowHeight - this.state.height,
      left: 0
    }
    const defaultPosition = { x: 40, y: (this.props.windowHeight * 0.10) }
    let control = (
      <a className='info-and-edit-control app-control' 
         href='#' 
         onClick={this._handleClick}
         onDragStart={this._handleDragStart}>
        <img src='static/haumea.png' alt='Info &amp Edit' />
      </a>
    )
    if (this.props.isUploading) {
      control= (
        <a className='info-and-edit-control app-control is-uploading' 
           href='#' 
           onClick={this._handleClick}
           onDragStart={this._handleDragStart}>
          <img src='static/haumea_uploading.gif' alt='Uploading...' />
        </a>
      )
    }
    return (
      <Draggable bounds={bounds} defaultPosition={defaultPosition}>
        {control}
      </Draggable>
    )
  }
}
