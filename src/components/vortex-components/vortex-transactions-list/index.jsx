import * as React from "react";
import { FeedFilterTransactions } from "vort_x";
import { connect } from "../../../utils/connect";
class _VortexTransactionsList extends React.Component {
    constructor(props) {
        super(props);
        this.render_array = [];
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.feed.length != this.render_array.length) {
            for (let start_idx = this.render_array.length; start_idx < nextProps.feed.length; ++start_idx) {
                const customMapStateToProps = (state, ownProps) => {
                    return Object.assign({}, ownProps, { tx: state.tx[nextProps.feed[start_idx].transaction_hash] });
                };
                const DynamicElementNode = connect(this.props.element, customMapStateToProps);
                this.render_array.unshift(<DynamicElementNode {...this.props.element_props} key={start_idx}/>);
            }
            return true;
        }
        return false;
    }
    render() {
        if (this.props.container) {
            return (<this.props.container {...this.props.container_props}>
                    {this.render_array}
                </this.props.container>);
        }
        return (<div>
                {this.render_array}
            </div>);
    }
}
const mapStateToProps = (state, ownProps) => {
    return Object.assign({}, ownProps, { feed: FeedFilterTransactions(state), element_props: ownProps.element_props || {}, container_props: ownProps.container_props || {} });
};
export const VortexTransactionsList = connect(_VortexTransactionsList, mapStateToProps);
