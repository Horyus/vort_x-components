import * as React from "react";
import { connect } from "../../../utils/connect";
export class VortexAccount extends React.Component {
    constructor(props) {
        super(props);
        this.rendered = undefined;
        const customMapStateToProps = (state, ownProps) => {
            return Object.assign({}, ownProps, { account: state.accounts[this.props.account_address], address: this.props.account_address });
        };
        const DynamicElementNode = connect(this.props.element, customMapStateToProps);
        this.rendered = <DynamicElementNode {...this.props.element_props}/>;
    }
    render() {
        return (this.rendered);
    }
}
