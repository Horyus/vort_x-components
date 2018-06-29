import * as React from 'react';
import {connect} from '../../../utils/connect';

interface GatelockContainerProps {
    store?: any,
    web3: any,
    backlink: any
}

interface GatelockContainerPaths {

    VortexWeb3Loaded: React.ReactChildren,
    VortexWeb3LoadError: React.ReactChildren,
    VortexWeb3NetworkError: React.ReactChildren
    VortexWeb3Loading: React.ReactChildren
    VortexWeb3Locked: React.ReactChildren
}

class GatelockContainer extends React.Component<GatelockContainerProps> {

    paths: GatelockContainerPaths = {} as GatelockContainerPaths;

    constructor(props: GatelockContainerProps) {
        super(props);

        const children: any = this.props.children;

        if (!children || children.length != 5) {
            console.error("Gatelock: You need to provide VortexWeb3Loading, VortexWeb3Loaded, VortexWeb3LoadError, VortexWeb3NetworkError and VortexWeb3Locked as unique children of VortexGate");
            return ;
        }

        const found = {};
        const values = [
            "VortexWeb3Loaded",
            "VortexWeb3LoadError",
            "VortexWeb3NetworkError",
            "VortexWeb3Loading",
            "VortexWeb3Locked"
        ];

        children.forEach((child: any): void => {
            if (values.indexOf(child.type.name) === -1) {
                console.error("Gatelock: You need to provide VortexWeb3Loading, VortexWeb3Loaded, VortexWeb3LoadError, VortexWeb3NetworkError and VortexWeb3Locked as unique children of VortexGate");
                console.error("Found " + child.type.name + " but was waiting for VortexWeb3Loading, VortexWeb3Loaded, VortexWeb3LoadError and VortexWeb3NetworkError");
                return ;
            }
            if (found[child.type.name]) {
                console.error("Gatelock: You need to provide VortexWeb3Loading, VortexWeb3Loaded, VortexWeb3LoadError, VortexWeb3NetworkError and VortexWeb3Locked as unique children of VortexGate");
                console.error("Found duplicate " + child.type.name + " but was waiting for 1 VortexWeb3Loading, 1 VortexWeb3Loaded, 1 VortexWeb3LoadError, 1 VortexWeb3NetworkError and 1 VortexWeb3Locked");
            }
            found[child.type.name] = true;
            this.paths[child.type.name] = child;
        })

    }

    public render(): React.ReactNode {
        if (this.props.web3) {
            switch (this.props.web3.status) {
                case 'LOADING':
                    return this.paths.VortexWeb3Loading;
                case 'LOADED':
                    switch (this.props.backlink.status) {
                        case 'LOADING':
                            return this.paths.VortexWeb3Loading;
                        default:
                            return this.paths.VortexWeb3Loaded;
                    }
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

const mapStateToProps = (state: any): GatelockContainerProps => {
    return {
        web3: state.web3,
        backlink: state.backlink
    }
};

export const Gatelock = connect(GatelockContainer, mapStateToProps);
