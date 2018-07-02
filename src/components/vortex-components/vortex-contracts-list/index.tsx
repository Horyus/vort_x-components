import * as React from "react";
import {FeedNewContractState, State, FeedState, FeedType, getFeed} from "vort_x";
import {connect} from "../../../utils/connect";

export interface VortexContractsListProps {
    container?: React.ComponentClass,
    container_props?: any,

    element: React.ComponentClass,
    element_props?: any,

    contract_name?: string,

    feed: FeedState[],
}

class _VortexContractsList extends React.Component<VortexContractsListProps> {

    render_array: React.ReactNode[];
    processed_length: number = 0;

    constructor(props: VortexContractsListProps) {
        super(props);
        this.render_array = [] as React.ReactNode[];
    }

    public shouldComponentUpdate(nextProps: VortexContractsListProps, nextState: any): boolean {
        if (nextProps.feed.length != this.processed_length) {
            for (let start_idx = this.processed_length; start_idx < nextProps.feed.length; ++ start_idx) {
                if (this.props.contract_name && (nextProps.feed[start_idx] as FeedNewContractState).contract_name !== this.props.contract_name) {
                    ++this.processed_length;
                    continue ;
                }
                const customMapStateToProps = (state: State, ownProps: any): any => {
                    return {
                        ...ownProps,
                        contract: state.contracts[(nextProps.feed[start_idx] as FeedNewContractState).contract_name][(nextProps.feed[start_idx] as FeedNewContractState).contract_address],
                        contract_name: (nextProps.feed[start_idx] as FeedNewContractState).contract_name,
                        contract_address: (nextProps.feed[start_idx] as FeedNewContractState).contract_address,
                        web3: state.web3
                    }
                };
                const DynamicElementNode: React.ComponentClass = connect(this.props.element, customMapStateToProps);
                this.render_array.unshift(<DynamicElementNode {...this.props.element_props} key={start_idx}/>);
                ++this.processed_length;
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

const mapStateToProps = (state: State, ownProps: VortexContractsListProps): VortexContractsListProps => {
    return {
        ...ownProps,
        feed: getFeed(state, FeedType.Contracts),
        element_props: ownProps.element_props || {},
        container_props: ownProps.container_props || {}
    }
};

export const VortexContractsList = connect(_VortexContractsList, mapStateToProps);

