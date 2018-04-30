import * as React from "react";
import { FeedFilter, FeedType } from 'vort_x';
import { connect } from '../../../utils/connect';
class _VortexFeedList extends React.Component {
    render() {
        console.log(this.props.feed);
        return <p>ok</p>;
    }
}
const mapStateToProps = (state) => {
    return {
        feed: FeedFilter(state.feed, FeedType.Contracts)
    };
};
export const VortexFeedList = connect(_VortexFeedList, mapStateToProps);
