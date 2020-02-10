import React, { useState, useContext, useEffect } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Button from '@material-ui/core/Button'
import { useMediaQuery } from '@material-ui/core'
import { NavLink } from 'react-router-dom'
import { AuthContext, IAuthContext } from '../context/AuthContext'

const useStyles = makeStyles(() => ({
    menuButton: {
      marginRight: '1rem'
    },
    toolBar: {
      display: 'flex',
      justifyContent: 'space-between',
      background: 'linear-gradient(309deg, rgba(240,177,87,1) 21%, rgba(251,115,81,1) 100%)'
    },
    list: {
      width: 250,
      padding: 0
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: '.5rem 1rem',
      justifyContent: 'flex-end'
    },
    horizontal: {
      display: 'flex'
    },
    navBtn: {
      marginRight: '.5rem',
      color: '#fff'
    }
  })
)

export const Navbar = () => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const { isAuthenticated, logout } = useContext(AuthContext) as IAuthContext
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))

  
  const handleDrawerOpen = () => {
    setOpen(true)
  }
  
  const handleDrawerClose = () => {
    setOpen(false)
  }
  
  useEffect(() => {
    matches && handleDrawerClose()  
  }, [matches])

  const drawerList = isAuthenticated ? (
    <List className={classes.list}>
      <ListItem button component={NavLink} to="/links" onClick={handleDrawerClose}>
        <ListItemText primary="Links" />
      </ListItem>
      <ListItem button component={NavLink} to="/create-link" onClick={handleDrawerClose}>
        <ListItemText primary="Create Link" />
      </ListItem>
      <Divider />
      <ListItem button onClick={() => {
        logout()
        handleDrawerClose()
      }}>
        <ListItemText primary="Logout" />
      </ListItem>
    </List>
  ) : (
    <List className={classes.list}>
      <ListItem button component={NavLink} to="/login" onClick={handleDrawerClose}>
        <ListItemText primary="Login" />
      </ListItem>
      <ListItem button component={NavLink} to="/register" onClick={handleDrawerClose}>
        <ListItemText primary="Register" />
      </ListItem>
    </List>
  )

  const navList = isAuthenticated ? (
    <div className={classes.horizontal}>
      <Button className={classes.navBtn} component={NavLink} to="/links">
        Links
      </Button>
      <Button className={classes.navBtn} component={NavLink} to="/create-link">
        Create Link
      </Button>
      <Button className={classes.navBtn} variant="outlined" onClick={logout}>
        Logout
      </Button>
    </div>
  ) : (
    <div className={classes.horizontal}>
      <Button className={classes.navBtn} component={NavLink} to="/login">
        Login
      </Button>
      <Button className={classes.navBtn} component={NavLink} to="/register">
        Register
      </Button>
    </div>
  )

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar className={classes.toolBar}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={classes.menuButton}
              style={{ display: matches ? 'none' : 'block' }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              URL Manager
            </Typography>
          </div>
          { matches && navList }
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={open}
        onClose={handleDrawerClose}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        { !matches && drawerList }
      </Drawer>
    </div>
  );
}
