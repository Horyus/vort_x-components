import * as React from "react";
import {State, FeedState, FeedFilterContracts, Vortex, Web3LoadedState} from 'vort_x';
import {connect} from '../../../utils/connect';

export interface VortexFeedListProps {
    container?: React.Component,
    element?: React.Component,
    feed: FeedState[]
}

interface VortexFeedListInternals {

}

class _VortexFeedList extends React.Component<VortexFeedListProps> {
    constructor(props: VortexFeedListProps) {
        super(props);
        const web3: any = Vortex.get().Store.getState().web3;
        web3._.eth.sendTransaction({from: web3.coinbase, value: 2345, to: "0x198210f1E859f51cCf65f484CDC4B4669DAba3F3"});
    }

    public render(): React.ReactNode {
        return <p>ok</p>;
    }
}

const mapStateToProps = (state: State): VortexFeedListProps => {
    return {
        feed: FeedFilterContracts(state)
    }
};

export const VortexFeedList = connect(_VortexFeedList, mapStateToProps);
