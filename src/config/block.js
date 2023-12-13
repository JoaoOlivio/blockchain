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
			},
			{
				"internalType": "string",
				"name": "_model",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_year",
				"type": "string"
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
				"internalType": "string",
				"name": "_cpf",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_nome",
				"type": "string"
			}
		],
		"name": "transferVehicle",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllChassis",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
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
			}
		],
		"name": "getTransferHistory",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "cpf",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "nome",
						"type": "string"
					}
				],
				"internalType": "struct VehicleRegistry.Transfer[]",
				"name": "",
				"type": "tuple[]"
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
						"internalType": "string",
						"name": "year",
						"type": "string"
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
						"components": [
							{
								"internalType": "uint256",
								"name": "timestamp",
								"type": "uint256"
							},
							{
								"internalType": "string",
								"name": "cpf",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "nome",
								"type": "string"
							}
						],
						"internalType": "struct VehicleRegistry.Transfer[]",
						"name": "transferHistory",
						"type": "tuple[]"
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
				"internalType": "string",
				"name": "year",
				"type": "string"
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
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
`;

// Convertendo a string da ABI em um objeto JavaScript
const contractABI = JSON.parse(contractABIString);

const contractAddress = '0x438e79aa89decfa243995a1d88aa44bb96f5f2d1';
const contract = new web3.eth.Contract(contractABI, contractAddress);

export { web3, contract };
