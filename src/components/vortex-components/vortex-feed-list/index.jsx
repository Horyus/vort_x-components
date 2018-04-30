import * as React from "react";
import { FeedFilterContracts, Vortex } from 'vort_x';
import { connect } from '../../../utils/connect';
class _VortexFeedList extends React.Component {
    constructor(props) {
        super(props);
        const web3 = Vortex.get().Store.getState().web3;
        web3._.eth.sendTransaction({ from: web3.coinbase, value: 2345, to: "0x198210f1E859f51cCf65f484CDC4B4669DAba3F3" });
    }
    render() {
        return <p>ok</p>;
    }
}
const mapStateToProps = (state) => {
    return {
        feed: FeedFilterContracts(state)
    };
};
export const VortexFeedList = connect(_VortexFeedList, mapStateToProps);
