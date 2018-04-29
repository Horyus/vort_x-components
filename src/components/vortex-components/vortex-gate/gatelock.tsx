import * as React from 'react';
import {connect} from 'react-redux';

interface GatelockContainerProps {
    web3: any
}

class GatelockContainer extends React.Component<GatelockContainerProps> {

    render(): React.ReactNode {
        if (this.props.web3) {
            if (this.props.web3.status !== 'LOADED') {
                return (<div>
                    <p>{this.props.web3.status}</p>
                </div>)
            } else {
                return (<div>
                    {this.props.children}
                </div>)
            }
        }
        return (<div>
            <p>:(</p>
        </div>)
    }

}

const mapStateToProps = (state: any): GatelockContainerProps => {
    return {
        web3: state.web3
    }
};

export const Gatelock = connect(mapStateToProps)(GatelockContainer);
