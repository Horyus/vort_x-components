import * as React from 'react';
import { connect } from "../../../utils/connect";
export class VortexMethodCallList extends React.Component {
    constructor(props) {
        super(props);
        this.render_array = [];
        this.props.arguments.forEach((callArgs, index) => {
            const customMapStateToProps = (state, ownProps) => {
                return Object.assign({}, ownProps, { result: state.contracts[this.props.contractName][this.props.contractAddress].instance.vortexMethods[this.props.methodName].data(...callArgs) });
            };
            const DynamicElementNode = connect(this.props.element, customMapStateToProps);
            this.render_array.unshift(<DynamicElementNode {...this.props.element_props} key={index}/>);
        });
    }
    render() {
        if (this.props.container) {
            return (<this.props.container {...this.props.container_props}>
                    {this.render_array}
                </this.props.container>);
        }
        return (<div>
                {this.render_array}
            </div>);
    }
}
