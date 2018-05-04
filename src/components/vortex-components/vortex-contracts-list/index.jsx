import * as React from "react";
import { FeedFilterContracts } from "vort_x";
import { connect } from "../../../utils/connect";
class _VortexContractsList extends React.Component {
    constructor(props) {
        super(props);
        this.processed_length = 0;
        this.render_array = [];
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.feed.length != this.processed_length) {
            for (let start_idx = this.processed_length; start_idx < nextProps.feed.length; ++start_idx) {
                if (this.props.contract_name && nextProps.feed[start_idx].contract_name !== this.props.contract_name) {
                    ++this.processed_length;
                    continue;
                }
                const customMapStateToProps = (state, ownProps) => {
                    return Object.assign({}, ownProps, { contract: state.contracts[nextProps.feed[start_idx].contract_name][nextProps.feed[start_idx].contract_address], contract_name: nextProps.feed[start_idx].contract_name, contract_address: nextProps.feed[start_idx].contract_address, web3: state.web3 });
                };
                const DynamicElementNode = connect(this.props.element, customMapStateToProps);
                this.render_array.unshift(<DynamicElementNode {...this.props.element_props} key={start_idx}/>);
                ++this.processed_length;
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
    return Object.assign({}, ownProps, { feed: FeedFilterContracts(state), element_props: ownProps.element_props || {}, container_props: ownProps.container_props || {} });
};
export const VortexContractsList = connect(_VortexContractsList, mapStateToProps);
