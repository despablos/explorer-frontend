// @flow
import * as React from 'react';
import { observer } from 'mobx-react';

import InfoBlock from '../../components/common/InfoBlock';
import TitleBlock from '../../components/common/TitleBlock';
import { AmountBlock } from '../../components/common/CountBlock';
import Table from '../../components/common/Table';

import { getColorByPageName } from '../../helper/getColorByPageName';

import {
  EPOCHS,
  LAYERS,
  REWARDS,
  SMESHER,
  TXNS,
  OVERVIEW,
  ACCOUNTS,
  SMART_WALLET,
} from '../../config/constants';
import CountModuleContainer from "../../components/common/CountModuleContainer";
import RewardsRightColumn from '../../components/common/RewardsRightColumn';
import RightCountBlock from '../../components/common/CountBlock/RightCountBlock';
import {toJS} from 'mobx';
import isEmpty from '../../helper/isEmpty';
import getValueFromStatsObject from '../../helper/getValueFromStatsObject';

type Props = {
  uiStore: Object,
  viewStore: Object,
};

const RenderMainPage = (props: Props) => {
  const { uiStore, viewStore } = props;
  const { name } = viewStore.currentView;
  const mainInfo = viewStore.mainInfo;

  const value = toJS(mainInfo);
  const stats = !isEmpty(value) && getValueFromStatsObject(value.stats);

  switch (name) {
    case OVERVIEW:
      return (
        <>
          <InfoBlock data={mainInfo}/>
          <div className="page-wrap">
            <TitleBlock
              title="Latest Transaction"
              color={getColorByPageName(name)}
              desc="Most recent global transactions."
              uiStore={uiStore}
            />
            <RightCountBlock
              color={getColorByPageName(name)}
              number={stats.transactions}
              caption="txns since genesis"
              coinCaption="total txns value since genesis"
              coins={0}
            />
          </div>
          <Table name={name} viewStore={viewStore} />
        </>
      );
    case EPOCHS:
      return (
        <>
          <div className="page-wrap">
            <TitleBlock
              title="Epochs"
              color={getColorByPageName(name)}
              desc="Epochs across the entire mesh"
              uiStore={uiStore}
            />
            <AmountBlock number={value && value.number} startTime={value.start} unit="epochs" color={getColorByPageName(name)} />
          </div>
          <Table name={name} viewStore={viewStore} />
        </>
      );
    case LAYERS:
      return (
        <>
          <div className="page-wrap">
            <TitleBlock
              title="Layers"
              color={getColorByPageName(name)}
              desc="Layers across the entire mesh"
              uiStore={uiStore}
            />
            <AmountBlock number={value && value.layers} startTime={value.layerstart} unit="epochs" color={getColorByPageName(name)} />
          </div>
          <Table name={name} viewStore={viewStore} />
        </>
      );
    case TXNS:
      return (
        <>
          <div className="page-wrap">
            <TitleBlock
              title="Transactions"
              color={getColorByPageName(name)}
              desc="Transactions across the entire mesh"
              uiStore={uiStore}
            />
            <AmountBlock number={stats.transactions} startTime={0} unit="txs" color={getColorByPageName(name)} />
          </div>
          <Table name={name} viewStore={viewStore} />
        </>
      );
    case REWARDS:
      return (
        <>
          <div className="page-wrap">
            <TitleBlock
              title="All Mining Rewards"
              color={getColorByPageName(name)}
              desc="Rewards across the entire mesh"
              uiStore={uiStore}
            />
            <RewardsRightColumn number={stats.rewards} color={getColorByPageName(name)}/>
          </div>
          <Table name={name} viewStore={viewStore} />
        </>
      );
    case ACCOUNTS:
      return (
        <>
          <div className="page-wrap">
            <TitleBlock
              title="All Accounts"
              color={getColorByPageName(name)}
              desc="Accounts across the entire mesh"
              uiStore={uiStore}
            />
            <AmountBlock number={stats.accounts} startTime={0} unit="accnts" color={getColorByPageName(name)} />
          </div>
          <Table name={name} viewStore={viewStore} />
        </>
      );
    case SMART_WALLET:
      return (
        <>
          <div className="page-wrap">
            <TitleBlock
              title="Smart Wallets"
              color={getColorByPageName(name)}
              desc="Smart Wallets across the entire mesh"
              uiStore={uiStore}
            />
            <AmountBlock number="000" startTime={0} unit="accnts" color={getColorByPageName(name)} />
          </div>
          <Table name={name} viewStore={viewStore} />
        </>
      );
    case SMESHER:
      return (
        <>
          <div className="page-wrap">
            <TitleBlock
              title="Smeshers"
              color={getColorByPageName(name)}
              desc="Specific details for this awards"
              uiStore={uiStore}
            />
            <AmountBlock number={stats.smeshers} startTime={0} unit="txns" color={getColorByPageName(name)} />
          </div>
          <Table name={name} viewStore={viewStore} />
        </>
      );
    default:
      break;
  }
};

export default observer(RenderMainPage);
