import { History } from 'history'
import * as React from 'react'
import {
  Button,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  Loader,
  Form,
} from 'semantic-ui-react'

import { createNote, deleteNote, getNotes, patchNote } from '../api/notes-api'
import Auth from '../auth/Auth'
import { Note } from '../types/Note'

interface NotesProps {
  auth: Auth
  history: History
}

interface NotesState {
  notes: Note[]
  newNoteTitle: string
  newNoteDescription: string
  loadingNotes: boolean
}

export class Notes extends React.PureComponent<NotesProps, NotesState> {
  state: NotesState = {
    notes: [],
    newNoteTitle: '',
    newNoteDescription: '',
    loadingNotes: true
  }

  handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ newNoteTitle: event.target.value })
  }

  handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({ newNoteDescription: event.target.value })
  }

  onEditButtonClick = (noteId: string) => {
    this.props.history.push(`/notes/${noteId}/edit`)
  }

  onNoteCreate = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      const newNote = await createNote(this.props.auth.getIdToken(), {
        title: this.state.newNoteTitle,
        description: this.state.newNoteDescription,
      })
      this.setState({
        notes: [...this.state.notes, newNote],
        newNoteTitle: ''
      })
    } catch {
      alert('Note creation failed')
    }
  }

  onNoteDelete = async (noteId: string) => {
    try {
      await deleteNote(this.props.auth.getIdToken(), noteId)
      this.setState({
        notes: this.state.notes.filter(note => note.noteId !== noteId)
      })
    } catch {
      alert('Note deletion failed')
    }
  }

  onNoteCheck = async (pos: number) => {
    try {
      const note = this.state.notes[pos]
      await patchNote(this.props.auth.getIdToken(), note.noteId, {
        title: note.title,
        description: note.description,
      })
    } catch {
      alert('Note deletion failed')
    }
  }

  async componentDidMount() {
    try {
      const notes = await getNotes(this.props.auth.getIdToken())
      this.setState({
        notes,
        loadingNotes: false
      })
    } catch (e) {
      alert(`Failed to fetch notes: ${e.message}`)
    }
  }

  render() {
    return (
      <div>
        <Header as="h1">Your Notes</Header>

        {this.renderCreateNoteInput()}

        {this.renderNotes()}
      </div>
    )
  }

  renderCreateNoteInput() {
    return (
      <Grid.Row>
        <Grid.Column width={16}>
          <Form onSubmit={this.onNoteCreate}>
            <Form.Field>
              <Form.Input placeholder='Title' onChange={this.handleNameChange} />
            </Form.Field>
            <Form.Field>
              <Form.TextArea placeholder='Description' onChange={this.handleDescriptionChange} />
            </Form.Field>
            <Button type='submit'>Submit</Button>
          </Form>
        </Grid.Column>
        <Grid.Column width={16}>
          <Divider />
        </Grid.Column>
      </Grid.Row>
    )
  }

  renderNotes() {
    if (this.state.loadingNotes) {
      return this.renderLoading()
    }

    return this.renderNotesList()
  }

  renderLoading() {
    return (
      <Grid.Row>
        <Loader indeterminate active inline="centered">
          Loading Notes
        </Loader>
      </Grid.Row>
    )
  }

  renderNotesList() {
    return (
      <Grid padded>
        {this.state.notes.map((note, pos) => {
          return (
            <Grid.Row key={note.noteId}>
              <Grid.Column width={10} verticalAlign="middle">
                {note.title}
              </Grid.Column>
              <Grid.Column width={3} floated="right">
                {note.description}
              </Grid.Column>
              <Grid.Column width={1} floated="right">
                <Button
                  icon
                  color="blue"
                  onClick={() => this.onEditButtonClick(note.noteId)}
                >
                  <Icon name="pencil" />
                </Button>
              </Grid.Column>
              <Grid.Column width={1} floated="right">
                <Button
                  icon
                  color="red"
                  onClick={() => this.onNoteDelete(note.noteId)}
                >
                  <Icon name="delete" />
                </Button>
              </Grid.Column>
              {note.attachmentUrl && (
                <Image src={note.attachmentUrl} size="small" wrapped />
              )}
              <Grid.Column width={16}>
                <Divider />
              </Grid.Column>
            </Grid.Row>
          )
        })}
      </Grid>
    )
  }
}
