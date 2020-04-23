'use strict'

import React, { Component } from 'react'
import AppContent from './components/app-content'
import ajax from '@fdaciuk/ajax'

class App extends Component {
  constructor () {
    super()
    this.state = {
      userInfo: null,
      repos: [],
      starred: [],
      isFetching: false
    }
  }

  getGitHubUrl (username, type) {
    const internalUser = username ? `/${username}` : ''
    const internalType = type ? `/${type}` : ''
    return `https://api.github.com/users${internalUser}${internalType}`
  }

  handleSearch (e) {
    const value = e.target.value
    const keyCode = e.which || e.keyCode
    const ENTER = 13
    // const target = e.target
    if (keyCode === ENTER) {
      // target.disabled = true
      this.setState({ isFetching: true })
      ajax().get(this.getGitHubUrl(value))
        .then((result) => {
          this.setState({
            userInfo: {
              name: result.name,
              login: result.login,
              avatar_url: result.avatar_url,
              repos: result.public_repos,
              followers: result.followers,
              following: result.following
            },
            repos: [],
            starred: []
          })
        })
        .always(() => {
          // target.disabled = false
          this.setState({ isFetching: false })
        })
    }
  }

  getRepos (type) {
    return (e) => {
      const username = this.state.userInfo.login
      ajax().get(this.getGitHubUrl(username, type))
        .then((result) => {
          this.setState({
            [type]: result.map(repo => ({
              name: repo.name,
              link: repo.html_url
            }))
          })
        })
    }
  }

  render () {
    return (
      <AppContent
        /* userInfo={this.state.userInfo}
        repos={this.state.repos}
        starred={this.state.starred} */
        {...this.state}
        handleSearch={(e) => this.handleSearch(e)}
        getRepos={this.getRepos('repos')}
        getStarred={this.getRepos('starred')}
        isFetching={this.state.isFetching}
      />
    )
  }
}

export default App
