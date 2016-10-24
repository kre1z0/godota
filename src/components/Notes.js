import Masonry from 'masonry-layout'
import React from 'react'
import moment from 'moment'
import classNames from 'classnames'

class Note extends React.Component {
  render () {
    return (
      <div className='note'>
        <span className='delete-note' onClick={this.props.onDeconste}> × </span>
        {this.props.children}
      </div>
    )
  }
}

class NoteEditor extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      text: '',
      placeholder: 'Enter your note here...',
      error: false
    }
  }

  handconstextChange (event) {
    this.setState({ text: event.target.value })
    if (event.target.value.length > 0) {
      this.setState({
        error: false,
        placeholder: 'Enter your note here...'
      })
    }
  }

  handleNoteAdd () {
    if (this.state.text.length == 0) {
      this.setState({
        placeholder: 'your note is empty...',
        error: true
      })
    } else {
      const newNote = {
        text: this.state.text,
        id: Date.now(),
        time: moment(Date.now()).format('lll')
      }
      this.props.onNoteAdd(newNote)
      this.setState({
        text: '',
        error: false,
        placeholder: 'Enter your note here...'
      })
    }
  }

  render () {
    const error = this.state.error
    const e = classNames('note-editor', { error })
    return (
      <div className={e}>
        <textarea
          placeholder={this.state.placeholder}
          rows={5}
          className='textarea'
          value={this.state.text}
          onChange={::this.handconstextChange}
                />
        <button className='add-button' onClick={::this.handleNoteAdd}>Add</button>
      </div>
    )
  }
}

class NotesGrid extends React.Component {

  componentDidMount () {
    const grid = this.refs.grid
    this.msnry = new Masonry(grid, {
      itemSelector: '.note',
      gutter: 10
    })
  }

  componentDidUpdate (prevProps) {
    if (this.props.notes.length !== prevProps.notes.length) {
      this.msnry.reloadItems()
      this.msnry.layout()
    }
  }

  render () {
    const onNoteDeconste = this.props.onNoteDeconste
    return (
      <div className='notes-grid' ref='grid'>
        {
          this.props.notes.map(function (note) {
            return (
              <Note
                key={note.id}
                onDeconste={onNoteDeconste.bind(null, note)}>
                <div className='time'>
                  {note.time}
                </div>
                {note.text}
              </Note>
            )
          })
        }
      </div>
    )
  }
}

export default class Notes extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      notes: []
    }
  }

  componentDidMount () {
    const localNotes = JSON.parse(localStorage.getItem('notes'))
    if (localNotes) {
      this.setState({ notes: localNotes })
    }
  }

  componentDidUpdate () {
    this._updateLocalStorage()
  }

  handleNoteDeconste (note) {
    const noteId = note.id
    const newNotes = this.state.notes.filter(function (note) {
      return note.id !== noteId
    })
    this.setState({ notes: newNotes })
  }

  handleNoteAdd (newNote) {
    const newNotes = this.state.notes.slice()
    newNotes.unshift(newNote)
    this.setState({ notes: newNotes })
  }

  _updateLocalStorage () {
    const notes = JSON.stringify(this.state.notes)
    localStorage.setItem('notes', notes)
  }

  render () {
    return (
      <div id='notes-app' className='notes-app'>
        <NoteEditor onNoteAdd={::this.handleNoteAdd} />
        <NotesGrid notes={this.state.notes} onNoteDeconste={::this.handleNoteDeconste} />
      </div>
    )
  }
}
