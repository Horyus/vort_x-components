import * as React from "react";
import {State, FeedFilter, FeedState} from 'vort_x';
import {connect} from '../../../utils/connect';

export interface VortexFeedListProps {
    filter: FeedType,

    container?: React.ComponentClass,
    container_props?: any,

    element: React.ComponentClass,
    element_props?: any,

    selector?: any,
    feed: FeedState[]
}

export enum FeedType {
    Transactions = 1,
    Contracts = 2,
    Errors = 4,
}


interface VortexFeedListInternals {

}

class _VortexFeedList extends React.Component<VortexFeedListProps> {

    private feedsize: number = 0;

    public shouldComponentUpdate(nextProps: VortexFeedListProps): boolean {
        if (nextProps.feed.length != this.feedsize) {
            this.feedsize = nextProps.feed.length;
            return true;
        }
        return false;
    }

    public render(): React.ReactNode {
        const node_array: React.ReactNode[] = this.props.feed.map((elem: FeedState, idx: number): React.ReactNode => {
            return <this.props.element {...this.props.element_props} data={elem} key={idx}/>
        });
        if (this.props.container) {
            return (
                <this.props.container {...this.props.container_props}>
                    {node_array}
                </this.props.container>
            )
        }
        return (
            <div>
                {node_array}
            </div>
        )
    }
}

const mapStateToProps = (state: State, ownProps: VortexFeedListProps): VortexFeedListProps => {
    let selector;
    if (!ownProps.selector)
        selector = FeedFilter(ownProps.filter);
    return {
        ...ownProps,
        filter: ownProps.filter,
        feed: ownProps.selector ? ownProps.selector(state) : selector(state),
        selector: ownProps.selector || selector,
        element_props: ownProps.element_props || {},
        container_props: ownProps.container_props || {}
    }
};

export const VortexFeedList = connect(_VortexFeedList, mapStateToProps);
