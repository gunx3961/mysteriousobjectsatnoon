/*
 * Copyright (C) 2017 Mark P. Lindsay
 * 
 * This file is part of mysteriousobjectsatnoon.
 *
 * mysteriousobjectsatnoon is free software: you can redistribute it and/or 
 * modify it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * mysteriousobjectsatnoon is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with mysteriousobjectsatnoon.  If not, see 
 * <http://www.gnu.org/licenses/>.
 */

import { C } from '../../constants'
import getCloudFrontUrl from '../../utils/getCloudFrontUrl'
import PosterImage from './PosterImage'
import React from 'react'
import Video from 'react-html5video'

export default class SourceItem extends React.Component {
  constructor() {
    super()
    this.componentDidUpdate = this.componentDidUpdate.bind(this)
    this.render = this.render.bind(this)
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.refs.video !== undefined) {
      // Fast-forward to the playback position of the clicked video.
      this.refs.video.seek(this.props.currentTime)
    }
  }
  render() {
    if (this.props.item === null) {
      return null
    }
    if (this.props.item.get('type') !== 'video') {
      return null
    }
    const style = {
      height: this.props.item.get('height') + 'px',
      left: this.props.left + 'px',
      top: this.props.top + 'px',
      width: this.props.item.get('width') + 'px'
    }
    const sslUrl = this.props.item.getIn(['results', 'encode', 'ssl_url'])
    const src = getCloudFrontUrl(sslUrl)
    return (
      <div className='video-item is-source-item'
           ref='item'
           style={style}>
        <Video loop ref='video'>
          <source src={src} type='video/mp4' />
        </Video>
        <div className='obstructor'></div>
        <PosterImage item={this.props.item} />
      </div>
    )
  }
}
