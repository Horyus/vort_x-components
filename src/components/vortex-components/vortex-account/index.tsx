import * as React from "react";
import {State, getAccount} from "vort_x";
import {connect} from "../../../utils/connect";

export interface VortexAccountProps {
    element: React.ComponentClass,
    element_props?: any,

    account_address: string
}

export class VortexAccount extends React.Component<VortexAccountProps> {

    rendered: React.ReactNode = undefined;

    constructor(props: VortexAccountProps) {
        super(props);

        const customMapStateToProps = (state: State, ownProps: any): any => {
            return {
                ...ownProps,
                account: getAccount(state, this.props.account_address),
                address: this.props.account_address
            }
        };
        const DynamicElementNode: React.ComponentClass = connect(this.props.element, customMapStateToProps);
        this.rendered = <DynamicElementNode {...this.props.element_props} />
    }

    render(): React.ReactNode {
        return (
            this.rendered
        )
    }

}
