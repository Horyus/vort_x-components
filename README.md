<!--
  Title: Vortex Components
  Description: And Ethereum Dapp React and Redux tool taking care of transactions, smart contracts and many more !
  Author: mortimr
  -->
<div align="center" >
<img width="25%" src="https://raw.githubusercontent.com/Horyus/vortex-components/master/.assets/vortex-components.png">
</div>

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Introduction

Vortex Components are a suite of React Components using features from Vortex.

## Installation

```
npm install --save vort_x vort_x-components
```

## Get started

### For [Embark](https://embark.status.im) Users ...

```jsx
import {
    VortexGate,
    VortexWeb3Loaded,
    VortexWeb3Loading,
    VortexWeb3LoadError,
    VortexWeb3NetworkError,
    VortexWeb3Locked,
    VortexMetamaskLoader
} from 'vort_x-components';
import Web3 from 'web3'; // 1.0.0+ is preferable :)
import SimpleStorageContractInstance from 'Embark/contracts/SimpleStorage';
import * as Chains from '../chains.json';


...


<VortexGate contracts={{
                type: 'embark',
                embark_contracts: {
                    SimpleStorage: SimpleStorageContractInstance
                },
                chains: Chains,
                preloaded_contracts: [
                    "SimpleStorage"
                ]
            }} loader={VortexMetamaskLoader(Web3)}>

    <VortexWeb3Loaded>
        // Renders this when everything went well.
    </VortexWeb3Loaded>

    <VortexWeb3Loading>
        // Renders this when web3 is still loading.
    </VortexWeb3Loading>

    <VortexWeb3LoadError>
        // Renders this when an error occured while loading web3.
    </VortexWeb3LoadError>

    <VortexWeb3NetworkError>
        // Renders this if the contracts are not on the current network
    </VortexWeb3NetworkError>

    <VortexWeb3Locked>
        // Renders this if the wallet provider (Metamask, Mist) is locked
    </VortexWeb3Locked>

</VortexGate>
```

### ... and for [Truffle](https://embark.status.im) Users.

```jsx
import {
    VortexGate,
    VortexWeb3Loaded,
    VortexWeb3Loading,
    VortexWeb3LoadError,
    VortexWeb3NetworkError,
    VortexWeb3Locked,
    VortexMetamaskLoader
} from 'vort_x-components';
import Web3 from 'web3'; // 1.0.0+ is preferable :)
import SimpleStorage from '../build/contracts/SimpleStorage.json'


...


<VortexGate contracts={{
                type: 'truffle',
                truffle_contracts: [
                    SimpleStorage
                ],
                preloaded_contracts: [
                    "SimpleStorage"
                ]
            }} network_contracts={SimpleStorage} loader={VortexMetamaskLoader(Web3)}>
            // network_contracts defines the reference networks. If we are on a network where we can't find the
            // contracts you gave as arguments, it will be treated as a NetworkError.

    <VortexWeb3Loaded>
        // Renders this when everything went well.
    </VortexWeb3Loaded>

    <VortexWeb3Loading>
        // Renders this when web3 is still loading.
    </VortexWeb3Loading>

    <VortexWeb3LoadError>
        // Renders this when an error occured while loading web3.
    </VortexWeb3LoadError>

    <VortexWeb3NetworkError>
        // Renders this if the contracts are not on the current network
    </VortexWeb3NetworkError>

    <VortexWeb3Locked>
        // Renders this if the wallet provider (Metamask, Mist) is locked
    </VortexWeb3Locked>

</VortexGate>
```

----

### [Documentation](https://vort-x.readthedocs.io/en/master/tutorial#vortex-components)

### [Vortex](https://github.com/Horyus/vortex)

### [Embark Demonstration](https://github.com/Horyus/vortex-demo-embark)

### [Truffle Demonstration](https://github.com/Horyus/vortex-demo)

### [Contribution](./CONTRIBUTING.md)



