import * as React from "react";
import {State, FeedState, FeedFilter, FeedType} from 'vort_x';
import {connect} from '../../../utils/connect';
import {IRREGULAR_WHITESPACE_REGEX} from "tslint/lib/rules/noIrregularWhitespaceRule";

export interface VortexFeedListProps {
    container?: React.Component,
    element?: React.Component,
    feed: FeedState[]
}

interface VortexFeedListInternals {

}

class _VortexFeedList extends React.Component<VortexFeedListProps> {
    public render(): React.ReactNode {
        console.log(this.props.feed);
        return <p>ok</p>;
    }
}

const mapStateToProps = (state: State): VortexFeedListProps => {
    return {
        feed: FeedFilter(state.feed, FeedType.Contracts)
    }
};

export const VortexFeedList = connect(_VortexFeedList, mapStateToProps);
