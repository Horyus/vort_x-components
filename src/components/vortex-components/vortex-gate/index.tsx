import * as React from 'react';
import {Vortex, State} from 'vort_x';
import {Gatelock} from "./gatelock";

export interface VortexGateProps {
    loader: Promise<any>,
    contracts: any[]
}

export interface VortexGateState<T extends State> {
    vortex: Vortex<T>
}

export class VortexGate<T extends State = State> extends React.Component<VortexGateProps, VortexGateState<T>> {

    vortex: Vortex<T>;

    constructor(props: VortexGateProps) {
        super(props);

        this.vortex = Vortex.factory<T>(this.props.contracts, this.props.loader);
        // TODO take separate argument for this one => Maybe array of contracts ?
        this.vortex.networksOf(this.props.contracts[0]);
        this.vortex.run();
        this.vortex.loadWeb3();
    }

    render(): React.ReactNode {
        return (
            <Gatelock>
                {this.props.children}
            </Gatelock>
        )
    }

}
