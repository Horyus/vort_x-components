import * as React from 'react';
import {State} from 'vort_x';
import {connect} from "../../../utils/connect";

export interface VortexMethodCallListProps {
    container?: React.ComponentClass,
    container_props?: any,

    element: React.ComponentClass,
    element_props?: any,

    contractName: string,
    contractAddress: string,
    methodName: string,
    arguments: any[][],

}

export class VortexMethodCallList extends React.Component<VortexMethodCallListProps> {

    render_array: React.ReactNode[] = [];

    constructor(props: VortexMethodCallListProps) {
        super(props);

        this.props.arguments.forEach((callArgs: any[], index: number): void => {
            const customMapStateToProps = (state: State, ownProps: any): any  => {
                return {
                    ...ownProps,
                    result: state.contracts[this.props.contractName][this.props.contractAddress].instance.vortex[this.props.methodName].vortexData(...callArgs)
                }
            };
            const DynamicElementNode: React.ComponentClass = connect(this.props.element, customMapStateToProps);
            this.render_array.unshift(<DynamicElementNode {...this.props.element_props}  key={index}/>)
        });
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

