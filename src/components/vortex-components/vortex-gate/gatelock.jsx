import * as React from 'react';
import { connect } from '../../../utils/connect';
class GatelockContainer extends React.Component {
    constructor(props) {
        super(props);
        this.paths = {};
        const children = this.props.children;
        if (!children || children.length != 5) {
            console.error("Gatelock: You need to provide VortexWeb3Loading, VortexWeb3Loaded, VortexWeb3LoadError, VortexWeb3NetworkError and VortexWeb3Locked as unique children of VortexGate");
            return;
        }
        const found = {};
        const values = [
            "VortexWeb3Loaded",
            "VortexWeb3LoadError",
            "VortexWeb3NetworkError",
            "VortexWeb3Loading",
            "VortexWeb3Locked"
        ];
        children.forEach((child) => {
            if (values.indexOf(child.type.name) === -1) {
                console.error("Gatelock: You need to provide VortexWeb3Loading, VortexWeb3Loaded, VortexWeb3LoadError, VortexWeb3NetworkError and VortexWeb3Locked as unique children of VortexGate");
                console.error("Found " + child.type.name + " but was waiting for VortexWeb3Loading, VortexWeb3Loaded, VortexWeb3LoadError and VortexWeb3NetworkError");
                return;
            }
            if (found[child.type.name]) {
                console.error("Gatelock: You need to provide VortexWeb3Loading, VortexWeb3Loaded, VortexWeb3LoadError, VortexWeb3NetworkError and VortexWeb3Locked as unique children of VortexGate");
                console.error("Found duplicate " + child.type.name + " but was waiting for 1 VortexWeb3Loading, 1 VortexWeb3Loaded, 1 VortexWeb3LoadError, 1 VortexWeb3NetworkError and 1 VortexWeb3Locked");
            }
            found[child.type.name] = true;
            this.paths[child.type.name] = child;
        });
    }
    render() {
        if (this.props.web3) {
            switch (this.props.web3.status) {
                case 'LOADING':
                    return this.paths.VortexWeb3Loading;
                case 'LOADED':
                    return this.paths.VortexWeb3Loaded;
                case 'LOAD_ERROR':
                    return this.paths.VortexWeb3LoadError;
                case 'NETWORK_ERROR':
                    return this.paths.VortexWeb3NetworkError;
                case 'LOCKED':
                    return this.paths.VortexWeb3Locked;
                default:
                    return this.paths.VortexWeb3LoadError;
            }
        }
        return this.paths.VortexWeb3LoadError;
    }
}
const mapStateToProps = (state) => {
    return {
        web3: state.web3
    };
};
export const Gatelock = connect(GatelockContainer, mapStateToProps);
