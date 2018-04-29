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

export class VortexGate<T extends State> extends React.Component<VortexGateProps, VortexGateState<T>> {

    vortex: Vortex<T>;

    constructor(props: VortexGateProps) {
        super(props);

        this.vortex = new Vortex<T>(this.props.contracts, this.props.loader);
    }

    render(): React.ReactNode {
        return (
            <Gatelock>
                {this.props.children}
            </Gatelock>
        )
    }

}
