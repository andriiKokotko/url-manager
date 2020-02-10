import React, { useState, useEffect } from 'react'
import { useHttp } from '../hooks/useHttp'
import { RouteComponentProps, useHistory } from 'react-router-dom'
import { Spinner } from '../components/Spinner'
import { ILink } from '../types'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  row: {
    overflowX: 'hidden',
    whiteSpace: 'pre'
  },
  label: {
    color: '#fb7351'
  },
  shortenedLink: {
    fontSize: '1.3rem'
  },
  goBack: {
    marginTop: '1.5rem'
  }
}))

export const Details: React.FC<RouteComponentProps<{ id: string }>> = ({ match }) => {
  const [link, setLink] = useState<ILink | null>(null)
  const { request, loading } = useHttp()
  const history = useHistory()

  const classes = useStyles()

  useEffect(() => {
    (async () => {
      try {
        const data = await request(`/api/links/${match.params.id}`)

        setLink(data)
      } catch (err) { }
    })()
    //eslint-disable-next-line
  }, [])

  if (loading) return <Spinner />

  return (
    <>
      <Typography variant="h3" gutterBottom>Link</Typography>
      <Typography variant="subtitle1" gutterBottom className={classes.row}>
        <Link
          href={link?.to}
          target="_blank"
          underline="always"
          color="textSecondary"
          rel="noopener noreferrer"
          className={classes.shortenedLink}
        >
          {link ? link?.to : ''}
        </Link>
      </Typography>
      <Typography variant="subtitle1" gutterBottom className={classes.row}>
        <Typography color="secondary" className={classes.label}>Original URL</Typography>
        <Link
          href={link?.from}
          target="_blank"
          underline="always"
          color="textSecondary"
          rel="noopener noreferrer"
        >
          {link ? link?.from : ''}
        </Link>
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        <Typography
          color="secondary"
          display="inline"
          className={classes.label}
        >
          Clicks
        </Typography>
        {' '}
        {link?.clicks}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        <Typography
          color="secondary"
          display="inline"
          className={classes.label}
        >
          Created
        </Typography>
        {' '}
        {new Date(link?.date as string).toLocaleDateString()}
      </Typography>
      <Button
        variant="outlined"
        className={classes.goBack}
        onClick={() => history.goBack()}
      >
         <ArrowBackIosIcon /> Go back
      </Button>
    </>
  )
}

export default Details
