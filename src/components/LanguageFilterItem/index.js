// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {languageItemList, setActiveLanguageFilterId, isActive} = props
  const {language, id} = languageItemList
  const classNameActiveStatusLanguage = isActive ? 'active-language-text' : null
  const onClickLanguageItem = () => {
    setActiveLanguageFilterId(id)
  }

  return (
    <li className="list-item-language">
      <button
        className={`item-language-text ${classNameActiveStatusLanguage}`}
        type="button"
        onClick={onClickLanguageItem}
      >
        {language}
      </button>
    </li>
  )
}
export default LanguageFilterItem
