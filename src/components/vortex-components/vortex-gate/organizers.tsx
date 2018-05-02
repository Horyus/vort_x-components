import * as React from 'react';

export class VortexWeb3Loaded extends React.Component {
    public render(): React.ReactNode {
        return this.props.children;
    }
}
export class VortexWeb3LoadError extends React.Component {
    public render(): React.ReactNode {
        return this.props.children;
    }
}
export class VortexWeb3NetworkError extends React.Component {
    public render(): React.ReactNode {
        return this.props.children;
    }
}
export class VortexWeb3Loading extends React.Component {
    public render(): React.ReactNode {
        return this.props.children;
    }
}
