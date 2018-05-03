import * as React from "react";
import {State, FeedFilter, FeedState, Vortex} from 'vort_x';
import {FeedFilterTransactions, FeedNewTransactionState, TransactionState} from "vort_x";
import {connect} from "../../../utils/connect";

export interface VortexTransactionsListProps {
    container?: React.ComponentClass,
    container_props?: any,

    element: React.ComponentClass,
    element_props?: any,

    feed: FeedState[],
}

interface VortexFeedListInternals {

}

class _VortexTransactionsList extends React.Component<VortexTransactionsListProps> {

    render_array: React.ReactNode[];

    constructor(props: VortexTransactionsListProps) {
        super(props);
        this.render_array = [] as React.ReactNode[];
    }

    public shouldComponentUpdate(nextProps: VortexTransactionsListProps, nextState: any): boolean {
        if (nextProps.feed.length != this.render_array.length) {
            for (let start_idx = this.render_array.length; start_idx < nextProps.feed.length; ++ start_idx) {
                const customMapStateToProps = (state: State, ownProps: any): any => {
                    return {
                        ...ownProps,
                        tx: state.tx[(nextProps.feed[start_idx] as FeedNewTransactionState).transaction_hash]
                    }
                };
                const DynamicElementNode: React.ComponentClass = connect(this.props.element, customMapStateToProps);
                this.render_array.unshift(<DynamicElementNode {...this.props.element_props} key={start_idx}/>);
            }
            return true;
        }
        return false;
    }

    public render(): React.ReactNode {
        if (this.props.container) {
            return (
                <this.props.container {...this.props.container_props}>
                    {this.render_array}
                </this.props.container>
            )
        }
        return (
            <div>
                {this.render_array}
            </div>
        )
    }
}

const mapStateToProps = (state: State, ownProps: VortexTransactionsListProps): VortexTransactionsListProps => {
    return {
        ...ownProps,
        feed: FeedFilterTransactions(state),
        element_props: ownProps.element_props || {},
        container_props: ownProps.container_props || {}
    }
};

export const VortexTransactionsList = connect(_VortexTransactionsList, mapStateToProps);
