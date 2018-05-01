import * as React from "react";
import { FeedFilterContracts, Vortex } from 'vort_x';
import { connect } from '../../../utils/connect';
class _VortexFeedList extends React.Component {
    constructor(props) {
        super(props);
        this.feedsize = 0;
        const web3 = Vortex.get().Store.getState().web3;
        web3._.eth.vortexSendTransaction({ from: web3.coinbase, value: 2345, to: "0x198210f1E859f51cCf65f484CDC4B4669DAba3F3" });
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.feed.length != this.feedsize) {
            this.feedsize = nextProps.feed.length;
            return true;
        }
        return false;
    }
    render() {
        console.log(this.props.feed);
        return <p>ok</p>;
    }
}
const mapStateToProps = (state) => {
    return {
        feed: FeedFilterContracts(state)
    };
};
export const VortexFeedList = connect(_VortexFeedList, mapStateToProps);
