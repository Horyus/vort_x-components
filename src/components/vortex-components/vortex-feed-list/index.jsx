import * as React from "react";
import { FeedFilter, Vortex } from 'vort_x';
import { connect } from '../../../utils/connect';
export var FeedType;
(function (FeedType) {
    FeedType[FeedType["Transactions"] = 1] = "Transactions";
    FeedType[FeedType["Contracts"] = 2] = "Contracts";
    FeedType[FeedType["Errors"] = 4] = "Errors";
})(FeedType || (FeedType = {}));
class _VortexFeedList extends React.Component {
    constructor(props) {
        super(props);
        this.feedsize = 0;
        const web3 = Vortex.get().Store.getState().web3;
        web3._.eth.vortexSendTransaction({ from: web3.coinbase, value: 1234, to: web3.coinbase });
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.feed.length != this.feedsize) {
            this.feedsize = nextProps.feed.length;
            return true;
        }
        return false;
    }
    render() {
        const node_array = this.props.feed.map((elem, idx) => {
            return <this.props.element {...this.props.element_props} data={elem} key={idx}/>;
        });
        if (this.props.container) {
            return (<this.props.container {...this.props.container_props}>
                    {node_array}
                </this.props.container>);
        }
        return (<div>
                {node_array}
            </div>);
    }
}
const mapStateToProps = (state, ownProps) => {
    let selector;
    if (!ownProps.selector)
        selector = FeedFilter(ownProps.filter);
    return Object.assign({}, ownProps, { filter: ownProps.filter, feed: ownProps.selector ? ownProps.selector(state) : selector(state), selector: ownProps.selector || selector, element_props: ownProps.element_props || {}, container_props: ownProps.container_props || {} });
};
export const VortexFeedList = connect(_VortexFeedList, mapStateToProps);
