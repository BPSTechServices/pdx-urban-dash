import React from 'react';
import PropTypes from 'prop-types';
import { Toast, ToastBody, ToastHeader } from 'reactstrap';
import FilterActiveCategory from '../FilterActiveCategory';

export default class FilterActiveGroup extends React.Component {
  constructor(props) {
    super(props);

    this.renderCategory = this.renderCategory.bind(this);
    this.updateActiveFilters = this.updateActiveFilters.bind(this);
  }

  updateActiveFilters(title, activeOptions) {
    const { activeFilters } = this.props;
    const updatedActiveFilters = [];
    let updated = false;
    activeFilters.forEach((activeFilter) => {
      if (!updated) {
        if (title === activeFilter.title) {
          if (activeOptions.length !== 0) {
            updatedActiveFilters.push({ title, categories: activeOptions });
            updated = true;
          }
        } else {
          updatedActiveFilters.push(activeFilter);
        }
      } else {
        updatedActiveFilters.push(activeFilter);
      }
    });
    if (!updated) {
      if (activeOptions.length !== 0) {
        updatedActiveFilters.push({ title, categories: activeOptions });
      }
    }
    const { callback } = this.props;
    callback(updatedActiveFilters);
  }

  renderCategory(category) {
    return (
      <FilterActiveCategory
        key={category.title}
        title={category.title}
        categories={category.categories}
        callback={this.updateActiveFilters}
      />
    );
  }

  render() {
    const { title } = this.props;
    const { activeFilters } = this.props;
    if (activeFilters.length === 0) {
      return (
        <Toast style={{ display: 'block', minWidth: '100%', minHeight: '100%' }}>
          <ToastHeader style={{ display: 'block', minWidth: '100%', minHeight: '100%' }}>
            No Active Filters
          </ToastHeader>
          <ToastBody style={{ display: 'block', minWidth: '100%', minHeight: '100%' }}>
            Please select filters from the left pane
          </ToastBody>
        </Toast>
      );
    }
    return (
      <Toast style={{ display: 'block', minWidth: '100%', minHeight: '100%' }}>
        <ToastHeader style={{ display: 'block', minWidth: '100%', minHeight: '100%' }}>
          { title }
        </ToastHeader>
        <ToastBody style={{ display: 'block', minWidth: '100%', minHeight: '100%' }}>
          { activeFilters.map(filter => this.renderCategory(filter)) }
        </ToastBody>
      </Toast>
    );
  }
}

FilterActiveGroup.propTypes = {
  title: PropTypes.string.isRequired,
  activeFilters: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  })).isRequired,
  callback: PropTypes.func,
};

FilterActiveGroup.defaultProps = {
  callback: updatedActiveFilters => console.log(`FilterActiveGroup Returning\nUpatedActiveFilters: ${updatedActiveFilters}`),
};
