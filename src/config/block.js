import Web3 from 'web3';

let web3;

if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    window.ethereum.request({ method: 'eth_requestAccounts' }); // Solicita acesso à carteira do usuário
} else {
    console.error("MetaMask não encontrado!");
}

const contractABIString = `
[
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_chassi",
				"type": "string"
			}
		],
		"name": "getVehicle",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "chassi",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "model",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "year",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "color",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "placa",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					}
				],
				"internalType": "struct VehicleRegistry.Vehicle",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_chassi",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_model",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_year",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_placa",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_color",
				"type": "string"
			}
		],
		"name": "registerVehicle",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_chassi",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferVehicle",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "vehicles",
		"outputs": [
			{
				"internalType": "string",
				"name": "chassi",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "model",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "year",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "color",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "placa",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
`;

// Convertendo a string da ABI em um objeto JavaScript
const contractABI = JSON.parse(contractABIString);

const contractAddress = '0x8e2d895c5faeed8be5e830835ca170249f3c860c';
const contract = new web3.eth.Contract(contractABI, contractAddress);

export { web3, contract };
