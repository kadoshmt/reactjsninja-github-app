'use strict'

import React, { PropTypes } from 'react'

const UserInfo = ({ userInfo }) => (
  <div className='user-info'>
    <img src={userInfo.avatar_url} />
    <h1><a href={`https://github.com/${userInfo.login}`}>{userInfo.name}</a></h1>

    <ul className='repos-info'>
      <li>Repositórios: {userInfo.repos}</li>
      <li>Seguidores: {userInfo.followers}</li>
      <li>Seguindo: {userInfo.following}</li>
    </ul>
  </div>
)

UserInfo.propTypes = {
  userInfo: PropTypes.shape({
    name: PropTypes.string.isRequired,
    login: PropTypes.string.isRequired,
    avatar_url: PropTypes.string.isRequired,
    followers: PropTypes.number.isRequired,
    following: PropTypes.number.isRequired,
    repos: PropTypes.number.isRequired
  })
}

export default UserInfo
