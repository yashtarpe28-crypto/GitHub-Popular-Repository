import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here
const apiStatusRepositoryView = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  in_process: 'LOADING',
  failure: 'FAILURE',
}

class GithubPopularRepos extends Component {
  state = {
    repositoryData: [],
    activeFilterLanguageId: languageFiltersData[0].id,
    apiStatus: apiStatusRepositoryView.initial,
  }

  componentDidMount() {
    this.getGithubReposApi()
  }

  getGithubReposApi = async () => {
    this.setState({
      apiStatus: apiStatusRepositoryView.in_process,
    })
    const {activeFilterLanguageId} = this.state
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeFilterLanguageId}`
    const response = await fetch(apiUrl)
    console.log(response)
    if (response.ok === true) {
      const filterData = await response.json()
      console.log(filterData)
      const updatatedFilterData = filterData.popular_repos.map(dataRepos => ({
        id: dataRepos.id,
        name: dataRepos.name,
        starsCount: dataRepos.stars_count,
        forksCount: dataRepos.forks_count,
        issuesCount: dataRepos.issues_count,
        avatarUrl: dataRepos.avatar_url,
      }))
      this.setState({
        repositoryData: updatatedFilterData,
        apiStatus: apiStatusRepositoryView.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusRepositoryView.failure,
      })
    }
  }

  renderLanguageFilterItem = () => {
    const {activeFilterLanguageId} = this.state
    return (
      <ul className="language-container">
        {languageFiltersData.map(languageList => (
          <LanguageFilterItem
            key={languageList.id}
            languageItemList={languageList}
            setActiveLanguageFilterId={this.setActiveLanguageFilterId}
            isActive={languageList.id === activeFilterLanguageId}
          />
        ))}
      </ul>
    )
  }

  renderRepositoryActiveItemList = () => {
    const {repositoryData} = this.state
    return (
      <div className="repo-item-container">
        <ul className="repo-data-list-container">
          {repositoryData.map(eachList => (
            <RepositoryItem
              key={eachList.id}
              repositoryItemListData={eachList}
            />
          ))}
        </ul>
      </div>
    )
  }

  setActiveLanguageFilterId = newFilterId => {
    this.setState({activeFilterLanguageId: newFilterId}, this.getGithubReposApi)
  }

  renderLoadingView = () => (
    <div className="loader-view" data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view-img"
      />
      <h1 className="failure-heading">Something Went Wrong</h1>
    </div>
  )

  renderRepository = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusRepositoryView.success:
        return this.renderRepositoryActiveItemList()
      case apiStatusRepositoryView.in_process:
        return this.renderLoadingView()
      case apiStatusRepositoryView.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="githubpopular-repos-container">
        <h1 className="text-popular">Popular</h1>
        <div>
          {this.renderLanguageFilterItem()}
          {this.renderRepository()}
        </div>
      </div>
    )
  }
}
export default GithubPopularRepos
