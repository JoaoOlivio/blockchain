// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VehicleRegistry {
    struct Transfer {
        uint256 timestamp;
        string cpf;
        string nome;
    }

    struct Vehicle {
        string chassi;
        string model;
        string year;
        string color;
        string placa;
        Transfer[] transferHistory;
    }

    mapping(string => Vehicle) public vehicles;
    string[] private vehicleChassis; // Array para armazenar os chassis

    function registerVehicle(
        string memory _chassi,
        string memory _model,
        string memory _year,
        string memory _placa,
        string memory _color
    ) public {
        Vehicle storage newVehicle = vehicles[_chassi];
        newVehicle.chassi = _chassi;
        newVehicle.model = _model;
        newVehicle.year = _year;
        newVehicle.color = _color;
        newVehicle.placa = _placa;
        // Não é necessário inicializar transferHistory, pois é dinâmico
        vehicleChassis.push(_chassi);
    }

    function transferVehicle(
        string memory _chassi,
        string memory _cpf,
        string memory _nome,
    ) public {
        Vehicle storage vehicle = vehicles[_chassi];

        vehicle.transferHistory.push(
            Transfer({
                timestamp: block.timestamp,
                cpf: _cpf,
                nome: _nome
            })
        );
    }

    function getVehicle(string memory _chassi)
        public
        view
        returns (Vehicle memory)
    {
        return vehicles[_chassi];
    }

    function getAllChassis() public view returns (string[] memory) {
        return vehicleChassis;
    }

    function getTransferHistory(string memory _chassi)
        public
        view
        returns (Transfer[] memory)
    {
        return vehicles[_chassi].transferHistory;
    }
}
