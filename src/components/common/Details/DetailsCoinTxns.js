// @flow
import React from 'react';

import CopyButton from '../CopyButton';
import { ACCOUNTS, USD_RATE } from '../../../config/constants';
import { smhCoinConverter } from '../../../helper/converter';
import { fullDate } from '../../../helper/formatter';
import CustomTimeAgo from '../CustomTimeAgo';

type Props = {
  data: Object,
  viewStore: Object,
};

const DetailsCoinTxns = (props: Props) => {
  const { data, viewStore } = props;

  return (
    <div className="details">
      <ul className="details-list">
        <li className="item">
          <span className="item-name">ID</span>
          <span className="item-value">
            {data.id}
            <CopyButton value={data.id} />
          </span>
        </li>
        <li className="item">
          <span className="item-name">To</span>
          <span className="item-value">
            <a href={`/${ACCOUNTS}/${data.receiver}`} onClick={(e) => viewStore.linkHandler(e, ACCOUNTS, data.receiver)}>{data.receiver}</a>
            <CopyButton value={data.receiver} />
          </span>
        </li>
        <li className="item">
          <span className="item-name">From</span>
          <span className="item-value">
            <a href={`/${ACCOUNTS}/${data.sender}`} onClick={(e) => viewStore.linkHandler(e, ACCOUNTS, data.sender)}>{data.sender}</a>
            <CopyButton value={data.sender} />
          </span>
        </li>
        <li className="item">
          <span className="item-name">Timestamp</span>
          <span className="item-value">
            <CustomTimeAgo time={data.timestamp} />
            &nbsp;{`${fullDate(data.timestamp)}`}
          </span>
        </li>
        <li className="item">
          <span className="item-name">Value</span>
          <span className="item-value">{smhCoinConverter(data.amount)}</span>
        </li>
        <li className="item">
          <span className="item-name">Counter</span>
          <span className="item-value">{data.counter}</span>
        </li>
        <li className="item">
          <span className="item-name">Fee</span>
          <span className="item-value">
              {smhCoinConverter(data.fee)} (&#8765; {`${data.fee * USD_RATE}`} USD)
          </span>
        </li>
      </ul>
    </div>
  );
};

export default DetailsCoinTxns;
