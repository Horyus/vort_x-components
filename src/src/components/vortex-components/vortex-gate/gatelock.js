import * as React from 'react';
import { connect } from 'react-redux';
class GatelockContainer extends React.Component {
    render() {
        if (this.props.web3) {
            if (this.props.web3.status !== 'LOADED') {
                return (React.createElement("div", null,
                    React.createElement("p", null, this.props.web3.status)));
            }
            else {
                return (React.createElement("div", null, this.props.children));
            }
        }
        return (React.createElement("div", null,
            React.createElement("p", null, ":(")));
    }
}
const mapStateToProps = (state) => {
    return {
        web3: state.web3
    };
};
export const Gatelock = connect(mapStateToProps)(GatelockContainer);
