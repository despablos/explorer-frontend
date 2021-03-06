// @flow
import React from 'react';
import { smhCoinConverter } from '../../../helper/converter';
import { setFontSize, setLineHeight } from '../../../helper/cssHelper';
import { observer } from 'mobx-react';
import { formattedDate, formattedTime } from '../../../helper/formatter';
import CustomTimeAgo from '../CustomTimeAgo';
import { commaNumber } from '../../../helper/comma';

type Props = {
  color: string,
  unit: string,
  number: string,
  startTime?: number,
  coinCaption?: string,
  coins?: string,
  label?: string,
};


const RightSideBlock = (props: Props) => {
  const { color, unit, number, startTime, coinCaption, coins, label } = props;

  const blockWithTime = () => (
    <div style={{ backgroundColor: color.bgColor }} className="amountBlock">
      <span style={{
        color: color.textColor,
        fontSize: setFontSize(number),
        lineHeight: setLineHeight(number)
      }} className="amountBlock-number">{commaNumber(number) || '000'}</span>
      <p className="amountBlock-unit">{unit}</p>
      <div className="amountBlock-timeWrap">
        {label ? (
          <p>{label}</p>
        ) : (
          <p>{startTime ? formattedDate(startTime) : '00/00/0000'}</p>
        )}
        <p className="amountBlock-timeWrap-timeAgo">
          <CustomTimeAgo time={startTime}/>
        </p>
      </div>
    </div>
  );

  const blockWithCoin = () => (
    <div className="rightColumn" style={{ backgroundColor: color.bgColor }}>
      <div className="rightColumn-number" style={{
        color: color.textColor,
        fontSize: setFontSize(number),
        lineHeight: setLineHeight(number)
      }}>{commaNumber(number) || '000'}</div>
      <div className="rightColumn-desc">{unit}</div>
      <div className="rightColumn-data">
        <p>{`${coinCaption}:`}</p>
        <p>{`${smhCoinConverter(coins)}`}</p>
      </div>
    </div>
  );

  return (startTime ? blockWithTime() : blockWithCoin());
};

export default observer(RightSideBlock);
