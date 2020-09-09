// @flow
import * as React from 'react';
import { toJS } from 'mobx';
import isEmpty from '../../../helper/isEmpty';
import getValueFromStatsObject from '../../../helper/getValueFromStatsObject';
import { observer } from 'mobx-react';

const Props = {
  viewStore: Object
};

const TimeBlock = (props: Props) => {
  const { viewStore } = props;

  const value = toJS(viewStore);

  // console.log('TimeBlock value--->>>>>>>', value);
  // const stats = !isEmpty(value) && getValueFromStatsObject(value.stats);
  const epoch = '0';
  const layer = null;

  return (
    <div className="timeBlock">
      {epoch && (
        <div className="timeBlock-item">
          <div className="name">Epoch</div>
          <div className="value">{epoch}</div>
        </div>
      )}
      {layer && (
        <div className="timeBlock-item">
          <div className="name">Layer</div>
          <div className="value">{layer}</div>
        </div>
      )}
    </div>
  );
};

export default observer(TimeBlock);
