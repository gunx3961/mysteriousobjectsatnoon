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

import { A } from '../constants'
import Immutable from 'immutable'

const initialState = Immutable.Map({
  destinationItem: Immutable.Map(),
  height: 0,
  href: '',
  items: Immutable.Map(),
  pageId: null,
  width: 0
})

export default function pageReducer (state = initialState, action) {
  switch (action.type) {
      
    case A.PAGE_SCROLLED:
      return state.set('scrollLeft', action.payload.get('scrollLeft'))

    case A.RECEIVED_ITEMS:
      return state.merge({
        destinationItem: action.payload.get('destinationItem'),
        items: action.payload.get('items'),
        pageId: action.payload.get('pageId')
      })

    case A.SET_BASE_URL:
      return state.set('href', action.payload.get('href'))

    case A.WINDOW_CHANGED_SIZE:
      return state.merge({
        height: action.payload.get('height'),
        width: action.payload.get('width')
      })

    default:
      return state
  }
}
