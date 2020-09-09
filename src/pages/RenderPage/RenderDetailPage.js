// @flow
import * as React from 'react';

import TitleBlock from '../../components/common/TitleBlock';
import { AmountBlock, CountTxnsBlock } from '../../components/common/CountBlock';
import { DetailsEpoch, DetailsCoinTxns } from '../../components/common/Details';
import DetailsLayer from '../../components/common/Details/DetailsLayer';
import longFormHash from '../../helper/longFormHash';
import TxnsStatus from '../../components/common/TxnsStatus';
import DetailAccount from '../../components/common/Details/DetailAccount';
import DetailReward from '../../components/common/Details/DetailReward';
import DetailsEmptyPage from '../../components/common/Details/DetailsEmptyPage';

import { getColorByPageName } from '../../helper/getColorByPageName';
import {
  EPOCHS,
  LAYERS,
  REWARDS,
  SMESHER,
  TXNS,
  ACCOUNTS,
  NOT_FOUND,
  BLOCKS,
  SMART_WALLET,
} from '../../config/constants';

import DetailsBlock from '../../components/common/Details/DetailBlock';
import DetailSmesher from '../../components/common/Details/DetailSmesher';
import DetailApp from '../../components/common/Details/DetailApp';
import {toJS} from 'mobx';
import {observer} from 'mobx-react';
import Loader from '../../components/common/Loader';
import {smhCoinConverter} from '../../helper/converter';
import RightCountBlock from '../../components/common/CountBlock/RightCountBlock';

type Props = {
  name: string,
  id: string,
  uiStore: Object,
  viewStore: Object,
};

const RenderDetailPage = (props: Props) => {
  const { name, id, uiStore, viewStore } = props;

  const data = toJS(viewStore.currentView.data);
  const { epoch } = toJS(viewStore.mainInfo);

  switch (name) {
    case EPOCHS:
      return (
        <>
          <div className="page-wrap">
            <TitleBlock
              title={`Epoch ${id} - details`}
              color={getColorByPageName(name)}
              desc="Specific details for this epoch"
              uiStore={uiStore}
            />
            <AmountBlock number={data && (data.layers)} startTime={data && data.start} unit="layers" color={getColorByPageName(name)} />
          </div>
          {data && <DetailsEpoch data={data} viewStore={viewStore} />}
        </>
      );
    case LAYERS:
      return (
        <>
          <div className="page-wrap">
            <TitleBlock
              title={`Layer ${id} - details`}
              color={getColorByPageName(name)}
              desc="Layers across the entire mesh"
              uiStore={uiStore}
            />
            <RightCountBlock
              color={getColorByPageName(name)}
              number={data && data.txs}
              caption="txns"
              coinCaption="total coin rewards"
              coins={data && smhCoinConverter(data.txsamount)}
            />
          </div>
          {data && <DetailsLayer data={data} viewStore={viewStore}/>}
        </>
      );
    case TXNS:
      return (
        <>
          <div className="page-wrap">
            <TitleBlock
              title={`Transactions ${longFormHash(id)} - details`}
              color={getColorByPageName(name)}
              desc="Transactions across the entire mesh"
              uiStore={uiStore}
            />
            <CountTxnsBlock amount={data && data.amount} startTime={0} color={getColorByPageName(name)} />
          </div>
          {data ? (
            <>
              <TxnsStatus status="approved" />
              <DetailsCoinTxns data={data} viewStore={viewStore} id={id}/>
            </>
          ): (<Loader size={100} />)}
        </>
      );
    case ACCOUNTS:
      return (
        <>
          <div className="page-wrap">
            <TitleBlock
              title="Address details"
              color={getColorByPageName(name)}
              desc="Details for this address"
              uiStore={uiStore}
            />
            <AmountBlock value="325" unit="accnts" color={getColorByPageName(name)} />
          </div>
          <DetailAccount viewStore={viewStore} />
        </>
      );
    case SMART_WALLET:
      return (
        <>
          <div className="page-wrap">
            <TitleBlock
              title="Smart Wallet - My Sm Smart wallet 1"
              color={getColorByPageName(name)}
              desc="A smart wallet app"
              uiStore={uiStore}
            />
            <AmountBlock value="325" unit="smh" color={getColorByPageName(name)} />
          </div>
          <DetailApp viewStore={viewStore} />
        </>
      );
    case SMESHER:
      return (
        <>
          <div className="page-wrap">
            <TitleBlock
              title={`Smesher ${longFormHash(id)} details`}
              color={getColorByPageName(name)}
              desc="Specific details for this smesher"
              uiStore={uiStore}
            />
            <AmountBlock value="325" unit="accnts" color={getColorByPageName(name)} />
          </div>
          {data && <DetailSmesher data={data} viewStore={viewStore} />}
        </>
      );
    case REWARDS:
      return (
        <>
          <div className="page-wrap">
            <TitleBlock
              title={`Smeshing Reward ${longFormHash(id)} - details`}
              color={getColorByPageName(name)}
              desc="Specific details for this reward."
              uiStore={uiStore}
            />
            <AmountBlock number={epoch && epoch.stats.cumulative.rewards} startTime={0} unit="smh" color={getColorByPageName(name)} />
          </div>
          {data && <DetailReward data={data} viewStore={viewStore} />}
        </>
      );
    case BLOCKS:
      return (
        <>
          <div className="page-wrap">
            <TitleBlock
              title="Specific details for this block"
              color={getColorByPageName(name)}
              desc="Specific details for this reward."
              uiStore={uiStore}
            />
            <RightCountBlock
              color={getColorByPageName(name)}
              number={epoch && epoch.stats.cumulative.txs}
              caption="txns"
              coinCaption="total coin rewards"
              coins={epoch && smhCoinConverter(epoch && epoch.stats.cumulative.txsamount)}
            />
          </div>
          {data && <DetailsBlock data={data} viewStore={viewStore} />}
        </>
      );
    case NOT_FOUND:
      return (
        <>
          <div className="page-wrap">
            <TitleBlock
              title={`${longFormHash(id)}`}
              color={getColorByPageName(name)}
              desc="search returned no result. try again or return home"
              uiStore={uiStore}
            />
            <AmountBlock value="000" unit="txns" color={getColorByPageName(name)} />
          </div>
          <DetailsEmptyPage />
        </>
      );
    default:
      break;
  }
};

export default observer(RenderDetailPage);
