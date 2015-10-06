import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import {Segment} from 'stardust';

/**
 * Displays a table of a Component's PropTypes.
 */
export default class ComponentProps extends Component {
  static propTypes = {
    /**
     * A single Component's prop info as generated by react-docgen.
     * @type {object} Props info object where keys are prop names and values are prop definitions.
     */
    props: PropTypes.object
  };

  render() {
    var propsDefinition = this.props.props;
    var content = _.map(propsDefinition, (propConfig, propName) => {
      let name = propName;
      let defaultValue;
      let defaultIsComputed;
      let description = propConfig.docBlock;

      let type = _.get(propConfig, 'type.name');
      let value = _.get(propConfig, 'type.value');
      if (type === 'union') {
        type = _.map(value, (val) => val.name).join('|');
      }
      type = type && `{${type}}`;

      let required = propConfig.required && (
          <span className='ui mini red circular label'>required</span>
        );

      // default value
      if (propConfig.defaultValue) {
        defaultValue = (
          <span>{propConfig.defaultValue.value}</span>
        );
        defaultIsComputed = propConfig.defaultValue.computed && (
            <span className='ui mini gray circular label'>computed</span>
          );
      }

      return (
        <div key={propName}>
          <div style={{display: 'flex'}}>
            <div style={{flex: '4'}}>{name} {required}</div>
            <div style={{flex: '2'}}>{type}</div>
            <div style={{flex: '4'}}>{defaultValue} {defaultIsComputed}</div>
            <div style={{flex: '8'}}>{description}</div>
          </div>
        </div>
      );
    });

    return (
      <Segment className='basic vertical'>
        <div className='ui header'>Props</div>
        <div style={{display: 'flex'}}>
          <b style={{flex: '4'}}>name</b>
          <b style={{flex: '2'}}>type</b>
          <b style={{flex: '4'}}>default</b>
          <b style={{flex: '8'}}>description</b>
        </div>
        {content}
      </Segment>
    );
  }
}
