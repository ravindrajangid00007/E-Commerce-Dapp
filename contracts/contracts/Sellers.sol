//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

contract Sellers {
    struct Seller {
        string name;
        address payable sellerAddress;
    }

    Seller[] public sellers;

    event SellerAdded(string name, address payable sellerAddress);

    modifier onlyNewSeller() {
        require(!isOldSeller(), "Existing Seller");
        _;
    }

    modifier onlySeller() {
        require(isOldSeller());
        _;
    }

    function addSeller(string memory _name) public onlyNewSeller {
        sellers.push(Seller(_name, payable(msg.sender)));
        emit SellerAdded(_name, payable(msg.sender));
    }

    function isOldSeller() public view returns (bool) {
        for (uint256 i = 0; i < sellers.length; i++) {
            if (msg.sender == sellers[i].sellerAddress) return true;
        }
        return false;
    }

    function getSeller() public view returns (Seller memory) {
        for (uint256 i = 0; i < sellers.length; i++) {
            if (msg.sender == sellers[i].sellerAddress) return sellers[i];
        }
        Seller memory nullSeller = Seller("null", payable(address(0)));
        return nullSeller;
    }
}
