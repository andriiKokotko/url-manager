import React, { useState, useEffect } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { useHistory } from 'react-router-dom'
import { useHttp } from '../hooks/useHttp'
import { ILink } from '../types'
import { Spinner } from '../components/Spinner'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
  button: {
    background: 'linear-gradient(309deg, rgba(240,177,87,1) 21%, rgba(251,115,81,1) 100%)',
    color: '#fff'
  },
  overflowWrap: {
    [theme.breakpoints.up('md')]: {
      overflowWrap: 'anywhere'
    }
  }
}))

export default function Links() {
  const classes = useStyles()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const [links, setLinks] = useState<ILink[]>([])
  const [done, setDone] = useState(false)
  const { request, loading } = useHttp()
  const history = useHistory()
  
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const goToDetails = (id: string) => {
    history.push(`/details/${id}`)
  }

  useEffect(() => {
    (async () => {
      try {
        const data = await request('/api/links')
        setLinks(data)
        setDone(true)
      } catch (err) { }
    })()
  }, [request])

  if (loading) return <Spinner />

  if (done && !links.length) return (
    <Typography
      variant="h3"
      color="textSecondary"
    >
      No Shortened links yet...
    </Typography>
  )


  return (
    <Paper variant="outlined" className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center">#</TableCell>
              <TableCell align="center">Original</TableCell>
              <TableCell align="center">Shortened</TableCell>
              <TableCell align="center">Open</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {links
              .map((link, idx) => ({...link, idx}))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(link => {
                return (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={link._id}
                >
                  <TableCell>{link.idx + 1}</TableCell>
                  <TableCell className={classes.overflowWrap}>{link.from}</TableCell>
                  <TableCell>{link.to}</TableCell>
                  <TableCell>
                    <Button
                      className={classes.button}
                      onClick={goToDetails.bind(null, link._id)}
                    >
                      Open
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={links.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  )
}
