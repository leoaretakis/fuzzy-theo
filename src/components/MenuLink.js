import { connect } from 'react-redux'
import { changePage } from '../actions'
import Link from './Link'

const mapStateToProps = (state, ownProps) => {
  return {
    active: ownProps.page === state.currentPage
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => dispatch(changePage(ownProps.page))
  }
}

const MenuLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(Link)

export default MenuLink
