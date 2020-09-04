// @flow
import * as React from 'react';
import { nanoid } from 'nanoid';
import { observer } from 'mobx-react';

import {
  ATXS,
  LAYERS,
  REWARDS,
  TXNS,
} from '../../../config/constants';
import moment from 'moment';
import {smhCoinConverter} from '../../../helper/converter';
import Loader from '../Loader';

type Props = {
  data: Array<object>,
  viewStore: Object,
};

const LayersRow = (props: Props) => {
  const { data, viewStore } = props;

  return (
    data && data.map((item) => (
      <div key={nanoid()} className="tr">
        <div className="td">
          <a href={`/${LAYERS}/${item.number}`} onClick={(e) => viewStore.linkHandler(e, LAYERS, item.number)}>
            {item.number}
          </a>
        </div>
        <div className="td">
          <a href={`/${LAYERS}/${item.txs}/${TXNS}`} onClick={(e) => viewStore.linkHandler(e, LAYERS, item.txs, TXNS)}>
            {item.txs}
          </a>
        </div>
        <div className="td">
          { moment.unix(item.start).fromNow() }
        </div>
        <div className="td">
          <a href={`/${LAYERS}/${item.id}/${ATXS}`} onClick={(e) => viewStore.linkHandler(e, LAYERS, item.id, ATXS)}>
            {smhCoinConverter(item.txsamount)}
          </a>
        </div>
        <div className="td">
          <a href={`/${LAYERS}/${item.rewards}/${REWARDS}`} onClick={(e) => viewStore.linkHandler(e, LAYERS, item.rewards, REWARDS)}>
            {smhCoinConverter(item.rewards)}
          </a>
        </div>
      </div>
    ))
  );
};

export default observer(LayersRow);
