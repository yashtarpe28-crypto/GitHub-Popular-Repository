// Write your code here

import './index.css'

const RepositoryItem = props => {
  const {repositoryItemListData} = props
  const {
    name,
    starsCount,
    issuesCount,
    forksCount,
    avatarUrl,
  } = repositoryItemListData

  return (
    <li className="list-repos-item-container">
      <img src={avatarUrl} alt={name} className="avatar-img" />
      <h1 className="text-repos-data-heading">{name}</h1>
      <div className="count-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="list-imgs"
        />
        <p className="text-repos-description-data">{starsCount} stars</p>
      </div>
      <div className="count-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="list-imgs"
        />
        <p className="text-repos-description-data">{forksCount} forks</p>
      </div>
      <div className="count-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png "
          alt="open issues"
          className="list-imgs"
        />
        <p className="text-repos-description-data">{issuesCount} open issues</p>
      </div>
    </li>
  )
}
export default RepositoryItem
