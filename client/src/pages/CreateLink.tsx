import React, { useState } from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { useHttp } from '../hooks/useHttp'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    maxWidth: 500,
    margin: '1rem auto 0'
  },
  title: {
    textAlign: 'center',
    fontSize: '1.5rem',
    marginBottom: '1rem'
  },
  control: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    padding: '.5rem 1rem',
    marginBottom: '1.2rem',
    
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      height: '56px',
    }  
  },
  submit: {
    background: 'linear-gradient(309deg, #f0b157 21%, #fb7351 100%)',
    color: '#fff',
    
    [theme.breakpoints.up('sm')]: {
      margin: '.3rem 0 .3rem .5rem',
      flexBasis: '200px',
    }
  },
  description: {
    textAlign: 'center',
    fontSize: '.8rem'
  }
}))

export const CreateLink: React.FC = () => {
  const classes = useStyles()
  const [error, setError] = useState(false)
  const [url, setUrl] = useState('')
  const { request, loading } = useHttp()
  const history = useHistory()

  const createLink = async () => {
    if (!url) {
      return setError(true)
    }
    error && setError(false)

    try {
      const data = await request('/api/links/generate', 'POST', { from: url })

      history.push(`/details/${data.link._id}`)
    } catch (err) { }

  }

  const createLinkOnKeyUp = (ev: React.KeyboardEvent) => {
    if (ev.key === 'Enter') {
      createLink()
    }
  }
  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(ev.target.value)
  }

  return (
    <Card variant="outlined" className={classes.card}>
      <CardContent>
        <Typography color="textSecondary" className={classes.title}>
          Paste the URL to create shortened link
        </Typography>
        <div className={classes.control}>
          <TextField
            variant="outlined"
            className="text-field"
            label="Your URL"
            value={url}
            onChange={handleChange}
            onKeyUp={createLinkOnKeyUp}
            error={error}
            helperText={error && 'URL should not be empty'}
            fullWidth
            autoFocus
          />
          <Button
            className={classes.submit}
            onClick={createLink}
            disabled={loading}
          >
            Shorten URL
          </Button>
        </div>
        <Typography color="textSecondary" className={classes.description}>
          URL Manager is a free tool to shorten a URL or reduce a link.
        </Typography>
      </CardContent>
    </Card>
  )
}

export default CreateLink

